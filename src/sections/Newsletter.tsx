import React from 'react'

export default function Newsletter(){
  return (
    <section className="bg-gradient-to-r from-orange-800 via-orange-600 to-orange-500 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Manténgase actualizado</h2>
        <p className="mb-8 text-lg text-orange-100 max-w-2xl mx-auto">Obtenga ofertas exclusivas y sea el primero en enterarse de las nuevas llegadas.</p>

        <form className="mx-auto max-w-xl flex items-center bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="email"
            placeholder="Introduce tu correo electrónico"
            className="flex-1 px-6 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
            aria-label="Correo electrónico"
          />
          <button type="submit" className="px-6 py-3 bg-transparent text-orange-700 font-semibold">
            Suscribir
          </button>
        </form>
      </div>
    </section>
  )
}
