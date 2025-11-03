import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import CheckoutModal from './CheckoutModal'
import PurchaseOrderModal from './PurchaseOrderModal'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [purchaseOrderModalOpen, setPurchaseOrderModalOpen] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  
  const { 
    items, 
    total, 
    itemCount, 
    isLoading, 
    removeItem, 
    updateQuantity, 
    clearCart 
  } = useCart()

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleRemoveItem = (itemId: string) => {
    setRemovingItems(prev => new Set(prev).add(itemId))
    setTimeout(() => {
      removeItem(itemId)
      setRemovingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }, 300)
  }

  const getProductImage = (item: any) => {
    if (item.image) return item.image
    if (item.img) return item.img
    
    if (item.category === 'novatek' || item.brand === 'novatek') {
      return '/src/Image/Novatek/default.jpg'
    }
    if (item.category === 'vizion' || item.brand === 'vizion') {
      return '/src/Image/vizion/default.jpg'
    }
    
    return '/src/Image/Productos/default.jpg'
  }

  // Cálculos del resumen
  const subtotal = total
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0
  const shipping = subtotal > 500 ? 0 : 10
  const tax = (subtotal - discount) * 0.15
  const finalTotal = subtotal - discount + shipping + tax

  const applyCoupon = () => {
    const validCoupons = {
      'DESCUENTO10': 10,
      'WELCOME15': 15,
      'PRIMERACOMPRA20': 20
    }

    const upperCoupon = couponCode.toUpperCase()
    if (validCoupons[upperCoupon as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: upperCoupon,
        discount: validCoupons[upperCoupon as keyof typeof validCoupons]
      })
      setShowCouponInput(false)
      setCouponCode('')
    } else {
      alert('Cupón inválido')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header del Modal */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold mb-1 flex items-center">
                  🛒 Mi Carrito de Compras
                </h2>
                <p className="opacity-90 text-sm sm:text-base">
                  {itemCount > 0 
                    ? `${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} en tu carrito`
                    : 'Tu carrito está vacío'
                  }
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="p-4 sm:p-8 text-center">
              <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.1 7.1h14L19 13M9 19a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                Tu carrito está vacío
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                ¡Descubre nuestros increíbles productos!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link 
                  to="/novatec" 
                  onClick={onClose}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>🔧</span>
                  <span>Ver Novatek</span>
                </Link>
                <Link 
                  to="/vision" 
                  onClick={onClose}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>📹</span>
                  <span>Ver Vizion</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              
              {/* Lista de productos */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <span className="mr-2">🛍️</span>
                  Productos seleccionados ({items.length})
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-gray-50 rounded-lg p-3 sm:p-4 transition-all duration-300 ${
                        removingItems.has(item.id) ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Imagen del producto */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg overflow-hidden shadow-sm">
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
                        <div className="flex-grow min-w-0">
                          <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base">{item.title || 'Producto sin nombre'}</h4>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-1">{item.description}</p>
                          )}
                          
                          <div className="flex items-center gap-2 mt-2">
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
                        <div className="flex flex-col items-end gap-2 min-w-0">
                          <div className="text-right">
                            <div className="font-bold text-gray-800 text-sm sm:text-base">
                              $ {Number(item.price || 0).toFixed(2)}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">
                              Subtotal: $ {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Controles de cantidad */}
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.id, Number(item.quantity || 1) - 1)}
                                disabled={Number(item.quantity || 1) <= 1}
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
                              >
                                −
                              </button>
                              <input 
                                type="number" 
                                min={1} 
                                max={99}
                                value={item.quantity || 1} 
                                onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value || 1)))} 
                                className="w-10 sm:w-12 px-1 py-1 text-center border-0 focus:ring-0 focus:outline-none text-xs sm:text-sm" 
                              />
                              <button 
                                onClick={() => updateQuantity(item.id, Number(item.quantity || 1) + 1)}
                                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors text-xs sm:text-sm"
                              >
                                +
                              </button>
                            </div>

                            {/* Botón eliminar */}
                            <button 
                              onClick={() => handleRemoveItem(item.id)} 
                              className="p-1 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
                              title="Eliminar producto"
                            >
                              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* Resumen del carrito */}
              <div className="w-full lg:w-80 bg-gray-50 p-3 sm:p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
                <div className="space-y-4 lg:space-y-6">
                  {/* Header del resumen */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">📊</span>
                      Resumen del pedido
                    </h3>
                  </div>

                  {/* Cupón de descuento */}
                  <div>
                    {!appliedCoupon && !showCouponInput && (
                      <button
                        onClick={() => setShowCouponInput(true)}
                        className="text-cyan-500 hover:text-cyan-600 text-xs sm:text-sm font-medium flex items-center"
                      >
                        <span className="mr-1">🎫</span>
                        ¿Tienes un cupón?
                      </button>
                    )}

                    {showCouponInput && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Código del cupón"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                          />
                          <button
                            onClick={applyCoupon}
                            className="px-2 sm:px-3 py-2 bg-cyan-500 text-white rounded-lg text-xs sm:text-sm hover:bg-cyan-600 transition-colors"
                          >
                            Aplicar
                          </button>
                        </div>
                        <button
                          onClick={() => setShowCouponInput(false)}
                          className="text-gray-500 text-xs sm:text-sm hover:text-gray-700"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}

                    {appliedCoupon && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div className="text-green-700">
                            <span className="font-medium">Cupón: {appliedCoupon.code}</span>
                            <div className="text-sm">{appliedCoupon.discount}% descuento</div>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Desglose de costos */}
                  <div className="space-y-2 sm:space-y-3 border-t border-gray-300 pt-3 sm:pt-4">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">$ {subtotal.toFixed(2)}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-xs sm:text-sm text-green-600">
                        <span>Descuento ({appliedCoupon.discount}%):</span>
                        <span className="font-medium">-$ {discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">
                        Envío: 
                        {shipping === 0 && (
                          <span className="text-green-600 ml-1">(Gratis)</span>
                        )}
                      </span>
                      <span className="font-medium">$ {shipping.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">IVA (15%):</span>
                      <span className="font-medium">$ {tax.toFixed(2)}</span>
                    </div>

                    {shipping > 0 && (
                      <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                        💡 ¡Envío gratis en compras mayores a $ 500!
                      </div>
                    )}
                  </div>

                  {/* Total final */}
                  <div className="border-t border-gray-300 pt-3 sm:pt-4">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <span className="text-base sm:text-lg font-semibold text-gray-800">Total:</span>
                      <span className="text-lg sm:text-xl font-bold text-cyan-600">
                        $ {finalTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Botones de acción */}
                    <div className="space-y-2 sm:space-y-3">
                      <button 
                        onClick={() => setPurchaseOrderModalOpen(true)} 
                        className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <span>�</span>
                        <span>Generar orden de compra</span>
                      </button>
                      
                      <button 
                        onClick={clearCart} 
                        className="w-full border border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 py-2 sm:py-2 px-4 sm:px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <span>🗑️</span>
                        <span>Vaciar carrito</span>
                      </button>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="border-t border-gray-300 pt-4">
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className="mr-1">🔒</span>
                        <span>Pago 100% seguro</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">📱</span>
                        <span>Soporte técnico incluido</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">↩️</span>
                        <span>Garantía en todos los productos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Checkout */}
      {checkoutModalOpen && (
        <CheckoutModal 
          open={checkoutModalOpen} 
          onClose={(ok) => { 
            setCheckoutModalOpen(false)
            if (ok) {
              alert('¡Orden creada exitosamente!')
              clearCart()
              onClose()
            }
          }} 
          initialItems={items} 
        />
      )}

      {/* Modal de Orden de Compra */}
      <PurchaseOrderModal 
        isOpen={purchaseOrderModalOpen}
        onClose={() => setPurchaseOrderModalOpen(false)}
      />
    </div>
  )
}