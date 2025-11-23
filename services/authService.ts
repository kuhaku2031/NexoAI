import { API_CONFIG, STORAGE_KEYS } from "@/config/api.config";
import { User } from "@/types/auth.types";
import { mapBackendRoleToFrontend } from "@/utils/roleMapper";
import { StorageUtil } from "@/utils/storage";
import { ApiClient } from "./apiClient";

/**
 * Tipos para la respuesta del backend
 */
interface BackendLoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    email: string;
    role: string;
    company_id: string;
    first_name: string;
    last_name: string;
    phone_number?: number;
  };
}

interface BackendRegisterResponse {
  company_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
  role: string;
}

/**
 * Servicio de autenticación
 * Maneja login, registro, logout y manejo de tokens
 */
export class AuthService {
  /**
   * Inicia sesión con email y contraseña
   */
  static async login(email: string, password: string): Promise<User> {
    try {
      const response = await ApiClient.post<BackendLoginResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        { email, password }
      );

      // Guardar tokens
      await StorageUtil.set(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
      await StorageUtil.set(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token);

      // Convertir datos del backend al formato del frontend
      const user: User = {
        id: response.user.company_id, // Usando company_id como id del usuario
        name: `${response.user.first_name} ${response.user.last_name}`,
        email: response.user.email,
        role: mapBackendRoleToFrontend(response.user.role),
        pointOfSaleId: response.user.company_id, // Esto puede cambiar según tu lógica
      };

      // Guardar datos del usuario
      await StorageUtil.set(STORAGE_KEYS.USER_DATA, user);

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  /**
   * Registra una nueva empresa y usuario
   */
  static async register(data: {
    email: string;
    password: string;
    business_name: string;
    owner_name: string;
    owner_lastname: string;
    phone_number: number;
  }): Promise<User> {
    try {
      await ApiClient.post<BackendRegisterResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        data
      );

      // Después del registro, hacer login automáticamente
      return await this.login(data.email, data.password);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  static async logout(): Promise<void> {
    try {
      // Limpiar todos los datos almacenados
      await StorageUtil.remove(STORAGE_KEYS.ACCESS_TOKEN);
      await StorageUtil.remove(STORAGE_KEYS.REFRESH_TOKEN);
      await StorageUtil.remove(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  /**
   * Obtiene el usuario actual desde el almacenamiento local
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const user = await StorageUtil.get<User>(STORAGE_KEYS.USER_DATA);
      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  /**
   * Verifica si hay una sesión activa
   */
  static async isAuthenticated(): Promise<boolean> {
    try {
      const accessToken = await StorageUtil.get<string>(
        STORAGE_KEYS.ACCESS_TOKEN
      );
      const user = await StorageUtil.get<User>(STORAGE_KEYS.USER_DATA);

      return !!(accessToken && user);
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  }

  /**
   * Obtiene el access token actual
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      return await StorageUtil.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }

  /**
   * Obtiene el refresh token actual
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      return await StorageUtil.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  }
}
