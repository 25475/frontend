import React from 'react'
import { useNavigate } from 'react-router-dom'

interface CheckoutSuccessProps {
  result: any
}

export default function CheckoutSuccess({ result }: CheckoutSuccessProps) {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Compra realizada</h1>
      <p>Orden creada: <strong>{result.orderId}</strong></p>
      {result.pdfUrl && (
        <p className="mt-2">
          Puedes descargar la factura/orden{' '}
          <a href={result.pdfUrl} target="_blank" rel="noreferrer" className="text-cyan-500">
            aquí
          </a>
        </p>
      )}
      <div className="mt-4">
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-cyan-500 text-white rounded"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}