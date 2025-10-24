// constants/colors.ts
export const Colors = {
  // Colores principales (azules)
  primary: '#023e8a',
  secondary: '#2584b7',
  accent: '#03045e',

  light_primary: '#c8f0f7',
  light_secondary: '#90e0ef',
  // Estados


  // background y texto
  background: "#c8f0f7",
  backgroundLight: '#ffffff',
  backgroundMuted: '#90e0ef',

  error: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',
  info: '#48cae4', // Usa tu accent color

  // Otros
  disabled: '#90e0ef',
  overlay: 'rgba(3, 4, 94, 0.5)', // Dark overlay con tu color base
  
  // Gradientes (valores individuales para usarlos en gradientes)
  gradient: {
    from: '#03045e',
    to: '#023e8a',
    accent: '#48cae4',
  },
};

// Tema oscuro (por defecto)
export const DarkTheme = {
  ...Colors,
  background: '#03045e',
  text: '#c8f0f7',
  textSecondary: '#90e0ef',
};

// Tema claro (alternativa)
export const LightTheme = {
  primary: '#023e8a',
  secondary: '#2584b7',
  accent: '#48cae4',
  
  background: '#c8f0f7',
  backgroundLight: '#ffffff',
  backgroundMuted: '#90e0ef',
  
  text: '#03045e',
  textSecondary: '#2584b7',
  textMuted: '#90e0ef',
  textDark: '#03045e',
  
  error: '#FF3B30',
  warning: '#FF9500',
  success: '#34C759',
  info: '#48cae4',
  
  border: '#2584b7',
  borderLight: '#48cae4',
  borderMuted: '#90e0ef',
  
  disabled: '#90e0ef',
  overlay: 'rgba(200, 240, 247, 0.5)',
  
  gradient: {
    from: '#c8f0f7',
    to: '#90e0ef',
    accent: '#023e8a',
  },
};

// Paleta extendida para componentes específicos
export const ComponentColors = {
  // Botones
  button: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    accent: Colors.accent,
    disabled: Colors.disabled,
  },
  
  // Cards
  // card: {
  //   background: Colors.backgroundMuted,
  //   border: Colors.borderLight,
  //   shadow: 'rgba(2, 62, 138, 0.1)',
  // },
  
  // Inputs
  input: {
    background: "#ffffff",
    border: Colors.light_secondary,
    borderFocus: Colors.accent,
    text: "#03045e",
    placeholder: Colors.overlay,
  },
  
  // Tabs
  // tab: {
  //   active: Colors.accent,
  //   inactive: Colors.textMuted,
  //   background: Colors.background,
  // },
};