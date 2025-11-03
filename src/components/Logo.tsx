import React from 'react'

export default function Logo(){
  return (
    <div className="flex items-center gap-3">
      {/* increased visual size for the logo mark and text */}
      <div className="w-14 h-14 bg-fiat-cyan rounded-md shrink-0"></div>
      <h1 className="text-2xl sm:text-3xl font-semibold">Systray</h1>
    </div>
  )
}
