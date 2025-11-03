import React, { useEffect, useState } from 'react'
import CategoryList from '../components/vizion/CategoryList'
import ProductGrid from '../components/vizion/ProductGrid'
import Hero from '../components/vizion/Hero'
import Features from '../components/vizion/Features'
import CTA from '../components/vizion/CTA'
import { apiGet } from '../utils/api'
import '../styles/vision.css'

export default function Vision(){
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar categorías y productos de Vision desde la API
    Promise.all([
      apiGet('/api/categories?type=VISION'),
      apiGet('/api/products?type=VISION')
    ]).then(([cats, prods]) => {
      setCategories(cats)
      setProducts(prods)
      if (cats.length > 0) {
        // Buscar 'Cámaras IP' como categoría preferida con múltiples variaciones
        const preferred = cats.find((c: any) => {
          const name = (c.name || '').toLowerCase().trim();
          return (
            name.includes('cámara') && name.includes('ip') ||
            name.includes('camara') && name.includes('ip') ||
            name === 'cámaras ip' ||
            name === 'camaras ip' ||
            name === 'cámara ip' ||
            name === 'camara ip' ||
            name.includes('cámara') ||
            name.includes('camara')
          );
        })
        
        if (preferred) {
          setSelectedCategory(preferred.id)
          console.log('Categoría preferida seleccionada:', preferred.name)
        } else {
          setSelectedCategory(cats[0].id)
          console.log('Categoría por defecto seleccionada:', cats[0].name)
        }
      }
      setLoading(false)
    }).catch(error => {
      console.error('Error al cargar datos:', error)
      setLoading(false)
    })
  }, [])

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.categoryId === selectedCategory)
    : products

  if (loading) {
    return (
      <section className="py-12 bg-[#D3D4D6]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </section>
    )
  }

  return (
    <>
    <section className="vision-section pt-0 pb-0 bg-white relative overflow-hidden">
      {/* Patrón de fondo con iconos - ahora solo para las secciones inferiores */}
      <div className="absolute inset-0 opacity-20" style={{ top: '600px' }}>
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-40">
          <svg className="w-20 h-20 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4">
          <svg className="w-14 h-14 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-20">
          <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l-5.5 9h11z"/>
          </svg>
        </div>
      </div>
      
      {/* Apply vision theme only to this container */}
      <div className="vision-theme">
        <Hero />
        
        {/* Contenido debajo del hero con padding */}
        <div className="container mx-auto px-4 relative z-10 py-12">
          {/* Features row placed after the hero */}
          <Features />
          {/* Categorías en la parte superior (estilo pestañas) */}
          <CategoryList
          categories={categories.map(c => c.name)}
          selected={categories.find(c => c.id === selectedCategory)?.name || ''}
          onSelect={(name) => {
            const cat = categories.find(c => c.name === name)
            if (cat) setSelectedCategory(cat.id)
          }}
          horizontal={true}
          />

          {/* Grid de productos abajo */}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </section>
    {/* CTA section placed after the vision section to be full-bleed */}
    <CTA />
    </>
  )
}
