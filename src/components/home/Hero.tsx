import React, { useEffect, useState } from "react"

// Import new images from principal 1 folder
import slide1 from "../../Image/principal 1/Internet.jpg"
import slide2 from "../../Image/principal 1/Seguridad.jpg" 
import slide3 from "../../Image/principal 1/Domotica.jpg"

const slides = [slide1, slide2, slide3]

// Frases sincronizadas con cada imagen del carrusel
const slidePhrases = [
  // Frase para Internet.jpg
  "Conectividad ultra rápida con fibra óptica de última generación, velocidades simétricas y conexión estable las 24 horas para transformar tu hogar en un hub digital inteligente.",
  
  // Frase para Seguridad.jpg  
  "Sistemas de seguridad inteligente con cámaras 4K, detección de movimiento, alertas en tiempo real y monitoreo profesional para proteger lo que más importa.",
  
  // Frase para Domotica.jpg
  "Automatización domótica avanzada con control total desde tu smartphone, sensores inteligentes y integración perfecta para el hogar del futuro."
]

export default function Hero(){
  const [index, setIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Estilo CSS para el cursor parpadeante personalizado
  const cursorStyle = {
    animation: 'blink 1s infinite',
  }

  // Agregar keyframes de animación al head si no existen
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `
    if (!document.head.querySelector('style[data-cursor-blink]')) {
      style.setAttribute('data-cursor-blink', 'true')
      document.head.appendChild(style)
    }
  }, [])

  // Efecto para el carrusel de imágenes cada 8 segundos (más tiempo para leer)
  useEffect(()=>{
    const id = setInterval(()=>{
      setIndex(i=> (i+1) % slides.length)
      // Reiniciar la animación de texto cuando cambia la imagen
      setIsTyping(false)
      setDisplayedText('')
      setTimeout(() => setIsTyping(true), 300)
    }, 8000) // Aumentado a 8 segundos para dar más tiempo de lectura
    return ()=> clearInterval(id)
  }, [])

  // Efecto para la escritura de texto sincronizada con la imagen actual
  useEffect(() => {
    const currentPhrase = slidePhrases[index] // Usar la frase correspondiente a la imagen actual
    
    if (isTyping) {
      // Efecto de escritura más lento para mejor legibilidad
      if (displayedText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, 10) // Velocidad de escritura más lenta (50ms por carácter)
        return () => clearTimeout(timer)
      }
    }
  }, [displayedText, index, isTyping]) // Dependencia en index para resetear cuando cambia la imagen

  return (
    <section className="relative overflow-hidden min-h-[500px] h-[70vh] sm:h-[80vh] lg:h-[600px]">
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <div 
            key={src} 
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${src})`
              }}
            ></div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 lg:pt-44 pb-12 sm:pb-16 lg:pb-20 relative z-20 h-full flex items-center">
        <div className="max-w-2xl w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8">
            <span className="text-white">Internet de </span>
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
              Fibra
            </span>
            <span className="text-white"> + </span>
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
              Seguridad
            </span> 
            <span className="text-white">Inteligente</span>
          </h1>
          

          
          {/* Párrafo con animación de escritura */}
          <div className="text-sm sm:text-base lg:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed min-h-[4rem] sm:min-h-[5rem] lg:min-h-[6rem] flex items-start">
            <span>
              {displayedText}
              {isTyping && (
                <span 
                  className="text-cyan-400 ml-1 text-lg sm:text-xl font-thin"
                  style={cursorStyle}
                >
                  |
                </span>
              )}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg transition-colors shadow-lg hover:shadow-xl">
              Cotizar ahora
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-base sm:text-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              WhatsApp
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">5+</div>
              <div className="text-gray-300 text-xs sm:text-sm">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">10K+</div>
              <div className="text-gray-300 text-xs sm:text-sm">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-300 text-xs sm:text-sm">Soporte Técnico</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 flex space-x-2 sm:space-x-3 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              i === index 
                ? "bg-cyan-400 scale-125" 
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
