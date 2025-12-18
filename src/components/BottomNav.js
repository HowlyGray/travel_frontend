/**
 * BottomNavigation.js - Navigation moderne et épurée
 * Style Instagram/Pinterest avec animations fluides
 */

import React from 'react';
import { Box, Paper, IconButton, Typography } from '@mui/material';
import {
  Home as HomeIcon,
  Explore as ExploreIcon,
  AddCircleOutline as CreateIcon,
  FavoriteBorder as ActivityIcon,
  PersonOutline as ProfileIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../theme/designTokens';

const BottomNav = ({ currentView, onNavigate }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'feed', label: t('nav.feed', 'Accueil'), icon: HomeIcon },
    { id: 'discover', label: t('nav.discover', 'Découvrir'), icon: ExploreIcon },
    { id: 'create', label: t('nav.create', 'Créer'), icon: CreateIcon },
    { id: 'activity', label: t('nav.activity', 'Activité'), icon: ActivityIcon },
    { id: 'profile', label: t('nav.profile', 'Profil'), icon: ProfileIcon },
  ];

  return (
    <Paper
      elevation={0}
      role="navigation"
      aria-label="Main navigation"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: designTokens.components.bottomNav.height,
        backgroundColor: designTokens.colors.backgroundAlt,
        borderTop: `1px solid ${designTokens.colors.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: designTokens.zIndex.fixed,
        backdropFilter: 'blur(10px)',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <IconButton
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
              sx={{
                minWidth: '48px',
                minHeight: '48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? designTokens.colors.primary : designTokens.colors.textSecondary,
                transition: designTokens.transitions.base,
                '&:hover': {
                  color: designTokens.colors.primary,
                  backgroundColor: designTokens.colors.overlayLight,
                  transform: 'scale(1.05)',
                },
                position: 'relative',
              }}
            >
              <Icon
                sx={{
                  fontSize: item.id === 'create' ? '32px' : '26px',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              />
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    width: '32px',
                    height: '3px',
                    borderRadius: '0 0 3px 3px',
                    backgroundColor: designTokens.colors.primary,
                  }}
                />
              )}
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                fontSize: '10px',
                fontWeight: isActive ? designTokens.typography.fontWeight.semibold : designTokens.typography.fontWeight.normal,
                color: isActive ? designTokens.colors.primary : designTokens.colors.textTertiary,
                mt: '-4px',
                transition: designTokens.transitions.fast,
              }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
};

export default BottomNav;
