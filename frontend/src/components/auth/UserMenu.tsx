import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Heart, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {getInitials(user.name)}
          </div>
        )}
        <span className="hidden md:block text-gray-700 font-medium">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {getInitials(user.name)}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                {user.provider === 'google' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 mt-1">
                    Compte Google
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
              <Home size={16} />
              <span>Mes annonces</span>
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
              <Heart size={16} />
              <span>Favoris</span>
            </button>
            <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700">
              <Settings size={16} />
              <span>Paramètres</span>
            </button>
          </div>

          {/* Logout */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-red-600"
            >
              <LogOut size={16} />
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;