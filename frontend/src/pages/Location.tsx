import React, { useState } from 'react';
import { Search, MapPin, Bed, Bath, Square, Filter, SlidersHorizontal } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailsModal from '../components/PropertyDetailsModal';
import RequestModal from '../components/RequestModal';
import { properties } from '../data/properties';
import { Property } from '../types/Property';

const LocationPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestProperty, setRequestProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    region: '',
    budget: '',
    bedrooms: '',
    type: ''
  });

  // Filtrer uniquement les biens en location
  const locationProperties = properties.filter(property => property.type === 'Location');

  const filteredProperties = locationProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = !filters.region || property.location.toLowerCase().includes(filters.region.toLowerCase());
    const matchesBedrooms = !filters.bedrooms || property.bedrooms?.toString() === filters.bedrooms;
    
    return matchesSearch && matchesRegion && matchesBedrooms;
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
    { value: '0-500000', label: '0 - 500,000 GNF' },
    { value: '500000-1000000', label: '500,000 - 1,000,000 GNF' },
    { value: '1000000-2000000', label: '1,000,000 - 2,000,000 GNF' },
    { value: '2000000+', label: '2,000,000+ GNF' }
  ];

  const handleRentRequest = (property: Property) => {
    setRequestProperty(property);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Trouvez votre location idéale</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Découvrez notre sélection de maisons et appartements à louer en Guinée
          </p>
        </div>
      </section>

      {/* Filtres */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Recherche */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par titre ou localisation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Région */}
              <div>
                <select
                  value={filters.region}
                  onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Tous les budgets</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Chambres */}
              <div>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Toutes chambres</option>
                  <option value="1">1 chambre</option>
                  <option value="2">2 chambres</option>
                  <option value="3">3 chambres</option>
                  <option value="4">4+ chambres</option>
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
              {filteredProperties.length} bien{filteredProperties.length > 1 ? 's' : ''} en location
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Trier par :</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                      onClick={() => handleRentRequest(property)}
                      className="w-full bg-emerald-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg"
                    >
                      Louer ce bien
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
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Conseils pour votre location
            </h2>
            <p className="text-xl text-gray-600">
              Nos experts vous accompagnent dans votre recherche
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Choisissez le bon quartier</h3>
              <p className="text-gray-600">Proximité des transports, écoles et commerces</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Négociez le prix</h3>
              <p className="text-gray-600">Nos agents vous aident à obtenir le meilleur tarif</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter size={32} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vérifiez les détails</h3>
              <p className="text-gray-600">État du bien, charges incluses, durée du bail</p>
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

      {/* Modal de demande de location */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        property={requestProperty}
        requestType="location"
      />
    </div>
  );
};

export default LocationPage;