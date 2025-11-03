import React from 'react'
import seguridadImg from '../../Image/seguridad.png'
import planesImg from '../../Image/planesinternet.png'
import domoticaImg from '../../Image/domotica.png'

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

function ServiceCard({ image, title, description, link }: ServiceCardProps) {
  return (
    <a 
      href={link}
      className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 block"
    >
      <div className="aspect-[4/3.5] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 group-hover:blur-sm"
        />
        {/* Overlay oscuro - se intensifica en hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/50 transition-all duration-300"></div>
      </div>
      
      {/* Contenido - se expande hacia arriba en hover */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-300 group-hover:pb-8">
        <h3 className="text-white text-xl font-bold mb-2 transition-all duration-300 group-hover:text-2xl">
          {title}
        </h3>
        
        {/* Descripción - aparece en hover */}
        <p className="text-white/90 text-sm mb-3 max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
          {description}
        </p>
        
        {/* Link "Conoce más" - solo aparece en hover */}
        <div className="flex items-center gap-2 text-white font-semibold max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-10 group-hover:opacity-100">
          <span className="text-sm">Conoce más</span>
          <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Services() {
  const services = [
    {
      image: seguridadImg,
      title: 'Seguridad Vision',
      description: 'Cámaras IP, DVR/NVR y sistemas de vigilancia',
      link: '/vision'
    },
    {
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
      title: 'Tecnología Novatec',
      description: 'Computadoras, componentes y periféricos',
      link: '/novatec'
    },
    {
      image: planesImg,
      title: 'Planes de Internet',
      description: 'Planes de fibra óptica con las mejores velocidades',
      link: '#planes'
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      title: 'Soporte Técnico',
      description: 'Asistencia 24/7 para todos nuestros servicios',
      link: '/sobre'
    },
    {
      image: domoticaImg,
      title: 'Domótica',
      description: 'Automatización inteligente para tu hogar o negocio',
      link: '/sobre'
    }
  ]

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Patrón de fondo con iconos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-40">
          <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6.5c0 .79-.71 1.44-1.5 1.44-.28 0-.55-.08-.79-.23L12 10.62 5.29 7.71c-.24.15-.51.23-.79.23-.79 0-1.5-.65-1.5-1.44 0-.79.71-1.44 1.5-1.44.28 0 .55.08.79.23L12 7.38l6.71-3.09c.24-.15.51-.23.79-.23.79 0 1.5.65 1.5 1.44zM12 12.5L5 9v7c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V9l-7 3.5z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        </div>
        <div className="absolute top-1/2 right-20">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 right-1/3">
          <svg className="w-18 h-18 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
          </svg>
        </div>
        <div className="absolute top-20 left-1/2">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
        <div className="absolute top-5 right-1/4">
          <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-10 left-10">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/3">
          <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-10">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-1/2">
          <svg className="w-13 h-13 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </div>
        <div className="absolute bottom-5 right-1/2">
          <svg className="w-11 h-11 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          ¿En qué podemos ayudarte?
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}