import React, { useState } from 'react';
import { Search, MapPin, Ruler, TrendingUp, Shield } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import RequestModal from '../components/RequestModal';
import { properties } from '../data/properties';
import { Property } from '../types/Property';

const ParcellesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestProperty, setRequestProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    budget: '',
    surface: ''
  });

  // Filtrer uniquement les parcelles (on peut identifier par le titre ou créer un type spécifique)
  const parcelles = properties.filter(property => 
    property.title.toLowerCase().includes('parcelle') || 
    property.title.toLowerCase().includes('terrain') ||
    !property.bedrooms // Les parcelles n'ont pas de chambres
  );

  const filteredParcelles = parcelles.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = !filters.region || property.location.toLowerCase().includes(filters.region.toLowerCase());
    
    return matchesSearch && matchesRegion;
  });

  const regions = [
    'Conakry',
    'Kindia', 
    'Boké',
    'Labé',
    'Nzérékoré',
    'Kankan',
    'Mamou',
    'Faranah'
  ];

  const budgetRanges = [
    { value: '0-5000000', label: '0 - 5M GNF' },
    { value: '5000000-15000000', label: '5M - 15M GNF' },
    { value: '15000000-30000000', label: '15M - 30M GNF' },
    { value: '30000000+', label: '30M+ GNF' }
  ];

  const surfaceRanges = [
    { value: '0-500', label: '0 - 500m²' },
    { value: '500-1000', label: '500 - 1000m²' },
    { value: '1000-2000', label: '1000 - 2000m²' },
    { value: '2000+', label: '2000m²+' }
  ];

  const handleParcelRequest = (property: Property) => {
    setRequestProperty(property);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Parcelles et terrains à vendre</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Investissez dans le foncier guinéen avec nos meilleures parcelles constructibles
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Recherche */}
              <div>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher une parcelle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Région */}
              <div>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Toutes les régions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <select
                  value={filters.budget}
                  onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Tous les budgets</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Surface */}
              <div>
                <select
                  value={filters.surface}
                  onChange={(e) => setFilters({ ...filters, surface: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Toutes surfaces</option>
                  {surfaceRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredParcelles.length} parcelle{filteredParcelles.length > 1 ? 's' : ''} disponible{filteredParcelles.length > 1 ? 's' : ''}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Trier par :</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Surface croissante</option>
                <option>Surface décroissante</option>
              </select>
            </div>
          </div>

          {filteredParcelles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredParcelles.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => handleParcelRequest(property)}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                    >
                      Demander infos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune parcelle trouvée</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Guide d'investissement foncier */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Guide d'investissement foncier
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce qu'il faut savoir avant d'acheter une parcelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vérifiez les titres</h3>
              <p className="text-gray-600">Assurez-vous de la légalité et de la propriété du terrain</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruler size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mesurage précis</h3>
              <p className="text-gray-600">Vérification des dimensions et bornage du terrain</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Potentiel d'investissement</h3>
              <p className="text-gray-600">Analyse du développement futur de la zone</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal des détails */}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {/* Modal de demande d'information */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        property={requestProperty}
        requestType="parcelle"
      />
    </div>
  );
};

export default ParcellesPage;