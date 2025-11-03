import React from 'react'

interface CheckoutFormProps {
  formData: {
    name: string
    email: string
    phone: string
    address: string
    reference: string
  }
  onFormChange: (field: string, value: string) => void
  onSubmit: (e: React.FormEvent) => void
  loading: boolean
  total: number
}

export default function CheckoutForm({ 
  formData, 
  onFormChange, 
  onSubmit, 
  loading, 
  total 
}: CheckoutFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label className="block text-sm">Nombre completo</label>
        <input 
          value={formData.name} 
          onChange={(e) => onFormChange('name', e.target.value)} 
          className="w-full px-3 py-2 border rounded" 
          required 
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input 
          type="email" 
          value={formData.email} 
          onChange={(e) => onFormChange('email', e.target.value)} 
          className="w-full px-3 py-2 border rounded" 
          required 
        />
      </div>
      <div>
        <label className="block text-sm">Teléfono (para pago)</label>
        <input 
          value={formData.phone} 
          onChange={(e) => onFormChange('phone', e.target.value)} 
          className="w-full px-3 py-2 border rounded" 
        />
      </div>
      <div>
        <label className="block text-sm">Dirección</label>
        <input 
          value={formData.address} 
          onChange={(e) => onFormChange('address', e.target.value)} 
          className="w-full px-3 py-2 border rounded" 
          required 
        />
      </div>
      <div>
        <label className="block text-sm">Referencia (opcional)</label>
        <input 
          value={formData.reference} 
          onChange={(e) => onFormChange('reference', e.target.value)} 
          className="w-full px-3 py-2 border rounded" 
        />
      </div>

      <div>
        <button 
          type="submit" 
          disabled={loading} 
          className="px-4 py-2 bg-cyan-500 text-white rounded"
        >
          {loading ? 'Procesando...' : `Pagar S/${total.toFixed(2)} (pyphone)`}
        </button>
      </div>
    </form>
  )
}