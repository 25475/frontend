import React, { useState, useEffect } from 'react'

interface FlyingProductProps {
  isActive: boolean
  startPosition: { x: number; y: number }
  productImage?: string
  productName?: string
  onComplete: () => void
}

export default function FlyingProduct({ 
  isActive, 
  startPosition, 
  productImage, 
  productName, 
  onComplete 
}: FlyingProductProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsAnimating(true)
      
      // Completar animación después de 1 segundo
      const timer = setTimeout(() => {
        setIsAnimating(false)
        onComplete()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive && !isAnimating) return null

  // Posición del carrito (inferior derecha)
  const cartPosition = {
    x: window.innerWidth - 80, // 80px desde la derecha
    y: window.innerHeight - 80  // 80px desde abajo
  }

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        left: startPosition.x,
        top: startPosition.y,
        transform: isAnimating 
          ? `translate(${cartPosition.x - startPosition.x}px, ${cartPosition.y - startPosition.y}px) scale(0.2)` 
          : 'translate(0, 0) scale(1)',
        transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        opacity: isAnimating ? 0.8 : 1
      }}
    >
      {/* Elemento que vuela - puede ser imagen del producto o un ícono genérico */}
      <div className="w-16 h-16 bg-white rounded-lg shadow-lg border-2 border-cyan-500 flex items-center justify-center">
        {productImage ? (
          <img 
            src={productImage} 
            alt={productName || 'Producto'} 
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <svg 
            className="w-8 h-8 text-cyan-500" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
        )}
      </div>
      
      {/* Estela/trail de partículas */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping"
            style={{
              left: Math.random() * 60,
              top: Math.random() * 60,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
    </div>
  )
}