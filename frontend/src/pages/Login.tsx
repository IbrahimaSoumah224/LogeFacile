import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from '../App';
import { useNavigate } from "react-router-dom";  // Ajout import

function Login({ setToken }) {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();  // Hook useNavigate initialisé

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          // Pas de redirection ici au signup
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          toast.success(response.data.message);
          navigate('/admin');  // Redirection vers /home après login réussi
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg flex flex-col space-y-4"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">{currentState}</p>
        </div>

        {currentState === "Login" ? null : (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Entrer votre nom"
            required
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Votre email"
          required
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Votre mots de passe"
          required
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500"
        />
        <div className="flex justify-between text-sm text-blue-600">
          <p className="cursor-pointer hover:underline">mots de passe oublie</p>

          {currentState === "Login" ? (
            <p
              className="cursor-pointer hover:underline"
              onClick={() => setCurrentState("Sign Up")}
            >
              Creer compte
            </p>
          ) : (
            <p
              className="cursor-pointer hover:underline"
              onClick={() => setCurrentState("Login")}
            >
              Se connecter
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-800 text-white font-semibold py-3 rounded-md transition duration-300"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default Login;
