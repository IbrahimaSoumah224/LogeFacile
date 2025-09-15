export interface Demande {
  id: string;
  sujet: string;
  demandeur: string;
  description: string;
  status: 'ouverte' | 'traitée' | 'fermée';
  dateDemande: string; // Format ISO yyyy-MM-dd
}
