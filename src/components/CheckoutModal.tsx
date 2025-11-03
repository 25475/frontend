import React, { useEffect, useState } from 'react'
import SatisfactionModal from './SatisfactionModal'
import MapPicker from './MapPicker'

export default function CheckoutModal({ open, onClose, initialItems } : { open: boolean, onClose: (ok?:boolean)=>void, initialItems?: any[] }){
  const [items, setItems] = useState<any[]>(initialItems || [])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [reference, setReference] = useState('')
  const [locLoading, setLocLoading] = useState(false)
  const [location, setLocation] = useState<{lat:number,lon:number, display_name?:string}|null>(null)
  const [mapOpen, setMapOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showSatisfaction, setShowSatisfaction] = useState(false)
  const [satisfactionMessage, setSatisfactionMessage] = useState<string|undefined>(undefined)
  const [pendingOrderPayload, setPendingOrderPayload] = useState<any>(null)

  useEffect(()=> setItems(initialItems || []), [initialItems])

  const total = items.reduce((s,a)=> s + (Number(a.price||0) * Number(a.quantity||1)), 0)

  const handleSubmit = async (e?:React.FormEvent) => {
    if (e) e.preventDefault()
    if(items.length===0) return alert('No hay items para pagar')
    if(!name || !email || !address) return alert('Nombre, email y dirección son requeridos')

    setLoading(true)
    try{
      const payRes = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/pyphone`, {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ amount: total, phone })
      })
      const payJson = await payRes.json()
      if(!payRes.ok || !payJson.transactionId) throw new Error(payJson.error || 'Payment failed')

      // Preparar payload de orden y mostrar modal de satisfacción antes de crear la orden
      const orderPayload = {
        customer: { name, email, phone, address, reference, location },
        items: items.map(it=> ({ productId: it.productId, name: it.title, price: Number(it.price||0), quantity: Number(it.quantity||1) })),
        payment: { method: 'PYPHONE', transactionId: payJson.transactionId }
      }

      setPendingOrderPayload(orderPayload)
      setSatisfactionMessage(payJson.message || `Pago exitoso. Transacción: ${payJson.transactionId}`)
      setShowSatisfaction(true)

    }catch(err:any){
      console.error('Checkout error', err)
      alert('Error al procesar la orden: ' + (err.message || String(err)))
      setLoading(false)
    }
  }

  const handleSatisfactionClose = async (ok:boolean) => {
    setShowSatisfaction(false)
    if(!ok){
      // usuario canceló después del mensaje; simplemente reactivar botones
      setLoading(false)
      return
    }

    if(!pendingOrderPayload){
      setLoading(false)
      return
    }

    // crear orden ahora
    setLoading(true)
    try{
  const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(pendingOrderPayload) })
      const orderJson = await orderRes.json()
      if(!orderRes.ok) throw new Error(orderJson.error || JSON.stringify(orderJson))

      setResult(orderJson)
      // si vino del carrito, limpiar
      const currentCart = JSON.parse(localStorage.getItem('cart')||'[]')
      if (currentCart && currentCart.length>0){
        localStorage.removeItem('cart')
        window.dispatchEvent(new StorageEvent('storage', { key: 'cart', newValue: null as any }))
      }
    }catch(err:any){
      console.error('Order creation error', err)
      alert('Error al crear la orden: ' + (err.message || String(err)))
    }finally{
      setLoading(false)
      setPendingOrderPayload(null)
    }
  }

  if(!open) return null

  return (
    <div className="fixed inset-0 z-60 bg-black/50 flex items-start md:items-center justify-center p-4">
      <div className="bg-white rounded-none max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <button onClick={()=> onClose(false)} className="text-gray-500">Cerrar</button>
        </div>

        {result ? (
          <div>
            <p className="mb-2">Orden creada: <strong>{result.orderId}</strong></p>
            {result.pdfUrl && <p className="mb-4">Descargar PDF: <a href={result.pdfUrl} className="text-cyan-500" target="_blank" rel="noreferrer">aquí</a></p>}
            <div className="flex gap-2">
              <button onClick={()=> { onClose(true); }} className="px-4 py-2 bg-cyan-500 text-white rounded">Listo</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h4 className="font-semibold">Resumen</h4>
              <div className="mt-2 space-y-2">
                {items.map((it,idx)=> (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>{it.title} x {it.quantity}</div>
                    <div>S/{(Number(it.price||0)*Number(it.quantity||1)).toFixed(2)}</div>
                  </div>
                ))}
                <div className="text-right font-semibold">Total: S/{total.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <input required placeholder="Nombre completo" value={name} onChange={e=>setName(e.target.value)} className="px-3 py-2 border rounded-none" />
              <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="px-3 py-2 border rounded-none" />
              <input placeholder="Teléfono" value={phone} onChange={e=>setPhone(e.target.value)} className="px-3 py-2 border rounded-none" />
                  <div className="flex gap-2">
                <input required placeholder="Dirección" value={address} onChange={e=>setAddress(e.target.value)} className="flex-1 px-3 py-2 border rounded-none" />
                <div className="flex flex-col">
                  <div className="flex gap-2">
                    <button type="button" onClick={async ()=>{
                  // Obtener ubicación del navegador y hacer reverse geocoding con Nominatim
                  if(!('geolocation' in navigator)) return alert('Geolocation no está disponible en este navegador')
                  try{
                    setLocLoading(true)
                    navigator.geolocation.getCurrentPosition(async (pos)=>{
                      const lat = pos.coords.latitude
                      const lon = pos.coords.longitude
                          setLocation({lat, lon})
                      try{
                        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                        const json = await resp.json()
                        if(json && (json.display_name || json.address)){
                          setAddress(json.display_name || Object.values(json.address||{}).join(', '))
                          // store display_name in location
                          setLocation({lat, lon, display_name: json.display_name || undefined})
                        } else {
                          alert('No se pudo obtener una dirección legible')
                        }
                      }catch(err){
                        console.error('Reverse geocode error', err)
                        alert('Error al obtener dirección desde coordenadas')
                      }finally{ setLocLoading(false) }
                    }, (err)=>{
                      setLocLoading(false)
                      alert('Error obteniendo ubicación: ' + (err.message||err.code))
                    })
                  }catch(e){ setLocLoading(false); console.error(e); alert('Error al intentar obtener ubicación') }
                    }} className="px-3 py-2 border border-cyan-500 text-cyan-600 rounded-none">{locLoading? '...' : 'Usar mi ubicación'}</button>
                    <button type="button" onClick={()=> setMapOpen(true)} className="px-3 py-2 border border-cyan-500 text-cyan-600 rounded-none">Seleccionar en mapa</button>
                  </div>
                  {location?.display_name && <div className="text-xs text-gray-600 mt-1">{location.display_name}</div>}
                </div>
              </div>
              <input placeholder="Referencia (opcional)" value={reference} onChange={e=>setReference(e.target.value)} className="px-3 py-2 border rounded-none md:col-span-2" />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <button type="button" onClick={()=> onClose(false)} className="px-4 py-2 border rounded-none">Cancelar</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-cyan-500 text-white rounded-none">{loading? 'Procesando...': `Pagar S/${total.toFixed(2)} (pyphone)`}</button>
            </div>
          </form>
        )}
        {mapOpen && (
          <MapPicker initialPosition={location? {lat: location.lat, lon: location.lon} : undefined} onCancel={()=> setMapOpen(false)} onConfirm={(sel)=>{
            setLocation({lat: sel.lat, lon: sel.lon, display_name: sel.display_name})
            if(sel.display_name) setAddress(sel.display_name)
            setMapOpen(false)
          }} />
        )}

        <SatisfactionModal open={showSatisfaction} message={satisfactionMessage} onClose={handleSatisfactionClose} />
      </div>
    </div>
  )
}
