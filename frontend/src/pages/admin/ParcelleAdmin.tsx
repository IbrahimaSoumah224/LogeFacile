import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Plus, Edit, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

interface Parcelle {
  id: string;
  reference: string;           // Référence ou numéro de parcelle
  adresse: string;             // Adresse ou localisation
  superficie: number;          // Superficie en mètres carrés
  proprietaire: string;        // Nom du propriétaire
  statut: 'disponible' | 'vendue' | 'réservée'; // Statut de la parcelle
  dateEnregistrement: string; // Date d'enregistrement (ISO)
}

const ParcelleAdmin: React.FC = () => {
  const { state, dispatch } = useApp();
  const parcelles = (state as any).parcelles || ([] as Parcelle[]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'tous' | 'disponible' | 'vendue' | 'réservée'>('tous');
  const [editingParcelle, setEditingParcelle] = useState<Parcelle | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const filteredParcelles = useMemo(() => {
    return parcelles.filter(p => {
      const matchesSearch =
        p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.proprietaire.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'tous' || p.statut === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [parcelles, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    const current = parcelles.find(p => p.id === id);
    if (!current) return;
    let newStatus: Parcelle['statut'] = 'disponible';
    if (current.statut === 'disponible') newStatus = 'réservée';
    else if (current.statut === 'réservée') newStatus = 'vendue';
    else if (current.statut === 'vendue') newStatus = 'disponible';

    dispatch({
      type: 'UPDATE_PARCELLE',
      payload: { ...current, statut: newStatus },
    });
  };

  const handleDeleteParcelle = (id: string) => {
    if (window.confirm('Confirmer la suppression de cette parcelle ?')) {
      dispatch({ type: 'DELETE_PARCELLE', payload: id });
    }
  };

  const handleEditParcelle = (parcelle: Parcelle) => {
    setEditingParcelle({ ...parcelle });
    setIsCreating(false);
  };

  const handleCreateParcelle = () => {
    setEditingParcelle({
      id: '',
      reference: '',
      adresse: '',
      superficie: 0,
      proprietaire: '',
      statut: 'disponible',
      dateEnregistrement: new Date().toISOString().split('T')[0],
    });
    setIsCreating(true);
  };

  const handleSaveParcelle = () => {
    if (!editingParcelle) return;
    if (isCreating) {
      const newParcelle = {
        ...editingParcelle,
        id: Date.now().toString(),
        dateEnregistrement: new Date().toISOString().split('T')[0],
      };
      dispatch({ type: 'ADD_PARCELLE', payload: newParcelle });
    } else {
      dispatch({ type: 'UPDATE_PARCELLE', payload: editingParcelle });
    }
    setEditingParcelle(null);
    setIsCreating(false);
  };

  const statusLabels: Record<Parcelle['statut'], string> = {
    disponible: 'Disponible',
    vendue: 'Vendue',
    réservée: 'Réservée',
  };

  const statusColors: Record<Parcelle['statut'], string> = {
    disponible: 'bg-green-100 text-green-800',
    vendue: 'bg-red-100 text-red-800',
    réservée: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des parcelles</h1>
          <p className="text-gray-600 mt-1">{filteredParcelles.length} parcelle(s) trouvée(s)</p>
        </div>
        <button
          onClick={handleCreateParcelle}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle parcelle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par référence, adresse ou propriétaire..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as Parcelle['statut'] | 'tous')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="tous">Tous les statuts</option>
              <option value="disponible">Disponible</option>
              <option value="vendue">Vendue</option>
              <option value="réservée">Réservée</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Superficie (m²)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriétaire</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date d'enregistrement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParcelles.map((parcelle: Parcelle) => (
                <tr key={parcelle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{parcelle.reference}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcelle.adresse}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcelle.superficie}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcelle.proprietaire}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parcelle.dateEnregistrement}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[parcelle.statut as keyof typeof statusColors]}`}>
                      {statusLabels[parcelle.statut as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => handleEditParcelle(parcelle)} className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Modifier">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleToggleStatus(parcelle.id)} className={`p-2 rounded-lg transition-colors ${parcelle.statut === 'disponible' ? 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50' : parcelle.statut === 'vendue' ? 'text-gray-600 hover:text-green-600 hover:bg-green-50' : 'text-gray-600 hover:text-gray-600 hover:bg-gray-50'}`} title="Changer le statut">
                        {parcelle.statut === 'vendue' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                      </button>
                      <button onClick={() => handleDeleteParcelle(parcelle.id)} className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingParcelle && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setEditingParcelle(null)} />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{isCreating ? 'Nouvelle parcelle' : 'Modifier la parcelle'}</h3>
                <button onClick={() => setEditingParcelle(null)} className="text-gray-400 hover:text-gray-600 transition-colors"><X className="h-6 w-6" /></button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Référence</label>
                  <input type="text" value={editingParcelle!.reference} onChange={e => setEditingParcelle(prev => prev ? { ...prev, reference: e.target.value } : null)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                  <input type="text" value={editingParcelle!.adresse} onChange={e => setEditingParcelle(prev => prev ? { ...prev, adresse: e.target.value } : null)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Superficie (m²)</label>
                  <input type="number" min={0} value={editingParcelle!.superficie} onChange={e => setEditingParcelle(prev => prev ? { ...prev, superficie: Number(e.target.value) } : null)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Propriétaire</label>
                  <input type="text" value={editingParcelle!.proprietaire} onChange={e => setEditingParcelle(prev => prev ? { ...prev, proprietaire: e.target.value } : null)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select value={editingParcelle!.statut} onChange={e => setEditingParcelle(prev => prev ? { ...prev, statut: e.target.value as Parcelle['statut'] } : null)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="disponible">Disponible</option>
                    <option value="vendue">Vendue</option>
                    <option value="réservée">Réservée</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button type="button" onClick={() => setEditingParcelle(null)} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Annuler</button>
                <button onClick={handleSaveParcelle} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">{isCreating ? 'Créer' : 'Sauvegarder'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParcelleAdmin;
