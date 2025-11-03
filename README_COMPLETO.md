# 🚀 GUÍA COMPLETA: Backend + Frontend + Ngrok

## ✅ **Estado Actual - TODO CONFIGURADO**

Tu proyecto está completamente listo para desarrollo local y despliegue con Ngrok:

### **🎯 Backend (Puerto 5001)**
- ✅ Express + TypeScript configurado
- ✅ Variables de entorno con dotenv
- ✅ CORS configurado para Ngrok
- ✅ Rutas de verificación (`/` y `/health`)
- ✅ Middleware para headers de Ngrok
- ✅ Logging de requests

### **🎯 Frontend (Puerto 5174)**
- ✅ Vite + React + TypeScript
- ✅ URLs centralizadas en `src/utils/api.ts`
- ✅ Variables de entorno con `VITE_API_URL`
- ✅ Funciones helper (`apiGet`, `apiPost`)

## 🔧 **Configuración Actual**

### **Backend (server/.env):**
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/systray_db"
JWT_SECRET="tu_secreto_super_seguro"
PORT=5000  # Pero usa 5001 por conflicto
```

### **Frontend (.env):**
```env
VITE_API_URL=http://localhost:5001
```

## 🚀 **Comandos para Desarrollo**

### **1. Iniciar Backend:**
```bash
cd server
npm run dev:5001
```

### **2. Iniciar Frontend:**
```bash
# En terminal separada
npm run dev
```

### **3. Verificar que funcione:**
- Backend: http://localhost:5001/
- Frontend: http://localhost:5174/

## 🌐 **Para Exponer con Ngrok**

### **Paso 1: Exponer Backend**
```bash
# En terminal nueva
ngrok http 5001
```

Te dará una URL como: `https://abc123.ngrok-free.app`

### **Paso 2: Actualizar Frontend**
Edita el archivo `.env`:
```env
# Cambiar esto:
VITE_API_URL=http://localhost:5001

# Por esto (usa TU URL de Ngrok):
VITE_API_URL=https://abc123.ngrok-free.app
```

### **Paso 3: Reiniciar Frontend**
```bash
# Detener frontend (Ctrl+C)
# Volver a iniciar
npm run dev
```

### **Paso 4: Exponer Frontend (Opcional)**
```bash
# Si también quieres exponer el frontend
ngrok http 5174
```

## 🧪 **Testing de APIs**

### **Verificar Backend:**
```bash
# Estado del servidor
curl https://abc123.ngrok-free.app/

# Salud del servidor
curl https://abc123.ngrok-free.app/health

# API de productos
curl https://abc123.ngrok-free.app/api/products
```

### **Desde el frontend:**
```typescript
import { apiGet } from './utils/api'

// Esto automáticamente usa VITE_API_URL
const products = await apiGet('/api/products')
```

## 📱 **URLs Completas Disponibles**

### **Desarrollo Local:**
- 🖥️ **Frontend:** http://localhost:5174/
- ⚙️ **Backend:** http://localhost:5001/
- 📊 **Estado:** http://localhost:5001/health
- 🛍️ **Productos:** http://localhost:5001/api/products

### **Con Ngrok:**
- 🖥️ **Frontend:** https://frontend123.ngrok-free.app/
- ⚙️ **Backend:** https://backend123.ngrok-free.app/
- 📊 **Estado:** https://backend123.ngrok-free.app/health
- 🛍️ **Productos:** https://backend123.ngrok-free.app/api/products

## 🛡️ **Características de Seguridad**

### **CORS Configurado para:**
- ✅ localhost:5173, 5174, 3000
- ✅ Todos los subdominios *.ngrok-free.app
- ✅ Todos los subdominios *.ngrok.io
- ✅ Headers necesarios para Ngrok

### **Headers automáticos:**
- `ngrok-skip-browser-warning: true`
- `Access-Control-Allow-Origin: *` (para dominios permitidos)
- `Content-Type: application/json`

## 🔍 **Troubleshooting**

### **Puerto ocupado:**
```bash
# Usar puerto alternativo
npm run dev:5002

# Luego actualizar .env del frontend
VITE_API_URL=http://localhost:5002
```

### **Frontend no conecta al backend:**
1. ✅ Verificar que backend responda: http://localhost:5001/
2. ✅ Verificar VITE_API_URL en .env
3. ✅ Reiniciar frontend después de cambiar .env
4. ✅ Verificar que no haya errores CORS en consola

### **Ngrok no funciona:**
1. ✅ Verificar que la URL en .env sea correcta
2. ✅ No incluir `/` al final de la URL
3. ✅ Verificar que Ngrok esté corriendo
4. ✅ Probar la URL de Ngrok directamente

## 🎯 **Scripts Útiles**

### **Backend (server/):**
```json
{
  "dev": "ts-node-dev src/index.ts",
  "dev:5001": "cross-env PORT=5001 ts-node-dev src/index.ts",
  "dev:5002": "cross-env PORT=5002 ts-node-dev src/index.ts"
}
```

### **Frontend:**
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

## 📝 **Archivos Clave**

- 📄 `server/.env` - Variables del backend
- 📄 `.env` - Variables del frontend
- 📄 `src/utils/api.ts` - Utilidades de API
- 📄 `server/src/index.ts` - Servidor principal
- 📄 `server/src/middleware/ngrok.ts` - Middleware para Ngrok

¡Tu aplicación está completamente lista para desarrollo y pruebas con Ngrok! 🎉

## 🚀 **Flujo Completo de Trabajo**

1. `cd server && npm run dev:5001` (Backend en 5001)
2. `npm run dev` (Frontend en 5174)
3. `ngrok http 5001` (Exponer backend)
4. Actualizar `.env` con URL de Ngrok
5. Reiniciar frontend
6. ¡Listo para pruebas externas!

**💡 Tip:** Guarda la URL de Ngrok para no tener que cambiarla constantemente durante el desarrollo.