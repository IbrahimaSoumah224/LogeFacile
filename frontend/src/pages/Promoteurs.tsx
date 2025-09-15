import React, { useState } from 'react';
import { Star, MapPin, Phone, Mail, Eye, Building, Award, Users, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RequestModal from '../components/RequestModal';
import { Property } from '../types/Property';

interface Promoteur {
  id: number;
  name: string;
  logo: string;
  description: string;
  specialties: string[];
  rating: number;
  projectsCount: number;
  yearsExperience: number;
  location: string;
  phone: string;
  email: string;
  website?: string;
  projects: {
    id: number;
    name: string;
    image: string;
    location: string;
    status: string;
    units: number;
  }[];
}

const PromoteursPage = () => {
  const [selectedPromoteur, setSelectedPromoteur] = useState<Promoteur | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestProperty, setRequestProperty] = useState<Property | null>(null);

  const promoteurs: Promoteur[] = [
    {
      id: 1,
      name: 'Guinée Construction',
      logo: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Leader de la construction résidentielle en Guinée depuis 15 ans. Spécialisé dans les projets de standing avec finitions haut de gamme.',
      specialties: ['Villas de luxe', 'Résidences sécurisées', 'Immeubles modernes'],
      rating: 4.8,
      projectsCount: 45,
      yearsExperience: 15,
      location: 'Conakry',
      phone: '+224 622 111 222',
      email: 'contact@guinee-construction.com',
      website: 'www.guinee-construction.com',
      projects: [
        {
          id: 1,
          name: 'Résidence Les Palmiers',
          image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
          location: 'Kipé, Conakry',
          status: 'Terminé',
          units: 24
        },
        {
          id: 2,
          name: 'Villa Park Almamya',
          image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400',
          location: 'Almamya, Conakry',
          status: 'En cours',
          units: 12
        }
      ]
    },
    {
      id: 2,
      name: 'Bâtir Guinée',
      logo: 'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Promoteur spécialisé dans l\'habitat social et les logements accessibles. Engagement fort pour le développement urbain durable.',
      specialties: ['Logements sociaux', 'Habitat économique', 'Aménagement urbain'],
      rating: 4.6,
      projectsCount: 32,
      yearsExperience: 12,
      location: 'Kindia',
      phone: '+224 622 333 444',
      email: 'info@batir-guinee.com',
      projects: [
        {
          id: 3,
          name: 'Cité Moderne Kindia',
          image: 'https://images.pexels.com/photos/1396119/pexels-photo-1396119.jpeg?auto=compress&cs=tinysrgb&w=400',
          location: 'Kindia',
          status: 'Terminé',
          units: 80
        }
      ]
    },
    {
      id: 3,
      name: 'Immobilier Plus',
      logo: 'https://images.pexels.com/photos/1396113/pexels-photo-1396113.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Expertise dans les projets commerciaux et mixtes. Partenaire de confiance pour les investisseurs institutionnels.',
      specialties: ['Centres commerciaux', 'Bureaux', 'Projets mixtes'],
      rating: 4.7,
      projectsCount: 28,
      yearsExperience: 10,
      location: 'Conakry',
      phone: '+224 622 555 666',
      email: 'contact@immobilier-plus.gn',
      projects: [
        {
          id: 4,
          name: 'Centre Commercial Ratoma',
          image: 'https://images.pexels.com/photos/1396115/pexels-photo-1396115.jpeg?auto=compress&cs=tinysrgb&w=400',
          location: 'Ratoma, Conakry',
          status: 'En cours',
          units: 50
        }
      ]
    }
  ];

  const handleContactPromoteur = (promoteur: Promoteur) => {
    // Créer une propriété temporaire pour le contact promoteur
    const promoteurProperty: Property = {
      id: promoteur.id,
      title: `Contact ${promoteur.name}`,
      location: promoteur.location,
      price: 'Devis sur demande',
      type: 'Vente',
      area: 'Variable',
      image: promoteur.logo
    };
    setRequestProperty(promoteurProperty);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Nos promoteurs partenaires</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Découvrez les meilleurs promoteurs immobiliers de Guinée et leurs projets
          </p>
        </div>
      </section>

      {/* Liste des promoteurs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {promoteurs.map((promoteur) => (
              <div key={promoteur.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Header avec logo */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={promoteur.logo}
                      alt={promoteur.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{promoteur.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              size={16}
                              className={`${
                                index < Math.floor(promoteur.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({promoteur.rating})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {promoteur.description}
                  </p>
                </div>

                {/* Statistiques */}
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{promoteur.projectsCount}</div>
                      <div className="text-xs text-gray-600">Projets</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{promoteur.yearsExperience}</div>
                      <div className="text-xs text-gray-600">Années</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{promoteur.projects.reduce((sum, p) => sum + p.units, 0)}</div>
                      <div className="text-xs text-gray-600">Logements</div>
                    </div>
                  </div>
                </div>

                {/* Spécialités */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Spécialités</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {promoteur.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <MapPin size={16} className="mr-2" />
                    {promoteur.location}
                  </div>

                  <button
                    onClick={() => setSelectedPromoteur(promoteur)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye size={16} />
                    Voir les projets
                  </button>
                  <button
                    onClick={() => handleContactPromoteur(promoteur)}
                    className="w-full mt-2 bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal détail promoteur */}
      {selectedPromoteur && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">{selectedPromoteur.name}</h2>
              <button
                onClick={() => setSelectedPromoteur(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Informations détaillées */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">À propos</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{selectedPromoteur.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Building size={24} className="text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{selectedPromoteur.projectsCount}</div>
                      <div className="text-sm text-gray-600">Projets réalisés</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <Award size={24} className="text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">{selectedPromoteur.yearsExperience}</div>
                      <div className="text-sm text-gray-600">Années d'expérience</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-purple-600" />
                      <span className="text-gray-700">{selectedPromoteur.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-purple-600" />
                      <span className="text-gray-700">{selectedPromoteur.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-purple-600" />
                      <span className="text-gray-700">{selectedPromoteur.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                      Contacter
                    </button>
                    {selectedPromoteur.website && (
                      <button className="w-full border border-purple-600 text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        Visiter le site
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Projets */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Projets et réalisations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedPromoteur.projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{project.name}</h4>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin size={14} className="mr-1" />
                          {project.location}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'Terminé' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-sm text-gray-600">{project.units} logements</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de demande de contact promoteur */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        property={requestProperty}
        requestType="promoteur"
      />
    </div>
  );
};

export default PromoteursPage;