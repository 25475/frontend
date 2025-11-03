import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ProductModalProps {
  product: any;
  onClose: () => void;
  onSuccess: () => void;
  focusField?: string;
}

const ProductModal = ({ product, onClose, onSuccess, focusField }: ProductModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    imageUrl: '',
    imageFile: null as File | null,
    categoryId: '',
    productType: 'VISION',
    stock: ''
  });
  const stockRef = useRef<HTMLInputElement | null>(null);

  const { data: categories } = useQuery('categories', async () => {
    const response = await axios.get('/api/categories');
    return response.data;
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '',
        imageUrl: product.imageUrl || '',
        imageFile: null,
        categoryId: product.categoryId || '',
        productType: product.productType || 'VISION',
      });
      // If parent requested focus on a specific field, handle it after a tiny delay
      if ((window as any)?.document && (product as any)) {
        // focus will be handled by effect below via focusField prop
      }
    }
  }, [product]);

  useEffect(() => {
    // focus stock input if available after product is set and parent requested it
    if (stockRef.current && product && focusField === 'stock') {
      // small delay to ensure modal is visible
      setTimeout(() => stockRef.current && stockRef.current.focus(), 50);
    }
  }, [product, focusField]);

  const saveMutation = useMutation(
    async (data: any) => {
      const token = localStorage.getItem('adminToken');
      if (product) {
        return axios.put(`/api/products/${product.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        return axios.post('/api/products', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    },
    {
      onSuccess: () => {
        toast.success(product ? 'Producto actualizado' : 'Producto creado');
        onSuccess();
      },
      onError: (err: any) => {
        const serverMessage = err?.response?.data?.error || err?.message || 'Error al guardar el producto';
        toast.error(String(serverMessage));
        console.error('Save product error (client):', err);
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.imageUrl;

    // Si hay un archivo de imagen, subirlo primero
    if (formData.imageFile) {
      try {
        const formDataUpload = new FormData();
        formDataUpload.append('image', formData.imageFile);
        
        const token = localStorage.getItem('adminToken');
        const uploadResponse = await axios.post('/api/upload', formDataUpload, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        
        imageUrl = uploadResponse.data.imageUrl;
      } catch (error) {
        toast.error('Error al subir la imagen');
        return;
      }
    }
    
    const dataToSend: any = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      categoryId: formData.categoryId,
      productType: formData.productType,
    };

    // Solo agregar campos opcionales si tienen valor
    if (formData.price) {
      dataToSend.price = parseFloat(formData.price);
    }
    
    if (imageUrl) {
      dataToSend.imageUrl = imageUrl;
    }
    if (formData.stock) dataToSend.stock = parseInt(formData.stock)

    saveMutation.mutate(dataToSend);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFormData({
          ...formData,
          imageFile: file,
          imageUrl: '', // Limpiar URL si se sube archivo
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {product ? 'Editar Producto' : 'Nuevo Producto'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="se-genera-automaticamente"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Producto *
              </label>
              <select
                name="productType"
                required
                value={formData.productType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="VISION">Vision</option>
                <option value="NOVATEC">Novatec</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría *
              </label>
              <select
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Seleccionar categoría</option>
                {categories?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del Producto
              </label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">O ingresa una URL de imagen abajo</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Imagen (opcional)
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                disabled={!!formData.imageFile}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                ref={stockRef}
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="description"
              required
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saveMutation.isLoading}
              className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saveMutation.isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;