import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import PropertyCard from '../components/PropertyCard';
import PropertyModal from '../components/PropertyModal';
import { Property } from '../types';
import { Plus, Search, Grid, List, Building2 } from 'lucide-react';

export default function Properties() {
  const { state, dispatch } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>();
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    return state.properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || property.type === filterType;
      const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [state.properties, searchTerm, filterType, filterStatus]);

  const handleCreateProperty = () => {
    setSelectedProperty(undefined);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleViewProperty = (property: Property) => {
    setSelectedProperty(property);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteProperty = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      dispatch({ type: 'DELETE_PROPERTY', payload: id });
    }
  };

  const handleToggleStatus = (id: string) => {
    dispatch({ type: 'TOGGLE_PROPERTY_STATUS', payload: id });
  };

  const handleSaveProperty = (property: Property) => {
    if (modalMode === 'create') {
      dispatch({ type: 'ADD_PROPERTY', payload: property });
    } else {
      dispatch({ type: 'UPDATE_PROPERTY', payload: property });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des annonces</h1>
          <p className="text-gray-600 mt-1">{filteredProperties.length} annonce(s) trouvée(s)</p>
        </div>
        <button
          onClick={handleCreateProperty}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle annonce
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, ville ou adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="w-full lg:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les types</option>
              <option value="apartment">Appartement</option>
              <option value="house">Maison</option>
              <option value="commercial">Commercial</option>
              <option value="land">Terrain</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="pending">En cours</option>
              <option value="sold">Vendu</option>
              <option value="rented">Loué</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune annonce trouvée</h3>
          <p className="text-gray-600 mb-6">Aucune annonce ne correspond à vos critères de recherche.</p>
          <button
            onClick={handleCreateProperty}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Créer la première annonce
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }>
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={handleViewProperty}
              onEdit={handleEditProperty}
              onDelete={handleDeleteProperty}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Property Modal */}
      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={selectedProperty}
        onSave={handleSaveProperty}
        mode={modalMode}
      />
    </div>
  );
}