import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Mamadou Diallo',
      location: 'Conakry',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Excellent service ! J\'ai trouvé ma maison de rêve à Kipé grâce à ImmoGuinée. L\'équipe est très professionnelle et m\'a accompagné tout au long du processus.',
      property: 'Villa 4 pièces à Kipé'
    },
    {
      id: 2,
      name: 'Aïssatou Bah',
      location: 'Kindia',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Service rapide et efficace. J\'ai pu louer un appartement moderne en quelques jours seulement. Je recommande vivement ImmoGuinée à tous.',
      property: 'Appartement 3 pièces à Kindia'
    },
    {
      id: 3,
      name: 'Ibrahima Camara',
      location: 'Labé',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      comment: 'Très satisfait de mon achat de parcelle. L\'équipe connaît vraiment bien le marché et m\'a aidé à faire le meilleur choix pour mon investissement.',
      property: 'Parcelle 800m² à Labé'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Témoignages de nos clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que disent nos clients satisfaits de leur expérience avec ImmoGuinée
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 p-8 rounded-xl relative hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <Quote size={16} className="text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star
                    key={index}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{testimonial.comment}"
              </p>

              {/* Property Info */}
              <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-emerald-600">
                <p className="text-sm text-gray-600">Bien acquis :</p>
                <p className="font-semibold text-gray-900">{testimonial.property}</p>
              </div>

              {/* Client Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-emerald-50 p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Rejoignez nos clients satisfaits
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Laissez-nous vous aider à trouver le bien immobilier parfait. 
            Notre équipe d'experts est là pour vous accompagner.
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Commencer ma recherche
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;