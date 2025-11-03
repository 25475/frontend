import React from 'react'

export default function CTA() {
  return (
    <div className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 py-16 mt-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          ¿Listo para la mejor conexión?
        </h2>
        <p className="text-white/90 mb-8">
          Únete a miles de familias que ya disfrutan de internet sin límites
        </p>

        <div className="flex items-center justify-center gap-6">
          <button className="bg-white text-cyan-500 font-semibold px-6 py-3 rounded-lg shadow-sm">
            Contratar ahora
          </button>
          <button className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10">
            Hablar con un Asesor
          </button>
        </div>
      </div>
    </div>
  )
}