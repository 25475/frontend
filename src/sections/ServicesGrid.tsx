import React from 'react'

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  link?: string;
}

function ServiceCard({ icon, title, description, linkText, link = '#planes' }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col items-center text-center group hover:-translate-y-1 border border-gray-100">
      <h3 className="text-base font-bold mb-3 text-gray-800">{title}</h3>
      
      <div className="w-16 h-16 mb-3 flex items-center justify-center">
        {icon}
      </div>
      
      <p className="text-xs text-gray-600 mb-3 leading-relaxed flex-grow">
        {description}
      </p>
      
      <a 
        href={link}
        className="text-cyan-500 text-xs font-semibold hover:text-cyan-600 flex items-center gap-1 group-hover:gap-2 transition-all"
      >
        {linkText}
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  )
}

const services = [
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Arma tu plan',
    description: 'Contrata tu plan de internet en combo con descuento en el primer mes',
    linkText: 'Saber más'
  },
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: 'Internet para tu casa',
    description: 'Elige planes con hasta 1000 Mbps de velocidad',
    linkText: 'Saber más'
  },
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Internet fijo inalámbrico',
    description: 'Contrata hoy el internet fijo inalámbrico 5G y disfrútalo en tu casa',
    linkText: 'Conoce más'
  },
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Fibra Óptica',
    description: 'Hacemos lo imposible para que tu conexión no se detenga',
    linkText: 'Saber más'
  },
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Seguridad Vision',
    description: 'Sistemas de cámaras y vigilancia para proteger tu negocio',
    linkText: 'Ver productos',
    link: '/vision'
  },
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Tecnología Novatec',
    description: 'Equipos y soluciones tecnológicas para empresas y hogares',
    linkText: 'Ver productos',
    link: '/novatec'
  },
  {
    icon: (
      <svg className="w-14 h-14 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Soporte Técnico',
    description: 'Asistencia técnica 24/7 para todos nuestros servicios',
    linkText: 'Contactar',
    link: '/sobre'
  }
]

export default function ServicesGrid(){
  return (
    <section className="py-16 bg-[#D3D4D6] relative overflow-hidden">
      {/* Patrón de fondo con iconos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-40">
          <svg className="w-18 h-18 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/4">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l-5.5 9h11z M17.5 13c-1.84 0-3.5.5-5.5 1.5-2-.99-3.66-1.5-5.5-1.5-2.33 0-4.67 1.17-6.5 3.5C1.83 18.83 4.17 22 6.5 22c1.84 0 3.5-.5 5.5-1.5 2 .99 3.66 1.5 5.5 1.5 2.33 0 4.67-1.17 6.5-3.5-1.83-2.33-4.17-5.5-6.5-5.5z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-1/3">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            ¿Qué estás buscando?
          </h2>
          <p className="text-gray-600 text-sm">
            Descubre todos nuestros servicios y soluciones
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

