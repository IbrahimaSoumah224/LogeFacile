import { Property, User, Contact, StaticContent, DashboardStats } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Appartement moderne centre-ville',
    description: 'Magnifique appartement de 3 pièces entièrement rénové avec vue sur le parc. Cuisine équipée, parquet au sol, double vitrage.',
    price: 450000,
    type: 'apartment',
    status: 'available',
    surface: 85,
    rooms: 3,
    bathrooms: 2,
    address: '15 rue de la République',
    city: 'Coyah',
    zipCode: '69002',
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    features: ['Balcon', 'Parking', 'Ascenseur', 'Cave'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    isActive: true
  },
  {
    id: '2',
    title: 'Villa avec piscine',
    description: 'Superbe villa familiale avec jardin paysager et piscine chauffée. 5 chambres, bureau, garage double.',
    price: 850000,
    type: 'house',
    status: 'pending',
    surface: 220,
    rooms: 7,
    bathrooms: 3,
    address: '42 avenue des Pins',
    city: 'Boke',
    zipCode: '06400',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
    ],
    features: ['Piscine', 'Jardin', 'Garage', 'Terrasse', 'Cheminée'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18',
    isActive: true
  },
  {
    id: '3',
    title: 'Local commercial centre-ville',
    description: 'Local commercial de 120m² en rez-de-chaussée, idéal pour boutique ou bureau. Vitrine sur rue passante.',
    price: 2800,
    type: 'commercial',
    status: 'rented',
    surface: 120,
    rooms: 4,
    bathrooms: 1,
    address: '8 place du Marché',
    city: 'Kankan',
    zipCode: '13001',
    images: [
      'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg'
    ],
    features: ['Vitrine', 'Climatisation', 'Alarme'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-12',
    isActive: false
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Fatou',
    lastName: 'Camara',
    email: 'fatou125@gmail.gn',
    phone: '+224 623 56 98 74',
    role: 'admin',
    status: 'active',
    createdAt: '2023-12-01',
    lastLogin: '2024-01-20',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: '2',
    firstName: 'Aly',
    lastName: 'Fofana',
    email: 'alyfof156@gmail.gn',
    phone: '+224 36 95 24 15',
    role: 'agent',
    status: 'active',
    createdAt: '2023-11-15',
    lastLogin: '2024-01-19',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: '3',
    firstName: 'Israel',
    lastName: 'Monemou',
    email: 'isra45@gmail.gn',
    phone: '+224 624 01 45 36',
    role: 'client',
    status: 'inactive',
    createdAt: '2023-10-20',
    lastLogin: '2024-01-10'
  }
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'fode',
    lastName: 'Cisse',
    email: 'cissefode45@gmail.gn',
    phone: '+224 611 25 86 95',
    message: 'Je suis intéressé par l\'appartement centre-ville. Pouvez-vous me contacter pour une visite ?',
    propertyId: '1',
    propertyTitle: 'Appartement moderne centre-ville',
    status: 'new',
    priority: 'high',
    assignedTo: '2',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    firstName: 'Bangaly',
    lastName: 'Conde',
    email: 'bangaco25@gmail.gn',
    phone: '+224 623 10 25 89',
    message: 'Recherche une villa avec piscine dans les Alpes-Maritimes. Budget jusqu\'à 900k€.',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: '2',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-19'
  },
  {
    id: '3',
    firstName: 'Sarata',
    lastName: 'Soumah',
    email: 'sarataso963@gmail.gn',
    phone: '+224 625 89 63 01',
    message: 'Demande d\'estimation pour un bien à vendre.',
    status: 'resolved',
    priority: 'low',
    assignedTo: '1',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-17'
  }
];

export const mockStaticContent: StaticContent[] = [
  {
    id: '1',
    section: 'hero',
    title: 'Trouvez votre bien immobilier idéal',
    content: 'Découvrez notre sélection exclusive de biens immobiliers dans les plus belles régions de France.',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    section: 'about',
    title: 'Notre expertise à votre service',
    content: 'Avec plus de 20 ans d\'expérience dans l\'immobilier, nous vous accompagnons dans tous vos projets.',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    section: 'services',
    title: 'Nos services',
    content: 'Vente, achat, location, gestion locative, estimation gratuite.',
    updatedAt: '2024-01-12'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 156,
  activeProperties: 142,
  totalUsers: 1247,
  activeUsers: 1189,
  totalContacts: 89,
  newContacts: 12,
  monthlyRevenue: 125000,
  revenueGrowth: 8.5
};

export const mockChartData = [
  { month: 'Jan', properties: 12, contacts: 45, revenue: 95000 },
  { month: 'Fév', properties: 18, contacts: 52, revenue: 110000 },
  { month: 'Mar', properties: 15, contacts: 38, revenue: 125000 },
  { month: 'Avr', properties: 22, contacts: 61, revenue: 140000 },
  { month: 'Mai', properties: 19, contacts: 48, revenue: 135000 },
  { month: 'Jun', properties: 25, contacts: 67, revenue: 155000 }
];