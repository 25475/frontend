import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import CategoryModal from '../components/CategoryModal';

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery('categories', async () => {
    const response = await axios.get('/api/categories');
    return response.data;
  });

  const deleteMutation = useMutation(
    (id: string) => axios.delete(`/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        toast.success('Categoría eliminada correctamente');
      },
      onError: () => {
        toast.error('Error al eliminar la categoría');
      }
    }
  );

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Categorías</h1>
          <p className="mt-2 text-sm text-gray-700">
            Organiza tus productos en categorías
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            + Agregar categoría
          </button>
        </div>
      </div>

      <div className="mt-8">
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category: any) => (
              <div key={category.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{category.description || 'Sin descripción'}</p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {category.productType}
                        </span>
                        <span className="text-xs text-gray-500">
                          {category.products?.length || 0} productos
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4 mt-4 border-t">
                    <button 
                      onClick={() => handleEdit(category)}
                      className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)}
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay categorías</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza agregando una nueva categoría.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                + Agregar categoría
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSuccess={() => {
            queryClient.invalidateQueries('categories');
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default Categories;