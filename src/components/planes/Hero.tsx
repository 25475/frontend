import React, { useState, useEffect } from 'react'
import heroImg from '../../Image/planes/Principal.jpg'

export default function Hero() {
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
    "Conecta tu hogar con la mejor tecnología de fibra óptica disponible.",
    "Velocidades ultra rápidas, estabilidad garantizada y soporte 24/7.",
    "Internet de alta velocidad que transforma tu experiencia digital.",
    "Planes flexibles diseñados para satisfacer todas tus necesidades.",
    "Conexión confiable para trabajo, entretenimiento y comunicación.",
    "Tecnología de vanguardia con cobertura amplia en toda la ciudad.",
    "Instalación profesional gratuita y activación inmediata garantizada.",
    "Soporte técnico especializado disponible las 24 horas del día.",
    "Precios competitivos sin comprometer la calidad del servicio.",
    "La mejor inversión para el futuro digital de tu familia."
  ]

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]
    
    if (isTyping) {
      // Efecto de escritura
      if (displayedText.length < currentPhrase.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1))
        }, 40) // Velocidad de escritura rápida
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

  return (
    <section className="rounded-none overflow-hidden">
      <div 
        className="text-white relative min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center px-4 sm:px-6 lg:px-4 responsive-bg"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight">
              Internet de Alta Velocidad <span className="text-cyan-400">Sin Límites</span>
            </h1>
            
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

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-cyan-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base">
                <span className="hidden sm:inline">Ver planes disponibles</span>
                <span className="sm:hidden">Ver planes</span>
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-sm sm:text-base">
                <span className="hidden sm:inline">Verificar Cobertura</span>
                <span className="sm:hidden">Cobertura</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}