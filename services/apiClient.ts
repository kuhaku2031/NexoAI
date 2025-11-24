import axios from "axios";
import { API_CONFIG, STORAGE_KEYS } from "@/config/api.config";
import { StorageUtil } from "@/utils/storage";

/**
 * Instancia de Axios configurada
 */
export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de Request
 * Añade el token de acceso a cada petición
 */
api.interceptors.request.use(
  async (config) => {
    const token = await StorageUtil.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Response
 * Maneja errores 401 y renueva el token
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no hemos reintentado aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await StorageUtil.get<string>(
          STORAGE_KEYS.REFRESH_TOKEN
        );

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Intentar renovar el token
        // Nota: Usamos axios.post directamente para evitar el interceptor y bucles infinitos
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`,
          {
            refresh_token: refreshToken,
          }
        );

        const { access_token } = response.data;

        // Guardar nuevo token
        await StorageUtil.set(STORAGE_KEYS.ACCESS_TOKEN, access_token);

        // Actualizar header de la petición original
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Reintentar la petición original
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla la renovación, limpiar sesión
        await StorageUtil.remove(STORAGE_KEYS.ACCESS_TOKEN);
        await StorageUtil.remove(STORAGE_KEYS.REFRESH_TOKEN);
        await StorageUtil.remove(STORAGE_KEYS.USER_DATA);

        // Aquí podrías emitir un evento para redirigir al login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
