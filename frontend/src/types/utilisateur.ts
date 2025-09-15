export default interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  roles: string[]; // Ex: ['admin', 'agent', 'client']
  statut: 'actif' | 'inactif' | 'suspendu';
  dateInscription: string; // ISO date
}

