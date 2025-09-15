import { Property } from '../types/Appartement';

export const properties: Property[] = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Villa moderne avec piscine',
    location: 'Kipé, Conakry',
    price: '15,000,000 GNF',
    type: 'Vente',
    bedrooms: 4,
    bathrooms: 3,
    area: '250m²',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Magnifique villa moderne située dans le quartier résidentiel de Kipé. Cette propriété exceptionnelle offre un cadre de vie luxueux avec une piscine privée, un jardin paysager et une vue imprenable sur la ville. La villa dispose de finitions haut de gamme, d\'une cuisine équipée moderne et de grandes baies vitrées offrant une luminosité naturelle optimale.',
    features: [
      'Piscine privée',
      'Jardin paysager',
      'Garage 2 voitures',
      'Cuisine équipée',
      'Climatisation',
      'Système de sécurité',
      'Terrasse couverte',
      'Vue panoramique'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    agent: {
      name: 'Ibrahima Soumah',
      phone: '+224 624 314 032',
      email: 'isoumah644@gmail.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    coordinates: { lat: 9.5092, lng: -13.7122 },
    yearBuilt: 2020,
    parking: 2,
    furnished: false,
    availableFrom: 'Immédiatement'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Maison traditionnelle rénovée',
    location: 'Dixinn, Conakry',
    price: '800,000 GNF/mois',
    type: 'Location',
    bedrooms: 3,
    bathrooms: 2,
    area: '180m²',
    images: [
      'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Charmante maison traditionnelle entièrement rénovée dans le quartier calme de Dixinn. Cette propriété allie le charme de l\'architecture guinéenne traditionnelle aux commodités modernes. Idéale pour une famille recherchant un cadre authentique et paisible.',
    features: [
      'Architecture traditionnelle',
      'Entièrement rénovée',
      'Jardin privé',
      'Parking sécurisé',
      'Proche des écoles',
      'Transport en commun',
      'Quartier calme'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    agent: {
      name: 'Aïssatou Bah',
      phone: '+224 622 234 567',
      email: 'aissatou@immoguinee.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    coordinates: { lat: 9.5370, lng: -13.6785 },
    yearBuilt: 1995,
    parking: 1,
    furnished: true,
    availableFrom: '1er Mars 2024'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1396113/pexels-photo-1396113.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Parcelle résidentielle',
    location: 'Sonfonia, Conakry',
    price: '8,500,000 GNF',
    type: 'Vente',
    area: '500m²',
    images: [
      'https://images.pexels.com/photos/1396113/pexels-photo-1396113.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Excellente parcelle résidentielle située dans le quartier en développement de Sonfonia. Terrain plat, viabilisé avec accès à l\'électricité et à l\'eau. Parfait pour la construction d\'une résidence familiale ou d\'un projet immobilier.',
    features: [
      'Terrain plat',
      'Viabilisé',
      'Accès électricité',
      'Accès eau courante',
      'Quartier en développement',
      'Proche des commodités',
      'Titre foncier sécurisé'
    ],
    agent: {
      name: 'Ibrahima Camara',
      phone: '+224 622 345 678',
      email: 'ibrahima@immoguinee.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    coordinates: { lat: 9.4843, lng: -13.7456 },
    availableFrom: 'Immédiatement'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1396115/pexels-photo-1396115.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Appartement standing',
    location: 'Almamya, Conakry',
    price: '1,200,000 GNF/mois',
    type: 'Location',
    bedrooms: 2,
    bathrooms: 2,
    area: '120m²',
    images: [
      'https://images.pexels.com/photos/1396115/pexels-photo-1396115.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Superbe appartement de standing dans une résidence moderne d\'Almamya. Finitions de qualité, balcon avec vue, proche du centre-ville et des commodités. Idéal pour jeunes professionnels ou couple.',
    features: [
      'Résidence moderne',
      'Balcon avec vue',
      'Ascenseur',
      'Parking privé',
      'Sécurité 24h/24',
      'Proche centre-ville',
      'Climatisation',
      'Internet haut débit'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    agent: {
      name: 'Fatoumata Touré',
      phone: '+224 622 456 789',
      email: 'fatoumata@immoguinee.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    coordinates: { lat: 9.5092, lng: -13.7122 },
    yearBuilt: 2019,
    parking: 1,
    furnished: true,
    availableFrom: '15 Février 2024'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Maison familiale spacieuse',
    location: 'Ratoma, Conakry',
    price: '22,000,000 GNF',
    type: 'Vente',
    bedrooms: 5,
    bathrooms: 4,
    area: '320m²',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Grande maison familiale parfaite pour une famille nombreuse. Située dans un quartier résidentiel calme de Ratoma, cette propriété offre de nombreux espaces de vie et un grand jardin pour les enfants.',
    features: [
      'Grande famille',
      'Jardin spacieux',
      'Garage double',
      'Bureau à domicile',
      'Salle de jeux',
      'Quartier familial',
      'Écoles à proximité',
      'Transport facile'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    agent: {
      name: 'Alpha Condé',
      phone: '+224 622 567 890',
      email: 'alpha@immoguinee.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    coordinates: { lat: 9.5370, lng: -13.6785 },
    yearBuilt: 2018,
    parking: 2,
    furnished: false,
    availableFrom: 'Immédiatement'
  },
  {
    id: 6,
    image: 'https://images.pexels.com/photos/1396117/pexels-photo-1396117.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Studio moderne meublé',
    location: 'Kaloum, Conakry',
    price: '650,000 GNF/mois',
    type: 'Location',
    bedrooms: 1,
    bathrooms: 1,
    area: '45m²',
    images: [
      'https://images.pexels.com/photos/1396117/pexels-photo-1396117.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    description: 'Studio moderne entièrement meublé au cœur de Kaloum. Parfait pour étudiant ou jeune professionnel. Proche de toutes les commodités, transports et du centre d\'affaires.',
    features: [
      'Entièrement meublé',
      'Centre-ville',
      'Transport facile',
      'Internet inclus',
      'Charges comprises',
      'Sécurité',
      'Proche commerces',
      'Idéal étudiant'
    ],
    agent: {
      name: 'Mariama Diallo',
      phone: '+224 622 678 901',
      email: 'mariama@immoguinee.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    coordinates: { lat: 9.5092, lng: -13.7122 },
    yearBuilt: 2021,
    parking: 0,
    furnished: true,
    availableFrom: '1er Mars 2024'
  }
];