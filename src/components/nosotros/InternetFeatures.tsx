import React from 'react'

export default function InternetFeatures() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-8">
        <p className="text-sm text-gray-500 text-center mb-2">Contrata nuestros servicios</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-cyan-800 text-center mb-10">
          INTERNET ULTRA RÁPIDO
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-100 overflow-hidden">
              <img 
                src="/src/Image/sobrenosotros/Red de fibra optica.webp" 
                alt="fibra optica" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg md:text-xl font-bold text-cyan-800 uppercase tracking-wide mb-3">
                Internet con red de fibra óptica
              </h3>
              <p className="text-sm text-gray-600">
                Ofrecemos variedad de planes de alta velocidad a través de nuestra red de fibra óptica gpom.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-100 overflow-hidden">
              <img 
                src="/src/Image/sobrenosotros/videojuego.jpg" 
                alt="videojuegos y streaming" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg md:text-xl font-bold text-cyan-800 uppercase tracking-wide mb-3">
                Interactividad, videojuegos y streaming
              </h3>
              <p className="text-sm text-gray-600">
                Te permite tener mejor rendimiento de juegos en línea y disfrutar de tus plataformas favoritas.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-100 overflow-hidden">
              <img 
                src="/src/Image/sobrenosotros/Radiofrecuencia.avif" 
                alt="sin interferencia" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg md:text-xl font-bold text-cyan-800 uppercase tracking-wide mb-3">
                Sin interferencia radioeléctricas
              </h3>
              <p className="text-sm text-gray-600">
                La fibra óptica es inmune a las interferencias eléctricas siendo esto una de las principales ventajas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}