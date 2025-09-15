export interface Vente {
  id: string;
  produit: string;
  client: string;
  quantite: number;
  prixUnitaire: number;
  status: 'en cours' | 'finalisée' | 'annulée';
  dateVente: string;
}
