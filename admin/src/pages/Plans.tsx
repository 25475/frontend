import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import PlanModal from '../components/PlanModal';

const Plans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: plans, isLoading } = useQuery('plans', async () => {
    const response = await axios.get('/api/plans');
    return response.data;
  });

  const deleteMutation = useMutation(
    (id: string) => axios.delete(`/api/plans/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('plans');
        toast.success('Plan eliminado correctamente');
      },
      onError: () => {
        toast.error('Error al eliminar el plan');
      }
    }
  );

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este plan?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (plan: any) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Planes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Gestiona los planes de servicio disponibles
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            + Agregar plan
          </button>
        </div>
      </div>

      <div className="mt-8">
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan: any) => (
              <div 
                key={plan.id} 
                className={`bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                  plan.isPopular ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-indigo-600 text-white text-center py-2 text-sm font-semibold">
                    ⭐ Más Popular
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                      {plan.category === 'HOGAR' && 'Hogar'}
                      {plan.category === 'GAMER' && 'Gamer'}
                      {plan.category === 'EMPRESARIAL' && 'Empresarial'}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-indigo-600">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">/mes</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Características:</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <button 
                      onClick={() => handleEdit(plan)}
                      className="text-sm text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(plan.id)}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay planes</h3>
            <p className="mt-1 text-sm text-gray-500">
              Comienza agregando un nuevo plan.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddNew}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                + Agregar plan
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <PlanModal
          plan={editingPlan}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPlan(null);
          }}
          onSuccess={() => {
            queryClient.invalidateQueries('plans');
            setIsModalOpen(false);
            setEditingPlan(null);
          }}
        />
      )}
    </div>
  );
};

export default Plans;