import React, { createContext, useContext, useState, ReactNode } from 'react'
import FlyingProduct from '../components/FlyingProduct'

interface FlyingProductContextType {
  triggerFlyAnimation: (
    startElement: HTMLElement, 
    productImage?: string, 
    productName?: string
  ) => void
}

const FlyingProductContext = createContext<FlyingProductContextType | undefined>(undefined)

export const useFlyingProduct = () => {
  const context = useContext(FlyingProductContext)
  if (!context) {
    throw new Error('useFlyingProduct must be used within FlyingProductProvider')
  }
  return context
}

interface FlyingProductProviderProps {
  children: ReactNode
}

export function FlyingProductProvider({ children }: FlyingProductProviderProps) {
  const [animations, setAnimations] = useState<Array<{
    id: string
    startPosition: { x: number; y: number }
    productImage?: string
    productName?: string
    isActive: boolean
  }>>([])

  const triggerFlyAnimation = (
    startElement: HTMLElement, 
    productImage?: string, 
    productName?: string
  ) => {
    const rect = startElement.getBoundingClientRect()
    const startPosition = {
      x: rect.left + rect.width / 2 - 32, // Centrar el elemento volador
      y: rect.top + rect.height / 2 - 32
    }

    const newAnimation = {
      id: Date.now().toString(),
      startPosition,
      productImage,
      productName,
      isActive: true
    }

    setAnimations(prev => [...prev, newAnimation])
  }

  const handleAnimationComplete = (id: string) => {
    setAnimations(prev => prev.filter(anim => anim.id !== id))
  }

  return (
    <FlyingProductContext.Provider value={{ triggerFlyAnimation }}>
      {children}
      
      {/* Renderizar todas las animaciones activas */}
      {animations.map(animation => (
        <FlyingProduct
          key={animation.id}
          isActive={animation.isActive}
          startPosition={animation.startPosition}
          productImage={animation.productImage}
          productName={animation.productName}
          onComplete={() => handleAnimationComplete(animation.id)}
        />
      ))}
    </FlyingProductContext.Provider>
  )
}