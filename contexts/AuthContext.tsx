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

            // Modo producción: verificar sesión real
            const hasTokens = await AuthService.hasTokens();

            if (hasTokens) {
                // Validar con el backend si el token sigue activo
                const validatedUser = await AuthService.validateSession();

                if (validatedUser) {
                    setUser(validatedUser);
                } else {
                    // Si la validación falla (token inválido y refresh falló), limpiar
                    await AuthService.logout();
                    setUser(null);
                }
            } else {
                setUser(null);
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
            // Modo producción: usar API real
            const userData = await AuthService.login(email, password);
            setUser(userData);
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
            await AuthService.logout();
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
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


