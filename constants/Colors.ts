/**
 * FUENTE DE VERDAD para todos los colores de la aplicación
 * Cambiar aquí actualiza automáticamente toda la app
 */

// Paleta principal - CAMBIAR AQUÍ PARA ACTUALIZAR TODA LA APP
const BRAND_COLORS = {
  // Colores principales de tu marca
  PRIMARY: '#023e8a',      // Azul principal
  SECONDARY: '#f59e0b',    // Naranja secundario
  ACCENT: '#7c3aed',       // Púrpura para destacar
  
  // Estados
  SUCCESS: '#22c55e',      // Verde
  WARNING: '#f59e0b',      // Amarillo/Naranja
  ERROR: '#ef4444',        // Rojo
  INFO: '#3b82f6',         // Azul información
};

// Grises (muy importante para UI consistente)
const GRAY_SCALE = {
  WHITE: '#ffffff',
  GRAY_50: '#fafafa',
  GRAY_100: '#f5f5f5', 
  GRAY_200: '#e5e5e5',
  GRAY_300: '#d4d4d4',
  GRAY_400: '#a3a3a3',
  GRAY_500: '#737373',
  GRAY_600: '#525252',
  GRAY_700: '#404040',
  GRAY_800: '#262626',
  GRAY_900: '#171717',
  BLACK: '#000000',
};

// Colores específicos para tu app de IA
const AI_COLORS = {
  USER_BUBBLE: BRAND_COLORS.PRIMARY,
  AI_BUBBLE: GRAY_SCALE.GRAY_100,
  AI_BUBBLE_DARK: GRAY_SCALE.GRAY_700,
  CODE_BACKGROUND: '#1e293b',
  SYNTAX_HIGHLIGHT: '#f1f5f9',
};

// TEMAS PREDEFINIDOS
export const THEMES = {
  LIGHT: {
    // Fondos
    background: GRAY_SCALE.WHITE,
    surface: GRAY_SCALE.GRAY_50,
    card: GRAY_SCALE.WHITE,
    
    // Textos
    text: GRAY_SCALE.GRAY_900,
    textSecondary: GRAY_SCALE.GRAY_600,
    textMuted: GRAY_SCALE.GRAY_500,
    
    // Bordes
    border: GRAY_SCALE.GRAY_200,
    borderFocus: BRAND_COLORS.PRIMARY,
    
    // Estados
    primary: BRAND_COLORS.PRIMARY,
    secondary: BRAND_COLORS.SECONDARY,
    success: BRAND_COLORS.SUCCESS,
    warning: BRAND_COLORS.WARNING,
    error: BRAND_COLORS.ERROR,
    
    // Chat específico
    userBubble: AI_COLORS.USER_BUBBLE,
    aiBubble: AI_COLORS.AI_BUBBLE,
    codeBlock: AI_COLORS.CODE_BACKGROUND,
  },
  
  DARK: {
    // Fondos  
    background: GRAY_SCALE.BLACK,
    surface: GRAY_SCALE.GRAY_900,
    card: GRAY_SCALE.GRAY_800,
    
    // Textos
    text: GRAY_SCALE.GRAY_50,
    textSecondary: GRAY_SCALE.GRAY_300,
    textMuted: GRAY_SCALE.GRAY_400,
    
    // Bordes
    border: GRAY_SCALE.GRAY_700,
    borderFocus: BRAND_COLORS.PRIMARY,
    
    // Estados (algunos más claros para tema oscuro)
    primary: BRAND_COLORS.PRIMARY,
    secondary: BRAND_COLORS.SECONDARY, 
    success: BRAND_COLORS.SUCCESS,
    warning: BRAND_COLORS.WARNING,
    error: BRAND_COLORS.ERROR,
    
    // Chat específico
    userBubble: AI_COLORS.USER_BUBBLE,
    aiBubble: AI_COLORS.AI_BUBBLE_DARK,
    codeBlock: AI_COLORS.CODE_BACKGROUND,
  }
};

// EXPORTS para usar en componentes
export const COLORS = {
  ...BRAND_COLORS,
  ...GRAY_SCALE,
  ...AI_COLORS,
};

// Aliases para fácil acceso
export const PRIMARY = BRAND_COLORS.PRIMARY;
export const SECONDARY = BRAND_COLORS.SECONDARY;
export const SUCCESS = BRAND_COLORS.SUCCESS;
export const ERROR = BRAND_COLORS.ERROR;

// Para usar con StyleSheet
export const LIGHT_THEME = THEMES.LIGHT;
export const DARK_THEME = THEMES.DARK;

// Función helper para obtener tema
export const getTheme = (isDark: boolean) => isDark ? DARK_THEME : LIGHT_THEME;