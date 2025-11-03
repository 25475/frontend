# Sistema de Órdenes de Compra - Systray

## ✅ Funcionalidad Implementada

### Frontend (React)
- **PurchaseOrderModal**: Modal completo para generar órdenes de compra
- **Formulario de cliente**: Nombre, Cédula/RUC, Email, Dirección
- **Generación de PDF**: Usando jsPDF con diseño profesional
- **Validaciones**: Campos obligatorios y formato de email
- **Integración con carrito**: Toma datos automáticamente del contexto

### Características del PDF
- 📄 Header corporativo con branding de Systray
- 👤 Datos del cliente capturados del formulario
- 🛍️ Detalle completo de productos (nombre, cantidad, precio, subtotal)
- 💰 Cálculos automáticos: subtotal, envío, IGV (18%), total
- 🔢 Número de orden único basado en timestamp
- 📅 Fecha y hora de generación
- 📞 Información de contacto de la empresa

## 🚀 Cómo usar

1. **Agregar productos al carrito**
2. **Abrir el carrito** (ícono flotante)
3. **Hacer clic en "Generar orden de compra"**
4. **Llenar el formulario** con los datos del cliente
5. **Hacer clic en "Generar Orden"**
6. **El PDF se descarga automáticamente**

## 📁 Estructura de archivos

```
src/
├── components/
│   ├── CartModal.tsx          # Carrito con botón de orden
│   └── PurchaseOrderModal.tsx # Modal y generación de PDF
├── contexts/
│   └── CartContext.tsx        # Contexto del carrito
└── ...

ordenes-compra/                # Carpeta para PDFs (creada)
```

## 🔧 Configuración para Producción

### Backend Integration (Próximo paso)

Para conectar con WhatsApp y guardar en servidor:

1. **Crear endpoint en el backend**:
```javascript
// server/routes/orders.js
app.post('/api/orders/generate', async (req, res) => {
  const { customerData, cartItems, totals } = req.body;
  
  // Generar PDF en servidor
  const pdfBuffer = await generatePDFServer(customerData, cartItems, totals);
  
  // Guardar en carpeta del servidor
  const orderNumber = generateOrderNumber();
  const filename = `orden-compra-${orderNumber}.pdf`;
  await fs.writeFile(`./ordenes-compra/${filename}`, pdfBuffer);
  
  // Enviar por WhatsApp (opcional)
  await sendToWhatsApp(filename, customerData.phone);
  
  res.json({ success: true, orderNumber, filename });
});
```

2. **Modificar el frontend** para hacer fetch al endpoint:
```typescript
// En PurchaseOrderModal.tsx
const handleSubmit = async (e: React.FormEvent) => {
  // ... validaciones
  
  const response = await fetch('/api/orders/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerData,
      cartItems: items,
      totals: cartCalculations
    })
  });
  
  const result = await response.json();
  // ... manejar respuesta
};
```

## 📱 Integración con WhatsApp

### Opción 1: WhatsApp Business API
```javascript
const WhatsAppAPI = require('whatsapp-business-sdk');

async function sendToWhatsApp(pdfPath, customerPhone) {
  await WhatsAppAPI.sendDocument({
    to: process.env.BUSINESS_PHONE,
    document: pdfPath,
    caption: `Nueva orden de compra - Cliente: ${customerPhone}`
  });
}
```

### Opción 2: Twilio WhatsApp
```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

async function sendToWhatsApp(pdfPath, orderNumber) {
  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+51XXXXXXXXX', // Número de la empresa
    body: `Nueva orden de compra: ${orderNumber}`,
    mediaUrl: [`https://yourdomain.com/ordenes-compra/${pdfPath}`]
  });
}
```

## 🛠️ Dependencias Instaladas

```json
{
  "jspdf": "^2.5.1",
  "html2canvas": "^1.4.1"
}
```

## 🎯 Próximos pasos recomendados

1. **Implementar backend endpoint** para generar PDFs en servidor
2. **Configurar WhatsApp Business API** para envío automático
3. **Agregar campo de teléfono** al formulario de cliente
4. **Implementar sistema de tracking** de órdenes
5. **Agregar notificaciones por email** al cliente
6. **Dashboard admin** para ver órdenes generadas

## 📝 Notas técnicas

- **PDFs se descargan localmente** en desarrollo
- **Carpeta `ordenes-compra/` creada** para futuro uso
- **Cálculos automáticos**: IGV 18%, envío gratis sobre S/ 500
- **Número de orden único**: formato `ORD-{timestamp}`
- **Diseño responsive**: Modal optimizado para móvil
- **Validaciones robustas**: Frontend con feedback visual

## 🎨 Personalización

El diseño del PDF puede modificarse en `PurchaseOrderModal.tsx`:
- Cambiar colores corporativos
- Agregar logo de la empresa
- Modificar layout de la tabla
- Personalizar footer con términos y condiciones

La funcionalidad está lista para producción y puede escalarse fácilmente.