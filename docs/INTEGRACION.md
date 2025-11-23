# NexoAI - Guía de Integración Backend

## 📋 Resumen

Este documento explica cómo funciona la integración entre el frontend (React Native) y el backend (NestJS), y cómo cambiar entre modo desarrollo (mock) y producción (API real).

## 🔧 Modo de Desarrollo vs Producción

### Cambiar entre modos

En `LocalAI/contexts/AuthContext.tsx`, línea 51:

```typescript
const USE_MOCK_DATA = __DEV__; // true en desarrollo, false en producción
```

- `__DEV__` = automáticamente true en desarrollo, false en producción
- Para forzar uso de API real en desarrollo, cambia a: `const USE_MOCK_DATA = false;`

### Modo Mock (Desarrollo)
- ✅ No requiere backend corriendo
- ✅ Datos de prueba instantáneos
- ✅ Función `switchUser()` disponible para cambiar roles
- ⚠️ No persiste datos reales

### Modo Producción (API Real)
- ✅ Conecta al backend NestJS
- ✅ Autenticación real con JWT
- ✅ Refresh automático de tokens
- ⚠️ Requiere backend corriendo

## 🌐 Configuración de API

### Archivo: `LocalAI/config/api.config.ts`

```typescript
BASE_URL: __DEV__ 
  ? 'http://localhost:3000'           // Dev: Backend local
  : 'https://api.tudominio.com',       // Prod: Tu servidor
```

**Para cambiar la URL del backend:**
1. Desarrollo: Modifica `http://localhost:3000` si tu backend usa otro puerto
2. Producción: Cambia `https://api.tudominio.com` por tu dominio real

## 🔐 Sistema de Roles

### Mapeo Backend → Frontend

El sistema traduce automáticamente los roles del backend a roles del frontend:

| Backend Role | Frontend Role | Permisos |
|--------------|---------------|----------|
| OWNER        | ADMIN         | Todos los permisos |
| ADMIN        | ADMIN         | Todos los permisos |
| MANAGER      | MANAGER       | Dashboard, productos, POS, reportes |
| EMPLOYEE     | CASHIER       | Solo POS y productos (vista) |

**Ubicación:** `LocalAI/utils/roleMapper.ts`

### Modificar Permisos de Roles (Solo Frontend)

Para cambiar qué tabs/features ve cada rol, edita:

**Archivo:** `LocalAI/types/auth.types.ts`

```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.MANAGER]: [
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_ANALYTICS,
    Permission.USE_POS,
    // Añade o quita permisos aquí
  ],
  // ...otros roles
};
```

⚠️ **Importante:** Esto solo afecta la UI. El backend siempre debe validar permisos.

## 🎯 Sistema de Tabs Dinámicos

### Configuración de Tabs

**Archivo:** `LocalAI/config/tabs.config.ts`

```typescript
export const TAB_CONFIGS: TabConfig[] = [
  {
    name: "dashboard/index",
    title: "Dashboard",
    icon: "grid-outline",
    requiredPermission: Permission.VIEW_DASHBOARD,
  },
  // Más tabs...
];
```

### Añadir un Nuevo Tab

1. **Crea la pantalla:** `LocalAI/app/(tabs)/mi-nuevo-tab/index.tsx`

2. **Añade a la configuración:**
   ```typescript
   {
     name: "mi-nuevo-tab/index",
     title: "Mi Tab",
     icon: "icon-name",
     requiredPermission: Permission.MI_PERMISO,
   }
   ```

3. **Define el permiso en** `auth.types.ts`:
   ```typescript
   export enum Permission {
     MI_PERMISO = "mi_permiso",
     // ...
   }
   ```

4. **Asigna a roles:** Añade el permiso a `ROLE_PERMISSIONS`

## 🔄 Flujo de Autenticación

### Login

```typescript
import { useAuth } from '@/hooks/useAuth';

const { login } = useAuth();

await login('usuario@email.com', 'password');
// Automáticamente:
// 1. Llama al backend /auth/login
// 2. Guarda tokens en AsyncStorage
// 3. Mapea rol del backend a frontend
// 4. Actualiza contexto de usuario
// 5. Muestra tabs según permisos
```

### Logout

```typescript
const { logout } = useAuth();

await logout();
// Limpia tokens y datos del usuario
```

### Auto-refresh de Tokens

El sistema renueva automáticamente el access token cuando expira:
- Intercepta requests con token expirado (401)
- Usa refresh token para obtener nuevo access token
- Reintenta el request original
- Si el refresh falla, cierra sesión automáticamente

**Ubicación:** `LocalAI/services/apiClient.ts`

## 📱 Uso en Componentes

### Verificar Permisos

```typescript
import { useAuth } from '@/hooks/useAuth';

function MiComponente() {
  const { hasPermission, user } = useAuth();

  if (!hasPermission(Permission.VIEW_DASHBOARD)) {
    return <Text>Sin acceso</Text>;
  }

  return <Dashboard userId={user?.id} />;
}
```

### Verificar Roles

```typescript
const { hasRole } = useAuth();

if (hasRole(UserRole.ADMIN)) {
  // Mostrar opciones de admin
}
```

### Datos del Usuario

```typescript
const { user, isAuthenticated, isLoading } = useAuth();

if (isLoading) return <Loading />;
if (!isAuthenticated) return <Login />;

return <Text>Hola, {user.name}</Text>;
```

## 🧪 Testing en Desarrollo

### Cambiar de Usuario (Solo Mock Mode)

```typescript
const { switchUser } = useAuth();

// Cambiar a diferentes roles para probar
switchUser('admin');    // Admin completa
switchUser('manager');  // Gerente
switchUser('employee'); // Cajero/Empleado
switchUser('viewer');   // Solo lectura
```

### Probar API Real sin Cambiar Código

En `AuthContext.tsx`, temporalmente cambia:

```typescript
const USE_MOCK_DATA = false; // Fuerza API real
```

## 🚀 Iniciar la App

### Frontend

```bash
cd LocalAI
npm start
```

Luego escanea el QR con Expo Go, o:
- `a` para Android
- `i` para iOS

### Backend (si usas modo producción)

```bash
cd api-backend
npm run start:dev
```

El backend debe estar en `http://localhost:3000`

## 🔍 Debugging

### Ver logs de autenticación

En modo desarrollo, el AuthContext muestra logs:
- `🔧 Usando datos MOCK para desarrollo`
- `🔧 Login MOCK: email@example.com`
- `🔧 Cambiando a usuario MOCK: admin`

### Problemas comunes

**"Cannot find module @react-native-async-storage"**
```bash
npm install @react-native-async-storage/async-storage
```

**Tabs no se muestran**
- Verifica que el usuario tenga los permisos necesarios
- Revisa `ROLE_PERMISSIONS` en `auth.types.ts`
- Asegúrate que `requiredPermission` en `tabs.config.ts` existe

**Backend no conecta**
- Verifica que el backend esté corriendo
- Revisa la URL en `api.config.ts`
- En Android, usa `http://10.0.2.2:3000` en lugar de `localhost`

## 📝 Próximos Pasos Recomendados

1. **Añadir más servicios:** Crea servicios para productos, ventas, etc.
   - Crea archivos en `LocalAI/services/`
   - Usa `ApiClient` para las peticiones
   - Ejemplo: `productsService.ts`, `posService.ts`

2. **Implementar caché:** Para mejorar performance offline
   - Considera usar React Query o SWR
   - Cachea permisos del usuario

3. **Añadir validación de formularios:** Para login y registro
   - Usa librerías como Formik o React Hook Form

4. **Mejorar manejo de errores:** Mostrar mensajes amigables al usuario
   - Crea componentes para diferentes tipos de errores
   - Implementa toast notifications

5. **Añadir loading states:** Para mejor UX durante peticiones
   - Usa skeletons o spinners
   - Deshabilita botones durante carga

## 🤝 Colaboración Frontend-Backend

### Para cambios solo de UI (rápidos):
✅ Modifica permisos en frontend (`auth.types.ts`)  
✅ Ajusta configuración de tabs (`tabs.config.ts`)  
❌ No toques el backend

### Para cambios de lógica de negocio:
✅ Actualiza endpoints en backend  
✅ Actualiza guards y validaciones  
✅ Sincroniza tipos en frontend

### Principio clave:
> **Backend = Seguridad y Validación**  
> **Frontend = Experiencia de Usuario**

El backend siempre tiene la última palabra en permisos, el frontend solo optimiza la UX ocultando opciones no permitidas.
