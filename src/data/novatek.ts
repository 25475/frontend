export type NovatecProduct = {
  id: string
  name: string
  category: string
  price?: string
  description?: string
  image?: string | null
}

export const novatecCategories: string[] = [
  'Routers',
  'Switches',
  'Access Points',
  'Kits',
  'Accesorios'
]

export const novatecProducts: NovatecProduct[] = [
  { id: 'n-1', name: 'Router AC1200', category: 'Routers', price: '$49.990', description: 'Router dual-band para hogar y oficina.', image: null },
  { id: 'n-2', name: 'Switch 8 puertos', category: 'Switches', price: '$29.990', description: 'Switch administrable 8 puertos.', image: null },
  { id: 'n-3', name: 'Access Point 802.11ac', category: 'Access Points', price: '$39.990', description: 'Cobertura inalámbrica para interior.', image: null },
  { id: 'n-4', name: 'Kit instalación', category: 'Kits', price: '$69.990', description: 'Kit de instalación para PYMES.', image: null },
  { id: 'n-5', name: 'Cable UTP Cat6', category: 'Accesorios', price: '$4.990', description: 'Cable de red Cat6.', image: null }
]
