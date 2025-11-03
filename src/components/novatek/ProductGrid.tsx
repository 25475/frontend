import React from 'react'
import ProductCard from '../../components/ProductCard'

export default function ProductGrid({products}:{products:any[]}){
  return (
    <div id="novatek-products" className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-1">
      {products.map(p=> (
        <ProductCard 
          key={p.id} 
          title={p.name} 
          color="#cc6600ff" 
          description={p.description||''} 
          price={p.price ? String(p.price) : undefined} 
          image={p.imageUrl} 
          slug={p.slug}
          id={p.id}
        />
      ))}
    </div>
  )
}
