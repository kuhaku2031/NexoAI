import { Permission, UserRole } from "@/types/auth.types";

/**
 * Configuración de permisos para cada tab
 */
export interface TabConfig {
  name: string;
  title: string;
  icon: string;
  requiredPermission?: Permission;
  requiredRole?: UserRole;
  allowedRoles?: UserRole[];
}

/**
 * Configuración de tabs con sus permisos requeridos
 */
export const TAB_CONFIGS: TabConfig[] = [
  {
    name: "chat/index",
    title: "Chat",
    icon: "chatbubbles-outline",
    requiredPermission: Permission.USE_CHAT,
  },
  {
    name: "products/index",
    title: "Products",
    icon: "pricetags-outline",
    requiredPermission: Permission.VIEW_PRODUCTS,
  },
  {
    name: "dashboard/index",
    title: "Dashboard",
    icon: "grid-outline",
    requiredPermission: Permission.VIEW_DASHBOARD,
  },
  {
    name: "pos/index",
    title: "POS",
    icon: "calculator-outline",
    requiredPermission: Permission.USE_POS,
  },
  {
    name: "profile/index",
    title: "Profile",
    icon: "person-outline",
    requiredPermission: Permission.VIEW_PROFILE,
  },
];

/**
 * Filtra las tabs basándose en los permisos del usuario
 * @param hasPermission - Función para verificar permisos
 * @returns Array de tabs que el usuario puede ver
 */
export function getVisibleTabs(
  hasPermission: (permission: Permission) => boolean
): TabConfig[] {
  return TAB_CONFIGS.filter((tab) => {
    // Si no requiere permiso, está visible para todos
    if (!tab.requiredPermission) {
      return true;
    }

    // Verificar si tiene el permiso requerido
    return hasPermission(tab.requiredPermission);
  });
}
