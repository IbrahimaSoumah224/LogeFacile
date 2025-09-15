import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Location } from '../../types/location'; 
import { Search, Plus, Edit, Trash2, MapPin, X } from 'lucide-react';

export default function LocationAdmin() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Utiliser state.locations comme source de vérité
  const locations = state.locations;

  const filteredLocations = useMemo(() => {
    return locations.filter(location => {
      const matchesSearch =
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (location.description && location.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = filterStatus === 'all' || location.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [locations, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    dispatch({ type: 'TOGGLE_LOCATION_STATUS', payload: id });
  };

  const handleDeleteLocation = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette location ?')) {
      dispatch({ type: 'DELETE_LOCATION', payload: id });
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation({ ...location });
    setIsCreating(false);
  };

  const handleCreateLocation = () => {
    setEditingLocation({
      id: '',
      address: '',
      description: '',
      price: 0,
      status: 'available',
      createdAt: new Date().toISOString().split('T')[0],
    });
    setIsCreating(true);
  };

  const handleSaveLocation = () => {
    if (editingLocation) {
      if (isCreating) {
        const newLocation = {
          ...editingLocation,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
        };
        dispatch({ type: 'ADD_LOCATION', payload: newLocation });
      } else {
        dispatch({ type: 'UPDATE_LOCATION', payload: editingLocation });
      }
      setEditingLocation(null);
      setIsCreating(false);
    }
  };

  const statusLabels = {
    available: 'Disponible',
    rented: 'Loué',
    unavailable: 'Indisponible',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des locations</h1>
          <p className="text-gray-600 mt-1">{filteredLocations.length} location(s) trouvée(s)</p>
        </div>
        <button
          onClick={handleCreateLocation}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle location
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par adresse ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="rented">Loué</option>
              <option value="unavailable">Indisponible</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table des locations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">adresse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prenom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLocations.map((loc) => (
                <tr key={loc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loc.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loc.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{loc.price} GNF</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      loc.status === 'available' ? 'bg-green-100 text-green-800' :
                      loc.status === 'rented' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>{statusLabels[loc.status]}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditLocation(loc)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(loc.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          loc.status === 'available'
                            ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title={loc.status === 'available' ? 'Marquer comme non disponible' : 'Marquer comme disponible'}
                      >
                        <MapPin className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLocation(loc.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Ibrahima</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">soumah</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">624 31 40 32</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">isoumah644@gmail.com</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Création / Modification */}
      {editingLocation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setEditingLocation(null)} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? 'Nouvelle location' : 'Modifier la location'}
                </h3>
                <button
                  onClick={() => setEditingLocation(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input
                    type="text"
                    value={editingLocation!.address}
                    onChange={(e) => setEditingLocation(prev => prev ? { ...prev, address: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingLocation!.description}
                    onChange={(e) => setEditingLocation(prev => prev ? { ...prev, description: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix (GNF)</label>
                  <input
                    type="number"
                    value={editingLocation!.price}
                    onChange={(e) => setEditingLocation(prev => prev ? { ...prev, price: Number(e.target.value) } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={editingLocation!.status}
                    onChange={(e) => setEditingLocation(prev => prev ? { ...prev, status: e.target.value as Location['status']} : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="available">Disponible</option>
                    <option value="rented">Loué</option>
                    <option value="unavailable">Indisponible</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingLocation(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveLocation}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {isCreating ? 'Créer' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
