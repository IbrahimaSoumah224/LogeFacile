import React from 'react';
import { Eye, MapPin, Bed, Bath, Square, Car } from 'lucide-react';
import { Property } from '../types/Property';
import { properties } from '../data/properties';
interface LatestOffersProps {
  onPropertySelect: (property: Property) => void;
}

const LatestOffers: React.FC<LatestOffersProps> = ({ onPropertySelect }) => {
  // Prendre les 3 premières propriétés pour les dernières offres
  const latestProperties = properties.slice(0, 3);

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
          {latestProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    property.type === 'Vente' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {property.type === 'Vente' ? 'À vendre' : 'À louer'}
                  </span>
                </div>
                <button
                  onClick={() => onPropertySelect(property)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                >
                  <Eye size={16} className="text-gray-700" />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {property.bedrooms && (
                      <div className="flex items-center">
                        <Bed size={16} className="mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center">
                        <Bath size={16} className="mr-1" />
                        <span>{property.bathrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Square size={16} className="mr-1" />
                      <span>{property.area}</span>
                    </div>
                    {property.parking !== undefined && property.parking > 0 && (
                      <div className="flex items-center">
                        <Car size={16} className="mr-1" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-emerald-600">
                    {property.price}
                  </div>
                  <button
                    onClick={() => onPropertySelect(property)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm font-medium"
                  >
                    Voir détails
                  </button>
                </div>
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