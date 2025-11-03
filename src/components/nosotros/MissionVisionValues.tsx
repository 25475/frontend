import React, { useState, useEffect, useRef } from 'react'
import { FaHandshake, FaWifi, FaHeadset, FaLock, FaBullseye, FaEye } from 'react-icons/fa'
import '../../styles/mission-vision-values.css'

interface TypewriterProps {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, delay = 0, onComplete }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  // Reiniciar cuando cambia el texto
  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
    setIsStarted(false)
    
    // Iniciar después del delay
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [text, delay])

  // Efecto de escritura
  useEffect(() => {
    if (!isStarted || currentIndex >= text.length) {
      if (currentIndex >= text.length && onComplete) {
        onComplete()
      }
      return
    }

    const timer = setTimeout(() => {
      setDisplayText(text.slice(0, currentIndex + 1))
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [isStarted, currentIndex, text, speed, onComplete])

  return (
    <div className="min-h-[1.5em]">
      {displayText}
      {currentIndex < text.length && isStarted && (
        <span className="animate-pulse text-cyan-500">|</span>
      )}
    </div>
  )
}

interface SectionData {
  id: string
  title: string
  text: string
  icon: React.ReactNode
  images: string[]
}

export default function MissionVisionValues() {
  const [currentSection, setCurrentSection] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTextComplete, setIsTextComplete] = useState(false)

  const sections: SectionData[] = [
    {
      id: 'mission',
      title: 'Misión',
      text: 'Proveer de servicio de internet a la Ciudad de MANTA y sus alrededores en forma ética, transparente, satisfaciendo las necesidades de los clientes, apoyándonos de un servicio técnico preparado al igual que una tecnología acorde a las exigencias del mercado presente.',
      icon: <FaBullseye className="w-8 h-8" />,
      images: [
        '/src/Image/sobrenosotros/mision/1.jpg',
        '/src/Image/sobrenosotros/mision/2.png',
        '/src/Image/sobrenosotros/mision/3.png'
      ]
    },
    {
      id: 'vision',
      title: 'Visión',
      text: 'En el mediano plazo proveer de servicio de INTERNET a toda la Provincia de Manabí mediante un servicio técnico óptimo y altamente capacitado para poder cubrir las necesidades de los clientes, utilizando la tecnología que permite brindar un paquete completo de soluciones tanto a empresas como hogares.',
      icon: <FaEye className="w-8 h-8" />,
      images: [
        '/src/Image/sobrenosotros/vision/1.jpg',
        '/src/Image/sobrenosotros/vision/2.png',
        '/src/Image/sobrenosotros/vision/3.png'
      ]
    },
    {
      id: 'values',
      title: 'Valores Empresariales',
      text: 'Honestidad hacia nuestros clientes, puntualidad en nuestros servicios y respeto hacia clientes y proveedores nos permiten trabajar de mejor manera día a día, construyendo relaciones sólidas y duraderas.',
      icon: <FaHandshake className="w-8 h-8" />,
      images: [
        '/src/Image/sobrenosotros/nosotro.png',
        '/src/Image/sobrenosotros/sobre.png',
        '/src/Image/sobrenosotros/Manta.jpeg'
      ]
    }
  ]

  // Manejar cuando el texto se completa
  const handleTextComplete = () => {
    console.log('Texto completado')
    setIsTextComplete(true)
  }

  // Cambiar a la siguiente sección después de 5 segundos
  useEffect(() => {
    if (isTextComplete) {
      console.log('Iniciando timer de 5 segundos')
      const timer = window.setTimeout(() => {
        console.log('Cambiando a siguiente sección')
        setCurrentSection((prev) => (prev + 1) % sections.length)
        setIsTextComplete(false)
        setCurrentImageIndex(0)
      }, 5000)

      return () => window.clearTimeout(timer)
    }
  }, [isTextComplete, sections.length])

  // Cambiar imágenes durante la escritura del texto
  useEffect(() => {
    console.log('Nueva sección:', currentSection)
    setCurrentImageIndex(0)
    setIsTextComplete(false)

    // Solo cambiar imágenes si no está el texto completo
    const imageTimer1 = window.setTimeout(() => {
      console.log('Cambiando a imagen 1')
      setCurrentImageIndex(1)
    }, 3000) // Cambiar después de 3 segundos

    const imageTimer2 = window.setTimeout(() => {
      console.log('Cambiando a imagen 2')
      setCurrentImageIndex(2)
    }, 6000) // Cambiar después de 6 segundos

    return () => {
      window.clearTimeout(imageTimer1)
      window.clearTimeout(imageTimer2)
    }
  }, [currentSection])

  // Función para cambiar sección manualmente
  const handleSectionChange = (index: number) => {
    console.log('Cambio manual a sección:', index)
    setCurrentSection(index)
    setIsTextComplete(false)
    setCurrentImageIndex(0)
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-gray-50 to-cyan-50 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-200 to-transparent rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-orange-200 to-transparent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-cyan-100 to-transparent rounded-full animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Título de la sección */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold font-['Poppins'] mb-4">
            <span className="bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-300 bg-clip-text text-transparent">
              Misión, Visión y Valores
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-orange-400 mx-auto rounded-full animate-scale-in"></div>
        </div>
        {/* Navegación de secciones */}
        <div className="flex justify-center mb-12 animate-fade-in-up">
          <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => handleSectionChange(index)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-full transition-all duration-300 font-['Poppins'] font-semibold text-sm sm:text-base ${
                  currentSection === index
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-cyan-50 hover:text-cyan-600'
                }`}
              >
                <span className={`transition-colors duration-300 ${
                  currentSection === index ? 'text-white' : 'text-cyan-500'
                }`}>
                  {section.icon}
                </span>
                <span className="hidden sm:inline">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenido principal - Dos columnas */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Columna izquierda - Texto */}
            <div className="space-y-8 animate-fade-in-left">
              <div className="bg-gradient-to-br from-white via-gray-50 to-cyan-50/30 rounded-3xl p-8 shadow-2xl border border-white/50 backdrop-blur-sm">
                {/* Título con icono */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <span className="text-white transform -rotate-3">
                      {sections[currentSection].icon}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-gray-800 responsive-text-4xl">
                    {sections[currentSection].title}
                  </h3>
                </div>

                {/* Texto con efecto typewriter */}
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium responsive-text-lg">
                  <Typewriter 
                    key={currentSection}
                    text={sections[currentSection].text}
                    speed={30}
                    delay={500}
                    onComplete={handleTextComplete}
                  />
                </div>

                {/* Valores específicos si es la sección de valores */}
                {currentSection === 2 && (
                  <div className="mt-8 space-y-4 animate-fade-in-up-delayed">
                    <div className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-cyan-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaHandshake className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 font-['Poppins']">Honestidad</h4>
                        <p className="text-sm text-gray-600">Transparencia y credibilidad en todas nuestras acciones.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-cyan-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaHeadset className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 font-['Poppins']">Puntualidad</h4>
                        <p className="text-sm text-gray-600">Respetamos el tiempo de nuestros clientes.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm border border-cyan-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaLock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 font-['Poppins']">Respeto</h4>
                        <p className="text-sm text-gray-600">Base fundamental de nuestras relaciones comerciales.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha - Imagen */}
            <div className="animate-fade-in-right">
              <div className="relative bg-gradient-to-br from-white via-gray-50 to-cyan-50/30 rounded-3xl p-4 shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden">
                {/* Carrusel de imágenes */}
                <div className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                  {sections[currentSection].images.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 transform ${
                        index === currentImageIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${sections[currentSection].title} - imagen ${index + 1}`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
                    </div>
                  ))}
                  
                  {/* Indicadores de imagen */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {sections[currentSection].images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-white shadow-lg'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Elemento decorativo */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de progreso */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === currentSection
                    ? 'w-12 bg-gradient-to-r from-cyan-500 to-orange-400'
                    : 'w-4 bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Indicador de estado del texto */}
          <div className="ml-4 flex items-center">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isTextComplete 
                ? 'bg-green-500 animate-pulse' 
                : 'bg-yellow-500'
            }`}></div>
            <span className="ml-2 text-xs text-gray-500 font-['Poppins']">
              {isTextComplete ? 'Completo (5s restantes)' : 'Escribiendo...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}