import React, { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import ProductDetailModal from '../../components/ProductDetailModal'

export default function ProductGrid({products}:{products:any[]}){
  const [selected, setSelected] = useState<any>(null)

  return (
    <>
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-1">
        {products.map(p=> (
          <ProductCard 
            key={p.id} 
            title={p.name} 
            color="#ff7a00" 
            description={p.description||''} 
            price={p.price ? String(p.price) : undefined} 
            image={p.imageUrl} 
            slug={p.slug}
            id={p.id}
            onDetails={() => setSelected(p)}
          />
        ))}
      </div>

      <ProductDetailModal open={!!selected} product={selected} onClose={() => setSelected(null)} />
    </>
  )
}
