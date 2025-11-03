import React, { useEffect, useState } from 'react'
import Hero from '../components/novatek/Hero'
import CategoryList from '../components/novatek/CategoryList'
import CategoryTabs from '../components/novatek/CategoryTabs'
import ProductGrid from '../components/novatek/ProductGrid'
import Newsletter from '../sections/Newsletter'
import { apiGet } from '../utils/api'
import imgComponentes from '../Image/Novatek/componentes.webp'
import imgComputadoras from '../Image/Novatek/Computadoras.jpg'
import imgElectronico from '../Image/Novatek/energia.png'
import imgRouter from '../Image/Novatek/Router.webp'
import '../styles/novatek.css'

export default function Novatec(){
  const VISIBLE_CATEGORY_KEYS = ['componentes','redes','computadora','computadoras','energia','energía']
  const normalizeKey = (s:any) => String(s||'').toLowerCase().replace(/\s+/g,'').replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u')
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar categorías y productos de Novatec desde la API
    Promise.all([
      apiGet('/api/categories?type=NOVATEC'),
      apiGet('/api/products?type=NOVATEC')
    ]).then(([cats, prods]) => {
      setCategories(cats)
      setProducts(prods)
      // decide initial selected category preferring the visible list
      const visible = Array.isArray(cats) ? cats.filter((c:any)=> VISIBLE_CATEGORY_KEYS.includes(normalizeKey(c.name || c.id || ''))) : []
      if (visible.length > 0) {
        // prefer 'energia' if present among visible categories
        const energy = visible.find((c:any) => normalizeKey(c.name || c.id || '').includes('energia'))
        if (energy) {
          setSelectedCategory(energy.id)
        } else {
          setSelectedCategory(visible[0].id)
        }
      } else if (cats.length > 0) {
        setSelectedCategory(cats[0].id)
      }
      setLoading(false)
    }).catch(error => {
      console.error('Error al cargar datos:', error)
      setLoading(false)
    })
  }, [])

  // Use server products (fetched above) for display

  // restrict categories shown in this section to a curated subset
  let visibleCategories = categories.filter((c:any)=> VISIBLE_CATEGORY_KEYS.includes(normalizeKey(c.name || c.id || '')))
  // attach local images when available
    visibleCategories = visibleCategories.map((c:any)=>{
    const key = normalizeKey(c.name || c.id || '')
    let image: string|undefined
    if(key.includes('component')) image = imgComponentes
    else if(key.includes('comput')) image = imgComputadoras
    // redes should show router image as requested
    else if(key.includes('router') || key.includes('red')) image = imgRouter
    else image = imgElectronico
    return { ...c, image }
  })
  // featured products: prefer products with `featured` flag, otherwise first 3 from API
  const featuredProducts = (products.filter((p:any)=> p.featured) || []).slice(0,3)
  if(featuredProducts.length === 0){
    featuredProducts.push(...(products.slice(0,3) || []))
  }

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.categoryId === selectedCategory)
    : products

  // helper: choose a fallback image for a product based on its category/name
  const getFallbackImageForProduct = (p:any) => {
    const key = normalizeKey(p.category || p.name || '')
    if(key.includes('router') || key.includes('routern') || key.includes('router')) return imgRouter
    if(key.includes('switch')) return imgComponentes
    if(key.includes('comput')) return imgComputadoras
    // default
    return imgElectronico
  }

  // ensure displayed products have an `imageUrl` (prefer server `imageUrl` or `image`, otherwise fallback)
  const displayFeatured = featuredProducts.map((p:any)=> ({ ...p, imageUrl: p.imageUrl || p.image || getFallbackImageForProduct(p) }))
  const displayProducts = filteredProducts.map((p:any)=> ({ ...p, imageUrl: p.imageUrl || p.image || getFallbackImageForProduct(p) }))

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </section>
    )
  }

  return (
  <section className="py-0 bg-white relative overflow-hidden">
      {/* Patrón de fondo con iconos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-40">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
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
        {/* Apply novatek theme to this container */}
        <div className="novatek-theme">
          <Hero />
          
          <div className="flex flex-col gap-8">
            <CategoryList
              categories={visibleCategories}
              selected={selectedCategory}
              onSelect={(id:string) => setSelectedCategory(id)}
            />

            <CategoryTabs 
              categories={visibleCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Productos destacados eliminado — sección removida por petición del usuario */}

            {/* Mostrar nuestros productos */}
            <ProductGrid products={displayProducts} />

            {/* Newsletter moved below 'Nuestros productos' per request */}
            <Newsletter />
          </div>
        </div>
      </div>
    </section>
  )
}
