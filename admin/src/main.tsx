import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'

// Configurar axios para que use la URL de la API definida en las variables de entorno
// Uso un cast a any para evitar errores de tipado en TS si no existe la definición de env
// en el entorno de compilación.
const __API_URL__ = (import.meta as any).env?.VITE_API_URL || '';
axios.defaults.baseURL = __API_URL__;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)