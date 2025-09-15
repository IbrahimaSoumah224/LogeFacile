import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { AuthProvider } from "./contexts/AuthContext";

import Achat from "./pages/Achat";
import Contact from "./pages/Contact";
import Promoteurs from "./pages/Promoteurs";
import Location from "./pages/Location";
import Parcelles from "./pages/Parcelles";
import Vente from "./pages/Vente";
import Accueil from "./pages/Accueil";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationAdmin from "./pages/admin/LocationAdmin";

import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/admin/Properties";
import DemandeAdmin  from "./pages/admin/DemandeAdmin";
import VenteAdmin from "./pages/admin/VenteAdmin";
import PromoteurAdmin from "./pages/admin/PromoteurAdmin";
import ParcelleAdmin from "./pages/admin/ParcelleAdmin";
import UtilisateurAdmin from "./pages/admin/UtilisateurAdmin";
import { AppProvider } from "./contexts/AppContext";
import Layout from "./components/Layout";
import Users from "./pages/Users";
import Contacts from "./pages/Contact";
import Content from "./pages/Content";
import AchatAdmin from "./pages/admin/AchatAdmin";
import Backup from './pages/admin/BackUp';
import Historiqueadmin from "./pages/admin/historiqueAdmin";

export const backendUrl = "http://localhost:5000";

function App() {
  const [token, setToken] = useState("");
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            {/* <Header /> */}
            <ToastContainer />
            <Routes>
              {/* Routes publiques */}
              <Route path="/" index element={<Accueil />} />
              <Route path="/Achat" element={<Achat />} />
              <Route path="/Location" element={<Location />} />
              <Route path="/Vente" element={<Vente />} />
              <Route path="/Parcelles" element={<Parcelles />} />
              <Route path="/Contact" element={<Contact />} />
              <Route path="/Promoteurs" element={<Promoteurs />} />
              <Route path="/Login" element={<Login setToken={setToken} />} />

              {/* Routes admins avec layout et routes imbriquées */}
              <Route path="/admin" element={<Layout />}>
                <Route path="dashboard" index element={<Dashboard />} />
                <Route path="locationadmin" element={<LocationAdmin />} />
                <Route path="demandeadmin" element={<DemandeAdmin />} />
                <Route path="achatadmin" element={<AchatAdmin />} />
                <Route path="venteadmin" element={<VenteAdmin />} />
                <Route path="promoteuradmin" element={<PromoteurAdmin />} />
                <Route path="parcellesadmin" element={<ParcelleAdmin />} />
                <Route path="utilisateursadmin" element={<UtilisateurAdmin />} />
                <Route path="backup" element={<Backup/>}/>
                <Route path="historiqueadmin" element={<Historiqueadmin/>}/>
              </Route>

              {/* Route 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
