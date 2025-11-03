import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface CartItemsProps {
  items: any[]
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
}

export default function CartItems({ items, onUpdateQuantity, onRemoveItem }: CartItemsProps) {
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set())

  const handleRemove = (index: number) => {
    setRemovingItems(prev => new Set(prev).add(index))
    setTimeout(() => {
      onRemoveItem(index)
      setRemovingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(index)
        return newSet
      })
    }, 300)
  }

  const getProductImage = (item: any) => {
    // Intentar obtener la imagen del producto
    if (item.image) return item.image
    if (item.img) return item.img
    
    // Imagen por defecto basada en el tipo de producto
    if (item.category === 'novatek' || item.brand === 'novatek') {
      return '/src/Image/Novatek/default.jpg'
    }
    if (item.category === 'vizion' || item.brand === 'vizion') {
      return '/src/Image/vizion/default.jpg'
    }
    
    return '/src/Image/Productos/default.jpg'
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.1 7.1h14L19 13M9 19a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Tu carrito está vacío
          </h3>
          <p className="text-gray-600 mb-6">
            ¡Agrega algunos productos increíbles!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/novatec" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🔧</span>
            <span>Ver Novatek</span>
          </Link>
          <Link 
            to="/vision" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>📹</span>
            <span>Ver Vizion</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🛍️</span>
          Productos seleccionados ({items.length})
        </h2>
        
        <div className="space-y-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`relative bg-gray-50 rounded-lg p-4 transition-all duration-300 ${
                removingItems.has(index) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {/* Imagen del producto */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg overflow-hidden shadow-sm">
                    <img 
                      src={getProductImage(item)}
                      alt={item.title || 'Producto'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiA4VjE2TTggMTJIMTZNMjEgMTJBOSA5IDAgMTEzIDEyQTkgOSAwIDAxMjEgMTJaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo='
                      }}
                    />
                  </div>
                </div>

                {/* Información del producto */}
                <div className="flex-grow">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{item.title || 'Producto sin nombre'}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {item.brand && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.brand}
                      </span>
                    )}
                    {item.category && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Precio y controles */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  {/* Precio */}
                  <div className="text-center md:text-right">
                    <div className="text-lg font-bold text-gray-800">
                      {item.price ? `$ ${Number(item.price).toFixed(2)}` : 'Consultar'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Subtotal: $ {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => onUpdateQuantity(index, Number(item.quantity || 1) - 1)}
                        disabled={Number(item.quantity || 1) <= 1}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        −
                      </button>
                      <input 
                        type="number" 
                        min={1} 
                        max={99}
                        value={item.quantity || 1} 
                        onChange={(e) => onUpdateQuantity(index, Math.max(1, Number(e.target.value || 1)))} 
                        className="w-16 px-2 py-2 text-center border-0 focus:ring-0 focus:outline-none" 
                      />
                      <button 
                        onClick={() => onUpdateQuantity(index, Number(item.quantity || 1) + 1)}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Botón eliminar */}
                    <button 
                      onClick={() => handleRemove(index)} 
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Eliminar producto"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}