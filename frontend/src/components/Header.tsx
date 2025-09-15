import React, { useState } from "react";
import { Menu, X, User, LogIn, Home, MapPin, Building, Landmark, Phone } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./auth/AuthModal";
import { Link } from "react-router-dom";
import Users from "../pages/Users";

// Suppression de l'import Users (qui n'existe pas dans lucide-react)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { user } = useAuth();

  const navItems = [
    { name: "Accueil", href: "/", icon: Home },
    { name: "Location", href: "/Location", icon: MapPin },
    { name: "Achat", href: "/Achat", icon: Building },
    { name: "Vente", href: "/Vente", icon: Landmark },
    { name: "Parcelles", href: "/Parcelles", icon: MapPin },
    { name: "Contact", href: "/Contact", icon: Phone },
    { name: "Promoteurs", href: "/Promoteurs", icon: User }, // Users non valide dans lucide-react
    { name: "Login", href: "/Login" }
  ];

  const openAuthModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <img
              src="/images/Lo.svg"
              alt="Logo LogeFacile"
              className="h-16 w-auto"
            />
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    to={href}
                    className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {Icon && <Icon size={16} />}
                    <span>{name}</span>
                  </Link>
                ))}
              </div>
            </nav>
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
              {navItems.map(({ name, href }) => (
                <Link
                  key={name}
                  to={href}
                  className="text-gray-700 hover:text-emerald-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
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
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
