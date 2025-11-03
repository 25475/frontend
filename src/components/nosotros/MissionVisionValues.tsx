import React from 'react'
import { FaHandshake, FaWifi, FaHeadset, FaLock } from 'react-icons/fa'

export default function MissionVisionValues() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-8">
        {/* Título de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-300 bg-clip-text text-transparent">
              Misión, Visión y Valores
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-cyan-300 mx-auto rounded-full"></div>
        </div>
        
        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* Tarjeta de Misión (imagen encima del texto) */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-0 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-cyan-100 overflow-hidden">
            <div className="flex flex-col items-stretch">
              {/* Imagen arriba - optimizada para imagen vertical */}
              <div className="w-full h-64 sm:h-80 relative flex items-center justify-center rounded-t-2xl bg-gray-50 overflow-hidden">
                <img
                  src="/src/Image/sobre nosotros/Mision.jpeg"
                  alt="Misión - imagen"
                  className="h-full w-auto object-contain max-w-full"
                />
                {/* sutil vignette superior sin ocultar la imagen */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none rounded-t-2xl"></div>
              </div>

              {/* Contenido texto debajo de la imagen */}
              <div className="p-8 lg:p-10 flex-1 flex flex-col justify-center text-center">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Misión</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Proveer de servicio de internet a la Ciudad de MANTA y sus alrededores en forma ética, transparente, satisfaciendo las necesidades de los clientes, apoyándonos de un servicio técnico preparado al igual que una tecnología acorde a las exigencias del mercado presente.
                </p>
              </div>
            </div>
          </div>
          
          {/* Tarjeta de Visión */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-cyan-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-center">
              En el mediano plazo proveer de servicio de INTERNET a toda la Provincia de Manabí mediante un servicio técnico óptimo y altamente capacitado para poder cubrir las necesidades de los clientes, utilizando la tecnología que permite brindar un paquete completo de soluciones tanto a empresas como hogares.
            </p>
          </div>
          
          {/* Tarjeta de Valores */}
          <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-cyan-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHandshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Valores Corporativos</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FaHandshake className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Honestidad:</strong> Uno de los valores más importantes que esta empresa maneja, es la honestidad hacia sus clientes, valor que es muy importante en este ámbito debido a la poca credibilidad que tiene este, comparando a otras empresas.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FaHeadset className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Puntualidad:</strong> Es otro valor que nos identifica, sabemos que no podemos jugar con el tiempo de nuestros clientes.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FaLock className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Respeto:</strong> Hacia nuestros clientes y proveedores nos permite trabajar de mejor manera día a día.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}