import React from 'react'

interface OrderSummaryProps {
  items: any[]
  total: number
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Resumen</h3>
      {items.map((item, index) => (
        <div key={index} className="p-3 bg-white rounded mb-2 flex justify-between">
          <div>
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-600">
              {item.quantity} x S/{Number(item.price || 0).toFixed(2)}
            </div>
          </div>
          <div className="font-semibold">
            S/{(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
          </div>
        </div>
      ))}
      <div className="text-right font-semibold">
        Total: S/{total.toFixed(2)}
      </div>
    </div>
  )
}