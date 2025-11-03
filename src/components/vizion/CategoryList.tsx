import React from 'react'

export default function CategoryList({categories, selected, onSelect, horizontal = false}:{categories:string[],selected:string,onSelect:(c:string)=>void, horizontal?:boolean}){
  if (horizontal) {
    return (
      <div className="w-full mb-6">
        <div className="px-4 sm:px-0 mb-4">
          <h3 id="nuestros-productos" className="productos-title text-2xl md:text-3xl font-semibold text-center">Nuestros productos</h3>
        </div>
        {/* Contenedor con línea inferior; las tabs se centran y la activa muestra borde inferior */}
        <nav aria-label="Categorías" className="overflow-x-auto">
          <div className="w-full flex justify-center border-b border-gray-200">
            <ul className="flex gap-6 items-end whitespace-nowrap py-3">
              {categories.map(c => (
                <li key={c}>
                  <button
                      onClick={() => onSelect(c)}
                      className={`pb-2 text-sm border-b-2 border-transparent transition-colors duration-200 ease-in-out ${c === selected ? 'category-active' : 'text-gray-700 hover:text-gray-900'}`}
                    >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <aside className="w-full md:w-56">
      <div className="mb-4">
        <h3 id="nuestros-productos" className="productos-title text-xl font-semibold">Nuestros productos</h3>
      </div>
      <nav aria-label="Categorías">
        <ul className="space-y-2">
          {categories.map(c=> (
            <li key={c}>
              <button onClick={()=>onSelect(c)} className={`w-full text-left px-3 py-2 rounded-none ${c===selected? 'category-vertical-active' : 'text-gray-700 hover:bg-gray-50'}`}>
                {c}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
