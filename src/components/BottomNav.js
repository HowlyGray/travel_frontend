/**
 * BottomNavigation.js - Main navigation
 * 5 main tabs: Feed, Discover, Create, Activity, Profile
 */

import React from 'react';
import { Box, Paper, IconButton, Tooltip } from '@mui/material';
import {
  Home as HomeIcon,
  Search as DiscoverIcon,
  Add as CreateIcon,
  Favorite as ActivityIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { designTokens } from '../theme/designTokens';

const BottomNav = ({ currentView, onNavigate }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'feed', label: t('nav.feed', 'Feed'), icon: HomeIcon },
    { id: 'discover', label: t('nav.discover', 'Discover'), icon: DiscoverIcon },
    { id: 'create', label: t('nav.create', 'Create'), icon: CreateIcon },
    { id: 'activity', label: t('nav.activity', 'Activity'), icon: ActivityIcon },
    { id: 'profile', label: t('nav.profile', 'Profile'), icon: ProfileIcon },
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
        backgroundColor: designTokens.colors.background,
        borderTop: `1px solid ${designTokens.colors.border}`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: designTokens.zIndex.fixed,
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <Tooltip key={item.id} title={item.label} placement="top">
            <IconButton
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
              sx={{
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: isActive ? designTokens.colors.primary : designTokens.colors.textSecondary,
                transition: designTokens.transitions.fast,
                '&:hover': {
                  color: designTokens.colors.primary,
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                },
                '&:focus': {
                  outline: `2px solid ${designTokens.colors.primary}`,
                  outlineOffset: '2px',
                },
                position: 'relative',
              }}
            >
              <Icon sx={{ fontSize: '24px' }} />
              {isActive && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '4px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: designTokens.colors.primary,
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        );
      })}
    </Paper>
  );
};

export default BottomNav;
