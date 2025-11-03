import React, { useEffect, useState } from 'react'
import { WifiIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { apiGet } from '../../utils/api'
import gamerImg from '../../Image/planes/gamers.png'
import familiarImg from '../../Image/planes/familiarr.jpg'
import estudianteImg from '../../Image/planes/Estudiantes .jpg'
import coolImg from '../../Image/planes/cool.png'

function PlanCard({name, price, description, features, isPopular}:{name:string, price:number, description:string, features:string[], isPopular?:boolean}){
  // Determinar qué imagen usar basándose en el nombre del plan
  const getImageForPlan = (planName: string) => {
    const nameLower = planName.toLowerCase()
    if (nameLower.includes('gamer')) return gamerImg
    if (nameLower.includes('family') || nameLower.includes('familiar')) return familiarImg
    if (nameLower.includes('estudiant')) return estudianteImg
    if (nameLower.includes('cool')) return coolImg
    return null // Fallback para otros planes
  }

  // Determinar colores basándose en el nombre del plan
  const getPlanColors = (planName: string) => {
    const nameLower = planName.toLowerCase()
    if (nameLower.includes('gamer pro')) {
      return {
        ring: 'ring-rose-400',
        gradient: 'from-rose-500 to-purple-600'
      }
    }
    if (nameLower.includes('familiar pro') || nameLower.includes('family pro')) {
      return {
        ring: 'ring-green-400', 
        gradient: 'from-green-500 to-cyan-600'
      }
    }
    // Colores por defecto
    return {
      ring: 'ring-cyan-500',
      gradient: 'from-cyan-500 to-blue-600'
    }
  }

  const planImage = getImageForPlan(name)
  const colors = getPlanColors(name)

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 ${isPopular ? `ring-2 ${colors.ring}` : ''}`}>
      {/* Imagen del plan */}
      {planImage && (
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <img 
            src={planImage} 
            alt={`${name} Plan`} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent`}></div>
          
          {/* Overlay con gradiente de color del plan */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-20 mix-blend-multiply`}></div>
        </div>
      )}
      
      {/* Header con badge */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 pt-6 pb-4 relative">
        {isPopular && (
          <div className="absolute top-0 right-0">
            <div className="bg-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              ¡PLAN DESTACADO!
            </div>
          </div>
        )}
        
        {/* Icono y título del plan */}
        <div className="flex items-center gap-2 mb-3">
          <WifiIcon className="w-6 h-6 text-cyan-600" />
          <span className="text-lg font-semibold text-gray-800">{name}</span>
        </div>
        
        {/* Velocidad principal */}
        <div className="mb-2">
          <p className="text-gray-600 text-sm">Internet Fibra Óptica</p>
          <p className="text-4xl font-bold text-gray-800">{description}</p>
        </div>
        
        {/* Precio */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">Precio regular</p>
          <p className={`text-5xl font-bold ${colors.ring === 'ring-green-400' ? 'text-green-600' : colors.ring === 'ring-rose-400' ? 'text-rose-600' : 'text-cyan-600'}`}>${price}</p>
        </div>
        
        {/* Velocidad adicional */}
        {features.length > 0 && (
          <div>
            <p className="text-cyan-600 font-bold text-sm">{features[0]}</p>
            {features.length > 1 && (
              <p className="text-gray-700 text-sm">{features[1]}</p>
            )}
          </div>
        )}
      </div>

      {/* Beneficios */}
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Beneficios adicionales:</p>
        <p className="text-sm font-semibold text-gray-800">Systray<span className="text-cyan-500">club</span></p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6">
        <p className="text-xs text-gray-500 mb-4">
          Costo de Instalación: <span className="font-semibold">$0</span> (previa evaluación)
        </p>
        
        <Link to="/planes" className={`${colors.ring === 'ring-green-400' ? 'text-green-500 hover:text-green-600' : colors.ring === 'ring-rose-400' ? 'text-rose-500 hover:text-rose-600' : 'text-cyan-500 hover:text-cyan-600'} text-sm font-medium flex items-center gap-1 mb-4`}>
          Ver detalle de plan
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
        <button className={`w-full bg-white border-2 font-semibold py-3 rounded-full transition-colors duration-200 ${
          colors.ring === 'ring-green-400' 
            ? 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white' 
            : colors.ring === 'ring-rose-400'
            ? 'border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white'
            : 'border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white'
        }`}>
          Contratar
        </button>
      </div>
    </div>
  )
}

export default function Plans(){
  const [plans, setPlans] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet('/api/plans')
      .then(data => {
        setPlans(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al cargar planes:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="plans" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Cargando planes...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="plans" className="py-16 bg-white relative overflow-hidden">
      {/* Patrón de fondo con iconos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-40">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-20">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-2xl font-semibold mb-6 text-center">Nuestros Planes</h3>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {(() => {
            // Mostrar un plan por cada grupo solicitado en Home:
            // - 1 Estudiantil (el más barato)
            // - 1 Familiar Pro (el más barato) 
            // - 1 Cool (el más barato)
            // - 1 Gamer Pro (el más barato)
            const byName = (needle: string) =>
              plans.filter((p: any) => p.name && p.name.toLowerCase().includes(needle))

            const cheapest = (arr: any[]) => {
              if (!arr || arr.length === 0) return null
              return arr.reduce((a, b) => (a.price <= b.price ? a : b))
            }

            const estudiantil = cheapest(byName('estudiant'))
            const familyPro = cheapest(byName('family pro')) || cheapest(byName('familiar pro'))
            const cool = cheapest(byName('cool'))
            const gamerPro = cheapest(byName('gamer pro'))

            // Mostrar los 4 planes en el orden: Estudiante, Familiar Pro, Cool, Gamer Pro
            const displayPlans = [estudiantil, familyPro, cool, gamerPro].filter(Boolean)
            return displayPlans.map((p: any) => <PlanCard key={p.id} {...p} />)
          })()}
        </div>
      </div>
    </section>
  )
}