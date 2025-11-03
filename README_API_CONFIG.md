# 🌐 Configuración de API URLs - Sistema Centralizado

## ✅ **Implementación Completada**

Se ha implementado un sistema centralizado para manejar las URLs de la API que permite cambiar fácilmente entre desarrollo local y producción (Ngrok, servidor en la nube, etc.).

## 📁 **Archivos Creados/Modificados**

### **Nuevos archivos:**
- ✅ `.env` - Variables de entorno
- ✅ `src/utils/api.ts` - Utilidades para API
- ✅ `src/vite-env.d.ts` - Tipos para variables de entorno

### **Archivos actualizados:**
- ✅ `src/pages/Novatek.tsx`
- ✅ `src/pages/Vizion.tsx` 
- ✅ `src/pages/Planes.tsx`
- ✅ `src/pages/ProductDetail.tsx`
- ✅ `src/pages/Checkout.tsx`
- ✅ `src/sections/Plans.tsx`

## 🔧 **Configuración Actual**

### `.env`
```env
# URL del servidor backend
VITE_API_URL=http://localhost:5000
```

### `src/utils/api.ts`
Funciones disponibles:
- `getApiBaseUrl()` - Obtiene la URL base
- `getApiUrl(endpoint)` - Construye URL completa
- `apiFetch(endpoint, options)` - Fetch con URL automática
- `apiGet(endpoint, options)` - GET con JSON automático
- `apiPost(endpoint, data, options)` - POST con JSON automático

## 🚀 **Uso en el Código**

### **Antes:**
```typescript
fetch('http://localhost:5000/api/products')
  .then(r => r.json())
  .then(data => setProducts(data))
```

### **Ahora:**
```typescript
import { apiGet } from '../utils/api'

apiGet('/api/products')
  .then(data => setProducts(data))
```

## 🌍 **Para Exponer con Ngrok**

### **1. Instalar Ngrok**
```bash
# Windows
choco install ngrok

# O descargar desde: https://ngrok.com/download
```

### **2. Exponer el servidor backend**
```bash
# En una terminal separada, asegúrate que tu servidor esté corriendo en el puerto 5000
cd server
npm run dev

# En otra terminal, exponer con ngrok
ngrok http 5000
```

### **3. Actualizar la configuración**
Ngrok te dará una URL como: `https://abc123.ngrok-free.app`

Solo cambia el `.env`:
```env
# Cambia esto:
VITE_API_URL=http://localhost:5000

# Por esto:
VITE_API_URL=https://abc123.ngrok-free.app
```

### **4. Reiniciar el frontend**
```bash
# Detener el servidor frontend (Ctrl+C)
# Volver a iniciar para que lea el nuevo .env
npm run dev
```

## 🔄 **Otros Escenarios de Despliegue**

### **Servidor en la nube:**
```env
VITE_API_URL=https://tuservidor.com
```

### **Producción con subdirectorio:**
```env
VITE_API_URL=https://midominio.com/api
```

### **Desarrollo con IP local:**
```env
VITE_API_URL=http://192.168.1.100:5000
```

## 🛠️ **Funciones Helper Disponibles**

### **apiGet - Para consultas simples**
```typescript
import { apiGet } from '../utils/api'

// Automáticamente maneja la URL base y convierte a JSON
const products = await apiGet('/api/products?type=NOVATEC')
```

### **apiPost - Para enviar datos**
```typescript
import { apiPost } from '../utils/api'

// Automáticamente convierte a JSON y maneja headers
const result = await apiPost('/api/orders', {
  customer: formData,
  items: cartItems
})
```

### **apiFetch - Para casos complejos**
```typescript
import { apiFetch } from '../utils/api'

// Para casos donde necesitas más control
const response = await apiFetch('/api/upload', {
  method: 'POST',
  body: formData // Para archivos
})
```

## 🔍 **Debug y Verificación**

### **Ver la URL actual:**
```typescript
import { getApiBaseUrl } from '../utils/api'

console.log('API Base URL:', getApiBaseUrl())
// Salida: http://localhost:5000 o https://abc123.ngrok-free.app
```

### **Verificar variables de entorno:**
```typescript
console.log('Environment:', import.meta.env.VITE_API_URL)
```

## ⚠️ **Notas Importantes**

1. **Variables de entorno en Vite:** Deben empezar con `VITE_` para ser accesibles en el frontend
2. **Reinicio necesario:** Después de cambiar `.env`, debes reiniciar el servidor de desarrollo
3. **Sin login requerido:** El sistema funciona sin autenticación, perfecto para tu flujo de ventas
4. **Manejo de errores:** Las funciones helper incluyen manejo básico de errores HTTP

## 🎯 **Beneficios del Sistema**

- ✅ **Un solo lugar para cambiar URLs** - Solo editar `.env`
- ✅ **Funciones helper** - Menos código repetitivo  
- ✅ **Manejo de errores** - Automático en las funciones helper
- ✅ **TypeScript ready** - Tipos incluidos
- ✅ **Desarrollo ágil** - Fácil cambio entre local/Ngrok/producción
- ✅ **Sin breaking changes** - Misma funcionalidad, mejor estructura

¡Tu aplicación está lista para desarrollo local y despliegue con Ngrok! 🚀