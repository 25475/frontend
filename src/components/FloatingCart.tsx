import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import CartModal from './CartModal'

export default function FloatingCart() {
  const { itemCount, isLoading } = useCart()
  const location = useLocation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userInitiated, setUserInitiated] = useState(false)

  // Solo mostrar en páginas de productos
  const showOnPages = ['/novatec', '/vision', '/product']
  const shouldShow = showOnPages.some(page => location.pathname.startsWith(page))

  // Definir colores según la página
  const getCartColors = () => {
    if (location.pathname.startsWith('/vision')) {
      return {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        badge: 'bg-red-500'
      }
    } else if (location.pathname.startsWith('/novatec')) {
      return {
        bg: 'bg-orange-500',
        hover: 'hover:bg-orange-600',
        badge: 'bg-red-500'
      }
    } else {
      // Color por defecto (cian)
      return {
        bg: 'bg-cyan-500',
        hover: 'hover:bg-cyan-600',
        badge: 'bg-red-500'
      }
    }
  }

  const colors = getCartColors()

  const handleOpenCart = () => {
    setUserInitiated(true) // Marcar que fue iniciado por el usuario
    setIsModalOpen(true)
  }

  const handleCloseCart = () => {
    setIsModalOpen(false)
    setUserInitiated(false) // Reset cuando se cierra
  }

  // No renderizar si está cargando, no hay productos o no estamos en una página de productos
  if (isLoading || itemCount === 0 || !shouldShow) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpenCart}
          className={`${colors.bg} ${colors.hover} text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-bounce hover:animate-none`}
          aria-label={`Ver carrito (${itemCount} productos)`}
        >
          {/* Ícono del carrito */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" 
            />
          </svg>
          
          {/* Contador de productos */}
          {itemCount > 0 && (
            <span className={`absolute -top-2 -right-2 ${colors.badge} text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse`}>
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
          
          {/* Tooltip */}
          <div className="absolute bottom-full mb-3 right-0 bg-gray-800 text-white text-sm rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Ver carrito ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
            <div className="absolute top-full right-4 transform border-4 border-transparent border-t-gray-800"></div>
          </div>
        </button>
      </div>

      {/* Modal del carrito - solo mostrar si fue iniciado por el usuario */}
      {userInitiated && (
        <CartModal 
          isOpen={isModalOpen} 
          onClose={handleCloseCart} 
        />
      )}
    </>
  )
}