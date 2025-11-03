import React from 'react'

function ProductCard({title, color, children}:{title:string,color:string,children:React.ReactNode}){
  return (
    <div className="p-6 border rounded-md">
      <div className={`w-12 h-12 rounded-md mb-4`} style={{backgroundColor: color}}></div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-gray-700">{children}</div>
    </div>
  )
}

export default function Products(){
  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <ProductCard title="Vision" color="#ff7a00">Productos Vision: cámaras, NVRs, accesorios.</ProductCard>
        <ProductCard title="Novatec" color="#0077cc">Productos Novatec: routers, switches, accesorios.</ProductCard>
        <ProductCard title="Equipamiento ISP" color="#06b6d4">Equipos y servicios para instalación de redes.</ProductCard>
      </div>
    </section>
  )
}
