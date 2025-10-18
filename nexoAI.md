app/
  _layout.tsx           // Layout raíz - aquí maneja la lógica de auth
  (auth)/
    _layout.tsx         // Stack layout para auth
    login.tsx
    register.tsx
  (tabs)/
    _layout.tsx         // Tabs layout
    home/
      index.tsx
    locales/
      index.tsx
      [id].tsx
    settings/
      index.tsx