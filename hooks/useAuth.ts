import { AuthContext } from "@/contexts/AuthContext";
import { Permission, UserRole } from "@/types/auth.types";
import { useContext } from "react";

/**
 * Hook personalizado para acceder al contexto de autenticación
 * @throws {Error} Si se usa fuera del AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

/**
 * Hook para verificar permisos
 * @param permission - El permiso a verificar
 * @returns true si el usuario tiene el permiso, false en caso contrario
 *
 * @example
 * const canEdit = usePermission(Permission.EDIT_PRODUCT);
 */
export function usePermission(permission: Permission): boolean {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}

/**
 * Hook para verificar múltiples permisos (OR)
 * @param permissions - Array de permisos a verificar
 * @returns true si el usuario tiene al menos uno de los permisos
 *
 * @example
 * const canManageProducts = useAnyPermission([
 *   Permission.CREATE_PRODUCT,
 *   Permission.EDIT_PRODUCT,
 *   Permission.DELETE_PRODUCT
 * ]);
 */
export function useAnyPermission(permissions: Permission[]): boolean {
  const { hasAnyPermission } = useAuth();
  return hasAnyPermission(permissions);
}

/**
 * Hook para verificar múltiples permisos (AND)
 * @param permissions - Array de permisos a verificar
 * @returns true si el usuario tiene todos los permisos
 *
 * @example
 * const canProcessRefund = useAllPermissions([
 *   Permission.USE_POS,
 *   Permission.VOID_TRANSACTION
 * ]);
 */
export function useAllPermissions(permissions: Permission[]): boolean {
  const { hasAllPermissions } = useAuth();
  return hasAllPermissions(permissions);
}

/**
 * Hook para verificar rol
 * @param role - El rol a verificar
 * @returns true si el usuario tiene el rol especificado
 *
 * @example
 * const isAdmin = useRole(UserRole.ADMIN);
 */
export function useRole(role: UserRole): boolean {
  const { hasRole } = useAuth();
  return hasRole(role);
}

/**
 * Hook para verificar si es admin
 * @returns true si el usuario es admin
 *
 * @example
 * const isAdmin = useIsAdmin();
 */
export function useIsAdmin(): boolean {
  return useRole(UserRole.ADMIN);
}

/**
 * Hook para verificar si es manager
 * @returns true si el usuario es manager
 *
 * @example
 * const isManager = useIsManager();
 */
export function useIsManager(): boolean {
  return useRole(UserRole.MANAGER);
}

/**
 * Hook para verificar si es cashier
 * @returns true si el usuario es cashier
 *
 * @example
 * const isCashier = useIsCashier();
 */
export function useIsCashier(): boolean {
  return useRole(UserRole.CASHIER);
}
