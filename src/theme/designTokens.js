/**
 * Design Tokens - Système de design cohérent
 * Tous les tokens de couleur, spacing, typo, etc.
 * Source de vérité unique pour la cohérence visuelle
 */

export const designTokens = {
  // ============================================
  // COLORS - Palette moderne et sophistiquée
  // ============================================
  colors: {
    // Brand colors - Palette Instagram/Pinterest inspirée
    primary: '#0A66C2',      // Bleu professionnel moderne
    primaryLight: '#3B7DD6', // Bleu clair (hover)
    primaryDark: '#004182',  // Bleu foncé (pressed)

    secondary: '#E60023',    // Rouge Pinterest signature
    secondaryLight: '#FF1744',
    secondaryDark: '#BD081C',

    accent: '#7C3AED',       // Violet moderne pour accents
    accentLight: '#9F67FF',
    accentDark: '#5B21B6',

    // Neutral colors (grayscale premium)
    white: '#FFFFFF',
    gray50: '#FAFAFA',       // Très léger
    gray100: '#F5F5F5',      // Léger
    gray200: '#EEEEEE',      // Background alt
    gray300: '#E0E0E0',      // Bordures légères
    gray400: '#BDBDBD',      // Icônes désactivées
    gray500: '#9E9E9E',      // Texte secondaire
    gray600: '#757575',      // Texte actif
    gray700: '#616161',      // Texte important
    gray800: '#424242',      // Presque noir
    gray900: '#212121',      // Noir profond
    black: '#000000',

    // Semantic colors
    success: '#00C853',      // Vert moderne
    successLight: '#69F0AE',
    error: '#D32F2F',        // Rouge moderne
    errorLight: '#EF5350',
    warning: '#F57C00',      // Orange moderne
    info: '#1976D2',         // Bleu info

    // Background colors - Clean et moderne
    background: '#FAFAFA',
    backgroundAlt: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    // Text colors - Hiérarchie claire
    textPrimary: '#212121',
    textSecondary: '#757575',
    textTertiary: '#BDBDBD',
    textInverse: '#FFFFFF',

    // Border colors - Subtils et élégants
    border: '#EEEEEE',
    borderLight: '#F5F5F5',
    borderDark: '#E0E0E0',

    // Overlay & shadows
    overlay: 'rgba(0, 0, 0, 0.6)',
    overlayLight: 'rgba(0, 0, 0, 0.15)',
    overlayMedium: 'rgba(0, 0, 0, 0.35)',

    // Gradients modernes
    gradientPrimary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gradientSecondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    gradientSunset: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
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
  // TYPOGRAPHY - Polices modernes et élégantes
  // ============================================
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      display: '"SF Pro Display", "Inter", -apple-system, sans-serif',
      code: '"JetBrains Mono", "Courier New", monospace',
    },

    fontSize: {
      // Responsive sizes using clamp(min, preferred, max)
      xs: '0.75rem',        // 12px
      sm: '0.875rem',       // 14px
      base: '1rem',         // 16px
      lg: '1.125rem',       // 18px
      xl: '1.25rem',        // 20px
      xxl: '1.5rem',        // 24px
      xxxl: '2rem',         // 32px
      display: '2.5rem',    // 40px
      hero: '3.5rem',       // 56px
    },

    fontWeight: {
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    lineHeight: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
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
  // SHADOWS - Elevation douce et moderne
  // ============================================
  shadows: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
    md: '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
    lg: '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
    xl: '0 12px 32px 0 rgba(0, 0, 0, 0.16)',
    xxl: '0 24px 48px 0 rgba(0, 0, 0, 0.20)',

    // Ombres spéciales
    card: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
    cardHover: '0 8px 24px 0 rgba(0, 0, 0, 0.12)',
    floating: '0 12px 40px 0 rgba(0, 0, 0, 0.15)',
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
  // COMPONENT SPECIFIC - Design moderne
  // ============================================
  components: {
    button: {
      height: {
        xs: '32px',
        sm: '40px',
        md: '44px',
        lg: '52px',
      },
      padding: {
        xs: '0px 16px',
        sm: '0px 20px',
        md: '0px 24px',
        lg: '0px 32px',
      },
      borderRadius: '12px',
      fontWeight: 600,
    },

    input: {
      height: '48px',
      padding: '14px 16px',
      borderRadius: '12px',
      borderWidth: '1px',
      fontWeight: 400,
    },

    card: {
      padding: '0px',
      borderRadius: '16px',
      shadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
    },

    postCard: {
      padding: '0px',
      borderRadius: '16px',
      shadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
      imageHeight: 'auto',
      contentPadding: '16px',
    },

    bottomNav: {
      height: '60px',
      gap: '0px',
      borderTop: '1px solid',
    },

    header: {
      height: '60px',
      padding: '12px 20px',
      borderBottom: '1px solid',
    },

    avatar: {
      xs: '32px',
      sm: '40px',
      md: '48px',
      lg: '64px',
      xl: '96px',
    },

    badge: {
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '0.75rem',
      fontWeight: 600,
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
