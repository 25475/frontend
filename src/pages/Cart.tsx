import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CheckoutModal from '../components/CheckoutModal'
import CartItems from '../components/cart/CartItems'
import CartSummary from '../components/cart/CartSummary'
import { useCart } from '../contexts/CartContext'

export default function Cart(){
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const { 
    items, 
    total, 
    itemCount, 
    isLoading, 
    removeItem, 
    updateQuantity, 
    clearCart 
  } = useCart()

  const handleRemoveItem = (index: number) => {
    const item = items[index]
    if (item && item.id) {
      removeItem(item.id)
    }
  }

  const handleUpdateQuantity = (index: number, quantity: number) => {
    const item = items[index]
    if (item && item.id) {
      updateQuantity(item.id, quantity)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header del carrito */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                🛒 Mi Carrito de Compras
              </h1>
              <p className="text-gray-600">
                {itemCount > 0 
                  ? `${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} en tu carrito`
                  : 'Tu carrito está vacío'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">              
              <Link 
                to="/novatec" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <span>🔧</span>
                <span>Novatek</span>
              </Link>
              <Link 
                to="/vision" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <span>📹</span>
                <span>Vizion</span>
              </Link>
            </div>
          </div>
          
          {/* Información adicional de la página */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-blue-800 text-sm">
              <span className="font-semibold">💡 Tip:</span> Esta es la vista completa del carrito. 
              También puedes usar el carrito flotante para una experiencia más rápida desde las páginas de productos.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="mb-8">
              <div className="mx-auto w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.1 7.1h14L19 13M9 19a2 2 0 100-4 2 2 0 000 4zm8 0a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-600 mb-8">
                ¡Descubre nuestros increíbles productos y planes!
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/novatec" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">🔧</span>
                  <div className="text-left">
                    <div className="font-semibold">Productos Novatek</div>
                    <div className="text-sm opacity-90">Herramientas profesionales</div>
                  </div>
                </div>
              </Link>
              <Link 
                to="/vision" 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-2xl">📹</span>
                  <div className="text-left">
                    <div className="font-semibold">Seguridad Vizion</div>
                    <div className="text-sm opacity-90">Cámaras y sistemas</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
              <CartItems 
                items={items}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            </div>

            {/* Resumen del carrito */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartSummary 
                  total={total}
                  itemCount={itemCount}
                  items={items}
                  onClearCart={clearCart}
                  onCheckout={() => setCheckoutModalOpen(true)}
                />
              </div>
            </div>
          </div>
        )}

        {checkoutModalOpen && (
          <CheckoutModal 
            open={checkoutModalOpen} 
            onClose={(ok) => { 
              setCheckoutModalOpen(false)
              if (ok) {
                alert('¡Orden creada exitosamente!')
                clearCart()
              }
            }} 
            initialItems={items} 
          />
        )}
      </div>
    </div>
  )
}
