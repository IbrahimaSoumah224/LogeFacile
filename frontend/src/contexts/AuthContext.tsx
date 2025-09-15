import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import authService from "../services/authService";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider?: "email" | "google";
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await authService.login(email, password);
      console.log("Login result:", result);
      if (result.error) setError(result.error.message);
      else setUser(result.data?.user ?? null);
    } catch (e) {
      setError("Erreur inattendue");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const result = await authService.register(email, password, name);
    setIsLoading(false);
    if (result.error) setError(result.error.message);
    else setUser(result.data?.user ?? null);
  };

  const loginWithGoogle = async () => {
    // Implémenter selon ta logique Google si besoin
  };

  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setUser(null);
    setIsLoading(false);
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    const result = await authService.resetPassword(email);
    setIsLoading(false);
    if (result.error) setError(result.error.message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        resetPassword,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
