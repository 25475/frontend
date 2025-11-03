import { useQuery } from 'react-query';
import axios from 'axios';
import { CubeIcon, TagIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery('stats', async () => {
    const [products, categories, plans] = await Promise.all([
      axios.get('/api/products'),
      axios.get('/api/categories'),
      axios.get('/api/plans'),
    ]);
    return {
      products: products.data.length,
      categories: categories.data.length,
      plans: plans.data.length,
    };
  });

  const statsCards = [
    {
      name: 'Total Productos',
      value: stats?.products || 0,
      icon: CubeIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Categorías',
      value: stats?.categories || 0,
      icon: TagIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Planes',
      value: stats?.plans || 0,
      icon: DocumentTextIcon,
      color: 'bg-purple-500',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {statsCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Bienvenido al Panel de Administración</h2>
        <p className="text-gray-600 mb-4">
          Desde aquí puedes gestionar todos los productos, categorías y planes de tu sistema.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-900">Productos</h3>
            <p className="text-sm text-gray-600">
              Gestiona los productos de Vision, Novatec y HiVision
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-900">Categorías</h3>
            <p className="text-sm text-gray-600">
              Organiza tus productos por categorías
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-gray-900">Planes</h3>
            <p className="text-sm text-gray-600">
              Administra los planes de servicio disponibles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;