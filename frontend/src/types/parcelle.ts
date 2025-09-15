export interface Parcelle {
  id: string;
  reference: string;           // référence parcelle/lot
  adresse: string;             // adresse ou localisation
  superficie: number;          // superficie en m²
  proprietaire: string;        // nom du propriétaire
  statut: "disponible" | "vendue" | "réservée"; // statut parcelle
  dateEnregistrement: string; // date ISO enregistrement
}
