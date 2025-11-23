# Authentication & Role-Based Access Control (RBAC)

This document explains how the authentication and role system works in the LocalAI application.

## Overview

The application uses a JWT-based authentication system with Access Tokens and Refresh Tokens.
- **Access Token**: Short-lived token used for API requests.
- **Refresh Token**: Long-lived token used to obtain new access tokens when they expire.

## Components

### 1. AuthContext (`contexts/AuthContext.tsx`)
Manages the global authentication state (`user`, `isLoading`) and provides methods for login, logout, and permission checking.

### 2. AuthService (`services/authService.ts`)
Handles communication with the backend authentication endpoints (`/auth/login`, `/auth/refresh`).

### 3. ApiClient (`services/apiClient.ts`)
A wrapper around `fetch` that automatically adds the Authorization header and handles token refreshing transparently. If a request fails with 401, it attempts to refresh the token and retry the request.

### 4. RoleGuard (`components/auth/RoleGuard.tsx`)
A component to conditionally render UI elements based on the user's role or permissions.

## Usage

### Protecting Routes
The application uses `app/(tabs)/_layout.tsx` to filter which tabs are visible based on the user's permissions. This is configured in `config/tabs.config.ts`.

### Using RoleGuard
Wrap components that should only be visible to certain users:

```tsx
import { RoleGuard } from '@/components/auth/RoleGuard';
import { Permission, UserRole } from '@/types/auth.types';

// Only visible to Admin
<RoleGuard roles={[UserRole.ADMIN]}>
  <AdminSettings />
</RoleGuard>

// Visible if user has DELETE_PRODUCT permission
<RoleGuard permissions={[Permission.DELETE_PRODUCT]}>
  <DeleteButton />
</RoleGuard>
```

### Checking Permissions in Code
Use the `useAuth` hook or helper hooks:

```tsx
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
  const { hasPermission, hasRole } = useAuth();

  if (hasRole(UserRole.MANAGER)) {
    // Do manager stuff
  }
};
```

## Configuration
- **API URL**: Configured in `config/api.config.ts`.
- **Roles & Permissions**: Defined in `types/auth.types.ts`.
