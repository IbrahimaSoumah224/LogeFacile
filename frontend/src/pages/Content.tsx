import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { StaticContent } from '../types';
import { FileText, Edit, Save, X, Upload, Image, Plus } from 'lucide-react';

export default function Content() {
  const { state, dispatch } = useApp();
  const [editingContent, setEditingContent] = useState<StaticContent | null>(null);
  const [bannerImage, setBannerImage] = useState<string>('https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg');

  const handleEditContent = (content: StaticContent) => {
    setEditingContent({ ...content });
  };

  const handleSaveContent = () => {
    if (editingContent) {
      const updatedContent = {
        ...editingContent,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      dispatch({ type: 'UPDATE_STATIC_CONTENT', payload: updatedContent });
      setEditingContent(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBannerImage(imageUrl);
    }
  };

  const sectionLabels = {
    hero: 'Section Hero',
    about: 'À propos',
    services: 'Services',
    testimonials: 'Témoignages',
    footer: 'Pied de page',
    legal: 'Pages légales'
  };

  const legalPages = [
    { id: 'privacy', title: 'Politique de confidentialité', content: 'Contenu de la politique de confidentialité...' },
    { id: 'terms', title: 'Conditions générales', content: 'Contenu des conditions générales...' },
    { id: 'cookies', title: 'Politique des cookies', content: 'Contenu de la politique des cookies...' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestion des contenus</h1>
        <p className="text-gray-600 mt-1">Modifiez les textes et images de votre site</p>
      </div>

      {/* Banner Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Image className="h-5 w-5 mr-2" />
          Bannière principale
        </h2>
        
        <div className="space-y-4">
          <div className="relative">
            <img
              src={bannerImage}
              alt="Bannière principale"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">Trouvez votre bien immobilier idéal</h3>
                <p className="text-lg">Découvrez notre sélection exclusive</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="banner-upload"
            />
            <label
              htmlFor="banner-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4 mr-2" />
              Changer la bannière
            </label>
            <p className="text-sm text-gray-500">Format recommandé: 1920x600px, JPG ou PNG</p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Sections du site
        </h2>
        
        <div className="space-y-6">
          {state.staticContent.map((content) => (
            <div key={content.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-gray-900">
                  {sectionLabels[content.section]}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    Modifié le {content.updatedAt}
                  </span>
                  {editingContent?.id === content.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveContent}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Sauvegarder"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingContent(null)}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Annuler"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditContent(content)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {editingContent?.id === content.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre
                    </label>
                    <input
                      type="text"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent(prev => prev ? { ...prev, title: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={editingContent.content}
                      onChange={(e) => setEditingContent(prev => prev ? { ...prev, content: e.target.value } : null)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">{content.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{content.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legal Pages */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Pages légales
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalPages.map((page) => (
            <div key={page.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-md font-medium text-gray-900">{page.title}</h3>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{page.content}</p>
              <button className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
                Modifier le contenu →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Témoignages clients</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 1, name: 'Sophie Martin', text: 'Service exceptionnel, équipe très professionnelle. Je recommande vivement !', rating: 5 },
            { id: 2, name: 'Pierre Dubois', text: 'Accompagnement parfait pour l\'achat de notre maison. Merci pour votre expertise.', rating: 5 }
          ].map((testimonial) => (
            <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{testimonial.name}</span>
                </div>
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">{testimonial.text}</p>
              <div className="flex text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un témoignage
        </button>
      </div>
    </div>
  );
}