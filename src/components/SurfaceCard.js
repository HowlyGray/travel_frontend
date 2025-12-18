/**
 * SurfaceCard.js - Reusable card component with consistent styling
 * Used throughout the app for posts, activities, etc.
 */

import React from 'react';
import { Paper, Box } from '@mui/material';
import { designTokens } from '../theme/designTokens';

const SurfaceCard = ({ children, onClick, elevation = 'sm', padding = 'md', ...props }) => {
  const shadowMap = {
    xs: designTokens.shadows.xs,
    sm: designTokens.shadows.sm,
    md: designTokens.shadows.md,
    lg: designTokens.shadows.lg,
  };

  const paddingMap = {
    xs: designTokens.spacing.xs,
    sm: designTokens.spacing.sm,
    md: designTokens.spacing.md,
    lg: designTokens.spacing.lg,
  };

  return (
    <Paper
      onClick={onClick}
      sx={{
        borderRadius: designTokens.borderRadius.lg,
        border: `1px solid ${designTokens.colors.border}`,
        backgroundColor: designTokens.colors.surface,
        boxShadow: shadowMap[elevation] || shadowMap.sm,
        padding: paddingMap[padding] || paddingMap.md,
        transition: designTokens.transitions.base,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick
          ? {
              boxShadow: designTokens.shadows.md,
              transform: 'translateY(-2px)',
            }
          : {},
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default SurfaceCard;
