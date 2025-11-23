import { useAllPermissions, useAnyPermission, usePermission } from '@/hooks/useAuth';
import { Permission } from '@/types/auth.types';
import React, { ReactNode } from 'react';

interface PermissionGuardProps {
    children: ReactNode;
    permission?: Permission;
    anyPermissions?: Permission[];
    allPermissions?: Permission[];
    fallback?: ReactNode;
}

/**
 * Componente para renderizar contenido basado en permisos
 * 
 * @example
 * // Requiere un permiso específico
 * <PermissionGuard permission={Permission.EDIT_PRODUCT}>
 *   <Button>Edit Product</Button>
 * </PermissionGuard>
 * 
 * @example
 * // Requiere al menos uno de los permisos
 * <PermissionGuard anyPermissions={[Permission.CREATE_PRODUCT, Permission.EDIT_PRODUCT]}>
 *   <ProductForm />
 * </PermissionGuard>
 * 
 * @example
 * // Requiere todos los permisos
 * <PermissionGuard allPermissions={[Permission.USE_POS, Permission.VOID_TRANSACTION]}>
 *   <RefundButton />
 * </PermissionGuard>
 * 
 * @example
 * // Con fallback personalizado
 * <PermissionGuard 
 *   permission={Permission.VIEW_ANALYTICS}
 *   fallback={<Text>No tienes acceso a esta sección</Text>}
 * >
 *   <AnalyticsChart />
 * </PermissionGuard>
 */
export function PermissionGuard({
    children,
    permission,
    anyPermissions,
    allPermissions,
    fallback = null,
}: PermissionGuardProps) {
    const hasSinglePermission = usePermission(permission!);
    const hasAnyPerms = useAnyPermission(anyPermissions || []);
    const hasAllPerms = useAllPermissions(allPermissions || []);

    // Determinar si tiene los permisos necesarios
    let hasAccess = false;

    if (permission) {
        hasAccess = hasSinglePermission;
    } else if (anyPermissions && anyPermissions.length > 0) {
        hasAccess = hasAnyPerms;
    } else if (allPermissions && allPermissions.length > 0) {
        hasAccess = hasAllPerms;
    }

    if (!hasAccess) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
