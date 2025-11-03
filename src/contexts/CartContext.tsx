import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Tipos
interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image?: string
  description?: string
  brand?: string
  category?: string
  [key: string]: any
}

interface CartState {
  items: CartItem[]
  itemCount: number
  total: number
  isLoading: boolean
  lastUpdated: number
}

interface CartContextType extends CartState {
  addItem: (item: any) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  isInCart: (id: string) => boolean
  getItemQuantity: (id: string) => number
}

// Tipos de acciones
type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

// Estado inicial
const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0,
  isLoading: true,
  lastUpdated: Date.now()
}

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'LOAD_CART':
      const loadedItems = action.payload
      return {
        ...state,
        items: loadedItems,
        itemCount: loadedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: loadedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        isLoading: false,
        lastUpdated: Date.now()
      }

    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id)
      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Si el item ya existe, incrementar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Si es nuevo, agregarlo con cantidad 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      return {
        ...state,
        items: newItems,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        lastUpdated: Date.now()
      }

    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: filteredItems,
        itemCount: filteredItems.reduce((sum, item) => sum + item.quantity, 0),
        total: filteredItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        lastUpdated: Date.now()
      }

    case 'UPDATE_QUANTITY':
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        lastUpdated: Date.now()
      }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        itemCount: 0,
        total: 0,
        lastUpdated: Date.now()
      }

    default:
      return state
  }
}

// Contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Hook personalizado
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Utilidades para localStorage
const CART_STORAGE_KEY = 'systray_cart'

function saveToStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    // Disparar evento global para notificar otros componentes
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

function loadFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return []
  }
}

// Provider
interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Cargar carrito al inicializar
  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: 'SET_LOADING', payload: true })
      const items = loadFromStorage()
      dispatch({ type: 'LOAD_CART', payload: items })
    }
    loadCart()
  }, [])

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    if (!state.isLoading) {
      saveToStorage(state.items)
    }
  }, [state.items, state.isLoading])

  // Funciones del contexto
  const addItem = (item: any) => {
    // Extraer el valor numérico del precio si viene como string con formato
    let numericPrice = 0
    if (item.price) {
      if (typeof item.price === 'string') {
        // Remover caracteres no numéricos excepto punto y coma
        const cleanPrice = item.price.replace(/[^\d.,]/g, '').replace(',', '.')
        numericPrice = parseFloat(cleanPrice) || 0
      } else {
        numericPrice = Number(item.price) || 0
      }
    }

    const cartItem: CartItem = {
      id: item.id || Date.now().toString(),
      title: item.title || 'Producto',
      price: numericPrice,
      quantity: item.quantity || 1,
      image: item.image,
      description: item.description,
      brand: item.brand,
      category: item.category,
      ...item
    }
    dispatch({ type: 'ADD_ITEM', payload: cartItem })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const isInCart = (id: string) => {
    return state.items.some(item => item.id === id)
  }

  const getItemQuantity = (id: string) => {
    const item = state.items.find(item => item.id === id)
    return item ? item.quantity : 0
  }

  const contextValue: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext