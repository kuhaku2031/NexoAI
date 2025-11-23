import { AuthContextType, Permission, ROLE_PERMISSIONS, User, UserRole } from '@/types/auth.types';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthService } from '@/services/authService';

/**
 * Contexto de autenticación
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Usuarios estáticos para pruebas de desarrollo
 * TODO: ELIMINAR EN PRODUCCIÓN
 */
export const MOCK_USERS: Record<string, User> = {
    admin: {
        id: '1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
        pointOfSaleId: 'pos-1',
    },
    employee: {
        id: '2',
        name: 'Employee User',
        email: 'employee@example.com',
        role: UserRole.CASHIER,
        pointOfSaleId: 'pos-1',
    },
    manager: {
        id: '3',
        name: 'Manager User',
        email: 'manager@example.com',
        role: UserRole.MANAGER,
        pointOfSaleId: 'pos-1',
    },
    viewer: {
        id: '4',
        name: 'Viewer User',
        email: 'viewer@example.com',
        role: UserRole.VIEWER,
        pointOfSaleId: 'pos-1',
    },
};

/**
 * Configuración: Usar datos mock o API real
 * Cambiar a false cuando quieras usar el backend real
 */
const USE_MOCK_DATA = false; // true en desarrollo, false en producción

/**
 * Provider de autenticación que maneja el estado del usuario y sus permisos
 */
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar usuario desde AsyncStorage o API al iniciar
    useEffect(() => {
        loadUser();
    }, []);

    /**
     * Carga el usuario desde el almacenamiento local o API
     */
    const loadUser = async () => {
        try {
            setIsLoading(true);

            if (USE_MOCK_DATA) {
                // Modo desarrollo: usar datos mock
                console.log('🔧 Usando datos MOCK para desarrollo');
                setUser(MOCK_USERS.admin);
            } else {
                // Modo producción: cargar desde backend
                const isAuth = await AuthService.isAuthenticated();

                if (isAuth) {
                    const userData = await AuthService.getCurrentUser();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            }
        } catch (error) {
            console.error('Error loading user:', error);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Inicia sesión con email y password
     */
    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            if (USE_MOCK_DATA) {
                // Modo desarrollo: simular login
                console.log('🔧 Login MOCK:', email);
                const userData: User = {
                    id: '1',
                    name: 'Admin User',
                    email: email,
                    role: UserRole.ADMIN,
                    pointOfSaleId: 'pos-1',
                };
                setUser(userData);
            } else {
                // Modo producción: usar API real
                const userData = await AuthService.login(email, password);
                setUser(userData);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Cierra la sesión del usuario
     */
    const logout = async () => {
        try {
            if (!USE_MOCK_DATA) {
                // Solo limpiar storage si no estamos en modo mock
                await AuthService.logout();
            }
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    /**
     * Verifica si el usuario tiene un permiso específico
     */
    const hasPermission = (permission: Permission): boolean => {
        if (!user) return false;

        const rolePermissions = ROLE_PERMISSIONS[user.role];
        return rolePermissions.includes(permission);
    };

    /**
     * Verifica si el usuario tiene al menos uno de los permisos especificados
     */
    const hasAnyPermission = (permissions: Permission[]): boolean => {
        if (!user) return false;

        return permissions.some(permission => hasPermission(permission));
    };

    /**
     * Verifica si el usuario tiene todos los permisos especificados
     */
    const hasAllPermissions = (permissions: Permission[]): boolean => {
        if (!user) return false;

        return permissions.every(permission => hasPermission(permission));
    };

    /**
     * Verifica si el usuario tiene un rol específico
     */
    const hasRole = (role: UserRole): boolean => {
        if (!user) return false;

        return user.role === role;
    };

    /**
     * Cambia entre usuarios estáticos para pruebas
     * TODO: ELIMINAR EN PRODUCCIÓN
     * Solo funciona en modo MOCK
     */
    const switchUser = (userType: 'admin' | 'employee' | 'manager' | 'viewer') => {
        if (USE_MOCK_DATA) {
            console.log('🔧 Cambiando a usuario MOCK:', userType);
            setUser(MOCK_USERS[userType]);
        } else {
            console.warn('switchUser() solo funciona en modo MOCK');
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        hasRole,
        switchUser: USE_MOCK_DATA ? switchUser : undefined, // Solo en desarrollo
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

