/**
 * Design Tokens - Système de design cohérent
 * Tous les tokens de couleur, spacing, typo, etc.
 * Source de vérité unique pour la cohérence visuelle
 */

export const designTokens = {
  // ============================================
  // COLORS - Palette cohérente
  // ============================================
  colors: {
    // Brand colors (Coral primary, Orange secondary)
    primary: '#FF6B6B',      // Coral - Main brand color
    primaryLight: '#FF8888', // Coral light (hover)
    primaryDark: '#FF4444',  // Coral dark (pressed)
    
    secondary: '#FFA500',    // Orange - Secondary accent
    secondaryLight: '#FFB84D',
    secondaryDark: '#FF8C00',
    
    // Neutral colors (grayscale)
    white: '#FFFFFF',
    gray50: '#F9F9F9',
    gray100: '#F3F3F3',
    gray200: '#E8E8E8',
    gray300: '#D1D1D1',
    gray400: '#B0B0B0',
    gray500: '#808080',
    gray600: '#595959',
    gray700: '#404040',
    gray800: '#262626',
    gray900: '#121212',
    black: '#000000',
    
    // Semantic colors
    success: '#10B981',      // Green
    successLight: '#34D399',
    error: '#EF4444',        // Red
    errorLight: '#F87171',
    warning: '#F59E0B',      // Amber
    info: '#3B82F6',         // Blue
    
    // Background colors
    background: '#FFFFFF',
    backgroundAlt: '#F9F9F9',
    surface: '#FFFFFF',
    surfaceElevated: '#F3F3F3',
    
    // Text colors
    textPrimary: '#121212',
    textSecondary: '#595959',
    textTertiary: '#B0B0B0',
    textInverse: '#FFFFFF',
    
    // Border colors
    border: '#E8E8E8',
    borderLight: '#F3F3F3',
    borderDark: '#D1D1D1',
    
    // Overlay & shadows
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.25)',
  },

  // ============================================
  // SPACING - 8px base system
  // ============================================
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    
    // Shorthand for common patterns
    gap: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    
    padding: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    
    margin: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },

  // ============================================
  // TYPOGRAPHY - Inter font, responsive scaling
  // ============================================
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      code: '"Courier New", monospace',
    },
    
    fontSize: {
      // Responsive sizes using clamp(min, preferred, max)
      xs: 'clamp(0.75rem, 2vw, 0.875rem)',      // 12-14px
      sm: 'clamp(0.875rem, 2.5vw, 1rem)',       // 14-16px
      base: 'clamp(1rem, 3vw, 1.125rem)',       // 16-18px
      lg: 'clamp(1.125rem, 3.5vw, 1.25rem)',    // 18-20px
      xl: 'clamp(1.25rem, 4vw, 1.5rem)',        // 20-24px
      xxl: 'clamp(1.5rem, 5vw, 1.875rem)',      // 24-30px
      xxxl: 'clamp(1.875rem, 6vw, 2.25rem)',    // 30-36px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
    
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.04em',
    },
  },

  // ============================================
  // BORDER RADIUS - Consistent rounding
  // ============================================
  borderRadius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // ============================================
  // SHADOWS - Elevation levels
  // ============================================
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // ============================================
  // TRANSITIONS - Smooth animations
  // ============================================
  transitions: {
    fast: '150ms ease-in-out',
    base: '250ms ease-in-out',
    slow: '350ms ease-in-out',
    verySlow: '500ms ease-in-out',
    
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      linear: 'linear',
    },
  },

  // ============================================
  // BREAKPOINTS - Responsive design
  // ============================================
  breakpoints: {
    xs: '0px',      // Mobile
    sm: '600px',    // Tablet
    md: '960px',    // Desktop
    lg: '1280px',   // Large desktop
    xl: '1920px',   // Extra large
  },

  // ============================================
  // Z-INDEX - Stacking context
  // ============================================
  zIndex: {
    base: 0,
    hide: -1,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
  },

  // ============================================
  // COMPONENT SPECIFIC
  // ============================================
  components: {
    button: {
      height: {
        xs: '32px',
        sm: '40px',
        md: '48px',
        lg: '56px',
      },
      padding: {
        xs: '0px 12px',
        sm: '0px 16px',
        md: '0px 24px',
        lg: '0px 32px',
      },
      borderRadius: '8px',
      fontWeight: 600,
    },
    
    input: {
      height: '48px',
      padding: '12px 16px',
      borderRadius: '8px',
      borderWidth: '1px',
      fontWeight: 400,
    },
    
    card: {
      padding: '16px',
      borderRadius: '12px',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    },
    
    postCard: {
      padding: '16px',
      borderRadius: '12px',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      imageHeight: '300px',
    },
    
    bottomNav: {
      height: '64px',
      gap: '4px',
    },
    
    header: {
      height: '56px',
      padding: '8px 16px',
    },
  },
};

// ============================================
// EXPORT HELPERS for easy access
// ============================================
export const color = (name) => designTokens.colors[name];
export const spacing = (size) => designTokens.spacing[size];
export const fontSizes = designTokens.typography.fontSize;
export const fontWeights = designTokens.typography.fontWeight;
export const shadows = designTokens.shadows;
export const radius = designTokens.borderRadius;
export const transitions = designTokens.transitions;
export const breakpoints = designTokens.breakpoints;
export const zIndex = designTokens.zIndex;
