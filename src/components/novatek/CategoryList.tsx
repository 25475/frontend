import React from 'react'
import { normalizeImageUrl } from '../../utils/api'

type Cat = string | { id?: string, name: string, description?: string, image?: string }

export default function CategoryList({ categories, selected, onSelect }: { categories: Cat[], selected?: string, onSelect: (id: string)=>void }){
  // render categories as a responsive grid of cards
  const norm = (c: Cat) => {
    if (typeof c === 'string') return { id: c, name: c, description: '' }
    return { id: c.id || c.name, name: c.name, description: c.description || '', image: c.image }
  }

  // prioritize 'energia' category first (matches 'energia' or 'energía')
  const prioritizeEnergy = (arr: Cat[]) => {
    const normalize = (s:string) => s.toLowerCase().replace(/\s+/g,'').replace(/á/g,'a').replace(/é/g,'e').replace(/í/g,'i').replace(/ó/g,'o').replace(/ú/g,'u')
    const items = arr.slice()
    items.sort((a,b)=>{
      const na = normalize(typeof a === 'string' ? a : a.name || '')
      const nb = normalize(typeof b === 'string' ? b : b.name || '')
      const aIsE = na.includes('energia')
      const bIsE = nb.includes('energia')
      if (aIsE && !bIsE) return -1
      if (!aIsE && bIsE) return 1
      return 0
    })
    return items
  }

  const ordered = prioritizeEnergy(categories)

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-8">Comprar por categoría</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ordered.map((c, idx) => {
          const cat = norm(c)
          const active = selected && String(selected) === String(cat.id)
          return (
            // using group to style inner elements on hover
            <button key={cat.id || idx} onClick={()=> onSelect(String(cat.id))} className={`group text-left rounded-xl p-4 shadow-sm transition-transform transform hover:-translate-y-1 ${active? 'ring-2 ring-orange-300':''} bg-white hover:bg-orange-400`}>
              <div className="rounded-lg p-3 mb-4 flex items-center justify-center group-hover:bg-orange-300 transition-colors">
                {cat.image ? (
                  // image url could be external or internal -> normalize to configured API base
                  <img src={normalizeImageUrl(cat.image) || ''} alt={cat.name} className="w-full h-44 object-contain rounded-md bg-white group-hover:opacity-95" />
                ) : (
                  <div className="w-full h-44 bg-gradient-to-tr from-orange-100 to-orange-50 rounded-md flex items-center justify-center group-hover:bg-orange-500">
                    <svg className="w-20 h-20 text-slate-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-center mb-2 transition-colors group-hover:text-white">{cat.name}</h3>
                {cat.description ? (
                  <p className="text-center text-sm text-gray-500 group-hover:text-orange-100">{cat.description}</p>
                ) : (
                  <p className="text-center text-sm text-gray-400 group-hover:text-orange-100">&nbsp;</p>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
