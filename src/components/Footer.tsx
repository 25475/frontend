import React from 'react'

export default function Footer(){
  return (
  <footer id="contacto" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-300">
        <div>
          <h4 className="font-semibold mb-2">Systray</h4>
          <p className="text-xs">Servicios de Internet, seguridad y soluciones tecnológicas.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contacto</h4>
          <p className="text-xs">Tel: 023731070</p>
          <p className="text-xs">Cel: 0992424701</p>
          <p className="text-xs">info@systray.cl</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Ubicaciones</h4>
          <p className="text-xs">Manta · Jipijapa · Montecristi</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Horario</h4>
          <p className="text-xs">Lun-Vie: 9am - 8pm</p>
          <p className="text-xs">Sáb: 10am - 4pm</p>
        </div>
      </div>
      <div className="bg-gray-800 text-center text-xs py-3">© {new Date().getFullYear()} Systray. Todos los derechos reservados.</div>
    </footer>
  )
}
