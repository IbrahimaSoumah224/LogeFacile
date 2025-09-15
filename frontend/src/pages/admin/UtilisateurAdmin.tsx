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
import Utilisateur from "../../types/utilisateur";
import { useHistorique } from "../../hooks/useHistorique";
import type { HistoriqueEntry } from "../../hooks/useHistorique";

// interface Utilisateur {
//   id: string;
//   nom: string;
//   email: string;
//   roles: string[];             // Liste des rôles (ex: ["admin", "agent"])
//   statut: 'actif' | 'inactif' | 'suspendu'; // Statut de l'utilisateur
//   dateInscription: string;
// }

const rolesDisponibles = ["admin", "agent", "client"];

const UtilisateurAdmin: React.FC = () => {
  const { state, dispatch } = useApp();
  const utilisateur = state.utilisateurs || [];
  const utilisateurs = (state as any).utilisateurs || ([] as Utilisateur[]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<
    "tous" | "actif" | "inactif" | "suspendu"
  >("tous");
  const [editingUtilisateur, setEditingUtilisateur] =
    useState<Utilisateur | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { addEntry } = useHistorique<Utilisateur>("historique_utilisateurs");

  const filteredUtilisateurs = useMemo(() => {
    return utilisateurs.filter((u) => {
      const matchesSearch =
        u.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.roles.some((role) =>
          role.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus =
        filterStatus === "tous" || u.statut === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [utilisateurs, searchTerm, filterStatus]);

  const handleToggleStatus = (id: string) => {
    const current = utilisateurs.find((u) => u.id === id);
    if (!current) return;
    let newStatus: Utilisateur["statut"] = "actif";
    if (current.statut === "actif") newStatus = "inactif";
    else if (current.statut === "inactif") newStatus = "suspendu";
    else if (current.statut === "suspendu") newStatus = "actif";

    dispatch({
      type: "UPDATE_UTILISATEUR",
      payload: { ...current, statut: newStatus },
    });
  };
  //ici
  const handleDeleteUtilisateur = (id: string) => {
    if (window.confirm("Confirmer la suppression de cet utilisateur ?")) {
      dispatch({ type: "DELETE_UTILISATEUR", payload: id });
      addEntry("DELETE_UTILISATEUR", { id } as Utilisateur);
    }
  };

  //ici
  const handleEditUtilisateur = (utilisateur: Utilisateur) => {
    setEditingUtilisateur({ ...utilisateur });
    setIsCreating(false);
  };

  const handleCreateUtilisateur = () => {
    setEditingUtilisateur({
      id: "",
      nom: "",
      email: "",
      roles: [],
      statut: "actif",
      dateInscription: new Date().toISOString().split("T")[0],
    });
    setIsCreating(true);
  };
  //ici
  const handleSaveUtilisateur = () => {
    if (!editingUtilisateur) return;
    let utilisateurEnreg = editingUtilisateur;

    if (isCreating) {
      utilisateurEnreg = {
        ...editingUtilisateur,
        id: Date.now().toString(),
        dateInscription: new Date().toISOString().split("T")[0],
      };
      dispatch({ type: "ADD_UTILISATEUR", payload: utilisateurEnreg });
      addEntry("ADD_UTILISATEUR", utilisateurEnreg);
    } else {
      dispatch({ type: "UPDATE_UTILISATEUR", payload: utilisateurEnreg });
      addEntry("UPDATE_UTILISATEUR", utilisateurEnreg);
    }

    setEditingUtilisateur(null);
    setIsCreating(false);
  };

  //ici
  const statusLabels: Record<Utilisateur["statut"], string> = {
    actif: "Actif",
    inactif: "Inactif",
    suspendu: "Suspendu",
  };

  const statusColors: Record<Utilisateur["statut"], string> = {
    actif: "bg-green-100 text-green-800",
    inactif: "bg-yellow-100 text-yellow-800",
    suspendu: "bg-red-100 text-red-800",
  };

  const toggleRole = (role: string) => {
    if (!editingUtilisateur) return;
    const hasRole = editingUtilisateur.roles.includes(role);
    const newRoles = hasRole
      ? editingUtilisateur.roles.filter((r) => r !== role)
      : [...editingUtilisateur.roles, role];
    setEditingUtilisateur({ ...editingUtilisateur, roles: newRoles });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredUtilisateurs.length} utilisateur(s) trouvé(s)
          </p>
        </div>
        <button
          onClick={handleCreateUtilisateur}
          className="inline-flex items-center px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-500 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouvel utilisateur
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email ou rôle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="w-full lg:w-48">
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(
                  e.target.value as Utilisateur["statut"] | "tous"
                )
              }
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUtilisateurs.map((utilisateur: Utilisateur) => (
                <tr
                  key={utilisateur.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {utilisateur.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {utilisateur.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {utilisateur.roles.join(", ")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[
                          utilisateur.statut as keyof typeof statusColors
                        ]
                      }`}
                    >
                      {
                        statusLabels[
                          utilisateur.statut as keyof typeof statusLabels
                        ]
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {utilisateur.dateInscription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEditUtilisateur(utilisateur)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(utilisateur.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          utilisateur.statut === "actif"
                            ? "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50"
                            : utilisateur.statut === "inactif"
                            ? "text-gray-600 hover:text-gray-600 hover:bg-gray-50"
                            : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title="Changer le statut"
                      >
                        {utilisateur.statut === "inactif" ? (
                          <XCircle className="h-4 w-4" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteUtilisateur(utilisateur.id)}
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

      {editingUtilisateur && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setEditingUtilisateur(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isCreating ? "Nouvel utilisateur" : "Modifier l'utilisateur"}
                </h3>
                <button
                  onClick={() => setEditingUtilisateur(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={editingUtilisateur!.nom}
                    onChange={(e) =>
                      setEditingUtilisateur((prev) =>
                        prev ? { ...prev, nom: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingUtilisateur!.email}
                    onChange={(e) =>
                      setEditingUtilisateur((prev) =>
                        prev ? { ...prev, email: e.target.value } : null
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôles
                  </label>
                  <div className="flex space-x-4">
                    {rolesDisponibles.map((role) => (
                      <label
                        key={role}
                        className="inline-flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={editingUtilisateur!.roles.includes(role)}
                          onChange={() => {
                            const newRoles = editingUtilisateur!.roles.includes(
                              role
                            )
                              ? editingUtilisateur!.roles.filter(
                                  (r) => r !== role
                                )
                              : [...editingUtilisateur!.roles, role];
                            setEditingUtilisateur((prev) =>
                              prev ? { ...prev, roles: newRoles } : null
                            );
                          }}
                          className="form-checkbox"
                        />
                        <span className="capitalize">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={editingUtilisateur!.statut}
                    onChange={(e) =>
                      setEditingUtilisateur((prev) =>
                        prev
                          ? {
                              ...prev,
                              statut: e.target.value as Utilisateur["statut"],
                            }
                          : null
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
                  onClick={() => setEditingUtilisateur(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveUtilisateur}
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
};

export default UtilisateurAdmin;
