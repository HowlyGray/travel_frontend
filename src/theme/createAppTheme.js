/**
 * App Theme - Material-UI theme configuration
 * Supports light and dark modes
 */

import { createTheme } from '@mui/material/styles';
import { designTokens } from './designTokens';

const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  const paletteConfig = isDark
    ? {
        mode: 'dark',
        primary: {
          main: designTokens.colors.primary,
          light: designTokens.colors.primaryLight,
          dark: designTokens.colors.primaryDark,
          contrastText: designTokens.colors.white,
        },
        secondary: {
          main: designTokens.colors.secondary,
          light: designTokens.colors.secondaryLight,
          dark: designTokens.colors.secondaryDark,
          contrastText: designTokens.colors.white,
        },
        background: {
          default: designTokens.colors.gray900,
          paper: designTokens.colors.gray800,
        },
        text: {
          primary: designTokens.colors.white,
          secondary: designTokens.colors.gray300,
          disabled: designTokens.colors.gray500,
        },
        divider: designTokens.colors.gray700,
        error: {
          main: designTokens.colors.error,
          light: designTokens.colors.errorLight,
        },
        warning: {
          main: designTokens.colors.warning,
        },
        info: {
          main: designTokens.colors.info,
        },
        success: {
          main: designTokens.colors.success,
          light: designTokens.colors.successLight,
        },
      }
    : {
        mode: 'light',
        primary: {
          main: designTokens.colors.primary,
          light: designTokens.colors.primaryLight,
          dark: designTokens.colors.primaryDark,
          contrastText: designTokens.colors.white,
        },
        secondary: {
          main: designTokens.colors.secondary,
          light: designTokens.colors.secondaryLight,
          dark: designTokens.colors.secondaryDark,
          contrastText: designTokens.colors.white,
        },
        background: {
          default: designTokens.colors.background,
          paper: designTokens.colors.surface,
        },
        text: {
          primary: designTokens.colors.textPrimary,
          secondary: designTokens.colors.textSecondary,
          disabled: designTokens.colors.textTertiary,
        },
        divider: designTokens.colors.border,
        error: {
          main: designTokens.colors.error,
          light: designTokens.colors.errorLight,
        },
        warning: {
          main: designTokens.colors.warning,
        },
        info: {
          main: designTokens.colors.info,
        },
        success: {
          main: designTokens.colors.success,
          light: designTokens.colors.successLight,
        },
      };

  const theme = createTheme({
    palette: paletteConfig,

  // ============================================
  // TYPOGRAPHY - Fonts
  // ============================================
  typography: {
    fontFamily: designTokens.typography.fontFamily.primary,
    
    h1: {
      fontSize: designTokens.typography.fontSize.xxxl,
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      letterSpacing: designTokens.typography.letterSpacing.tight,
    },
    h2: {
      fontSize: designTokens.typography.fontSize.xxl,
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
    },
    h3: {
      fontSize: designTokens.typography.fontSize.xl,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h4: {
      fontSize: designTokens.typography.fontSize.lg,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h5: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    h6: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    
    body1: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    body2: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    
    button: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.semibold,
      textTransform: 'none',
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    
    caption: {
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
    },
    
    overline: {
      fontSize: designTokens.typography.fontSize.xs,
      fontWeight: designTokens.typography.fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: designTokens.typography.letterSpacing.wide,
    },
  },

  // ============================================
  // SHAPE - Border radius
  // ============================================
  shape: {
    borderRadius: parseInt(designTokens.borderRadius.md),
  },

  // ============================================
  // SPACING - Base unit (multiply by 8px)
  // ============================================
  spacing: 8,

  // ============================================
  // COMPONENTS - Styled variants
  // ============================================
  components: {
    // ---- Buttons ----
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          textTransform: 'none',
          fontWeight: designTokens.typography.fontWeight.semibold,
          fontSize: designTokens.typography.fontSize.base,
          padding: `${designTokens.components.button.padding.md}`,
          minHeight: designTokens.components.button.height.md,
          transition: designTokens.transitions.base,
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${designTokens.colors.primary} 0%, ${designTokens.colors.primaryDark} 100%)`,
          boxShadow: designTokens.shadows.md,
          '&:hover': {
            boxShadow: designTokens.shadows.lg,
            background: `linear-gradient(135deg, ${designTokens.colors.primaryLight} 0%, ${designTokens.colors.primary} 100%)`,
          },
        },
        outlinedPrimary: {
          borderColor: designTokens.colors.primary,
          color: designTokens.colors.primary,
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 107, 0.08)',
          },
        },
        textPrimary: {
          color: designTokens.colors.primary,
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 107, 0.08)',
          },
        },
      },
      defaultProps: {
        disableElevation: false,
      },
    },

    // ---- Card ----
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.sm,
          border: `1px solid ${designTokens.colors.border}`,
          backgroundColor: designTokens.colors.surface,
          transition: designTokens.transitions.base,
          '&:hover': {
            boxShadow: designTokens.shadows.md,
          },
        },
      },
    },

    // ---- Paper ----
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.lg,
          boxShadow: designTokens.shadows.sm,
          backgroundColor: designTokens.colors.surface,
        },
      },
    },

    // ---- TextField ----
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.md,
            backgroundColor: designTokens.colors.background,
            transition: designTokens.transitions.fast,
            '&:hover fieldset': {
              borderColor: designTokens.colors.primary,
            },
            '&.Mui-focused fieldset': {
              borderColor: designTokens.colors.primary,
            },
          },
          '& .MuiInputBase-input': {
            padding: designTokens.components.input.padding,
            fontSize: designTokens.typography.fontSize.base,
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },

    // ---- Select ----
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: designTokens.colors.primary,
          },
        },
      },
    },

    // ---- Chip ----
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.full,
          fontWeight: designTokens.typography.fontWeight.medium,
          height: '32px',
          padding: '4px 12px',
        },
        colorPrimary: {
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          color: designTokens.colors.primary,
        },
      },
    },

    // ---- Dialog ----
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: designTokens.borderRadius.xl,
          boxShadow: designTokens.shadows.xl,
        },
      },
    },

    // ---- IconButton ----
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.md,
          minWidth: '44px',
          minHeight: '44px',
          transition: designTokens.transitions.fast,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        },
        colorPrimary: {
          color: designTokens.colors.primary,
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
          },
        },
      },
    },

    // ---- Tab ----
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: designTokens.typography.fontWeight.medium,
          fontSize: designTokens.typography.fontSize.base,
          minHeight: '48px',
          transition: designTokens.transitions.fast,
        },
        textColorPrimary: {
          color: designTokens.colors.textSecondary,
          '&.Mui-selected': {
            color: designTokens.colors.primary,
          },
        },
      },
    },

    // ---- Divider ----
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: designTokens.colors.border,
        },
      },
    },

    // ---- Avatar ----
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: designTokens.colors.secondary,
          fontWeight: designTokens.typography.fontWeight.semibold,
        },
      },
    },

    // ---- Tooltip ----
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: designTokens.colors.gray800,
          color: designTokens.colors.white,
          fontSize: designTokens.typography.fontSize.xs,
          borderRadius: designTokens.borderRadius.sm,
          padding: '8px 12px',
        },
      },
    },

    // ---- Snackbar ----
    MuiSnackbar: {
      styleOverrides: {
        root: {
          bottom: '80px !important', // Above bottom nav
        },
      },
    },

    // ---- List ----
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: designTokens.colors.backgroundAlt,
          },
        },
      },
    },
  },
});

  return theme;
};

export default createAppTheme;
