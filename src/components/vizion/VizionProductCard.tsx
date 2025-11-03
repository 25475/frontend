import React, { useState } from 'react'
import { useFlyingProduct } from '../../contexts/FlyingProductContext'
import { useCart } from '../../contexts/CartContext'
import { Link } from 'react-router-dom'
import { normalizeImageUrl } from '../../utils/api'

export default function VizionProductCard({
  title,
  color,
  description,
  price,
  image,
  slug,
  id,
  onDetails
}:{
  title:string,
  color:string,
  description:string,
  price?:string,
  image?:string|null,
  slug?:string,
  id?:string,
  onDetails?: ()=>void
}){
  const { triggerFlyAnimation } = useFlyingProduct()
  const { addItem, isInCart, getItemQuantity } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isAdding) return
    
    setIsAdding(true)
    
    try {
      // Extraer el valor numérico del precio si viene como string con formato
      let numericPrice = 0
      if (price) {
        // Remover caracteres no numéricos excepto punto y coma
        const cleanPrice = price.replace(/[^\d.,]/g, '').replace(',', '.')
        numericPrice = parseFloat(cleanPrice) || 0
      }

      const productItem = {
        id: id || `product-${Date.now()}`,
        title,
        price: numericPrice,
        image,
        description,
        slug,
        color
      }

      addItem(productItem)
      
      // Triggerar animación de vuelo SOLAMENTE, no abrir modal
      const buttonElement = event.currentTarget
      triggerFlyAnimation(buttonElement, normalizeImageUrl(image) || undefined, title)
      
      // Feedback visual exitoso
      setTimeout(() => {
        setIsAdding(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error al añadir al carrito:', error)
      setIsAdding(false)
    }
  }

  const productInCart = id ? isInCart(id) : false
  const currentQuantity = id ? getItemQuantity(id) : 0

  // Función para formatear el precio
  const formatPrice = (priceValue?: string) => {
    if (!priceValue) return null
    
    // Si ya tiene formato de moneda, devolverlo tal como está
    if (priceValue.includes('$') || priceValue.includes('S/') || priceValue.includes('€') || priceValue.includes('£')) {
      return priceValue
    }
    
    // Si es un número, formatear con $
    const numericValue = parseFloat(priceValue.replace(/[^\d.,]/g, '').replace(',', '.'))
    if (!isNaN(numericValue)) {
      const formatted = `$ ${numericValue.toFixed(2)}`
      return formatted
    }
    
    // Si no se puede procesar, devolver el valor original
    return priceValue
  }

  return (
    <article className="card p-2 sm:p-3 flex flex-col h-full bg-white rounded-lg shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group">
      <div className="relative w-full h-24 sm:h-28 lg:h-32 rounded-md mb-2 sm:mb-3 bg-gray-50 flex items-center justify-center overflow-hidden">
        {image ? (
          <img 
            src={normalizeImageUrl(image) || ''} 
            alt={title} 
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110 responsive-img" 
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA4VjE2TTggMTJIMTZNMjEgMTJBOSA5IDAgMTEzIDEyQTkgOSAwIDAxMjEgMTJaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
            }}
          />
        ) : (
          <div className="text-gray-400 text-center">
            <svg className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Sin imagen</span>
          </div>
        )}
      </div>

      <div className="flex-grow">
        <h4 className="font-semibold text-gray-800 mb-1 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h4>
        
        
      </div>

      {price && (
        <div className="mb-2 sm:mb-3">
          <div className="text-sm sm:text-base font-bold text-blue-600">
            {formatPrice(price)}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-2 mt-auto">
        {onDetails ? (
          <button 
            onClick={onDetails} 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-2 sm:px-3 rounded-md transition-colors duration-200 text-xs sm:text-sm font-medium"
          >
            👁️ Ver detalles
          </button>
        ) : (slug ? (
          <Link 
            to={`/product/${slug}`} 
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 sm:px-4 rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium text-center"
          >
            👁️ Ver detalles
          </Link>
        ) : (
          <button 
            className="flex-1 bg-gray-200 text-gray-500 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium cursor-not-allowed"
            disabled
          >
            👁️ Ver detalles
          </button>
        ))}
        
        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`flex-1 py-2 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
            isAdding
              ? 'bg-green-500 text-white'
              : productInCart
                ? 'bg-green-100 hover:bg-green-200 text-green-700'
                : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
          }`}
        >
          {isAdding ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="hidden sm:inline">Añadiendo...</span>
              <span className="sm:hidden">...</span>
            </span>
          ) : productInCart ? (
            <>
              <span className="hidden sm:inline">✅ Añadir más</span>
              <span className="sm:hidden">✅</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">🛒 Añadir al carrito</span>
              <span className="sm:hidden">🛒 Añadir</span>
            </>
          )}
        </button>
      </div>
    </article>
  )
}