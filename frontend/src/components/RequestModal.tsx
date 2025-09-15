import React, { useState } from 'react';
import { X, User, Mail, Phone, MessageSquare, Send, Calendar, DollarSign } from 'lucide-react';
import { Property } from '../types/Property';
import configAxios from '../services/configAxios'
import axios from 'axios';
import { backendUrl } from '../App';

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  requestType: 'location' | 'achat' | 'vente' | 'parcelle' | 'promoteur';
}

const RequestModal: React.FC<RequestModalProps> = ({ 
  isOpen, 
  onClose, 
  property, 
  requestType 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    budget: '',
    moveInDate: '',
    message: '',
    financingNeeded: false,
    visitPreference: 'any'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !property) return null;

  const getModalTitle = () => {
    switch (requestType) {
      case 'location': return 'Demande de location';
      case 'achat': return 'Demande d\'achat';
      case 'vente': return 'Demande d\'estimation';
      case 'parcelle': return 'Demande d\'information parcelle';
      case 'promoteur': return 'Contact promoteur';
      default: return 'Demande d\'information';
    }
  };

  const getButtonText = () => {
    switch (requestType) {
      case 'location': return 'Demander une visite';
      case 'achat': return 'Faire une offre';
      case 'vente': return 'Demander une estimation';
      case 'parcelle': return 'Demander des informations';
      case 'promoteur': return 'Contacter le promoteur';
      default: return 'Envoyer la demande';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi - ici vous connecterez votre API
    const requestData = {
      ...formData,
      propertyId: property.id,
      propertyTitle: property.title,
      requestType,
      createdAt: new Date().toISOString()
    };

    try {
      // TODO: Remplacer par votre appel API
      console.log('Données à envoyer à la base de données:', requestData);
      
      // const response = await axios.post(backendUrl + '/api/location', requestData);
      // console.log('Réponse API:', response.data);
      // setIsSubmitted(true);

      // Simulation d'attente
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      budget: '',
      moveInDate: '',
      message: '',
      financingNeeded: false,
      visitPreference: 'any'
    });
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{getModalTitle()}</h2>
          <button
            onClick={resetAndClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Informations du bien */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-4">
              <img
                src={property.image}
                alt={property.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-emerald-600 font-bold">{property.price}</p>
              </div>
            </div>
          </div>

          {isSubmitted ? (
            /* Message de succès */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={32} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
              <p className="text-gray-600 mb-6">
                Votre demande a été transmise avec succès. Notre équipe vous contactera dans les plus brefs délais.
              </p>
              <button
                onClick={resetAndClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Fermer
              </button>
            </div>
          ) : (
            /* Formulaire */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations personnelles */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Vos informations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Votre prénom"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="+224 622 123 456"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations spécifiques selon le type */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Détails de votre demande</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(requestType === 'location' || requestType === 'achat') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget maximum
                      </label>
                      <div className="relative">
                        <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Ex: 1,500,000 GNF"
                        />
                      </div>
                    </div>
                  )}

                  {requestType === 'location' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date d'emménagement souhaitée
                      </label>
                      <div className="relative">
                        <Calendar size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={formData.moveInDate}
                          onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {requestType === 'achat' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Préférence de visite
                      </label>
                      <select
                        value={formData.visitPreference}
                        onChange={(e) => setFormData({ ...formData, visitPreference: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="any">N'importe quand</option>
                        <option value="morning">Matin</option>
                        <option value="afternoon">Après-midi</option>
                        <option value="weekend">Week-end</option>
                      </select>
                    </div>
                  )}
                </div>

                {requestType === 'achat' && (
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.financingNeeded}
                        onChange={(e) => setFormData({ ...formData, financingNeeded: e.target.checked })}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        J'ai besoin d'aide pour le financement
                      </span>
                    </label>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <div className="relative">
                  <MessageSquare size={20} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows={4}
                    placeholder="Ajoutez des détails sur votre demande..."
                  />
                </div>
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={20} />
                    {getButtonText()}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestModal;