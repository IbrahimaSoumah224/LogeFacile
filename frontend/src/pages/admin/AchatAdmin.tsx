import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Plus, Edit, Trash2, DollarSign, X } from 'lucide-react';

// Interface Achat immobilière adaptée
interface Achat {
  id: string;
  bienImmobilier: string;   // référence ou adresse bien
  acheteur: string;         // nom de l’acheteur
  montant: number;          // montant en GNF
  statut: 'en attente' | 'complété' | 'annulé';
  dateAchat: string;        // format ISO
}

export default function AchatAdmin() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('tous');
  const [editingAchat, setEditingAchat] = useState<Achat | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const achats = (state as any).achats || ([] as Achat[]);

  const filteredAchats = useMemo(() => {
    return achats.filter(achat => {
      const matchesSearch =
        achat.bienImmobilier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achat.acheteur.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'tous' || achat.statut === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [achats, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    dispatch({ type: 'TOGGLE_ACHAT_STATUS', payload: id }); // à gérer dans reducer
  };

  const handleDeleteAchat = (id: string) => {
    if (window.confirm('Confirmer la suppression de cet achat ?')) {
      dispatch({ type: 'DELETE_ACHAT', payload: id }); // à gérer dans reducer
    }
  };

  const handleEditAchat = (achat: Achat) => {
    setEditingAchat({ ...achat });
    setIsCreating(false);
  };

  const handleCreateAchat = () => {
    setEditingAchat({
      id: '',
      bienImmobilier: '',
      acheteur: '',
      montant: 0,
      statut: 'en attente',
      dateAchat: new Date().toISOString().split('T')[0],
    });
    setIsCreating(true);
  };

  const handleSaveAchat = () => {
    if (editingAchat) {
      if (isCreating) {
        const newAchat = {
          ...editingAchat,
          id: Date.now().toString(),
          dateAchat: new Date().toISOString().split('T')[0],
        };
        dispatch({ type: 'ADD_ACHAT', payload: newAchat }); // à gérer dans reducer
      } else {
        dispatch({ type: 'UPDATE_ACHAT', payload: editingAchat }); // à gérer dans reducer
      }
      setEditingAchat(null);
      setIsCreating(false);
    }
  };

  const statusLabels = {
    'en attente': 'En attente',
    complété: 'Complété',
    annulé: 'Annulé',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des achats immobiliers</h1>
          <p className="text-gray-600 mt-1">{filteredAchats.length} achat(s) trouvé(s)</p>
        </div>
        <button
          onClick={handleCreateAchat}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvel achat
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par bien immobilier ou acheteur..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="tous">Tous les statuts</option>
              <option value="en attente">En attente</option>
              <option value="complété">Complété</option>
              <option value="annulé">Annulé</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bien immobilier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acheteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant (GNF)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAchats.map(achat => (
                <tr key={achat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{achat.bienImmobilier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{achat.acheteur}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{achat.montant.toLocaleString('fr-GN')} GNF</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        achat.statut === 'en attente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : achat.statut === 'complété'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {statusLabels[achat.statut]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditAchat(achat)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(achat.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          achat.statut === 'en attente'
                            ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title={achat.statut === 'en attente' ? 'Marquer comme complété' : 'Marquer comme en attente'}
                      >
                        <DollarSign className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAchat(achat.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Supprimer"
                      >
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

      {editingAchat && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setEditingAchat(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? 'Nouvel achat immobilier' : "Modifier l'achat immobilier"}
                </h3>
                <button
                  onClick={() => setEditingAchat(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bien immobilier</label>
                  <input
                    type="text"
                    value={editingAchat!.bienImmobilier}
                    onChange={e =>
                      setEditingAchat(prev =>
                        prev ? { ...prev, bienImmobilier: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Acheteur</label>
                  <input
                    type="text"
                    value={editingAchat!.acheteur}
                    onChange={e =>
                      setEditingAchat(prev =>
                        prev ? { ...prev, acheteur: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Montant (GNF)</label>
                  <input
                    type="number"
                    min={0}
                    value={editingAchat!.montant}
                    onChange={e =>
                      setEditingAchat(prev =>
                        prev ? { ...prev, montant: Number(e.target.value) } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={editingAchat!.statut}
                    onChange={e =>
                      setEditingAchat(prev =>
                        prev ? { ...prev, statut: e.target.value as Achat['statut'] } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="en attente">En attente</option>
                    <option value="complété">Complété</option>
                    <option value="annulé">Annulé</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingAchat(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveAchat}
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
