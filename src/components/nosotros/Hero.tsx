import React, { useState, useEffect } from 'react'
import heroImg from '../../Image/sobrenosotros/header.jpg'

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
    "Conectamos tu mundo con tecnología, seguridad y confianza",
    "Transformamos la conectividad con soluciones innovadoras y seguras",
    "Brindamos servicios tecnológicos de calidad superior y confiables",
    "Innovamos constantemente para mejorar tu experiencia digital",
    "Ofrecemos conectividad inteligente para hogares y empresas modernas",
    "Garantizamos servicios de internet rápidos, seguros y estables",
    "Creamos redes inteligentes que impulsan el crecimiento digital",
    "Proporcionamos tecnología avanzada con soporte personalizado",
    "Desarrollamos soluciones que conectan personas y oportunidades",
    "Construimos el futuro digital con tecnología de vanguardia"
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

  return (
    <section className="relative overflow-hidden min-h-[500px] h-[70vh] sm:h-[80vh] lg:h-[600px]">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat responsive-bg"
        style={{
          backgroundImage: `url(${heroImg})`
        }}
      ></div>
      
      {/* Overlay para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-20 h-full flex items-center">
        <div className="max-w-2xl w-full">
          {/* Título principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8">
            <span className="text-white">Sobre </span>
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent">
              Nosotros
            </span>
          </h1>
          
          {/* Subtítulo con animación de escritura */}
          <div className="text-sm sm:text-base lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] flex items-start">
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
          
          {/* Descripción principal */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
            Somos una empresa dedicada a conectar hogares y negocios con 
            Internet de alta velocidad, seguridad inteligente y soluciones domóticas 
            que transforman la manera en que vives y trabajas.
          </p>
          
          {/* Estadísticas */}
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
    </section>
  )
}