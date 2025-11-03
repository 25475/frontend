import React from 'react'

interface CategoryTabsProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export default function CategoryTabs({ selectedCategory, setSelectedCategory }: CategoryTabsProps) {
  const categories = [
    { key: 'HOGAR', label: 'Hogar' },
    { key: 'GAMER', label: 'Gamer' },
    { key: 'EMPRESARIAL', label: 'Empresarial' }
  ]

  return (
    <div className="w-full mb-6 mt-6 py-8">
      <div className="px-4 sm:px-0 mb-4">
        <h3 id="nuestros-planes" className="productos-title text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Nuestros Planes
        </h3>
      </div>
      <nav aria-label="Categorías de Planes" className="overflow-x-auto">
        <div className="w-full flex justify-center border-b border-gray-200">
          <ul className="flex gap-6 items-end whitespace-nowrap py-3">
            {categories.map((category) => (
              <li key={category.key}>
                <button
                  onClick={() => setSelectedCategory(category.key)}
                  className={`pb-2 text-sm border-b-2 border-transparent transition-colors duration-200 ease-in-out ${
                    selectedCategory === category.key 
                      ? 'category-active' 
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}