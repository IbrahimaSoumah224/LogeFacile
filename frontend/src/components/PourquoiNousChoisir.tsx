import React from 'react';
import { Shield, Globe, Users, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: 'Fiabilité garantie',
      description: 'Tous nos biens sont vérifiés et certifiés. Nous garantissons la transparence et la sécurité de chaque transaction.',
      color: 'text-emerald-600'
    },
    {
      icon: Globe,
      title: 'Diversité des offres',
      description: 'Large gamme de propriétés dans toutes les régions de Guinée, du traditionnel au moderne, pour tous les budgets.',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Expertise locale',
      description: 'Notre équipe connaît parfaitement le marché guinéen et vous accompagne avec des conseils personnalisés.',
      color: 'text-amber-600'
    },
    {
      icon: Headphones,
      title: 'Service client 24/7',
      description: 'Support disponible en permanence pour répondre à vos questions et vous accompagner dans vos démarches.',
      color: 'text-purple-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi nous choisir ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous sommes votre partenaire de confiance pour tous vos projets immobiliers en Guinée
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} className={feature.color} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-emerald-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-emerald-200">Biens vendus</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-emerald-200">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-emerald-200">Régions couvertes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-emerald-200">Années d'expérience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;