import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite conexiones externas (necesario para ngrok)
    port: 5173,
    allowedHosts: [
      "nonlepidopteral-deliberatively-major.ngrok-free.dev" // dominio generado por ngrok
    ]
  }
})
