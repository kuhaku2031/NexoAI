import { useAuth } from '@/hooks/useAuth';
import { Permission, UserRole } from '@/types/auth.types';
import React, { ReactNode } from 'react';

interface RoleGuardProps {
    children: ReactNode;
    permissions?: Permission[];
    roles?: UserRole[];
    requireAll?: boolean;
    fallback?: ReactNode;
}

/**
 * Componente para proteger contenido basado en roles y permisos
 * 
 * @example
 * // Solo visible para admin
 * <RoleGuard roles={[UserRole.ADMIN]}>
 *   <AdminButton />
 * </RoleGuard>
 * 
 * @example
 * // Visible si tiene permiso de editar
 * <RoleGuard permissions={[Permission.EDIT_PRODUCT]}>
 *   <EditButton />
 * </RoleGuard>
 */
export function RoleGuard({
    children,
    permissions = [],
    roles = [],
    requireAll = false,
    fallback = null
}: RoleGuardProps) {
    const { hasPermission, hasRole, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <>{fallback}</>;
    }

    // Verificar roles si se especificaron
    if (roles.length > 0) {
        const hasMatchingRole = roles.some(role => hasRole(role));
        if (!hasMatchingRole) {
            return <>{fallback}</>;
        }
    }

    // Verificar permisos si se especificaron
    if (permissions.length > 0) {
        if (requireAll) {
            const hasAll = permissions.every(permission => hasPermission(permission));
            if (!hasAll) {
                return <>{fallback}</>;
            }
        } else {
            const hasAny = permissions.some(permission => hasPermission(permission));
            if (!hasAny) {
                return <>{fallback}</>;
            }
        }
    }

    return <>{children}</>;
}
