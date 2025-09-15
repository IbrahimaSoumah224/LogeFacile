import React from 'react';
import { Property } from '../types/Property';

interface Props {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<Props> = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-600">X</button>
        <h2 className="text-xl font-bold mb-4">{property.title}</h2>
        <img src={property.image} alt={property.title} className="mb-4" />
        <p>{property.description}</p>
        {/* autres infos de la propriété */}
      </div>
    </div>
  );
};

export default PropertyModal;
