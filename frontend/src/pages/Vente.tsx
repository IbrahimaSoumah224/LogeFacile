import React, { useState } from 'react';
import { Upload, MapPin, Home, Camera, FileText, Phone, Calculator } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RequestModal from '../components/RequestModal';
import { Property } from '../types/Property';

const VentePage = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    location: '',
    price: '',
    surface: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    features: [] as string[],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  });

  const [images, setImages] = useState<string[]>([]);

  const propertyTypes = [
    'Maison',
    'Appartement', 
    'Villa',
    'Studio',
    'Duplex',
    'Parcelle'
  ];

  const regions = [
    'Conakry',
    'Kindia', 
    'Boké',
    'Labé',
    'Nzérékoré',
    'Kankan',
    'Mamou',
    'Faranah'
  ];

  const availableFeatures = [
    'Climatisation',
    'Jardin',
    'Garage',
    'Piscine',
    'Sécurité 24h',
    'Ascenseur',
    'Balcon',
    'Terrasse',
    'Cave',
    'Parking'
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connecter à votre API pour envoyer les données
    console.log('Données du formulaire:', formData);
    alert('Votre annonce a été soumise avec succès !');
  };

  const handleEstimationRequest = () => {
    // Créer une propriété temporaire pour l'estimation
    const estimationProperty: Property = {
      id: 0,
      title: 'Demande d\'estimation',
      location: 'À définir',
      price: 'Estimation gratuite',
      type: 'Vente',
      area: '0m²',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'
    };
    setSelectedProperty(estimationProperty);
    setShowRequestModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Vendez votre bien immobilier</h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Mettez votre propriété en vente avec l'aide de nos experts immobiliers
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEstimationRequest}
              className="bg-white text-amber-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-50 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Calculator size={24} />
              Estimation gratuite
            </button>
          </div>
        </div>
      </section>

      {/* Formulaire de vente */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Déposez votre annonce gratuitement
              </h2>
              <p className="text-gray-600">
                Remplissez le formulaire ci-dessous pour mettre votre bien en vente
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations générales */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Home size={20} className="text-amber-600" />
                  Informations générales
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de l'annonce *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ex: Belle villa moderne avec jardin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de bien *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localisation *
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionnez une région</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix de vente (GNF) *
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ex: 25,000,000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Surface (m²) *
                    </label>
                    <input
                      type="number"
                      value={formData.surface}
                      onChange={(e) => setFormData({ ...formData, surface: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Ex: 150"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de chambres
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Non spécifié</option>
                      <option value="1">1 chambre</option>
                      <option value="2">2 chambres</option>
                      <option value="3">3 chambres</option>
                      <option value="4">4 chambres</option>
                      <option value="5+">5+ chambres</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-amber-600" />
                  Description détaillée
                </h3>
                
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows={6}
                  placeholder="Décrivez votre bien en détail : état, équipements, environnement, points forts..."
                />
              </div>

              {/* Équipements */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Équipements et caractéristiques
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {availableFeatures.map((feature) => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Photos */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Camera size={20} className="text-amber-600" />
                  Photos du bien
                </h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-500 transition-colors duration-200">
                  <Upload size={32} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-2">Ajoutez jusqu'à 10 photos</p>
                  <p className="text-sm text-gray-500">PNG, JPG jusqu'à 5MB chacune</p>
                  <button
                    type="button"
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Choisir les photos
                  </button>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone size={20} className="text-amber-600" />
                  Vos coordonnées
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={formData.contact.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        contact: { ...formData.contact, name: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={formData.contact.phone}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        contact: { ...formData.contact, phone: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="+224 622 123 456"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.contact.email}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        contact: { ...formData.contact, email: e.target.value }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bouton de soumission */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  Publier mon annonce
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  Votre annonce sera vérifiée par notre équipe avant publication
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Services d'accompagnement */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos services d'accompagnement
            </h2>
            <p className="text-xl text-gray-600">
              Nous vous aidons à vendre au meilleur prix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator size={32} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimation gratuite</h3>
              <p className="text-gray-600">Évaluation professionnelle de votre bien</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Photos professionnelles</h3>
              <p className="text-gray-600">Mise en valeur de votre propriété</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accompagnement juridique</h3>
              <p className="text-gray-600">Aide pour toutes les démarches</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal de demande */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        property={selectedProperty}
        requestType="vente"
      />
    </div>
  );
};

export default VentePage;