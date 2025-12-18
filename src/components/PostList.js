/**
 * PostList.js - Liste moderne de posts avec options d'affichage
 * Support pour vue en liste (Instagram) et grille (Pinterest)
 */

import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ViewStream as ViewStreamIcon, ViewModule as ViewModuleIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';
import MasonryGrid from './MasonryGrid';
import { designTokens } from '../theme/designTokens';

const PostList = ({ posts, onUpdatePosts, defaultView = 'list' }) => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState(defaultView);

  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: designTokens.spacing.xxl }}>
        <Typography variant="h5" sx={{ color: designTokens.colors.textSecondary }}>
          {t('post.noPosts', 'Aucune publication trouvée')}
        </Typography>
        <Typography variant="body2" sx={{ color: designTokens.colors.textTertiary, mt: 2 }}>
          Commencez à partager vos découvertes de lieux incroyables!
        </Typography>
      </Box>
    );
  }

  const handleUpdatePost = (updatedPost) => {
    if (onUpdatePosts) {
      onUpdatePosts(
        posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    }
  };

  return (
    <Box>
      {/* Toggle View Mode */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: designTokens.spacing.lg,
        }}
      >
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => {
            if (newMode !== null) {
              setViewMode(newMode);
            }
          }}
          size="small"
          sx={{
            backgroundColor: designTokens.colors.surface,
            borderRadius: designTokens.borderRadius.lg,
            boxShadow: designTokens.shadows.sm,
          }}
        >
          <ToggleButton
            value="list"
            aria-label="list view"
            sx={{
              px: 2,
              py: 1,
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: designTokens.colors.primary,
                color: designTokens.colors.white,
                '&:hover': {
                  backgroundColor: designTokens.colors.primaryDark,
                },
              },
            }}
          >
            <ViewStreamIcon sx={{ mr: 1, fontSize: '20px' }} />
            Liste
          </ToggleButton>
          <ToggleButton
            value="grid"
            aria-label="grid view"
            sx={{
              px: 2,
              py: 1,
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: designTokens.colors.primary,
                color: designTokens.colors.white,
                '&:hover': {
                  backgroundColor: designTokens.colors.primaryDark,
                },
              },
            }}
          >
            <ViewModuleIcon sx={{ mr: 1, fontSize: '20px' }} />
            Grille
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Posts - Vue Liste (Instagram style) */}
      {viewMode === 'list' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: designTokens.spacing.lg,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={handleUpdatePost} />
          ))}
        </Box>
      )}

      {/* Posts - Vue Grille (Pinterest style) */}
      {viewMode === 'grid' && (
        <MasonryGrid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap={16}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={handleUpdatePost} />
          ))}
        </MasonryGrid>
      )}
    </Box>
  );
};

export default PostList;
