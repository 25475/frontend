import React from 'react'

export default function SatisfactionModal({ open, message, onClose } : { open: boolean, message?: string, onClose: (ok:boolean)=>void }){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-70 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-none max-w-md w-full p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">¡Gracias!</h3>
        <p className="mb-4">{message || 'Pago realizado correctamente.'}</p>
        <div className="flex justify-center gap-3">
          <button onClick={()=> onClose(true)} className="px-4 py-2 bg-cyan-500 text-white rounded-none">Continuar</button>
          <button onClick={()=> onClose(false)} className="px-4 py-2 border rounded-none">Cancelar</button>
        </div>
      </div>
    </div>
  )
}
