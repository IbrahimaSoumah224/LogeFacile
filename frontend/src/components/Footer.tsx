import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">LogeFacile</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour tous vos projets immobiliers en Guinée. 
              Nous vous accompagnons dans l'achat, la vente et la location de biens immobiliers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin size={18} className="text-emerald-400 mr-3" />
                <span className="text-gray-300">Quartier Dixinn Centre, Commune de Dixinn, Conakry</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="text-emerald-400 mr-3" />
                <span className="text-gray-300">+224 624 314 032</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="text-emerald-400 mr-3" />
                <span className="text-gray-300">isoumah644@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              {['Accueil', 'Location', 'Achat', 'Vente', 'Parcelles', 'À propos'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos services</h4>
            <ul className="space-y-2">
              {[
                'Estimation gratuite',
                'Conseil immobilier',
                'Gestion locative',
                'Investissement',
                'Financement',
                'Support client'
              ].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <span className="text-gray-300">Suivez-nous :</span>
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/ibrahima-soumah-209640249', label: 'LinkedIn' }
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200"
            >
              <span>Retour en haut</span>
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 LogeFacile. Tous droits réservés.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                Mentions légales
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                Conditions d'utilisation
              </a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-200">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;