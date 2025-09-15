import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Property, User, Contact, StaticContent } from '../types';
import { mockProperties, mockUsers, mockContacts, mockStaticContent } from '../data/mockData';
import { Location } from '../types/location';
import { Purchase } from '../types/purchase';
import { Achat } from '../types/achat';
import { Promoteur } from '../types/promoteur';
import { Parcelle } from '../types/parcelle';
import Utilisateur from '../types/utilisateur';

interface Demande {
  id: string;
  sujet: string;
  demandeur: string;
  description: string;
  status: 'ouverte' | 'traitée' | 'fermée';
  dateDemande: string;
}

interface Vente {
  id: string;
  bienImmobilier: string;
  client: string;
  typeVente: "vente" | "location" | "cession";
  montant: number;
  statut: "en cours" | "finalisée" | "annulée";
  dateTransaction: string; 
}


interface AppState {
  properties: Property[];
  users: User[];
  contacts: Contact[];
  staticContent: StaticContent[];
  locations: Location[];
  purchases: Purchase[];
  demandes: Demande[];
  ventes: Vente[];
  achats: Achat[];
  promoteurs: Promoteur[];
  parcelles: Parcelle[];
  utilisateurs: Utilisateur[];
}

type AppAction =
  | { type: 'ADD_PROPERTY'; payload: Property }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'DELETE_PROPERTY'; payload: string }
  | { type: 'TOGGLE_PROPERTY_STATUS'; payload: string }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'TOGGLE_USER_STATUS'; payload: string }
  | { type: 'ADD_CONTACT'; payload: Contact }
  | { type: 'UPDATE_CONTACT'; payload: Contact }
  | { type: 'DELETE_CONTACT'; payload: string }
  | { type: 'UPDATE_STATIC_CONTENT'; payload: StaticContent }
  | { type: 'ADD_LOCATION'; payload: Location }
  | { type: 'UPDATE_LOCATION'; payload: Location }
  | { type: 'DELETE_LOCATION'; payload: string }
  | { type: 'TOGGLE_LOCATION_STATUS'; payload: string }
  | { type: 'ADD_PURCHASE'; payload: Purchase }
  | { type: 'UPDATE_PURCHASE'; payload: Purchase }
  | { type: 'DELETE_PURCHASE'; payload: string }
  | { type: 'TOGGLE_PURCHASE_STATUS'; payload: string }
  | { type: 'ADD_DEMANDE'; payload: Demande }
  | { type: 'UPDATE_DEMANDE'; payload: Demande }
  | { type: 'DELETE_DEMANDE'; payload: string }
  | { type: "ADD_VENTE"; payload: Vente }
  | { type: "UPDATE_VENTE"; payload: Vente }
  | { type: "DELETE_VENTE"; payload: string }
  | { type: "ADD_ACHAT"; payload: Achat }
  | { type: "UPDATE_ACHAT"; payload: Achat }
  | { type: "DELETE_ACHAT"; payload: string }
  | { type: "TOGGLE_ACHAT_STATUT"; payload: string }
  | { type: "ADD_PROMOTEUR"; payload: Promoteur }
  | { type: "UPDATE_PROMOTEUR"; payload: Promoteur }
  | { type: "DELETE_PROMOTEUR"; payload: string }
  | { type: "ADD_PARCELLE"; payload: Parcelle }
  | { type: "UPDATE_PARCELLE"; payload: Parcelle }
  | { type: "DELETE_PARCELLE"; payload: string }
  | { type: 'ADD_UTILISATEUR'; payload: Utilisateur }
  | { type: 'UPDATE_UTILISATEUR'; payload: Utilisateur }
  | { type: 'DELETE_UTILISATEUR'; payload: string };

const LOCAL_STORAGE_KEY_LOCATIONS = 'app_locations';
const LOCAL_STORAGE_KEY_PURCHASES = 'app_purchases';
const LOCAL_STORAGE_KEY_DEMANDES = 'app_demandes';
const LOCAL_STORAGE_KEY_VENTES = 'app_ventes';
const LOCAL_STORAGE_KEY_ACHATS = "app_achats";
const LOCAL_STORAGE_KEY_PROMOTEURS = "app_promoteurs";
const LOCAL_STORAGE_KEY_PARCELLES = "app_parcelles";
const LOCAL_STORAGE_KEY_UTILISATEURS = 'app_utilisateurs';

// Lire dans localStorage si disponible, sinon tableau vide
const initialLocations: Location[] = (() => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_LOCATIONS);
      if (stored) return JSON.parse(stored) as Location[];
    } catch {}
  }
  return [];
})();

const initialPurchases: Purchase[] = (() => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_PURCHASES);
      if (stored) return JSON.parse(stored) as Purchase[];
    } catch {}
  }
  return [];
})();

const initialDemandes: Demande[] = (() => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_DEMANDES);
      if (stored) return JSON.parse(stored) as Demande[];
    } catch {}
  }
  return [];
})();

const initialVentes: Vente[] = (() => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_VENTES);
      if (stored) return JSON.parse(stored) as Vente[];
    } catch {}
  }
  return [];
})();

const initialAchats: Achat[] = (() => {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_ACHATS);
      if (stored) return JSON.parse(stored) as Achat[];
    } catch {}
  }
  return [];
})();

const initialPromoteurs: Promoteur[] = (() => {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_PROMOTEURS);
      if (stored) return JSON.parse(stored) as Promoteur[];
    } catch {}
  }
  return [];
})();

const initialParcelles: Parcelle[] = (() => {
  if (typeof window !== "undefined") {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_PARCELLES);
      if (stored) return JSON.parse(stored) as Parcelle[];
    } catch {}
  }
  return [];
})();

const initialUtilisateurs: Utilisateur[] = (() => {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY_UTILISATEURS);
      if (stored) return JSON.parse(stored) as Utilisateur[];
    } catch {}
  }
  return [];
})();



const initialState: AppState = {
  properties: mockProperties,
  users: mockUsers,
  contacts: mockContacts,
  staticContent: mockStaticContent,
  locations: initialLocations,
  purchases: initialPurchases,
  demandes: initialDemandes,
  ventes: initialVentes,
  achats: initialAchats,
  promoteurs: initialPromoteurs,
  parcelles: initialParcelles,
  // utilisateurs: initialUtilisateurs,
  utilisateurs:
    typeof window !== 'undefined' && window.localStorage.getItem(LOCAL_STORAGE_KEY_UTILISATEURS)
      ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_UTILISATEURS)!)
      : [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  let newState = state;

  switch (action.type) {
    case 'ADD_PROPERTY':
      return { ...state, properties: [...state.properties, action.payload] };
    case 'UPDATE_PROPERTY':
      return { ...state, properties: state.properties.map(p => (p.id === action.payload.id ? action.payload : p)) };
    case 'DELETE_PROPERTY':
      return { ...state, properties: state.properties.filter(p => p.id !== action.payload) };
    case 'TOGGLE_PROPERTY_STATUS':
      return {
        ...state,
        properties: state.properties.map(p => (p.id === action.payload ? { ...p, isActive: !p.isActive } : p)),
      };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return { ...state, users: state.users.map(u => (u.id === action.payload.id ? action.payload : u)) };
    case 'DELETE_USER':
      return { ...state, users: state.users.filter(u => u.id !== action.payload) };
    case 'TOGGLE_USER_STATUS':
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.payload ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
        ),
      };
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.payload] };
    case 'UPDATE_CONTACT':
      return { ...state, contacts: state.contacts.map(c => (c.id === action.payload.id ? action.payload : c)) };
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter(c => c.id !== action.payload) };
    case 'UPDATE_STATIC_CONTENT':
      return {
        ...state,
        staticContent: state.staticContent.map(sc => (sc.id === action.payload.id ? action.payload : sc)),
      };
    case 'ADD_LOCATION':
      newState = { ...state, locations: [...state.locations, action.payload] };
      break;
    case 'UPDATE_LOCATION':
      newState = {
        ...state,
        locations: state.locations.map(loc => (loc.id === action.payload.id ? action.payload : loc)),
      };
      break;
    case 'DELETE_LOCATION':
      newState = { ...state, locations: state.locations.filter(loc => loc.id !== action.payload) };
      break;
    case 'TOGGLE_LOCATION_STATUS':
      newState = {
        ...state,
        locations: state.locations.map(loc => {
          if (loc.id === action.payload) {
            let newStatus: Location['status'];
            if (loc.status === 'available') newStatus = 'unavailable';
            else if (loc.status === 'unavailable') newStatus = 'available';
            else newStatus = loc.status;
            return { ...loc, status: newStatus };
          }
          return loc;
        }),
      };
      break;
    case 'ADD_PURCHASE':
      newState = { ...state, purchases: [...state.purchases, action.payload] };
      break;
    case 'UPDATE_PURCHASE':
      newState = { ...state, purchases: state.purchases.map(p => (p.id === action.payload.id ? action.payload : p)) };
      break;
    case 'DELETE_PURCHASE':
      newState = { ...state, purchases: state.purchases.filter(p => p.id !== action.payload) };
      break;
    case 'TOGGLE_PURCHASE_STATUS':
      newState = {
        ...state,
        purchases: state.purchases.map(p =>
          p.id === action.payload ? { ...p, status: p.status === 'pending' ? 'completed' : 'pending' } : p
        ),
      };
      break;
    case 'ADD_DEMANDE':
      newState = { ...state, demandes: [...state.demandes, action.payload] };
      break;
    case 'UPDATE_DEMANDE':
      newState = { ...state, demandes: state.demandes.map(d => (d.id === action.payload.id ? action.payload : d)) };
      break;
    case 'DELETE_DEMANDE':
      newState = { ...state, demandes: state.demandes.filter(d => d.id !== action.payload) };
      break;

    case 'ADD_VENTE':
      newState = { ...state, ventes: [...state.ventes, action.payload] };
      break;
    case 'UPDATE_VENTE':
      newState = {
        ...state,
        ventes: state.ventes.map(v => (v.id === action.payload.id ? action.payload : v)),
      };
      break;
    case 'DELETE_VENTE':
      newState = { ...state, ventes: state.ventes.filter(v => v.id !== action.payload) };
      break;

    case "ADD_ACHAT":
      newState = { ...state, achats: [...state.achats, action.payload] };
      break;
    case "UPDATE_ACHAT":
      newState = {
        ...state,
        achats: state.achats.map(a => (a.id === action.payload.id ? action.payload : a)),
      };
      break;
    case "DELETE_ACHAT":
      newState = { ...state, achats: state.achats.filter(a => a.id !== action.payload) };
      break;
    case "TOGGLE_ACHAT_STATUT":
      newState = {
        ...state,
        achats: state.achats.map(a => {
          if (a.id === action.payload) {
            let nouveauStatut: Achat["statut"];
            if (a.statut === "en attente") nouveauStatut = "complété";
            else if (a.statut === "complété") nouveauStatut = "annulé";
            else nouveauStatut = "en attente";
            return { ...a, statut: nouveauStatut };
          }
          return a;
        }),
      };
      break;

    case "ADD_PROMOTEUR":
      newState = { ...state, promoteurs: [...state.promoteurs, action.payload] };
      break;
    case "UPDATE_PROMOTEUR":
      newState = {
        ...state,
        promoteurs: state.promoteurs.map(p => p.id === action.payload.id ? action.payload : p),
      };
      break;
    case "DELETE_PROMOTEUR":
      newState = { ...state, promoteurs: state.promoteurs.filter(p => p.id !== action.payload) };
      break;

      case "ADD_PARCELLE":
      newState = { ...state, parcelles: [...state.parcelles, action.payload] };
      break;

    case "UPDATE_PARCELLE":
      newState = {
        ...state,
        parcelles: state.parcelles.map(p => p.id === action.payload.id ? action.payload : p),
      };
      break;

    case "DELETE_PARCELLE":
      newState = { ...state, parcelles: state.parcelles.filter(p => p.id !== action.payload) };
      break;

    case 'ADD_UTILISATEUR':
      newState = { ...state, utilisateurs: [...state.utilisateurs, action.payload] };
      break;
    case 'UPDATE_UTILISATEUR':
      newState = {
        ...state,
        utilisateurs: state.utilisateurs.map(u =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
      break;
    case 'DELETE_UTILISATEUR':
      newState = {
        ...state,
        utilisateurs: state.utilisateurs.filter(u => u.id !== action.payload),
      };
      break;

    default:
      return state;
  }

  // Sauvegardes locales
  if (
    action.type === 'ADD_LOCATION' ||
    action.type === 'UPDATE_LOCATION' ||
    action.type === 'DELETE_LOCATION' ||
    action.type === 'TOGGLE_LOCATION_STATUS'
  ) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_LOCATIONS, JSON.stringify(newState.locations));
    } catch {}
  }

  if (
    action.type === 'ADD_PURCHASE' ||
    action.type === 'UPDATE_PURCHASE' ||
    action.type === 'DELETE_PURCHASE' ||
    action.type === 'TOGGLE_PURCHASE_STATUS'
  ) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_PURCHASES, JSON.stringify(newState.purchases));
    } catch {}
  }

  if (
    action.type === 'ADD_DEMANDE' ||
    action.type === 'UPDATE_DEMANDE' ||
    action.type === 'DELETE_DEMANDE'
  ) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_DEMANDES, JSON.stringify(newState.demandes));
    } catch {}
  }

  if (
    action.type === 'ADD_VENTE' ||
    action.type === 'UPDATE_VENTE' ||
    action.type === 'DELETE_VENTE'
  ) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_VENTES, JSON.stringify(newState.ventes));
    } catch {}
  }

  if (["ADD_ACHAT", "UPDATE_ACHAT", "DELETE_ACHAT", "TOGGLE_ACHAT_STATUT"].includes(action.type)) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_ACHATS, JSON.stringify(newState.achats));
    } catch {}
  }

  if (["ADD_PROMOTEUR", "UPDATE_PROMOTEUR", "DELETE_PROMOTEUR"].includes(action.type)) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_PROMOTEURS, JSON.stringify(newState.promoteurs));
    } catch {}
  }

  if (["ADD_PARCELLE", "UPDATE_PARCELLE", "DELETE_PARCELLE"].includes(action.type)) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_PARCELLES, JSON.stringify(newState.parcelles));
    } catch {}
  }

  if (['ADD_UTILISATEUR', 'UPDATE_UTILISATEUR', 'DELETE_UTILISATEUR'].includes(action.type)) {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY_UTILISATEURS, JSON.stringify(newState.utilisateurs));
    } catch {}
  }


  return newState;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
