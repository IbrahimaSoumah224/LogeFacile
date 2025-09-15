import Header from "../components/Header";
import Banniere from "../components/Banniere";
import Recherche from "../components/Recherche";
import LatestOffers from "../components/DerniereOffre";
import PourquoiNousChoisir from "../components/PourquoiNousChoisir";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import ChatBox from "../components/ChatBox";
import { AuthProvider } from "../contexts/AuthContext";
import { useState } from "react";
import { Property } from "../types/Appartement";
import PropertyDetailsModal from "../components/PropertyDetailsModal";

function Accueil() {
  // On stocke la propriété complète sélectionnée, pas uniquement l'id
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Ouvrir modal avec propriété sélectionnée
  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
  };

  // Fermer modal en remettant sélection à null
  const handleCloseModal = () => {
    setSelectedProperty(null);
  };

  return (
    <AuthProvider>
      <div>
        <Header />
        <Banniere />
        <Recherche />
        <LatestOffers onPropertySelect={handlePropertySelect} />
        <PourquoiNousChoisir />
        <Testimonials />
        <Footer />

        {/* Affichage conditionnel du modal */}
        {selectedProperty && (
          <PropertyDetailsModal
            isOpen={true}
            onClose={handleCloseModal}
            property={selectedProperty}
          />
        )}

        <ChatBox />
      </div>
    </AuthProvider>
  );
}

export default Accueil;
