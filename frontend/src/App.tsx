import React from 'react';
import Header from './components/Header';
import HeroSection from './components/Banniere';
import SearchSection from './components/Recherche';
import LatestOffers from './components/DerniereOffre';
import WhyChooseUs from './components/PourquoiNousChoisir';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <SearchSection />
      <LatestOffers />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;