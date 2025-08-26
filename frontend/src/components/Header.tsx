import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#' },
    { name: 'Location', href: '#' },
    { name: 'Achat', href: '#' },
    { name: 'Vente', href: '#' },
    { name: 'Parcelles', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {/* <img src="/images/Lo.png" alt="Logo LogeFacile" className="h-12 w-auto" /> */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-emerald-600">LogeFacile</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium flex items-center gap-2 transition-colors duration-200">
              <LogIn size={16} />
              Connexion
            </button>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2">
              <User size={16} />
              Inscription
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 inline-flex items-center justify-center p-2 rounded-md"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-emerald-600 block px-3 py-2 text-base font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="border-t pt-4 pb-3">
              <button className="text-gray-700 hover:text-emerald-600 block px-3 py-2 text-base font-medium w-full text-left">
                Connexion
              </button>
              <button className="bg-emerald-600 text-white block px-3 py-2 rounded-lg text-base font-medium hover:bg-emerald-700 mx-3 mt-2">
                Inscription
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;