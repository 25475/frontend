import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductModal from '../components/ProductModal';

const Products = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [modalFocusField, setModalFocusField] = useState<string | undefined>(undefined);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery(['products', selectedType], async () => {
    const response = await axios.get(`/api/products${selectedType !== 'all' ? `?type=${selectedType}` : ''}`);
    return response.data;
  });

  const deleteMutation = useMutation(
    (id: string) => axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        toast.success('Producto eliminado correctamente');
      },
      onError: () => {
        toast.error('Error al eliminar el producto');
      }
    }
  );

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setModalFocusField(undefined);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setModalFocusField(undefined);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Productos</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestiona todos los productos de Vizion, Novatek
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            + Agregar producto
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedType === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedType('all')}
          >
            Todos
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedType === 'VIZION' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedType('VIZION')}
          >
            Vizion
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedType === 'NOVATEK' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedType('NOVATEK')}
          >
            Novatek
          </button>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product: any) => (
              <div key={product.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-white relative flex items-center justify-center overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-white">
                      Sin imagen
                    </div>
                  )}
                  <span className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {product.productType}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                  {product.price && (
                    <p className="text-lg font-semibold text-indigo-600 mb-4">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">Stock: <strong>{product.stock ?? 0}</strong></p>
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Editar
                    </button>
                    {/* Stock se edita desde el modal "Editar Producto" */}
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="text-sm text-red-600 hover:text-red-900 font-medium"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza agregando un nuevo producto.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                + Agregar producto
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          focusField={modalFocusField}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
            setModalFocusField(undefined);
          }}
          onSuccess={() => {
            queryClient.invalidateQueries('products');
            setIsModalOpen(false);
            setEditingProduct(null);
            setModalFocusField(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Products;