import React, { useState, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import { useCart } from '../contexts/CartContext';

interface PurchaseOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomerData {
  fullName: string;
  idNumber: string;
  email: string;
  address: string;
  phone: string;
}

const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({ isOpen, onClose }) => {
  const { items, total } = useCart();
  const [customerData, setCustomerData] = useState<CustomerData>({
    fullName: '',
    idNumber: '',
    email: '',
    address: '',
    phone: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  // Cálculos del carrito
  const cartCalculations = useMemo(() => {
    const subtotal = total;
    const shipping = subtotal >= 500 ? 0 : 30; // Envío gratis sobre $ 500
    const baseAmount = subtotal + shipping;
    const tax = baseAmount * 0.18; // IGV 18%
    const finalTotal = baseAmount + tax;
    
    return {
      subtotal,
      shipping,
      tax,
      finalTotal
    };
  }, [total]);

  // Validaciones del formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerData> = {};

    if (!customerData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!customerData.idNumber.trim()) {
      newErrors.idNumber = 'La cédula o RUC es requerido';
    }

    if (!customerData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    // Validar teléfono (mínimo 7 dígitos, puede incluir + y espacios)
    if (!customerData.phone.trim()) {
      newErrors.phone = 'El número de teléfono es requerido';
    } else if (!/^[+\d\s()-]{7,20}$/.test(customerData.phone)) {
      newErrors.phone = 'Ingrese un número de teléfono válido';
    }

    if (!customerData.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generar número de orden único
  const generateOrderNumber = (): string => {
    const date = new Date();
    const timestamp = date.getTime();
    return `ORD-${timestamp}`;
  };

  // Generar PDF de orden de compra
  const generatePDF = (orderNumber: string): jsPDF => {
    const doc = new jsPDF();
    
    // Configuración de colores
    const primaryColor: [number, number, number] = [0, 188, 212]; // Cyan
    const secondaryColor: [number, number, number] = [75, 85, 99]; // Gray
    
    // Header de la empresa
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SYSTRAY', 20, 25);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Soluciones Tecnológicas Integrales', 20, 32);
    
    // Información de la orden
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ORDEN DE COMPRA', 20, 55);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Número de Orden: ${orderNumber}`, 20, 65);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 20, 72);
    doc.text(`Hora: ${new Date().toLocaleTimeString('es-ES')}`, 20, 79);
    
    // Datos del cliente
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CLIENTE', 20, 95);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
  doc.text(`Nombre: ${customerData.fullName}`, 20, 105);
  doc.text(`Cédula/RUC: ${customerData.idNumber}`, 20, 112);
  doc.text(`Email: ${customerData.email}`, 20, 119);
  doc.text(`Teléfono: ${customerData.phone}`, 20, 126);
  doc.text(`Dirección: ${customerData.address}`, 20, 133);
    
    // Tabla de productos
  let yPosition = 152;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DETALLE DE PRODUCTOS', 20, yPosition);
    
    yPosition += 10;
    
    // Header de la tabla
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition, 170, 8, 'F');
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('Producto', 22, yPosition + 5);
    doc.text('Cant.', 120, yPosition + 5);
    doc.text('Precio Unit.', 140, yPosition + 5);
    doc.text('Subtotal', 170, yPosition + 5);
    
    yPosition += 10;
    
    // Productos
    doc.setFont('helvetica', 'normal');
    items.forEach((item) => {
      const productName = item.title || 'Producto sin nombre';
      const quantity = item.quantity || 1;
      const price = Number(item.price || 0);
      const itemSubtotal = price * quantity;
      
      doc.text(productName.length > 30 ? productName.substring(0, 30) + '...' : productName, 22, yPosition + 5);
      doc.text(quantity.toString(), 125, yPosition + 5);
      doc.text(`$ ${price.toFixed(2)}`, 142, yPosition + 5);
      doc.text(`$ ${itemSubtotal.toFixed(2)}`, 172, yPosition + 5);
      
      yPosition += 8;
    });
    
    // Línea separadora
    yPosition += 5;
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    // Resumen de totales
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal:`, 140, yPosition);
    doc.text(`$ ${cartCalculations.subtotal.toFixed(2)}`, 170, yPosition);
    yPosition += 7;
    
    doc.text(`Envío:`, 140, yPosition);
    doc.text(`$ ${cartCalculations.shipping.toFixed(2)}`, 170, yPosition);
    if (cartCalculations.shipping === 0) {
      doc.setTextColor(0, 150, 0);
      doc.text(`(Gratis)`, 185, yPosition);
      doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    }
    yPosition += 7;
    
    doc.text(`IGV (18%):`, 140, yPosition);
    doc.text(`$ ${cartCalculations.tax.toFixed(2)}`, 170, yPosition);
    yPosition += 10;
    
    // Total final
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL:`, 140, yPosition);
    doc.text(`$ ${cartCalculations.finalTotal.toFixed(2)}`, 170, yPosition);
    
    // Footer
    yPosition += 20;
    
    // Términos y condiciones
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('TÉRMINOS Y CONDICIONES:', 20, yPosition);
    yPosition += 7;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('• Esta orden de compra es válida por 30 días desde su emisión.', 20, yPosition);
    yPosition += 4;
    doc.text('• Los precios incluyen IGV y están sujetos a cambios sin previo aviso.', 20, yPosition);
    yPosition += 4;
    doc.text('• Los productos están sujetos a disponibilidad de stock.', 20, yPosition);
    yPosition += 7;
    
    doc.setTextColor(100, 100, 100);
    doc.text('Para cualquier consulta, contactar a: ventas@systray.com | Tel: +51 123 456 789', 20, yPosition);
    doc.text('Dirección: Av. Tecnológica 123, Lima - Perú | www.systray.com', 20, yPosition + 4);
    
    return doc;
  };

  // Guardar PDF localmente (simulación para desarrollo)
  const savePDFLocally = async (orderNumber: string) => {
    const doc = generatePDF(orderNumber);
    
    // En un entorno real, esto se haría en el backend
    // Por ahora simulamos el guardado descargando el archivo
    doc.save(`orden-compra-${orderNumber}.pdf`);
    
    console.log(`PDF guardado como: ordenes-compra/orden-compra-${orderNumber}.pdf`);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que hay productos en el carrito
    if (items.length === 0) {
      alert('No hay productos en el carrito para generar la orden.');
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const orderNumber = generateOrderNumber();
      
      // Generar y descargar PDF
      const doc = generatePDF(orderNumber);
      doc.save(`orden-compra-${orderNumber}.pdf`);
      
      // Mostrar mensaje de éxito
      alert(`¡Orden de compra generada exitosamente!\nNúmero de orden: ${orderNumber}\n\nEl archivo PDF se ha descargado automáticamente.`);
      
      // Limpiar formulario y cerrar modal
      setCustomerData({
        fullName: '',
        idNumber: '',
        email: '',
        address: '',
        phone: ''
      });
      onClose();
      
    } catch (error) {
      console.error('Error al generar la orden de compra:', error);
      alert('Error al generar la orden de compra. Intente nuevamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1 flex items-center">
                  📄 Generar Orden de Compra
                </h2>
                <p className="opacity-90 text-sm">
                  Complete sus datos para generar la orden
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Nombre completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                type="text"
                value={customerData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese su nombre completo"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Cédula o RUC */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cédula o RUC *
              </label>
              <input
                type="text"
                value={customerData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.idNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese su cédula o RUC"
              />
              {errors.idNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.idNumber}</p>
              )}
            </div>

            {/* Correo electrónico */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico *
              </label>
              <input
                type="email"
                value={customerData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono *
              </label>
              <input
                type="text"
                value={customerData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese su número de teléfono"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección *
              </label>
              <textarea
                value={customerData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ingrese su dirección completa"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Resumen del pedido */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Resumen del pedido:</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Productos:</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>$ {cartCalculations.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>$ {cartCalculations.finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isGenerating}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generando...' : 'Generar Orden'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderModal;