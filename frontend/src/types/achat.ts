export interface Achat {
  id: string;
  bienImmobilier: string;
  acheteur: string;
  montant: number;
  statut: "en attente" | "complété" | "annulé";
  dateAchat: string; // format ISO YYYY-MM-DD
}
