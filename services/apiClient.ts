import { API_CONFIG, STORAGE_KEYS } from "@/config/api.config";
import { StorageUtil } from "@/utils/storage";

/**
 * Cliente HTTP base para todas las peticiones a la API
 * Incluye manejo automático de tokens y refresh
 */
export class ApiClient {
  private static baseURL = API_CONFIG.BASE_URL;
  private static timeout = API_CONFIG.TIMEOUT;
  private static isRefreshing = false;
  private static refreshSubscribers: ((token: string) => void)[] = [];

  /**
   * Realiza una petición HTTP
   */
  static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Obtener token de acceso
    const accessToken = await StorageUtil.get<string>(
      STORAGE_KEYS.ACCESS_TOKEN
    );

    // Configurar headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Añadir token si existe
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Si el token expiró, intentar renovarlo
      if (response.status === 401) {
        const refreshToken = await StorageUtil.get<string>(
          STORAGE_KEYS.REFRESH_TOKEN
        );

        if (refreshToken) {
          try {
            const newToken = await this.refreshAccessToken(refreshToken);

            // Reintentar la petición con el nuevo token
            headers["Authorization"] = `Bearer ${newToken}`;
            const retryResponse = await fetch(url, {
              ...options,
              headers,
            });

            if (!retryResponse.ok) {
              throw new Error(`HTTP error! status: ${retryResponse.status}`);
            }

            return await retryResponse.json();
          } catch {
            // Si falla el refresh, limpiar tokens y lanzar error
            await this.clearTokens();
            throw new Error("Session expired. Please login again.");
          }
        } else {
          throw new Error("Authentication required");
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout");
        }
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }

  /**
   * Renueva el access token usando el refresh token
   */
  private static async refreshAccessToken(
    refreshToken: string
  ): Promise<string> {
    if (this.isRefreshing) {
      // Si ya se está refrescando, esperar a que termine
      return new Promise((resolve) => {
        this.refreshSubscribers.push((token: string) => {
          resolve(token);
        });
      });
    }

    this.isRefreshing = true;

    try {
      const response = await fetch(
        `${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      const newAccessToken = data.access_token;

      // Guardar nuevo token
      await StorageUtil.set(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);

      // Notificar a los suscriptores
      this.refreshSubscribers.forEach((callback) => callback(newAccessToken));
      this.refreshSubscribers = [];

      return newAccessToken;
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Limpia todos los tokens
   */
  private static async clearTokens(): Promise<void> {
    await StorageUtil.remove(STORAGE_KEYS.ACCESS_TOKEN);
    await StorageUtil.remove(STORAGE_KEYS.REFRESH_TOKEN);
    await StorageUtil.remove(STORAGE_KEYS.USER_DATA);
  }

  /**
   * GET request
   */
  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  /**
   * POST request
   */
  static async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  static async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  /**
   * PATCH request
   */
  static async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}
