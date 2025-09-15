export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: 'Vente' | 'Location';
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  image: string;
  images?: string[];
  description?: string;
  features?: string[];
  videoUrl?: string;
  agent?: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  yearBuilt?: number;
  parking?: number;
  furnished?: boolean;
  availableFrom?: string;
}