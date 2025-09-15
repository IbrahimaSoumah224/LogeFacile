import React, { useState } from 'react';
import { Search, MapPin, TrendingUp, Calculator, PiggyBank } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import RequestModal from '../components/RequestModal';
import { properties } from '../data/properties';
import { Property } from '../types/Property';

const AchatPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestProperty, setRequestProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    budget: '',
    surface: '',
    type: ''
  });

  // Filtrer uniquement les biens en vente
  const saleProperties = properties.filter(property => property.type === 'Vente');

  const filteredProperties = saleProperties.filter(property => {
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
    { value: '0-10000000', label: '0 - 10M GNF' },
    { value: '10000000-25000000', label: '10M - 25M GNF' },
    { value: '25000000-50000000', label: '25M - 50M GNF' },
    { value: '50000000+', label: '50M+ GNF' }
  ];

  const handleBuyRequest = (property: Property) => {
    setRequestProperty(property);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Achetez votre bien immobilier</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Investissez dans l'immobilier guinéen avec nos meilleures offres de vente
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
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Région */}
              <div>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Toutes surfaces</option>
                  <option value="0-100">0 - 100m²</option>
                  <option value="100-200">100 - 200m²</option>
                  <option value="200-300">200 - 300m²</option>
                  <option value="300+">300m²+</option>
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
              {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} à vendre
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Trier par :</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Plus récent</option>
                <option>Surface</option>
              </select>
            </div>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => handleBuyRequest(property)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                    >
                      Acheter ce bien
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun bien trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Conseils d'investissement */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conseils pour votre achat immobilier
            </h2>
            <p className="text-xl text-gray-600">
              Nos experts vous accompagnent dans votre investissement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysez le marché</h3>
              <p className="text-gray-600">Étudiez les prix du quartier et les tendances</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculez votre budget</h3>
              <p className="text-gray-600">Incluez tous les frais : notaire, travaux, taxes</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Préparez le financement</h3>
              <p className="text-gray-600">Nous vous aidons avec les banques partenaires</p>
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

      {/* Modal de demande d'achat */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        property={requestProperty}
        requestType="achat"
      />
    </div>
  );
};

export default AchatPage;