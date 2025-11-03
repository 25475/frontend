import React, { useState, useEffect } from 'react'

export default function Hero(){
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
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

  const phrases = [
    "Cámaras de seguridad de última generación con tecnología AI avanzada.",
    "Visión nocturna cristalina y monitoreo 24/7 para máxima protección.",
    "Protección inteligente que se adapta a las necesidades de su hogar.",
    "Sistemas de vigilancia profesional con alertas en tiempo real.",
    "Tecnología de reconocimiento facial y detección de movimiento.",
    "Grabación en alta definición con almacenamiento en la nube seguro.",
    "Instalación profesional y soporte técnico especializado incluido.",
    "Monitoreo remoto desde cualquier dispositivo móvil o computadora.",
    "Soluciones de seguridad escalables para hogares y empresas.",
    "Tranquilidad garantizada con la mejor tecnología de vigilancia."
  ]

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    if (isTyping) {
      // Efecto de escritura
      if (displayedText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, 40) // Velocidad de escritura más rápida
        return () => clearTimeout(timer)
      } else {
        // Terminó de escribir, esperar 3 segundos
        const timer = setTimeout(() => {
          setIsTyping(false)
          setDisplayedText('')
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
          setTimeout(() => setIsTyping(true), 100) // Pequeña pausa antes de empezar la siguiente
        }, 3000) // Duración de 3 segundos
        return () => clearTimeout(timer)
      }
    }
  }, [displayedText, currentPhraseIndex, isTyping])

  const scrollToProducts = () => {
    const el = document.getElementById('nuestros-productos')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <section 
      className="vision-hero-bg relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center responsive-bg"
      style={{
        backgroundImage: "url('/src/Image/vizion/telefon.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top 13px',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para mejorar legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight text-white">
            Protege lo que <span className="text-blue-400">más</span>
            <br />
            <span className="text-blue-400">importa con VIZION</span>
            <span 
              className="text-black ml-1 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-thin"
              style={cursorStyle}
            >
              |
            </span>
          </h2>
          
          {/* Descripción con animación de escritura */}
          <div className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-200 max-w-xl min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] flex items-start">
            <span>
              {displayedText}
              {isTyping && (
                <span 
                  className="text-black ml-1 text-lg sm:text-xl lg:text-2xl font-thin"
                  style={cursorStyle}
                >
                  |
                </span>
              )}
            </span>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button onClick={scrollToProducts} className="hero-btn-primary bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base">
              <span className="hidden sm:inline">Ver Catálogo</span>
              <span className="sm:hidden">Catálogo</span>
            </button>
            <button className="hero-btn-outline border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base">
              <span className="hidden sm:inline">Demo en Vivo</span>
              <span className="sm:hidden">Demo</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
