import { Outlet, useNavigate } from 'react-router-dom';
import { HomeIcon, CubeIcon, TagIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

const Layout = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', icon: HomeIcon, path: '/' },
    { name: 'Productos', icon: CubeIcon, path: '/products' },
    { name: 'Categorías', icon: TagIcon, path: '/categories' },
    { name: 'Planes', icon: DocumentTextIcon, path: '/plans' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
            <div className="flex flex-col flex-grow px-4">
              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.path)}
                    className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 group w-full"
                  >
                    <item.icon className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </button>
                ))}
              </nav>
              <div className="flex-shrink-0 block w-full">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 group w-full"
                >
                  <ArrowLeftOnRectangleIcon className="w-6 h-6 mr-3 text-red-400 group-hover:text-red-500" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;