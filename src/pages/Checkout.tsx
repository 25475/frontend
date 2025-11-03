import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderSummary from '../components/checkout/OrderSummary'
import CheckoutForm from '../components/checkout/CheckoutForm'
import CheckoutSuccess from '../components/checkout/CheckoutSuccess'
import { apiPost } from '../utils/api'

export default function Checkout(){
  const [items, setItems] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    reference: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const existing = JSON.parse(localStorage.getItem('cart')||'[]')
    setItems(existing)
    if(!existing || existing.length===0){
      // nothing to checkout - redirect to cart
      // allow slight delay so user sees the page if they opened directly
      setTimeout(()=> navigate('/cart'), 300)
    }
  },[navigate])

  const total = items.reduce((s,a)=> s + (Number(a.price||0) * Number(a.quantity||1)), 0)

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    if(items.length===0) return
    if(!formData.name || !formData.email || !formData.address) {
      return alert('Nombre, email y dirección son requeridos')
    }

    setLoading(true)
    try{
      // 1) Call mock payment endpoint
      const payJson = await apiPost('/api/payments/pyphone', { 
        amount: total, 
        phone: formData.phone 
      })
      if(!payJson.transactionId) throw new Error(payJson.error || 'Payment failed')

      // 2) Create order
      const orderPayload = {
        customer: formData,
        items: items.map(it=> ({ 
          productId: it.productId, 
          name: it.title, 
          price: Number(it.price||0), 
          quantity: Number(it.quantity||1) 
        })),
        payment: { method: 'PYPHONE', transactionId: payJson.transactionId }
      }

      const orderJson = await apiPost('/api/orders', orderPayload)
      if(!orderJson) throw new Error('Error al crear la orden')

      // success
      setResult(orderJson)
      localStorage.removeItem('cart')
      setItems([])
    }catch(err:any){
      console.error('Checkout error', err)
      alert('Error al procesar la orden: ' + (err.message || String(err)))
    }finally{
      setLoading(false)
    }
  }

  if(result) {
    return <CheckoutSuccess result={result} />
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <OrderSummary items={items} total={total} />

      <CheckoutForm 
        formData={formData}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
        loading={loading}
        total={total}
      />
    </div>
  )
}
