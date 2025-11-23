import { UserRole } from "@/types/auth.types";

/**
 * Roles del backend (NestJS)
 */
export type BackendRole = "OWNER" | "MANAGER" | "EMPLOYEE" | "ADMIN";

/**
 * Mapeo de roles del backend a roles del frontend
 * Backend → Frontend
 */
const BACKEND_TO_FRONTEND_ROLE_MAP: Record<BackendRole, UserRole> = {
  OWNER: UserRole.ADMIN, // El dueño tiene todos los permisos
  ADMIN: UserRole.ADMIN, // Admin del sistema
  MANAGER: UserRole.MANAGER, // Gerente
  EMPLOYEE: UserRole.CASHIER, // Empleado/Cajero
};

/**
 * Convierte un rol del backend a un rol del frontend
 * @param backendRole - Rol del backend
 * @returns Rol del frontend
 */
export function mapBackendRoleToFrontend(backendRole: string): UserRole {
  const role = backendRole.toUpperCase() as BackendRole;

  // Si el rol existe en el mapa, devolverlo
  if (role in BACKEND_TO_FRONTEND_ROLE_MAP) {
    return BACKEND_TO_FRONTEND_ROLE_MAP[role];
  }

  // Por defecto, si no se reconoce el rol, asignar VIEWER
  console.warn(`Rol desconocido del backend: ${backendRole}, asignando VIEWER`);
  return UserRole.VIEWER;
}

/**
 * Verifica si un rol del backend es válido
 * @param role - Rol a verificar
 * @returns true si es válido
 */
export function isValidBackendRole(role: string): role is BackendRole {
  return role.toUpperCase() in BACKEND_TO_FRONTEND_ROLE_MAP;
}
