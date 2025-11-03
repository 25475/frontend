import React from 'react'
import PlanCard from '../PlanCard'

interface Plan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  category: 'HOGAR' | 'GAMER' | 'EMPRESARIAL'
  isPopular: boolean
}

interface PlansSectionProps {
  title: string
  plans: Plan[]
}

export default function PlansSection({ title, plans }: PlansSectionProps) {
  if (plans.length === 0) return null

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Planes para {title}
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {plans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  )
}