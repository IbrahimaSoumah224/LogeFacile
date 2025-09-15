import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  Users, 
  MessageSquare, 
  FileText, 
  Menu, 
  X,
  LogOut,
  Settings,
  LayoutDashboard,
  ShoppingCart,
  DollarSign,
  UserCheck,
  MapPin,
  Database
} from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Tableau de bord', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Location', href: '/admin/locationadmin', icon: Building2 },
  { name: 'Demandes', href: '/admin/demandeadmin', icon: MessageSquare },
  { name: 'Achat', href: '/admin/achatadmin', icon: ShoppingCart },
  { name: 'Vente', href: '/admin/venteadmin', icon: DollarSign },
  { name: 'Promoteurs', href: '/admin/promoteuradmin', icon: UserCheck },
  { name: 'Parcelles', href: '/admin/parcellesadmin', icon: MapPin },
  { name: 'Utilisateurs', href: '/admin/utilisateursadmin', icon: Users },
  { name: 'Back up', href: '/admin/backup', icon: Database },
  { name: 'Historiques', href: '/admin/historiqueadmin', icon: FileText }
];

interface LayoutProps {
  children?: React.ReactNode; // children non utilisé en pratique
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            {/* <h1 className="text-xl font-bold text-gray-900">Admin Immobilier</h1> */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 shadow-sm">
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
                <img src="/images/Lo.svg" className='h-16 w-auto' alt="" srcset="" />
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">IB</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Ibrahima SOUMAH</p>
                <p className="text-xs text-gray-500 truncate">Administrateur</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                <Settings className="h-4 w-4 mr-1" />
                Paramètres
              </button>
              <button className="flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {/* <img src="/images/Lo.svg" alt="" srcset="" /> */}
                LogeFacile
              </h2>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">IB</span>
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">Ibrahima SOUMAH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Supprime {children}, garder uniquement Outlet */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
