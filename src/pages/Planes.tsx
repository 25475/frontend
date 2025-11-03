import React, { useEffect, useState } from 'react'
import Hero from '../components/planes/Hero'
import CategoryTabs from '../components/planes/CategoryTabs'
import PlansSection from '../components/planes/PlansSection'
import CTA from '../components/planes/CTA'
import { apiGet } from '../utils/api'

interface Plan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  category: 'HOGAR' | 'GAMER' | 'EMPRESARIAL'
  isPopular: boolean
}

export default function Planes() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('HOGAR')

  useEffect(() => {
    apiGet('/api/plans')
      .then(data => {
        setPlans(data)
        // debug: mostrar en consola los planes recibidos
        console.debug('Planes API:', data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error al cargar planes:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D3D4D6] py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Cargando planes...</p>
        </div>
      </div>
    )
  }

  const hogarPlans = plans.filter(p => (p.category || '').toString().toUpperCase() === 'HOGAR')
  const gamerPlans = plans.filter(p => (p.category || '').toString().toUpperCase() === 'GAMER')
  const empresarialPlans = plans.filter(p => (p.category || '').toString().toUpperCase() === 'EMPRESARIAL')

  return (
    <section className="py-0 bg-white relative overflow-hidden">
      {/* Patrón de fondo con iconos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-40">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-20">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
      
      <div className="relative z-10">
        <Hero />

        <div className="flex flex-col gap-8">
          <CategoryTabs 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="container mx-auto px-4">
            {/* Mostrar planes según categoría seleccionada */}
            {selectedCategory === 'HOGAR' && <PlansSection title="Hogar" plans={hogarPlans} />}
            {selectedCategory === 'GAMER' && <PlansSection title="Gamers" plans={gamerPlans} />}
            {selectedCategory === 'EMPRESARIAL' && <PlansSection title="Empresas" plans={empresarialPlans} />}
          </div>
        </div>
      </div>

      <CTA />
    </section>
  )
}
