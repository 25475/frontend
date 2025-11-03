import React, { useState } from 'react'

interface CartSummaryProps {
  total: number
  itemCount: number
  items: any[]
  onClearCart: () => void
  onCheckout: () => void
}

export default function CartSummary({ total, itemCount, items, onClearCart, onCheckout }: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null)
  const [showCouponInput, setShowCouponInput] = useState(false)

  // Cálculos del resumen
  const subtotal = total
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount / 100) : 0
  const shipping = subtotal > 500 ? 0 : 25 // Envío gratis para compras mayores a S/500
  const tax = (subtotal - discount) * 0.18 // IGV 18%
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header del resumen */}
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">📊</span>
          Resumen del pedido
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {itemCount} {itemCount === 1 ? 'producto' : 'productos'}
        </p>
      </div>

      {/* Desglose de productos */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-700 text-sm">Productos:</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div className="flex-1 mr-2">
                <span className="text-gray-600">{item.title}</span>
                <span className="text-gray-400 ml-1">x{item.quantity || 1}</span>
              </div>
              <span className="font-medium text-gray-800">
                S/ {(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cupón de descuento */}
      <div className="border-t border-gray-200 pt-4">
        {!appliedCoupon && !showCouponInput && (
          <button
            onClick={() => setShowCouponInput(true)}
            className="text-cyan-500 hover:text-cyan-600 text-sm font-medium flex items-center"
          >
            <span className="mr-1">🎫</span>
            ¿Tienes un cupón de descuento?
          </button>
        )}

        {showCouponInput && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código del cupón"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-cyan-500 text-white rounded-lg text-sm hover:bg-cyan-600 transition-colors"
              >
                Aplicar
              </button>
            </div>
            <button
              onClick={() => setShowCouponInput(false)}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              Cancelar
            </button>
          </div>
        )}

        {appliedCoupon && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="text-green-700">
                <span className="font-medium">Cupón aplicado: {appliedCoupon.code}</span>
                <div className="text-sm">Descuento del {appliedCoupon.discount}%</div>
              </div>
              <button
                onClick={removeCoupon}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remover
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desglose de costos */}
      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">S/ {subtotal.toFixed(2)}</span>
        </div>

        {appliedCoupon && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Descuento ({appliedCoupon.discount}%):</span>
            <span className="font-medium">-S/ {discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Envío: 
            {shipping === 0 && (
              <span className="text-green-600 ml-1">(Gratis)</span>
            )}
          </span>
          <span className="font-medium">
            S/ {shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">IGV (18%):</span>
          <span className="font-medium">S/ {tax.toFixed(2)}</span>
        </div>

        {shipping > 0 && (
          <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
            💡 ¡Envío gratis en compras mayores a S/ 500!
          </div>
        )}
      </div>

      {/* Total final */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-cyan-600">
            S/ {finalTotal.toFixed(2)}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <button 
            onClick={onCheckout} 
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <span>🛒</span>
            <span>Proceder al pago</span>
          </button>
          
          <button 
            onClick={onClearCart} 
            className="w-full border border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600 py-2 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🗑️</span>
            <span>Vaciar carrito</span>
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="border-t border-gray-200 pt-4">
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
  )
}