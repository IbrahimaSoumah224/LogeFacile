export interface Promoteur {
  id: string;
  nom: string;
  contact: string;         // numéro téléphone ou email
  adresseSiege: string;
  nombreProjets: number;
  statut: "actif" | "inactif" | "suspendu";
  dateInscription: string; // format ISO YYYY-MM-DD
}
