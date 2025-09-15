import React, { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import GoogleButton from "./GoogleButton";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register" | "forgot";
}

type AuthMode = "login" | "register" | "forgot";

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [successMessage, setSuccessMessage] = useState("");

  const {
    login,
    register,
    loginWithGoogle,
    resetPassword,
    isLoading,
    error,
    clearError,
  } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setValidationErrors({});
      setSuccessMessage("");
      clearError();
    }
  }, [isOpen, initialMode, clearError]);

  useEffect(() => {
    setValidationErrors({});
    setSuccessMessage("");
    clearError();
  }, [mode, clearError]);

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "L'email est requis";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Format d'email invalide";
    }

    if (mode !== "forgot") {
      if (!formData.password) {
        errors.password = "Le mot de passe est requis";
      } else if (!validatePassword(formData.password)) {
        errors.password = "Le mot de passe doit contenir au moins 6 caractères";
      }
    }

    if (mode === "register") {
      if (!formData.name) {
        errors.name = "Le nom est requis";
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    if (mode === "login") {
      await login(formData.email, formData.password);
      if (!error) {
        onClose(); // ne ferme que s'il n'y a pas d'erreur
      }
    } else if (mode === "register") {
      await register(formData.name, formData.email, formData.password);
      if (!error) {
        onClose();
      }
    } else if (mode === "forgot") {
      await resetPassword(formData.email);
      setSuccessMessage(
        "Un email de réinitialisation a été envoyé à votre adresse"
      );
    }
  } catch (err) {
    // L'erreur est déjà gérée via le contexte Auth
  }
};


  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      // L'erreur est gérée par le contexte
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Connexion";
      case "register":
        return "Créer un compte";
      case "forgot":
        return "Mot de passe oublié";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Messages d'erreur et de succès */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Bouton Google (sauf pour mot de passe oublié) */}
          {mode !== "forgot" && (
            <div className="mb-6">
              <GoogleButton onClick={handleGoogleLogin} isLoading={isLoading} />
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">ou</span>
                </div>
              </div>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom (inscription seulement) */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      validationErrors.name
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Votre nom complet"
                  />
                </div>
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    validationErrors.email
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                  placeholder="votre@email.com"
                />
              </div>
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Mot de passe (pas pour mot de passe oublié) */}
            {mode !== "forgot" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      validationErrors.password
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.password}
                  </p>
                )}
              </div>
            )}

            {/* Confirmation mot de passe (inscription seulement) */}
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                      validationErrors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    placeholder="Confirmez votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {validationErrors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                getTitle()
              )}
            </button>
          </form>

          {/* Liens de navigation */}
          <div className="mt-6 text-center space-y-2">
            {mode === "login" && (
              <>
                <button
                  onClick={() => setMode("forgot")}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  Mot de passe oublié ?
                </button>
                <p className="text-gray-600 text-sm">
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Créer un compte
                  </button>
                </p>
              </>
            )}

            {mode === "register" && (
              <p className="text-gray-600 text-sm">
                Déjà un compte ?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Se connecter
                </button>
              </p>
            )}

            {mode === "forgot" && (
              <button
                onClick={() => setMode("login")}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                Retour à la connexion
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
