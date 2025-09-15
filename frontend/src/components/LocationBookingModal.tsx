import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Property } from '../types/Appartement';

interface Props {
  isOpen: boolean;
  property: Property;
  onClose: () => void;
}

const LocationBookingModal: React.FC<Props> = ({ isOpen, property, onClose }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: envoyer formData + property.id au backend
    alert(`Demande envoyée pour ${property.title} par ${formData.nom}`);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto flex flex-col md:flex-row">
        {/* Colonne images + vidéo */}
        <div className="md:w-1/2 p-4 border-r border-gray-200 flex flex-col space-y-4">
          {/* Carousel images */}
          <div className="flex overflow-x-auto gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {property.images && property.images.length > 0 ? (
              property.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${property.title} image ${i + 1}`}
                  className="w-24 h-24 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
                />
              ))
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                Aucune image
              </div>
            )}
          </div>

          {/* Vidéo */}
          {property.videoUrl && (
            <video controls className="rounded-lg w-full mt-4 max-h-60 object-cover">
              <source src={property.videoUrl} type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
          )}
        </div>

        {/* Colonne infos + formulaire */}
        <div className="md:w-1/2 p-6 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-gray-400 hover:text-gray-700 mb-4"
            aria-label="Fermer modal"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold mb-2">{property.title}</h2>
          <p className="text-gray-600 mb-6">{property.description}</p>

          <ul className="mb-6 text-gray-700 space-y-1">
            <li><strong>Localisation :</strong> {property.address}, {property.city}</li>
            <li><strong>Surface :</strong> {property.surface} m²</li>
            <li><strong>Pièces :</strong> {property.rooms}</li>
            <li><strong>Salles de bain :</strong> {property.bathrooms}</li>
            <li><strong>Prix :</strong> {property.price.toLocaleString('fr-FR')} GNF {property.type === 'commercial' ? '/mois' : ''}</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Je souhaite louer ce bien</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom complet"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse email"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Téléphone"
              required
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white py-3 rounded hover:bg-emerald-700 transition"
            >
              Louer ce bien
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LocationBookingModal;
