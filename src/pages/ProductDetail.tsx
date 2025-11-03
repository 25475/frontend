import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFlyingProduct } from '../contexts/FlyingProductContext'
import CheckoutModal from '../components/CheckoutModal'
import { apiGet, normalizeImageUrl } from '../utils/api'

export default function ProductDetail(){
  const { slug } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState<number>(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const { triggerFlyAnimation } = useFlyingProduct()

  useEffect(()=>{
    if(!slug) return
    setLoading(true)
    apiGet(`/api/products/slug/${slug}`)
      .then(data=> setProduct(data))
      .catch(err=> console.error(err))
      .finally(()=> setLoading(false))
  },[slug])

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    try{
      const existing = JSON.parse(localStorage.getItem('cart')||'[]')
      existing.push({ productId: product.id, title: product.name, price: product.price ? Number(product.price) : 0, slug: product.slug, quantity })
      localStorage.setItem('cart', JSON.stringify(existing))
      
      // Triggerar animación de vuelo
      const buttonElement = event.currentTarget
  triggerFlyAnimation(buttonElement, normalizeImageUrl(product.image || product.imageUrl) || undefined, product.name)
      
      // Disparar evento personalizado para actualización inmediata
      window.dispatchEvent(new CustomEvent('cartUpdated'))
      
      // Notificación más sutil
      setTimeout(() => {
        console.log('Producto añadido al carrito')
      }, 500)
    }catch(e){
      console.error(e)
    }
  }

  if(loading) return <div className="container mx-auto p-8">Cargando...</div>
  if(!product) return <div className="container mx-auto p-8">Producto no encontrado</div>

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          {product.imageUrl ? (
            <div className="w-full h-64 bg-white flex items-center justify-center rounded shadow overflow-hidden">
              <img src={normalizeImageUrl(product.imageUrl) || ''} alt={product.name} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-full h-64 bg-white flex items-center justify-center rounded">Sin imagen</div>
          )}
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-semibold text-cyan-600 mb-4">{product.price ? `S/${product.price}` : 'Consultar precio'}</div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Características</h3>
            {product.features ? (
              <ul className="list-disc pl-5 text-gray-700">
                {Array.isArray(product.features) ? product.features.map((f:any,i:number)=>(<li key={i}>{f}</li>)) : Object.entries(product.features||{}).map(([k,v])=> <li key={k}><strong>{k}: </strong>{String(v)}</li>) }
              </ul>
            ) : (
              <p className="text-gray-600">Sin características detalladas</p>
            )}
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label className="text-sm">Cantidad:</label>
            <input type="number" min={1} value={quantity} onChange={(e)=> setQuantity(Math.max(1, Number(e.target.value||1)))} className="w-20 px-2 py-1 border rounded" />
            <div className="text-sm text-gray-600">Stock: {product.stock ?? '—'}</div>
          </div>

          <div className="flex gap-4">
            <button onClick={addToCart} className="bg-cyan-500 text-white px-6 py-3 rounded">Añadir al carrito</button>
            <button onClick={()=> setShowCheckout(true)} className="bg-green-600 text-white px-6 py-3 rounded">Comprar ahora</button>
            <a href={`https://wa.me/593996816956?text=Quiero%20informaci%C3%B3n%20sobre%20${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" className="border border-cyan-500 text-cyan-600 px-6 py-3 rounded">Contactar por WhatsApp</a>
          </div>
        </div>
      </div>
      {showCheckout && (
        <CheckoutModal open={showCheckout} onClose={(ok)=> { setShowCheckout(false); if(ok) alert('Compra realizada') }} initialItems={[{ productId: product.id, title: product.name, price: product.price, quantity: quantity }]} />
      )}
    </div>
  )
}
