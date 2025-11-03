import React from 'react'

export default function CTA(){
  const phone = '593996816956'
  const quoteMsg = encodeURIComponent('Hola, quisiera solicitar una cotización para soluciones de seguridad.');
  const callMsg = encodeURIComponent('Hola, necesito atención telefónica. ¿Pueden llamarme por favor?');

  return (
    <section className="vision-cta mt-12">
      <div className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">¿Listo para proteger tu espacio?</h3>
        <p className="text-white/80 mb-8">Obtén una cotización personalizada y instalación profesional</p>

        <div className="flex justify-center gap-4">
          <a href={`https://wa.me/${phone}?text=${quoteMsg}`} target="_blank" rel="noopener noreferrer" className="cta-btn-primary">Solicitar Cotización</a>
          <a href={`https://wa.me/${phone}?text=${callMsg}`} target="_blank" rel="noopener noreferrer" className="cta-btn-outline">Llamar Ahora</a>
        </div>
      </div>
    </section>
  )
}
