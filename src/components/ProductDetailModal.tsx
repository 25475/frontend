import React, { useState } from 'react'
import { useFlyingProduct } from '../contexts/FlyingProductContext'
import { normalizeImageUrl } from '../utils/api'
import CheckoutModal from './CheckoutModal'

export default function ProductDetailModal({ open, product, onClose } : { open: boolean, product?: any, onClose: (ok?:boolean)=>void }){
  const [quantity, setQuantity] = useState<number>(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const { triggerFlyAnimation } = useFlyingProduct()

  if(!open || !product) return null

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    try{
      const existing = JSON.parse(localStorage.getItem('cart')||'[]')
      existing.push({ productId: product.id, title: product.name, price: product.price ? Number(product.price) : 0, slug: product.slug, quantity })
      localStorage.setItem('cart', JSON.stringify(existing))
      
      // Triggerar animación de vuelo
      const buttonElement = event.currentTarget
      triggerFlyAnimation(buttonElement, product.image || undefined, product.name)
      
      // Disparar evento personalizado para actualización inmediata
      window.dispatchEvent(new CustomEvent('cartUpdated'))
      
      // Cerrar modal después de un breve delay para ver la animación
      setTimeout(() => {
        onClose(true)
      }, 300)
    }catch(e){ console.error(e) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo semitransparente con desenfoque */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onClose(false)}></div>
      {/* Modal más rectangular (menos redondeo) y con borde sutil */}
      <div className="relative bg-white w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-auto rounded-none border border-gray-100 shadow-2xl p-5 z-10">
        <button className="absolute top-4 right-4 text-gray-600" onClick={() => onClose(false)}>Cerrar</button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
                {product.imageUrl ? (
                  <div className="w-full h-64 bg-white flex items-center justify-center rounded-none shadow overflow-hidden">
                    <img src={normalizeImageUrl(product.imageUrl) || ''} alt={product.name} className="w-full h-full object-contain" />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-white flex items-center justify-center rounded-none">Sin imagen</div>
                )}
              </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            
            {/* Mostrar características como lista con viñetas */}
            {product.features && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Características:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {Array.isArray(product.features) ? (
                    product.features.map((feature: string, index: number) => (
                      <li key={index} className="pl-2">{feature}</li>
                    ))
                  ) : typeof product.features === 'string' ? (
                    product.features.split('\n').filter((f: string) => f.trim()).map((feature: string, index: number) => (
                      <li key={index} className="pl-2">{feature.trim()}</li>
                    ))
                  ) : (
                    Object.entries(product.features).map(([key, value], index) => (
                      <li key={index} className="pl-2">{typeof value === 'string' ? value : `${key}: ${value}`}</li>
                    ))
                  )}
                </ul>
              </div>
            )}
            
            <div className="text-xl font-semibold text-cyan-600 mb-4">{product.price ? `S/${product.price}` : 'Consultar precio'}</div>

            <div className="mb-4 flex items-center gap-4">
              <label className="text-sm">Cantidad:</label>
              <input type="number" min={1} value={quantity} onChange={(e)=> setQuantity(Math.max(1, Number(e.target.value||1)))} className="w-20 px-2 py-1 border rounded-none" />
            </div>

            <div className="flex gap-3">
              <button onClick={addToCart} className="bg-cyan-500 text-white px-4 py-2 rounded-none">Añadir al carrito</button>
              <button onClick={()=> setShowCheckout(true)} className="bg-green-600 text-white px-4 py-2 rounded-none">Comprar ahora</button>
              <a href={`https://wa.me/593996816956?text=Quiero%20informaci%C3%B3n%20sobre%20${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" className="border border-cyan-500 text-cyan-600 px-4 py-2 rounded-none">WhatsApp</a>
            </div>
          </div>
        </div>

        {showCheckout && (
          <CheckoutModal open={showCheckout} onClose={(ok)=> { setShowCheckout(false); if(ok) onClose(true) }} initialItems={[{ productId: product.id, title: product.name, price: product.price, quantity }]} />
        )}
      </div>
    </div>
  )
}
