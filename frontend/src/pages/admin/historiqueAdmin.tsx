import React from 'react';
import { useHistorique, HistoriqueEntry } from '../../hooks/useHistorique';
import Utilisateur from '../../types/utilisateur';

const HistoriqueAdmin: React.FC = () => {
  // clef de stockage à adapter selon l'usage
  const { historique, clearHistorique } = useHistorique<Utilisateur>('historique_utilisateurs');

  return (
    <div className="p-6 bg-white rounded-md shadow">
      <h2 className="text-xl font-semibold mb-4">Historique des actions utilisateurs</h2>

      {historique.length === 0 ? (
        <p className="text-gray-500">Aucune action enregistrée pour l'instant.</p>
      ) : (
        <>
          <button
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={clearHistorique}
          >
            Effacer l’historique
          </button>

          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {historique
              .slice() // pour ne pas modifier le tableau original
              .reverse() // afficher les actions les plus récentes en premier
              .map((entry: HistoriqueEntry<Utilisateur>) => (
                <li key={entry.id} className="p-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{entry.actionType}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700">
                    ID: {entry.payload.id} - Nom: {entry.payload.nom} - Email: {entry.payload.email}
                  </div>
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default HistoriqueAdmin;
