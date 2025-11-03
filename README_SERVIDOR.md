# 🛠️ Instrucciones para Servidor Backend - Systray

## ✅ **Configuración Completada**

El servidor backend ha sido configurado con las siguientes mejoras:

### **🎯 Características implementadas:**

1. **✅ Variables de entorno con dotenv**
   - Lee automáticamente `server/.env`
   - Puerto configurable con `PORT=5000`
   - Fallback a puerto 5000 si no se define

2. **✅ CORS configurado para Ngrok**
   - Permite localhost (5173, 5174, 3000)
   - Permite todos los subdominios de ngrok-free.app
   - Permite todos los subdominios de ngrok.io
   - Headers configurados para saltear warnings de Ngrok

3. **✅ Rutas de verificación**
   - `GET /` - Estado del servidor
   - `GET /health` - Monitoreo de salud

4. **✅ Middleware mejorado**
   - Logging de requests
   - Headers para Ngrok
   - Manejo de errores CORS

5. **✅ Mensajes de consola mejorados**
   - URL completa del servidor
   - Instrucciones para Ngrok
   - Estado del entorno

## 🚀 **Cómo usar**

### **Iniciar servidor en desarrollo:**
```bash
cd server
npm run dev
```

### **Si el puerto 5000 está ocupado:**
```bash
# Opción 1: Cambiar puerto en .env
echo "PORT=5001" >> .env

# Opción 2: Usar variable temporal
PORT=5001 npm run dev
```

### **Exponer con Ngrok:**
```bash
# En terminal separada
ngrok http 5000

# O si usas puerto alternativo
ngrok http 5001
```

## 🌐 **URLs disponibles**

### **Desarrollo local:**
- 🏠 Estado: `http://localhost:5000/`
- ❤️ Salud: `http://localhost:5000/health`
- 📊 API: `http://localhost:5000/api/products`

### **Con Ngrok:**
- 🏠 Estado: `https://abc123.ngrok-free.app/`
- ❤️ Salud: `https://abc123.ngrok-free.app/health`
- 📊 API: `https://abc123.ngrok-free.app/api/products`

## 🔧 **Configuración actual**

### **server/.env:**
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/systray_db"
JWT_SECRET="tu_secreto_super_seguro"
PORT=5000
```

### **Respuesta de estado (GET /):**
```json
{
  "message": "🚀 Servidor Systray activo",
  "status": "OK",
  "timestamp": "2025-11-02T20:39:45.123Z",
  "port": 5000,
  "environment": "development"
}
```

## 📝 **Scripts disponibles**

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
  "build": "tsc -p .",
  "start": "node dist/index.js"
}
```

## 🔍 **Troubleshooting**

### **Puerto ocupado (EADDRINUSE):**
```bash
# Ver qué proceso usa el puerto 5000
netstat -ano | findstr :5000

# Matar proceso específico (reemplaza PID)
taskkill /PID 1234 /F

# O usar puerto alternativo
PORT=5001 npm run dev
```

### **Error de CORS con Ngrok:**
El servidor ya está configurado para manejar Ngrok automáticamente. Si tienes problemas:

1. Verifica que el frontend use la URL correcta en `.env`
2. Asegúrate de que la URL de Ngrok esté en formato correcto
3. El header `ngrok-skip-browser-warning` se agrega automáticamente

### **Frontend no conecta:**
1. Verifica que `VITE_API_URL` apunte al servidor correcto
2. Reinicia el frontend después de cambiar `.env`
3. Verifica que el servidor responda en `/health`

## 🎯 **Próximos pasos**

1. **Para desarrollo local:** Simplemente `npm run dev` en server/
2. **Para pruebas externas:** Usar Ngrok con `ngrok http 5000`
3. **Para producción:** Configurar variables de entorno en el hosting

¡El servidor está listo para desarrollo local y despliegue con Ngrok! 🚀