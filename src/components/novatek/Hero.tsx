import React, { useState, useEffect } from 'react'
import heroImg from '../../Image/Novatek/novatek.jpg'

export default function Hero() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  // Función para scroll suave hacia ProductGrid
  const scrollToProducts = () => {
    // Buscar el ProductGrid específico por ID
    let targetElement = document.getElementById('novatek-products')
    
    // Si no encuentra el ID, buscar por clase del grid
    if (!targetElement) {
      targetElement = document.querySelector('[class*="grid gap-6"]')
    }
    
    // Fallback: buscar la sección de categorías
    if (!targetElement) {
      targetElement = document.querySelector('.novatek-theme .flex.flex-col.gap-8')
    }
    
    if (targetElement) {
      const offset = -120 // Offset negativo para mostrar un poco arriba
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition + offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Función para abrir WhatsApp
  const openWhatsApp = () => {
    const phoneNumber = '593996816956' // Número de WhatsApp
    const message = 'Necesito las ofertas'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const phrases = [
    "Descubra tecnología de vanguardia que transforma su vida diaria.",
    "Calidad superior, precios competitivos e innovación constante.",
    "Conectividad avanzada para hogares y empresas modernas.",
    "Soluciones tecnológicas que impulsan el futuro digital.",
    "Equipos de última generación con garantía y soporte técnico.",
    "Revolucione su espacio con tecnología inteligente y eficiente.",
    "Productos certificados que superan las expectativas del mercado.",
    "Innovación accesible para todos los presupuestos familiares.",
    "Tecnología confiable respaldada por años de experiencia.",
    "Transforme su negocio con herramientas tecnológicas avanzadas."
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
    <section className="relative overflow-hidden min-h-[500px] h-[70vh] sm:h-[80vh] lg:h-[700px]">
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
            <span className="text-white">La última </span>
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              tecnología
            </span>
            <span className="text-white"> a precios inmejorables</span>
          </h1>
          
          {/* Descripción con animación de escritura */}
          <div className="text-sm sm:text-base lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed min-h-[2.5rem] sm:min-h-[3rem] lg:min-h-[3.5rem] flex items-start">
            <span>
              {displayedText}
              {isTyping && (
                <span className="animate-pulse text-orange-400 ml-1 text-lg sm:text-xl lg:text-2xl font-bold">|</span>
              )}
            </span>
          </div>
          
          {/* Botones */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <button 
              onClick={scrollToProducts}
              className="hero-animated-btn group px-6 sm:px-8 py-3 sm:py-4 bg-white text-orange-700 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-orange-50 active:scale-95 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Compra ahora</span>
              <span className="sm:hidden">Comprar</span>
            </button>
            <button 
              onClick={openWhatsApp}
              className="hero-animated-btn hero-whatsapp-btn group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 active:scale-95 hover:border-white/50 text-sm sm:text-base"
            >
              Ver ofertas
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}