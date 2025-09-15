import React from "react";
import { Property } from "../types";
import { MapPin, Bed, Bath, Square, Eye, Edit, Trash2 } from "lucide-react";

interface PropertyCardProps {
  property: Property;
  onView: (property: Property) => void;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export default function PropertyCard({
  property,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}: PropertyCardProps) {
  const statusColors = {
    available: "bg-green-100 text-green-800",
    sold: "bg-gray-100 text-gray-800",
    rented: "bg-blue-100 text-blue-800",
    pending: "bg-orange-100 text-orange-800",
  };

  const statusLabels = {
    available: "Disponible",
    sold: "Vendu",
    rented: "Loué",
    pending: "En cours",
  };

  const typeLabels = {
    apartment: "Appartement",
    house: "Maison",
    commercial: "Commercial",
    land: "Terrain",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              statusColors[property.status]
            }`}
          >
            {statusLabels[property.status]}
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-white bg-opacity-90 text-gray-700 rounded-full">
            {typeLabels[property.type]}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onToggleStatus(property.id)}
            className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
              property.isActive
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"
            }`}
          >
            {property.isActive ? "Actif" : "Inactif"}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.address}, {property.city}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.surface}m²</span>
          </div>
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.rooms}</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">
            {property.price.toLocaleString("fr-FR")}€
            {property.type === "commercial" && (
              <span className="text-sm font-normal">/mois</span>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onView(property)}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Voir"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => onEdit(property)}
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Modifier"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(property.id)}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
