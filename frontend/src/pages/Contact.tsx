import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez gérer la soumission (ex: envoi API, email...)
    alert(`Message envoyé par ${formData.nom} (${formData.email}) : ${formData.message}`);
    setFormData({ nom: '', email: '', sujet: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Une question, un besoin d’information ? Nous sommes là pour vous répondre.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mb-4">
              <label htmlFor="nom" className="block font-medium text-gray-700 mb-2">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="sujet" className="block font-medium text-gray-700 mb-2">Sujet</label>
              <input
                type="text"
                id="sujet"
                name="sujet"
                value={formData.sujet}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block font-medium text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Envoyer
            </button>
          </form>

          {/* Contact Info */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
            <p className="mb-4">Adresse : 123 Rue Principale, Conakry, Guinée</p>
            <p className="mb-4">Téléphone : +224 666 112 334</p>
            <p> Email : contact@monagence.com </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
