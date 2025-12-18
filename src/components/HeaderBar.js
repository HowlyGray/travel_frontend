/**
 * HeaderBar.js - Clean header with branding
 * Displays app title, language selector, logout button
 */

import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import { Logout as LogoutIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useTheme } from '../context/ThemeContext';
import { designTokens } from '../theme/designTokens';

const HeaderBar = ({ currentUser, onLogout, onProfileClick }) => {
  const { t } = useTranslation();
  const { mode, toggleMode } = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: designTokens.colors.background,
        color: designTokens.colors.textPrimary,
        boxShadow: designTokens.shadows.xs,
        borderBottom: `1px solid ${designTokens.colors.border}`,
      }}
    >
      <Toolbar
        sx={{
          minHeight: designTokens.components.header.height,
          padding: designTokens.components.header.padding,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: designTokens.typography.fontWeight.bold,
              background: `linear-gradient(135deg, ${designTokens.colors.primary} 0%, ${designTokens.colors.secondary} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {t('app.title', 'Voyages')}
          </Typography>
        </Box>

        {/* Right side controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm }}>
          {/* Dark Mode Toggle */}
          <IconButton
            onClick={toggleMode}
            title={mode === 'light' ? 'Dark mode' : 'Light mode'}
            sx={{
              minWidth: '44px',
              minHeight: '44px',
              color: designTokens.colors.primary,
              '&:hover': {
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
              },
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Language Selector */}
          <LanguageSelector />

          {/* User Avatar & Logout */}
          {currentUser && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm }}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: designTokens.colors.secondary,
                  cursor: 'pointer',
                  transition: designTokens.transitions.fast,
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
                onClick={onProfileClick}
              >
                {currentUser.name?.charAt(0).toUpperCase()}
              </Avatar>

              <IconButton
                onClick={onLogout}
                title={t('common.logout', 'Logout')}
                sx={{
                  minWidth: '44px',
                  minHeight: '44px',
                  color: designTokens.colors.primary,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
