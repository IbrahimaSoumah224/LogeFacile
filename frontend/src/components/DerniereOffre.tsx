import React from 'react';
import { MapPin, Eye, Heart } from 'lucide-react';

const LatestOffers = () => {
  const properties = [
    {
      id: 1,
      image: '/images/maison1.jpeg',
      title: 'Villa moderne avec piscine',
      location: 'Kipé, Conakry',
      price: '15,000,000 GNF',
      type: 'Vente',
      bedrooms: 4,
      bathrooms: 3,
      area: '250m²'
    },
    {
      id: 2,
      image: '/images/maison4.jpg',
      title: 'Maison traditionnelle rénovée',
      location: 'Dixinn, Conakry',
      price: '800,000 GNF/mois',
      type: 'Location',
      bedrooms: 3,
      bathrooms: 2,
      area: '180m²'
    },
    {
      id: 3,
      image: '/images/maison5.jpg',
      title: 'Parcelle résidentielle',
      location: 'Sonfonia, Conakry',
      price: '8,500,000 GNF',
      type: 'Vente',
      bedrooms: null,
      bathrooms: null,
      area: '500m²'
    },
    {
      id: 4,
      image: '/images/maison2.jpeg',
      title: 'Appartement standing',
      location: 'Almamya, Conakry',
      price: '1,200,000 GNF/mois',
      type: 'Location',
      bedrooms: 2,
      bathrooms: 2,
      area: '120m²'
    },
    {
      id: 5,
      image: '/images/maison2.jpeg',
      title: 'Maison familiale spacieuse',
      location: 'Ratoma, Conakry',
      price: '22,000,000 GNF',
      type: 'Vente',
      bedrooms: 5,
      bathrooms: 4,
      area: '320m²'
    },
    {
      id: 6,
      image: '/images/maison3.jpg', 
      title: 'Studio moderne meublé',
      location: 'Kaloum, Conakry',
      price: '650,000 GNF/mois',
      type: 'Location',
      bedrooms: 1,
      bathrooms: 1,
      area: '45m²'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nos dernières offres
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez une sélection des meilleures propriétés disponibles en Guinée
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              {/* Property Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.type === 'Vente' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {property.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                    <Heart size={16} className="text-gray-700" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                    <Eye size={16} className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                  {property.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-emerald-600">
                    {property.price}
                  </span>
                </div>

                {property.bedrooms && (
                  <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-4">
                    <span>{property.bedrooms} chambres</span>
                    <span>{property.bathrooms} SDB</span>
                    <span>{property.area}</span>
                  </div>
                )}
                {!property.bedrooms && (
                  <div className="text-sm text-gray-600 border-t pt-4">
                    <span>Surface: {property.area}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Voir toutes les offres
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestOffers;