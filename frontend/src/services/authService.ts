import api from "./configAxios";
export interface User {
  id: string;
  email: string;
  role?: string;
  name?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

class AuthService {
  private baseUrl = "http://localhost:5000/api/authentification"; // URL backend
  private tokenKey = "auth_token";
  private userKey = "auth_user";

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ data?: LoginResponse; error?: AuthError }> {
    try {
      const { data } = await api.post("/login", { email, password });
      localStorage.setItem(this.tokenKey, data.token);
      localStorage.setItem(this.userKey, JSON.stringify(data.user));
      return { data };
    } catch (error: any) {
      console.error("Erreur lors de la requête login :", error);
      return {
        error: {
          message: error.response?.data?.message || "erreur de connexion",
        },
      };
    }
  }

  async logout(): Promise<{ error?: AuthError }> {
    try {
      const token = this.getToken();
      if (token) {
        await api.post("/logout");
      }
      this.clearAuth();
      return {};
    } catch (error) {
      this.clearAuth();
      return { error: { message: "Erreur lors de la déconnexion" } };
    }
  }

  async verifyToken(): Promise<{ data?: User; error?: AuthError }> {
    try {
      const { data } = await api.get<{ user: User }>("/verify");
      localStorage.setItem(this.userKey, JSON.stringify(data.user));
      return { data: data.user };
    } catch (error: any) {
      this.clearAuth();
      return {
        error: { message: error.response?.data?.message || "token invalide" },
      };
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!(this.getToken() && this.getUser());
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === "admin";
  }

  private clearAuth() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  async authenticatedFetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const token = this.getToken();
    const headers = { "Content-Type": "application/json", ...options.headers };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return fetch(url, { ...options, headers });
  }

  async register(
    email: string,
    password: string,
    name: string
  ): Promise<{ data?: any; error?: any }> {
    try {
      const { data } = await api.post("/register", { email, password, name });
      if (data.token) localStorage.setItem(this.tokenKey, data.token);
      if (data.user)
        localStorage.setItem(this.userKey, JSON.stringify(data.user));
      return { data };
    } catch (error: any) {
      return { error: { message: error.response?.data?.message || "Erreur réseau" } };
    }
  }
}

export const authService = new AuthService();
export default authService;
