/**
 * Tipos de roles disponibles en el sistema
 */
export enum UserRole {
  ADMIN = "admin", // Acceso completo al sistema
  MANAGER = "manager", // Puede ver dashboard, productos, POS
  CASHIER = "cashier", // Solo puede usar POS y ver productos
  VIEWER = "viewer", // Solo puede ver información básica
}

/**
 * Permisos específicos del sistema
 */
export enum Permission {
  // Dashboard
  VIEW_DASHBOARD = "view_dashboard",
  VIEW_ANALYTICS = "view_analytics",
  VIEW_AI_INSIGHTS = "view_ai_insights",

  // Productos
  VIEW_PRODUCTS = "view_products",
  CREATE_PRODUCT = "create_product",
  EDIT_PRODUCT = "edit_product",
  DELETE_PRODUCT = "delete_product",

  // POS
  USE_POS = "use_pos",
  VOID_TRANSACTION = "void_transaction",
  APPLY_DISCOUNT = "apply_discount",

  // Chat
  USE_CHAT = "use_chat",

  // Perfil
  VIEW_PROFILE = "view_profile",
  EDIT_OWN_PROFILE = "edit_own_profile",

  // Administración
  MANAGE_USERS = "manage_users",
  MANAGE_SETTINGS = "manage_settings",
  VIEW_REPORTS = "view_reports",
}

/**
 * Mapeo de roles a permisos
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.ADMIN]: [
    // Admin tiene todos los permisos
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_AI_INSIGHTS,
    Permission.VIEW_PRODUCTS,
    Permission.CREATE_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.USE_POS,
    Permission.VOID_TRANSACTION,
    Permission.APPLY_DISCOUNT,
    Permission.USE_CHAT,
    Permission.VIEW_PROFILE,
    Permission.EDIT_OWN_PROFILE,
    Permission.MANAGE_USERS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_REPORTS,
  ],

  [UserRole.MANAGER]: [
    // Manager puede ver dashboard completo y gestionar productos
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_AI_INSIGHTS,
    Permission.VIEW_PRODUCTS,
    Permission.CREATE_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.DELETE_PRODUCT,
    Permission.USE_POS,
    Permission.VOID_TRANSACTION,
    Permission.APPLY_DISCOUNT,
    Permission.USE_CHAT,
    Permission.VIEW_PROFILE,
    Permission.EDIT_OWN_PROFILE,
    Permission.VIEW_REPORTS,
  ],

  [UserRole.CASHIER]: [
    // Cashier solo puede usar POS y ver productos
    Permission.VIEW_PRODUCTS,
    Permission.USE_POS,
    Permission.APPLY_DISCOUNT,
    Permission.USE_CHAT,
    Permission.VIEW_PROFILE,
    Permission.EDIT_OWN_PROFILE,
  ],

  [UserRole.VIEWER]: [
    // Viewer solo puede ver información básica
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_PROFILE,
  ],
};

/**
 * Tipo para el usuario autenticado
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  pointOfSaleId?: string; // ID del punto de venta asignado
}

/**
 * Tipo para el contexto de autenticación
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  hasRole: (role: UserRole) => boolean;
  switchUser?: (userType: "admin" | "employee" | "manager" | "viewer") => void; // Solo para desarrollo
}
