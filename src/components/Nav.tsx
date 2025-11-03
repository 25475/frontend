import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface NavProps {
  isWhiteBackground?: boolean
}

export default function Nav({ isWhiteBackground = true }: NavProps){
  // Use white text on dark backgrounds, black text on white backgrounds
  const textColor = isWhiteBackground ? 'text-black' : 'text-white'
  const hoverColor = isWhiteBackground ? 'hover:text-cyan-600' : 'hover:text-cyan-300'
  const location = useLocation()
  
  const [count, setCount] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 768 : true)

  useEffect(() => {
    const read = () => {
      try{
        const existing = JSON.parse(localStorage.getItem('cart')||'[]')
        const total = (existing || []).reduce((s:any, it:any) => s + (Number(it.quantity||1)), 0)
        setCount(total)
      }catch(e){ setCount(0) }
    }

    read()
    const onStorage = (e:StorageEvent) => { if (e.key === 'cart') read() }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Cerrar menú móvil cuando cambie la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Añadir clase al header para forzar fondo blanco en móviles mientras el menú está abierto
  useEffect(() => {
    const header = typeof document !== 'undefined' ? document.querySelector('header') : null
    if (!header) return

    const apply = () => {
      // Añadir la clase siempre cuando el menú móvil esté abierto.
      // La regla CSS que hace el header blanco está limitada a pantallas pequeñas
      // (ver `globals.css @media (max-width: 767px)`), por lo que no afectará escritorio.
      if (isMobileMenuOpen) {
        header.classList.add('mobile-menu-open')
      } else {
        header.classList.remove('mobile-menu-open')
      }
    }

    apply()
    // También escuchar resize para ajustar si el usuario rota el dispositivo
    const onResize = () => {
      apply()
      setIsSmallScreen(window.innerWidth < 768)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isMobileMenuOpen])

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileMenuOpen(false) // Cerrar menú móvil
    // Intentar hacer scroll al elemento con id 'contacto' en la página actual
    const target = typeof document !== 'undefined' ? document.getElementById('contacto') : null
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Si no existe en la página actual, navegar a /nosotros con hash
      window.location.href = '/nosotros#contacto'
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { to: "/", label: "INICIO", icon: "🏠" },
    { to: "/nosotros", label: "NOSOTROS", icon: "👥" },
    { to: "/planes", label: "PLANES", icon: "📋" },
    { to: "/novatec", label: "NOVATEK", icon: "🔧" },
    { to: "/vision", label: "VIZION", icon: "📹" },
  ]

  return (
    <>
  {/* Desktop Navigation */}
  {/* Forzar fondo blanco en escritorio independientemente del header transparente */}
  <nav className="hidden md:flex items-center space-x-10 md:bg-white md:bg-opacity-95 md:backdrop-blur-sm md:shadow-lg md:rounded-xl md:px-4 md:py-2 md:border md:border-gray-100">
        {navLinks.map((link) => (
          <Link 
            key={link.to}
            to={link.to} 
            className={`text-sm ${textColor} ${hoverColor} font-medium transition-colors duration-200`}
          >
            {link.label}
          </Link>
        ))}
        <a 
          href="#contacto" 
          onClick={handleContactClick} 
          className={`text-sm ${textColor} ${hoverColor} font-medium transition-colors duration-200`}
        >
          CONTACTO
        </a>
      </nav>

      {/* Mobile Hamburger Button - SIEMPRE BLANCO EN MÓVIL */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="relative p-3 rounded-xl transition-all duration-200 focus:outline-none group
            bg-white/90 shadow-lg hover:shadow-xl text-gray-800 hover:bg-white border border-gray-200"
          aria-label="Toggle mobile menu"
        >
          <div className="relative w-6 h-6">
            {isMobileMenuOpen ? (
              <svg 
                className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg 
                className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
          
          {/* Indicator dot cuando hay elementos en el carrito */}
          {count > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
              {count > 9 ? '9+' : count}
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 md:hidden" 
          style={{ 
            zIndex: 999999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ zIndex: 999997 }}
          />
          
          {/* Menu Panel - COMPLETAMENTE NUEVO CON ESTILOS INLINE */}
          <div 
            className={`transform transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ 
              position: 'fixed',
              top: '0px',
              right: '0px',
              height: '100vh',
              width: '320px',
              maxWidth: '85vw',
              backgroundColor: '#ffffff',
              background: '#ffffff',
              backgroundImage: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              filter: 'none',
              opacity: '1',
              zIndex: 999998,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              borderLeft: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            
            {/* Header del menú - estilo degradado azul */}
            <div 
              style={{
                background: 'linear-gradient(to right, #06b6d4, #2563eb)',
                padding: '24px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Menú</h2>
                  <p style={{ color: '#bfdbfe', fontSize: '14px', marginTop: '4px', margin: 0 }}>Navegación principal</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '24px 16px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`group relative px-6 py-4 mb-2 text-base font-medium
                      rounded-xl transition-all duration-200 flex items-center space-x-4
                      hover:shadow-sm hover:scale-[1.01] ${
                      location.pathname === link.to 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                        : 'text-gray-800 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {link.icon}
                  </span>
                  <span className="flex-1 font-semibold">{link.label}</span>
                  {location.pathname === link.to && (
                    <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  )}
                </Link>
              ))}
              <a
                href="#contacto"
                onClick={handleContactClick}
                className="group relative px-6 py-4 mb-2 text-base font-medium text-gray-800
                  rounded-xl transition-all duration-200 flex items-center space-x-4
                  hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm hover:scale-[1.01]"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">📞</span>
                <span className="flex-1 font-semibold">CONTACTO</span>
              </a>
            </nav>

            {/* Footer */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #f3f4f6'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500', marginBottom: '8px', margin: 0 }}>
                  🚀 Tecnología avanzada
                </p>
                <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                  © 2025 Systray - Servicios de Internet
                </p>
                <div className="flex justify-center space-x-4 mt-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
