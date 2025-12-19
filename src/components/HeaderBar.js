/**
 * HeaderBar.js - En-tête moderne et minimaliste
 * Inspiré du design Instagram/Pinterest
 */

import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, InputBase } from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AddBox as AddBoxIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useTheme } from '../context/ThemeContext';
import { designTokens } from '../theme/designTokens';

const HeaderBar = ({ currentUser, onLogout, onProfileClick, onSearch, searchQuery }) => {
  const { t } = useTranslation();
  const { mode, toggleMode } = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: designTokens.colors.backgroundAlt,
        color: designTokens.colors.textPrimary,
        boxShadow: 'none',
        borderBottom: `1px solid ${designTokens.colors.border}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: designTokens.components.header.height,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: { xs: '0 16px', sm: '0 24px' },
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Logo & Title - Style Instagram */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: designTokens.typography.fontFamily.display,
              fontWeight: designTokens.typography.fontWeight.bold,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              color: designTokens.colors.textPrimary,
              letterSpacing: '-0.02em',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            TravelMemories
          </Typography>
        </Box>

        {/* Barre de recherche - Style Instagram */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            backgroundColor: designTokens.colors.gray100,
            borderRadius: designTokens.borderRadius.lg,
            padding: '8px 16px',
            minWidth: '250px',
            maxWidth: '400px',
            flex: 1,
            mx: 4,
          }}
        >
          <SearchIcon sx={{ color: designTokens.colors.textTertiary, mr: 1, fontSize: '20px' }} />
          <InputBase
            placeholder={t('search.placeholder', 'Rechercher des lieux...')}
            value={searchQuery || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            sx={{
              flex: 1,
              fontSize: designTokens.typography.fontSize.sm,
              color: designTokens.colors.textPrimary,
              '& input::placeholder': {
                color: designTokens.colors.textTertiary,
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Actions - Style épuré */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '4px', sm: '12px' }, minWidth: '150px', justifyContent: 'flex-end' }}>
          {/* Bouton recherche mobile */}
          <IconButton
            sx={{
              display: { xs: 'flex', md: 'none' },
              color: designTokens.colors.textPrimary,
              '&:hover': {
                backgroundColor: designTokens.colors.overlayLight,
              },
            }}
          >
            <SearchIcon />
          </IconButton>

          {/* Bouton Ajouter */}
          <IconButton
            sx={{
              color: designTokens.colors.textPrimary,
              '&:hover': {
                backgroundColor: designTokens.colors.overlayLight,
              },
            }}
          >
            <AddBoxIcon sx={{ fontSize: '28px' }} />
          </IconButton>

          {/* Notifications */}
          <IconButton
            sx={{
              display: { xs: 'none', sm: 'flex' },
              color: designTokens.colors.textPrimary,
              '&:hover': {
                backgroundColor: designTokens.colors.overlayLight,
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          {/* Dark Mode Toggle */}
          <IconButton
            onClick={toggleMode}
            title={mode === 'light' ? 'Dark mode' : 'Light mode'}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              color: designTokens.colors.textPrimary,
              '&:hover': {
                backgroundColor: designTokens.colors.overlayLight,
              },
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>

          {/* Language Selector - Caché sur mobile */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <LanguageSelector />
          </Box>

          {/* User Avatar */}
          {currentUser && (
            <Avatar
              sx={{
                width: { xs: 32, sm: 36 },
                height: { xs: 32, sm: 36 },
                background: designTokens.colors.gradientPrimary,
                cursor: 'pointer',
                transition: designTokens.transitions.fast,
                border: `2px solid ${designTokens.colors.border}`,
                '&:hover': {
                  transform: 'scale(1.05)',
                  border: `2px solid ${designTokens.colors.primary}`,
                },
              }}
              onClick={onProfileClick}
            >
              {currentUser?.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
