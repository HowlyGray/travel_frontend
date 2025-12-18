/**
 * PostList.js - List of posts using PostCard component
 */

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';
import { designTokens } from '../theme/designTokens';

const PostList = ({ posts, onUpdatePosts }) => {
  const { t } = useTranslation();

  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: designTokens.spacing.xxl }}>
        <Typography variant="h5" sx={{ color: designTokens.colors.textSecondary }}>
          {t('post.noPosts', 'No posts found')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.lg }}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onUpdate={(updatedPost) => {
            if (onUpdatePosts) {
              onUpdatePosts(
                posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
              );
            }
          }}
        />
      ))}
    </Box>
  );
};

export default PostList;
