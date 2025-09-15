import { useState, useEffect } from 'react';
import { Property } from '../types/Appartement';
import { properties } from '../data/properties';

export const useProperties = () => {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulation d'un appel API
    const fetchProperties = async () => {
      try {
        setLoading(true);
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 500));
        setAllProperties(properties);
      } catch (err) {
        setError('Erreur lors du chargement des propriétés');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getPropertyById = async (id: number): Promise<Property | null> => {
    try {
      // Simulation d'un appel API pour récupérer les détails
      await new Promise(resolve => setTimeout(resolve, 300));
      return properties.find(property => property.id === id) || null;
    } catch (err) {
      throw new Error('Erreur lors du chargement des détails de la propriété');
    }
  };

  return {
    properties: allProperties,
    loading,
    error,
    getPropertyById
  };
};