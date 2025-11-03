import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Debug temporal para verificar URLs de API
import { getApiBaseUrl, getApiUrl } from './utils/api'

console.log('🔍 DEBUG API URLs:')
console.log('📍 Base URL:', getApiBaseUrl())
console.log('🛍️ Productos URL:', getApiUrl('/api/products'))
console.log('📂 Categorías URL:', getApiUrl('/api/categories'))

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
