import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../Image/logo1.png'
import Nav from './Nav'

type Props = { isHome?: boolean; isPlanes?: boolean; isVizion?: boolean; isNovatek?: boolean; isNosotros?: boolean }

export default function Header({isHome, isPlanes, isVizion, isNovatek, isNosotros}:Props){
  const location = useLocation()
  const base = 'fixed top-0 left-0 right-0 z-50'
  
  // Header completamente transparente en páginas especiales
  const headerStyle = (isHome || isPlanes || isVizion || isNovatek || isNosotros)
    ? 'header-transparent bg-transparent shadow-none border-none' 
    : 'bg-white border-b shadow-sm'

  return (
    <header className={`${base} ${headerStyle} transition-all duration-300`}>
      {/* full width header row */}
      <div className="w-full px-4 py-3 md:py-4 flex items-center">
        {/* logo on the left */}
        <div className="flex items-center">
          <Link to="/" className="bg-transparent">
            <img 
              src={logo} 
              alt="Systray logo" 
              className="w-40 md:w-56 h-auto object-contain drop-shadow-lg" 
              style={{
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
                backgroundColor: 'transparent'
              }}
            />
          </Link>
        </div>

        {/* spacer to push navigation to the right */}
        <div className="flex-1"></div>

        {/* navigation on the right */}
        <div className="mr-2 md:mr-[15px]">
          <Nav isWhiteBackground={!(isHome || isPlanes || isVizion || isNovatek || isNosotros)} />
        </div>
      </div>
    </header>
  )
}
