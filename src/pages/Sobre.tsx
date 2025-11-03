import React from 'react'

export default function Sobre(){
  return (
    <section className="py-16 bg-[#D3D4D6] relative overflow-hidden">
      {/* Patrón de fondo con iconos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-40">
          <svg className="w-18 h-18 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-semibold mb-4">Sobre Nosotros</h2>
        <p className="text-gray-700">Detalle más amplio sobre la empresa, ubicación, horarios y contactos (contenido similar a la imagen proporcionada).</p>
      </div>
    </section>
  )
}
