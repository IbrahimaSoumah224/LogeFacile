import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Car, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Heart,
  Share2,
  CheckCircle
} from 'lucide-react';
import { Property } from '../types/Property';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ 
  property,
  isOpen, 
  onClose
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === property.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images!.length - 1 : prev - 1
      );
    }
  };

  if (!isOpen || !property) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {property.title}
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Heart size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Images et Vidéo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Galerie d'images */}
            <div className="space-y-4">
              <div className="relative h-80 rounded-xl overflow-hidden">
                {property.images && property.images.length > 0 ? (
                  <>
                    <img
                      src={property.images[currentImageIndex]}
                      alt={`${property.title} - Image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-200"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {property.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Aucune image disponible</p>
                  </div>
                )}
              </div>

              {/* Miniatures */}
              {property.images && property.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                        index === currentImageIndex ? 'border-emerald-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vidéo */}
            {property.videoUrl && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Visite virtuelle</h3>
                <div className="relative h-80 rounded-xl overflow-hidden bg-gray-100">
                  {showVideo ? (
                    <iframe
                      src={property.videoUrl}
                      title="Visite virtuelle"
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    />
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700">
                      <button
                        onClick={() => setShowVideo(true)}
                        className="bg-white/20 backdrop-blur-sm p-6 rounded-full hover:bg-white/30 transition-colors duration-200"
                      >
                        <Play size={32} className="text-white ml-1" />
                      </button>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-semibold">Visite virtuelle</p>
                        <p className="text-sm opacity-90">Cliquez pour voir la vidéo</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Détails de la propriété */}
            <div className="lg:col-span-2 space-y-6">
              {/* Prix et localisation */}
              <div className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-emerald-600">
                    {property.price}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.type === 'Vente' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {property.type}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin size={20} className="mr-2" />
                  <span className="text-lg">{property.location}</span>
                </div>
                
                {/* Caractéristiques principales */}
                <div className="flex flex-wrap gap-6 text-gray-700">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed size={20} className="mr-2 text-emerald-600" />
                      <span>{property.bedrooms} chambres</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath size={20} className="mr-2 text-emerald-600" />
                      <span>{property.bathrooms} salles de bain</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square size={20} className="mr-2 text-emerald-600" />
                    <span>{property.area}</span>
                  </div>
                  {property.parking !== undefined && property.parking > 0 && (
                    <div className="flex items-center">
                      <Car size={20} className="mr-2 text-emerald-600" />
                      <span>{property.parking} parking{property.parking > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Caractéristiques */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Caractéristiques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle size={16} className="text-emerald-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations supplémentaires */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                {property.yearBuilt && (
                  <div>
                    <p className="text-sm text-gray-600">Année de construction</p>
                    <p className="font-semibold text-gray-900">{property.yearBuilt}</p>
                  </div>
                )}
                {property.furnished !== undefined && (
                  <div>
                    <p className="text-sm text-gray-600">Meublé</p>
                    <p className="font-semibold text-gray-900">
                      {property.furnished ? 'Oui' : 'Non'}
                    </p>
                  </div>
                )}
                {property.availableFrom && (
                  <div>
                    <p className="text-sm text-gray-600">Disponible à partir du</p>
                    <p className="font-semibold text-gray-900 flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {property.availableFrom}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Agent et contact */}
            {property.agent && (
              <div className="bg-gray-50 p-6 rounded-xl h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Votre agent</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{property.agent.name}</p>
                    <p className="text-sm text-gray-600">Agent immobilier</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center w-full bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
                  >
                    <Phone size={18} className="mr-3" />
                    <span>Appeler maintenant</span>
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center w-full bg-white border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Mail size={18} className="mr-3" />
                    <span>Envoyer un email</span>
                  </a>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
                  <p className="flex items-center mb-2">
                    <Phone size={14} className="mr-2" />
                    {property.agent.phone}
                  </p>
                  <p className="flex items-center">
                    <Mail size={14} className="mr-2" />
                    {property.agent.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;