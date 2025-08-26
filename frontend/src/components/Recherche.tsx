import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';

const SearchSection = () => {
  const [searchForm, setSearchForm] = useState({
    type: '',
    region: '',
    budget: ''
  });

  const propertyTypes = [
    { value: 'location', label: 'Location' },
    { value: 'achat', label: 'Achat' },
    { value: 'vente', label: 'Vente' },
    { value: 'parcelle', label: 'Parcelle' }
  ];

  const regions = [
    { value: 'conakry', label: 'Conakry' },
    { value: 'kindia', label: 'Kindia' },
    { value: 'boke', label: 'Boké' },
    { value: 'labe', label: 'Labé' },
    { value: 'nzerekore', label: 'Nzérékoré' },
    { value: 'kankan', label: 'Kankan' },
    { value: 'mamou', label: 'Mamou' },
    { value: 'faranah', label: 'Faranah' }
  ];

  const budgetRanges = [
    { value: '0-5000000', label: '0 - 5M GNF' },
    { value: '5000000-10000000', label: '5M - 10M GNF' },
    { value: '10000000-25000000', label: '10M - 25M GNF' },
    { value: '25000000-50000000', label: '25M - 50M GNF' },
    { value: '50000000+', label: '50M+ GNF' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trouvez rapidement votre bien idéal
          </h2>
          <p className="text-xl text-gray-600">
            Utilisez nos filtres avancés pour une recherche précise
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Property Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Home size={16} className="text-emerald-600" />
                Type de bien
              </label>
              <select
                value={searchForm.type}
                onChange={(e) => setSearchForm({ ...searchForm, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Tous les types</option>
                {propertyTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin size={16} className="text-emerald-600" />
                Région
              </label>
              <select
                value={searchForm.region}
                onChange={(e) => setSearchForm({ ...searchForm, region: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Toutes les régions</option>
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <DollarSign size={16} className="text-emerald-600" />
                Budget
              </label>
              <select
                value={searchForm.budget}
                onChange={(e) => setSearchForm({ ...searchForm, budget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Tous les budgets</option>
                {budgetRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                <Search size={20} />
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;