# Sistema de Roles y Permisos - Guía Rápida

## 🚀 Inicio Rápido

### 1. Verificar un permiso

```tsx
import { usePermission } from '@/hooks/useAuth';
import { Permission } from '@/types/auth.types';

const canEdit = usePermission(Permission.EDIT_PRODUCT);

{canEdit && <Button title="Editar" />}
```

### 2. Proteger contenido

```tsx
import { PermissionGuard } from '@/components/PermissionGuard';
import { Permission } from '@/types/auth.types';

<PermissionGuard permission={Permission.VIEW_ANALYTICS}>
  <AnalyticsChart />
</PermissionGuard>
```

### 3. Obtener usuario actual

```tsx
import { useAuth } from '@/hooks/useAuth';

const { user, isAuthenticated } = useAuth();

<Text>Bienvenido, {user?.name}</Text>
```

## 📁 Archivos Creados

```
LocalAI/
├── types/auth.types.ts              # Tipos y definiciones
├── contexts/AuthContext.tsx         # Contexto principal
├── hooks/useAuth.ts                 # Hooks personalizados
├── components/PermissionGuard.tsx   # Componente de protección
└── config/tabs.config.ts            # Configuración de tabs
```

## 🎭 Roles Disponibles

- **ADMIN** - Acceso completo
- **MANAGER** - Dashboard + Productos + POS
- **CASHIER** - Solo POS y productos
- **VIEWER** - Solo lectura

## 🔑 Permisos Comunes

```typescript
Permission.VIEW_DASHBOARD
Permission.VIEW_ANALYTICS
Permission.VIEW_PRODUCTS
Permission.EDIT_PRODUCT
Permission.USE_POS
Permission.MANAGE_USERS
```

## 🔧 Conectar con tu API

Edita `contexts/AuthContext.tsx` en la función `login`:

```tsx
const response = await fetch('TU_API/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password }),
});

const data = await response.json();

const userData: User = {
  id: data.id,
  name: data.name,
  email: data.email,
  role: data.role, // 'admin', 'manager', 'cashier', 'viewer'
};
```

## 🧪 Testing

Cambia el rol de prueba en `contexts/AuthContext.tsx`:

```tsx
const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: UserRole.CASHIER, // Cambia aquí
};
```

## 📚 Más Ejemplos

Ver documentación completa en `implementation_plan.md`
