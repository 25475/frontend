export type VisionProduct = {
  id: string
  name: string
  category: string
  price?: string
  description?: string
  image?: string | null
}

export const visionCategories: string[] = [
  'Cámaras',
  'NVRs',
  'Kits de Seguridad',
  'Accesorios',
  'Domótica'
]

export const visionProducts: VisionProduct[] = [
  {
    id: 'v-1',
    name: 'Cámara Bullet 4K',
    category: 'Cámaras',
    price: '$59.990',
    description: 'Cámara exterior 4K con visión nocturna y PoE.',
    image: null
  },
  {
    id: 'v-2',
    name: 'Cámara Domo 2MP',
    category: 'Cámaras',
    price: '$29.990',
    description: 'Cámara interior PTZ con zoom digital.',
    image: null
  },
  {
    id: 'v-3',
    name: 'NVR 8 canales',
    category: 'NVRs',
    price: '$199.990',
    description: 'Grabador para 8 cámaras con soporte HDD.',
    image: null
  },
  {
    id: 'v-4',
    name: 'Kit hogar 2 cámaras',
    category: 'Kits de Seguridad',
    price: '$89.990',
    description: 'Kit completo con NVR y 2 cámaras.',
    image: null
  },
  {
    id: 'v-5',
    name: 'Sensor de puerta',
    category: 'Accesorios',
    price: '$9.990',
    description: 'Sensor magnético para puertas/ventanas.',
    image: null
  },
  {
    id: 'v-6',
    name: 'Control domótico',
    category: 'Domótica',
    price: '$39.990',
    description: 'Controlador central para dispositivos domóticos.',
    image: null
  }
]
