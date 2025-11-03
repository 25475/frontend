import React from 'react'

interface CategoryTabsProps {
  categories: any[]
  selectedCategory: string
  onSelectCategory: (id: string) => void
}

export default function CategoryTabs({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) {
  return (
    <div className="w-full mb-6 mt-6">
      <div className="px-4 sm:px-0 mb-4">
        <h3 id="nuestros-productos" className="productos-title text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Nuestros productos
        </h3>
      </div>
      <nav aria-label="Categorías" className="overflow-x-auto">
        <div className="w-full flex justify-center border-b border-gray-200">
          <ul className="flex gap-6 items-end whitespace-nowrap py-3">
            {categories.map((c: any) => (
              <li key={c.id}>
                <button
                  onClick={() => onSelectCategory(c.id)}
                  className={`pb-2 text-sm border-b-2 border-transparent transition-colors duration-200 ease-in-out ${
                    c.id === selectedCategory 
                      ? 'category-active' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {c.name || c.title || c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}