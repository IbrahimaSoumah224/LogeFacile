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

interface Demande {
  id: string;
  sujet: string;
  demandeur: string;
  description: string;
  status: "ouverte" | "traitée" | "fermée";
  dateDemande: string; // Date au format ISO YYYY-MM-DD
}

export default function DemandeAdmin() {
  const { state, dispatch } = useApp();
  // Supposons que les demandes sont dans state.demandes (adapte le contexte)
  const demandes = (state as any).demandes || ([] as Demande[]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "toutes" | "ouverte" | "traitée" | "fermée"
  >("toutes");
  const [editingDemande, setEditingDemande] = useState<Demande | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filteredDemandes = useMemo(() => {
    return demandes.filter((d) => {
      const matchesSearch =
        d.sujet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.demandeur.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "toutes" || d.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [demandes, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    // Change statut cycliquement : ouverte -> traitée -> fermée -> ouverte
    const current = demandes.find((d) => d.id === id);
    if (!current) return;
    let newStatus: Demande["status"] = "ouverte";
    if (current.status === "ouverte") newStatus = "traitée";
    else if (current.status === "traitée") newStatus = "fermée";
    else if (current.status === "fermée") newStatus = "ouverte";

    dispatch({
      type: "UPDATE_DEMANDE",
      payload: { ...current, status: newStatus },
    });
  };

  const handleDeleteDemande = (id: string) => {
    if (window.confirm("Confirmer la suppression de cette demande ?")) {
      dispatch({ type: "DELETE_DEMANDE", payload: id });
    }
  };

  const handleEditDemande = (demande: Demande) => {
    setEditingDemande({ ...demande });
    setIsCreating(false);
  };

  const handleCreateDemande = () => {
    setEditingDemande({
      id: "",
      sujet: "",
      demandeur: "",
      description: "",
      status: "ouverte",
      dateDemande: new Date().toISOString().split("T")[0],
    });
    setIsCreating(true);
  };

  const handleSaveDemande = () => {
    if (!editingDemande) return;
    if (isCreating) {
      const newDemande = {
        ...editingDemande,
        id: Date.now().toString(),
        dateDemande: new Date().toISOString().split("T")[0],
      };
      dispatch({ type: "ADD_DEMANDE", payload: newDemande });
    } else {
      dispatch({ type: "UPDATE_DEMANDE", payload: editingDemande });
    }
    setEditingDemande(null);
    setIsCreating(false);
  };

  // Typage explicite pour lever l'erreur TypeScript
  const statusLabels: Record<Demande["status"], string> = {
    ouverte: "Ouverte",
    traitée: "Traitée",
    fermée: "Fermée",
  };

  const statusColors: Record<Demande["status"], string> = {
    ouverte: "bg-blue-100 text-blue-800",
    traitée: "bg-yellow-100 text-yellow-800",
    fermée: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des demandes
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredDemandes.length} demande(s) trouvée(s)
          </p>
        </div>
        <button
          onClick={handleCreateDemande}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvelle demande
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par sujet ou demandeur..."
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
                  e.target.value as "toutes" | "ouverte" | "traitée" | "fermée"
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="toutes">Toutes les statuses</option>
              <option value="ouverte">Ouverte</option>
              <option value="traitée">Traitée</option>
              <option value="fermée">Fermée</option>
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
                  Sujet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Demandeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {(filteredDemandes || []).map((demande: Demande) => (
                <tr
                  key={demande.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {demande.sujet}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {demande.demandeur}
                  </td>
                  <td className="px-6 py-4 max-w-xs text-sm text-gray-700 truncate">
                    {demande.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {demande.dateDemande}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[
                          demande.status as keyof typeof statusColors
                        ]
                      }`}
                    >
                      {
                        statusLabels[
                          demande.status as keyof typeof statusLabels
                        ]
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditDemande(demande)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(demande.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          demande.status === "ouverte"
                            ? "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                            : demande.status === "traitée"
                            ? "text-gray-600 hover:text-green-600 hover:bg-green-50"
                            : "text-gray-600 hover:text-gray-600 hover:bg-gray-50"
                        }`}
                        title="Changer le statut"
                      >
                        {demande.status === "traitée" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteDemande(demande.id)}
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

      {editingDemande && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setEditingDemande(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? "Nouvelle demande" : "Modifier la demande"}
                </h3>
                <button
                  onClick={() => setEditingDemande(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={editingDemande!.sujet}
                    onChange={(e) =>
                      setEditingDemande((prev) =>
                        prev ? { ...prev, sujet: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Demandeur
                  </label>
                  <input
                    type="text"
                    value={editingDemande!.demandeur}
                    onChange={(e) =>
                      setEditingDemande((prev) =>
                        prev ? { ...prev, demandeur: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingDemande!.description}
                    onChange={(e) =>
                      setEditingDemande((prev) =>
                        prev ? { ...prev, description: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={editingDemande!.status}
                    onChange={(e) =>
                      setEditingDemande((prev) =>
                        prev
                          ? {
                              ...prev,
                              status: e.target.value as Demande["status"],
                            }
                          : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="ouverte">Ouverte</option>
                    <option value="traitée">Traitée</option>
                    <option value="fermée">Fermée</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingDemande(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveDemande}
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
