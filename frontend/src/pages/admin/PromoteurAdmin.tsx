import React, { useState, useMemo } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Plus, Edit, Trash2, X, XCircle, CheckCircle } from 'lucide-react';

interface Promoteur {
  id: string;
  nom: string;             // Nom du promoteur
  contact: string;         // Téléphone ou email
  adresseSiege: string;    // Adresse siége administratif
  nombreProjets: number;   // Nombre de projets en cours
  statut: 'actif' | 'inactif' | 'suspendu'; // Statut du promoteur
  dateInscription: string; // Date ISO d’inscription
}

export default function PromoteurAdmin() {
  const { state, dispatch } = useApp();
  const promoteurs = (state as any).promoteurs || ([] as Promoteur[]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'tous' | 'actif' | 'inactif' | 'suspendu'>('tous');
  const [editingPromoteur, setEditingPromoteur] = useState<Promoteur | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filteredPromoteurs = useMemo(() => {
    return promoteurs.filter(p => {
      const matchesSearch =
        p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.adresseSiege.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'tous' || p.statut === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [promoteurs, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    const current = promoteurs.find(p => p.id === id);
    if (!current) return;
    let newStatus: Promoteur['statut'] = 'actif';
    if (current.statut === 'actif') newStatus = 'inactif';
    else if (current.statut === 'inactif') newStatus = 'suspendu';
    else if (current.statut === 'suspendu') newStatus = 'actif';

    dispatch({
      type: 'UPDATE_PROMOTEUR',
      payload: { ...current, statut: newStatus },
    });
  };

  const handleDeletePromoteur = (id: string) => {
    if (window.confirm('Confirmer la suppression de ce promoteur ?')) {
      dispatch({ type: 'DELETE_PROMOTEUR', payload: id });
    }
  };

  const handleEditPromoteur = (promoteur: Promoteur) => {
    setEditingPromoteur({ ...promoteur });
    setIsCreating(false);
  };

  const handleCreatePromoteur = () => {
    setEditingPromoteur({
      id: '',
      nom: '',
      contact: '',
      adresseSiege: '',
      nombreProjets: 0,
      statut: 'actif',
      dateInscription: new Date().toISOString().split('T')[0],
    });
    setIsCreating(true);
  };

  const handleSavePromoteur = () => {
    if (!editingPromoteur) return;
    if (isCreating) {
      const newPromoteur = {
        ...editingPromoteur,
        id: Date.now().toString(),
        dateInscription: new Date().toISOString().split('T')[0],
      };
      dispatch({ type: 'ADD_PROMOTEUR', payload: newPromoteur });
    } else {
      dispatch({ type: 'UPDATE_PROMOTEUR', payload: editingPromoteur });
    }
    setEditingPromoteur(null);
    setIsCreating(false);
  };

  const statusLabels: Record<Promoteur['statut'], string> = {
    actif: 'Actif',
    inactif: 'Inactif',
    suspendu: 'Suspendu',
  };

  const statusColors: Record<Promoteur['statut'], string> = {
    actif: 'bg-green-100 text-green-800',
    inactif: 'bg-yellow-100 text-yellow-800',
    suspendu: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des promoteurs</h1>
          <p className="text-gray-600 mt-1">{filteredPromoteurs.length} promoteur(s) trouvé(s)</p>
        </div>
        <button
          onClick={handleCreatePromoteur}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau promoteur
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, contact ou adresse..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as Promoteur['statut'] | 'tous')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
              <option value="suspendu">Suspendu</option>
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
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Adresse siège
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre de projets
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
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
              {filteredPromoteurs.map((promoteur: Promoteur) => (
                <tr key={promoteur.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promoteur.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promoteur.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promoteur.adresseSiege}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promoteur.nombreProjets}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{promoteur.dateInscription}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[promoteur.statut as keyof typeof statusColors]
                      }`}
                    >
                      {statusLabels[promoteur.statut as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditPromoteur(promoteur)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(promoteur.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          promoteur.statut === "actif"
                            ? "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                            : promoteur.statut === "inactif"
                            ? "text-gray-600 hover:text-gray-600 hover:bg-gray-50"
                            : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title="Changer le statut"
                      >
                        {promoteur.statut === "inactif" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeletePromoteur(promoteur.id)}
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

      {editingPromoteur && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setEditingPromoteur(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? "Nouveau promoteur" : "Modifier le promoteur"}
                </h3>
                <button
                  onClick={() => setEditingPromoteur(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    value={editingPromoteur!.nom}
                    onChange={e =>
                      setEditingPromoteur(prev =>
                        prev ? { ...prev, nom: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                  <input
                    type="text"
                    value={editingPromoteur!.contact}
                    onChange={e =>
                      setEditingPromoteur(prev =>
                        prev ? { ...prev, contact: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adresse siège</label>
                  <input
                    type="text"
                    value={editingPromoteur!.adresseSiege}
                    onChange={e =>
                      setEditingPromoteur(prev =>
                        prev ? { ...prev, adresseSiege: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de projets</label>
                  <input
                    type="number"
                    min={0}
                    value={editingPromoteur!.nombreProjets}
                    onChange={e =>
                      setEditingPromoteur(prev =>
                        prev ? { ...prev, nombreProjets: Number(e.target.value) } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select
                    value={editingPromoteur!.statut}
                    onChange={e =>
                      setEditingPromoteur(prev =>
                        prev ? { ...prev, statut: e.target.value as Promoteur['statut'] } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="suspendu">Suspendu</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingPromoteur(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSavePromoteur}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {isCreating ? "Créer" : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
