import React from 'react'

const FeatureItem = ({title, desc, imageSrc, imageAlt}:{title:string, desc:string, imageSrc:string, imageAlt:string})=> (
  <div className="flex flex-col items-center text-center px-8 py-6 group">
    <div className="feature-icon mb-8 relative">
      {/* Efecto de brillos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-150"></div>
      
      {/* Contenedor de imagen principal */}
      <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/40 group-hover:border-blue-400">
        <div className="w-full h-full p-2">
          <img 
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Overlay de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
      </div>
      
      {/* Anillo de brillo exterior */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110 animate-pulse"></div>
    </div>
    
    <h4 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{title}</h4>
    <p className="text-gray-600 leading-relaxed max-w-xs">{desc}</p>
  </div>
)

export default function Features(){
  return (
    <section className="relative py-20 mb-20 overflow-hidden">
      {/* Fondo con efectos tecnológicos */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-blue-50/30 to-white">
        {/* Líneas tecnológicas de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
        
        {/* Círculos decorativos */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-orange-400/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Encabezado principal */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-800">¿Por qué elegir </span>
            <span className="text-blue-500 relative">
              Vizion
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></div>
            </span>
            <span className="text-gray-800">?</span>
          </h3>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Tecnología avanzada para tu tranquilidad.
          </p>
          
          {/* Decoración del subtítulo */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-r from-blue-500 to-orange-500"></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-orange-500"></div>
          </div>
        </div>

        {/* Grid de características */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-start max-w-6xl mx-auto">
          <FeatureItem 
            title="Visión Nocturna HD" 
            desc="Claridad perfecta las 24 horas con tecnología infrarroja avanzada"
            imageSrc="/src/Image/vizion/Vizionnocturna.jpg"
            imageAlt="Visión Nocturna HD"
          />

          <FeatureItem 
            title="Inteligencia Artificial" 
            desc="Detección automática de movimiento y reconocimiento facial"
            imageSrc="/src/Image/vizion/camaraIA.jpg"
            imageAlt="Inteligencia Artificial"
          />

          <FeatureItem 
            title="Domótica" 
            desc="Controla iluminación, persianas y dispositivos desde una sola app"
            imageSrc="/src/Image/vizion/domotica-en-Casa.webp"
            imageAlt="Domótica"
          />
        </div>
        
        {/* Elemento decorativo inferior */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-6 h-px bg-blue-500"></div>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-orange-500"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
