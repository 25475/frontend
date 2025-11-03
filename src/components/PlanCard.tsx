import React from 'react'
import { getApiBaseUrl } from '../utils/api'
import gamerProImg from '../Image/planes/Gamer pro.jpg'
import gamerImg from '../Image/planes/gamers.png'
import familiarProImg from '../Image/planes/familiar pro.jpg'
import familiarImg from '../Image/planes/familiarr.jpg'
import estudianteProImg from '../Image/planes/estudiantes proo.webp'
import estudianteImg from '../Image/planes/Estudiantes .jpg'
import coolProImg from '../Image/planes/Cool pro.png'
import coolImg from '../Image/planes/cool.png'

type Plan = {
  id?: string
  name: string
  imageUrl?: string
  description?: string
  price: number
  features: string[]
  speed?: string
  isPopular?: boolean
}

const accentMap: Record<string, { bg: string; btn: string }> = {
  'Plan Estudiantil': { bg: 'bg-blue-500', btn: 'bg-blue-500 hover:bg-blue-600' },
  'Plan Familiar': { bg: 'bg-cyan-400', btn: 'bg-cyan-500 hover:bg-cyan-600' },
  'Plan Cool': { bg: 'bg-violet-500', btn: 'bg-violet-500 hover:bg-violet-600' },
  'Plan Gamer': { bg: 'bg-rose-500', btn: 'bg-rose-500 hover:bg-rose-600' }
}

export default function PlanCard({ plan }: { plan: Plan }) {
  const accent = accentMap[plan.name] || { bg: 'bg-cyan-400', btn: 'bg-cyan-500 hover:bg-cyan-600' }
  
  // Detectar si es el plan Gamer Pro específicamente
  const isGamerPro = plan.name.toLowerCase().includes('gamer pro') || plan.name.toLowerCase().includes('gamer') && plan.name.toLowerCase().includes('pro')
  
  // Detectar si es un plan Gamer normal (no Pro)
  const isGamer = (plan.name.toLowerCase().includes('gamer') && !isGamerPro) || plan.name.toLowerCase() === 'plan gamer'
  
  // Detectar si es un plan Familiar Pro
  const isFamiliarPro = plan.name.toLowerCase().includes('familiar pro') || plan.name.toLowerCase().includes('family pro') || (plan.name.toLowerCase().includes('familiar') && plan.name.toLowerCase().includes('pro'))
  
  // Detectar si es un plan Familiar normal (no Pro)
  const isFamiliar = (plan.name.toLowerCase().includes('familiar') && !isFamiliarPro) || (plan.name.toLowerCase().includes('family') && !isFamiliarPro) || plan.name.toLowerCase() === 'plan familiar'
  
  // Detectar si es un plan Estudiante Pro
  const isEstudianteProPlan = plan.name.toLowerCase().includes('estudiante pro') || plan.name.toLowerCase().includes('estudiantil pro') || (plan.name.toLowerCase().includes('estudiante') && plan.name.toLowerCase().includes('pro'))

  // Detectar si es un plan Estudiante normal (no Pro)
  const isEstudiante = (plan.name.toLowerCase().includes('estudiante') && !isEstudianteProPlan) || (plan.name.toLowerCase().includes('estudiantil') && !isEstudianteProPlan) || plan.name.toLowerCase() === 'plan estudiantil'

  // Detectar si es un plan Cool Pro
  const isCoolPro = plan.name.toLowerCase().includes('cool pro') || (plan.name.toLowerCase().includes('cool') && plan.name.toLowerCase().includes('pro'))

  // Detectar si es un plan Cool normal (no Pro)
  const isCool = (plan.name.toLowerCase().includes('cool') && !isCoolPro) || plan.name.toLowerCase() === 'plan cool'

  // Si es Gamer Pro, usar un diseño especial con imagen
  if (isGamerPro) {
      // elegir imagen: si el plan trae imageUrl (subida por admin) usarla, si no usar la estática
      const raw = (plan as any).imageUrl || gamerProImg
      const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-rose-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-rose-600 text-xs font-bold px-3 sm:px-4 py-2 rounded-full shadow-lg border-2 border-rose-500">
              <span className="hidden sm:inline">⚡ PLAN PREMIUM</span>
              <span className="sm:hidden">⚡ PREMIUM</span>
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container relative">
          <img 
            src={headerImg} 
            alt="Gamer Pro Plan" 
            className="plan-image"
          />

          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              <h3 className="text-white font-bold text-lg leading-tight">{plan.name}</h3>
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">{plan.speed}</p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-rose-100 text-sm">{plan.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-xs sm:text-sm text-rose-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo gaming */}
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 sm:gap-3">
                <span className="mt-1 text-rose-500 font-bold">⚡</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-rose-600 hover:to-purple-700 transition-all duration-200 shadow-lg text-xs sm:text-sm">
            <span className="hidden sm:inline">🎮 ACTIVAR PODER GAMER</span>
            <span className="sm:hidden">🎮 ACTIVAR</span>
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-rose-500 to-purple-600"></div>
      </div>
    )
  }

  // Si es Cool Pro, usar un diseño especial con imagen
  if (isCoolPro) {
  const raw = (plan as any).imageUrl || coolProImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-green-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-green-600 text-xs font-bold px-3 sm:px-4 py-2 rounded-full shadow-lg border-2 border-green-500">
              <span className="hidden sm:inline">🎯 PLAN COOL PRO</span>
              <span className="sm:hidden">🎯 COOL PRO</span>
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container relative">
          <img 
            src={headerImg} 
            alt="Cool Pro Plan" 
            className="plan-image"
          />

          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              <h3 className="text-white font-bold text-lg leading-tight">{plan.name}</h3>
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">{plan.speed}</p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-green-100 text-sm">{plan.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-xs sm:text-sm text-green-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo cool */}
          <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 sm:gap-3">
                <span className="mt-1 text-green-500 font-bold">🎯</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold py-2.5 sm:py-3 rounded-lg hover:from-green-600 hover:to-cyan-700 transition-all duration-200 shadow-lg text-xs sm:text-sm">
            <span className="hidden sm:inline">🎯 ACTIVAR PLAN COOL PRO</span>
            <span className="sm:hidden">🎯 ACTIVAR</span>
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-green-500 to-cyan-600"></div>
      </div>
    )
  }

  // Si es Cool normal, usar un diseño especial con imagen
  if (isCool) {
  const raw = (plan as any).imageUrl || coolImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-cyan-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-cyan-600 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-cyan-500">
              😎 PLAN COOL
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container relative">
          <img 
            src={headerImg} 
            alt="Cool Plan" 
            className="plan-image"
          />

          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              <h3 className="text-white font-bold text-lg leading-tight">{plan.name}</h3>
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">{plan.speed}</p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-cyan-100 text-sm">{plan.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-sm text-cyan-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo cool */}
          <ul className="space-y-3 text-sm text-gray-600 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-cyan-500 font-bold">😎</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
            😎 ACTIVAR PLAN COOL
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      </div>
    )
  }

  // Si es Gamer normal, usar un diseño especial con imagen
  if (isGamer) {
  const raw = (plan as any).imageUrl || gamerImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-cyan-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-cyan-600 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-cyan-500">
              🎮 PLAN GAMER
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container relative">
          <img 
            src={headerImg} 
            alt="Gamer Plan" 
            className="plan-image"
          />

          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              <h3 className="text-white font-bold text-lg leading-tight">{plan.name}</h3>
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">{plan.speed}</p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-cyan-100 text-sm">{plan.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-sm text-cyan-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo gaming */}
          <ul className="space-y-3 text-sm text-gray-600 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-cyan-500 font-bold">🎮</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
            🎮 ACTIVAR PLAN GAMER
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      </div>
    )
  }

  // Si es Familiar Pro, usar un diseño especial con imagen
  if (isFamiliarPro) {
  const raw = (plan as any).imageUrl || familiarProImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-green-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-green-600 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-green-500">
              �‍👩‍👧‍👦 PLAN FAMILIAR PRO
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container relative">
          <img 
            src={headerImg} 
            alt="Familiar Pro Plan" 
            className="plan-image"
          />

          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              <h3 className="text-white font-bold text-lg leading-tight">{plan.name}</h3>
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">{plan.speed}</p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-green-100 text-sm">{plan.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-sm text-green-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo familiar */}
          <ul className="space-y-3 text-sm text-gray-600 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-green-500 font-bold">🏠</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-cyan-700 transition-all duration-200 shadow-lg">
            👨‍👩‍👧‍👦 ACTIVAR PLAN FAMILIAR PRO
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-green-500 to-cyan-600"></div>
      </div>
    )
  }

  // Si es Familiar normal, usar un diseño especial con imagen
  if (isFamiliar) {
  const raw = (plan as any).imageUrl || familiarImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-cyan-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-cyan-600 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-cyan-500">
              👨‍👩‍👧‍👦 PLAN FAMILIAR
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container">
          <img 
            src={headerImg} 
            alt="Familiar Plan" 
            className="plan-image"
          />
          
          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              {/* Nombre del plan */}
              <h3 className="text-white font-bold text-lg leading-tight">
                {plan.name}
              </h3>
              {/* Velocidad */}
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">
                  {plan.speed}
                </p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-cyan-100 text-sm">
                  {plan.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-sm text-cyan-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo familiar */}
          <ul className="space-y-3 text-sm text-gray-600 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-cyan-500 font-bold">🏠</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
            👨‍👩‍👧‍👦 ACTIVAR PLAN FAMILIAR
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      </div>
    )
  }

  // Si es Estudiante Pro, usar un diseño especial con imagen (mismo color que Familiar Pro)
  if (isEstudianteProPlan) {
  const raw = (plan as any).imageUrl || estudianteProImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-green-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-green-600 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-green-500">
              � PLAN ESTUDIANTE PRO
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container">
          <img 
            src={headerImg} 
            alt="Estudiante Pro Plan" 
            className="plan-image"
          />
          
          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              {/* Nombre del plan */}
              <h3 className="text-white font-bold text-lg leading-tight">
                {plan.name}
              </h3>
              {/* Velocidad */}
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">
                  {plan.speed}
                </p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-green-100 text-sm">
                  {plan.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-sm text-green-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo estudiantil */}
          <ul className="space-y-3 text-sm text-gray-600 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-green-500 font-bold">🎓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white font-bold py-3 rounded-lg hover:from-green-600 hover:to-cyan-700 transition-all duration-200 shadow-lg">
            🎓 ACTIVAR PLAN ESTUDIANTIL PRO
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-green-500 to-cyan-600"></div>
      </div>
    )
  }

  // Si es Estudiante normal, usar un diseño especial con imagen
  if (isEstudiante) {
  const raw = (plan as any).imageUrl || estudianteImg
  const headerImg = typeof raw === 'string' && raw.startsWith('http') ? raw.replace(/^https?:\/\/[^/]+/, getApiBaseUrl()) : raw
    return (
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-cyan-400' : ''}`}>
        {/* Popular badge */}
        {plan.isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-white text-cyan-600 text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-cyan-500">
              🎓 PLAN ESTUDIANTE
            </div>
          </div>
        )}

        {/* Header con imagen de fondo */}
        <div className="plan-image-container">
          <img 
            src={headerImg} 
            alt="Estudiante Plan" 
            className="plan-image"
          />
          
          {/* Contenedor glassmorphism pegado al borde inferior */}
          <div className="absolute bottom-4 left-4">
            <div className="backdrop-blur-lg bg-black/40 rounded-lg px-4 py-2 border border-white/20">
              {/* Nombre del plan */}
              <h3 className="text-white font-bold text-lg leading-tight">
                {plan.name}
              </h3>
              {/* Velocidad */}
              {plan.speed && (
                <p className="text-green-300 text-sm font-medium">
                  {plan.speed}
                </p>
              )}
              {plan.description && !plan.speed && (
                <p className="text-cyan-100 text-sm">
                  {plan.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-extrabold text-gray-900">${plan.price}</div>
            {plan.speed && <div className="text-sm text-cyan-500 font-semibold">{plan.speed}</div>}
          </div>

          {/* Features list con estilo estudiantil */}
          <ul className="space-y-3 text-sm text-gray-600 mb-6">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 text-cyan-500 font-bold">📚</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg">
            📚 ACTIVAR PLAN ESTUDIANTIL
          </button>
        </div>
        
        {/* Barra de color inferior */}
        <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
      </div>
    )
  }

  // Diseño estándar para otros planes
  return (
    <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 transform transition hover:scale-105 relative ${plan.isPopular ? 'ring-2 ring-cyan-300' : ''}`}>
      {/* Popular badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            <span className="hidden sm:inline">Más Popular</span>
            <span className="sm:hidden">Popular</span>
          </div>
        </div>
      )}

      {/* Top icon */}
      <div className="flex flex-col items-center text-center">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white mb-3 sm:mb-4 ${accent.bg}`}>
          {/* placeholder icon */}
          <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2l2 4 4 .5-3 2 1 4-3-2-3 2 1-4-3-2 4-.5L12 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-gray-800">{plan.name}</h3>
        {plan.description && <p className="text-xs sm:text-sm text-gray-500">{plan.description}</p>}

        <div className="mt-3 sm:mt-4 text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900">${plan.price}</div>
          {plan.speed && <div className="text-xs sm:text-sm text-cyan-500">{plan.speed}</div>}
        </div>
      </div>

      {/* Features list */}
      <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 sm:gap-3">
            <span className="mt-1 text-cyan-500">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 sm:mt-6">
        <button className={`w-full text-white font-semibold py-2 rounded-lg text-sm ${accent.btn}`}>
          <span className="hidden sm:inline">Contratar Plan</span>
          <span className="sm:hidden">Contratar</span>
        </button>
      </div>
    </div>
  )
}
