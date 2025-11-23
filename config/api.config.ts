import Constants from "expo-constants";

/**
 * Configuración de la API
 * Cambia automáticamente entre desarrollo y producción
 */
export const API_CONFIG = {
  // URL base de la API
  BASE_URL: __DEV__
    ? "http://localhost:3000" // Desarrollo local
    : "https://api.tudominio.com", // Producción (cambiar por tu dominio)

  // Timeout para las peticiones (10 segundos)
  TIMEOUT: 10000,

  // Endpoints de la API
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      REFRESH: "/auth/refresh",
    },
    USERS: {
      ME: "/users/me",
      UPDATE: "/users/update",
    },
    PRODUCTS: {
      LIST: "/products",
      CREATE: "/products",
      UPDATE: "/products",
      DELETE: "/products",
    },
    POS: {
      CREATE_SALE: "/sales",
      GET_SALES: "/sales",
    },
    ANALYTICS: {
      DASHBOARD: "/analytics/dashboard",
      REPORTS: "/analytics/reports",
    },
  },
};

/**
 * Claves para almacenamiento local
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "@nexoai:access_token",
  REFRESH_TOKEN: "@nexoai:refresh_token",
  USER_DATA: "@nexoai:user_data",
};
