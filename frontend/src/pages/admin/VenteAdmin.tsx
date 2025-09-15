import React, { useState, useMemo } from "react";
import { useApp } from "../../contexts/AppContext";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  X,
} from "lucide-react";

interface Vente {
  id: string;
  bienImmobilier: string;
  client: string;
  typeVente: "vente" | "location" | "cession";
  montant: number;
  statut: "en cours" | "finalisée" | "annulée";
  dateTransaction: string;
}

export default function VenteAdmin() {
  const { state, dispatch } = useApp();
  const ventes = (state as any).ventes || ([] as Vente[]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "toutes" | "en cours" | "finalisée" | "annulée"
  >("toutes");
  const [editingVente, setEditingVente] = useState<Vente | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filteredVentes = useMemo(() => {
    return ventes.filter((v) => {
      const matchesSearch =
        v.bienImmobilier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.client.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "toutes" || v.statut === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [ventes, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    const current = ventes.find((v) => v.id === id);
    if (!current) return;
    let newStatus: Vente["statut"] = "en cours";
    if (current.statut === "en cours") newStatus = "finalisée";
    else if (current.statut === "finalisée") newStatus = "annulée";
    else if (current.statut === "annulée") newStatus = "en cours";

    dispatch({
      type: "UPDATE_VENTE",
      payload: { ...current, statut: newStatus },
    });
  };

  const handleDeleteVente = (id: string) => {
    if (window.confirm("Confirmer la suppression de cette vente ?")) {
      dispatch({ type: "DELETE_VENTE", payload: id });
    }
  };

  const handleEditVente = (vente: Vente) => {
    setEditingVente({ ...vente });
    setIsCreating(false);
  };

  const handleCreateVente = () => {
    setEditingVente({
      id: "",
      bienImmobilier: "",
      client: "",
      typeVente: "vente",
      montant: 0,
      statut: "en cours",
      dateTransaction: new Date().toISOString().split("T")[0],
    });
    setIsCreating(true);
  };

  const handleSaveVente = () => {
    if (!editingVente) return;
    if (isCreating) {
      const newVente = {
        ...editingVente,
        id: Date.now().toString(),
        dateTransaction: new Date().toISOString().split("T")[0],
      };
      dispatch({ type: "ADD_VENTE", payload: newVente });
    } else {
      dispatch({ type: "UPDATE_VENTE", payload: editingVente });
    }
    setEditingVente(null);
    setIsCreating(false);
  };

  const statusLabels: Record<Vente["statut"], string> = {
    "en cours": "En cours",
    finalisée: "Finalisée",
    annulée: "Annulée",
  };

  const statusColors: Record<Vente["statut"], string> = {
    "en cours": "bg-blue-100 text-blue-800",
    finalisée: "bg-green-100 text-green-800",
    annulée: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des ventes immobilières</h1>
          <p className="text-gray-600 mt-1">{filteredVentes.length} vente(s) trouvée(s)</p>
        </div>
        <button
          onClick={handleCreateVente}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle vente
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par bien immobilier ou client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="w-full lg:w-52">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value as "toutes" | "en cours" | "finalisée" | "annulée"
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="toutes">Tous les statuts</option>
              <option value="en cours">En cours</option>
              <option value="finalisée">Finalisée</option>
              <option value="annulée">Annulée</option>
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
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de transaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant (GNF)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de transaction
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
              {(filteredVentes || []).map((vente: Vente) => (
                <tr key={vente.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vente.bienImmobilier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vente.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vente.typeVente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vente.montant.toLocaleString("fr-GN")} GNF</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{vente.dateTransaction}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[vente.statut as keyof typeof statusColors]
                      }`}
                    >
                      {statusLabels[vente.statut as keyof typeof statusLabels]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditVente(vente)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(vente.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          vente.statut === "en cours"
                            ? "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                            : vente.statut === "finalisée"
                            ? "text-gray-600 hover:text-green-600 hover:bg-green-50"
                            : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title="Changer le statut"
                      >
                        {vente.statut === "finalisée" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteVente(vente.id)}
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

      {editingVente && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setEditingVente(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? "Nouvelle vente immobilière" : "Modifier la vente immobilière"}
                </h3>
                <button
                  onClick={() => setEditingVente(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bien immobilier
                  </label>
                  <input
                    type="text"
                    value={editingVente!.bienImmobilier}
                    onChange={(e) =>
                      setEditingVente((prev) =>
                        prev ? { ...prev, bienImmobilier: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={editingVente!.client}
                    onChange={(e) =>
                      setEditingVente((prev) =>
                        prev ? { ...prev, client: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de transaction
                  </label>
                  <select
                    value={editingVente!.typeVente}
                    onChange={(e) =>
                      setEditingVente((prev) =>
                        prev ? { ...prev, typeVente: e.target.value as Vente["typeVente"] } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="vente">Vente</option>
                    <option value="location">Location</option>
                    <option value="cession">Cession</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Montant (GNF)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={editingVente!.montant}
                    onChange={(e) =>
                      setEditingVente((prev) =>
                        prev ? { ...prev, montant: Number(e.target.value) } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={editingVente!.statut}
                    onChange={(e) =>
                      setEditingVente((prev) =>
                        prev ? { ...prev, statut: e.target.value as Vente["statut"] } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="en cours">En cours</option>
                    <option value="finalisée">Finalisée</option>
                    <option value="annulée">Annulée</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingVente(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveVente}
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
