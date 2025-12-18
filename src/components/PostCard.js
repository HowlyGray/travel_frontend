/**
 * PostCard.js - Individual post card with image, content, and interactions
 */

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import SurfaceCard from './SurfaceCard';
import LikeButton from './LikeButton';
import LazyImage from './LazyImage';
import { designTokens } from '../theme/designTokens';

const PostCard = ({ post, onUpdate }) => {
  const { t } = useTranslation();
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedPost = {
        ...post,
        comments: [
          ...post.comments,
          {
            author: 'Current User',
            content: newComment,
            date: new Date().toISOString(),
          },
        ],
      };
      if (onUpdate) onUpdate(updatedPost);
      setNewComment('');
      setCommentDialogOpen(false);
    }
  };

  const imageUrl = post.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <>
      <SurfaceCard elevation="sm" padding="md" role="article" aria-label={`Post by ${post.author}: ${post.title}`}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: designTokens.spacing.md,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm }}>
            <Avatar sx={{ backgroundColor: designTokens.colors.secondary }}>
              {post.author?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: designTokens.typography.fontWeight.semibold }}>
                {post.author}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: designTokens.colors.textTertiary }}
              >
                {new Date(post.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'inline-block',
              padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              borderRadius: designTokens.borderRadius.full,
              fontSize: designTokens.typography.fontSize.xs,
              fontWeight: designTokens.typography.fontWeight.medium,
              color: designTokens.colors.primary,
            }}
            role="region"
            aria-label="Category"
          >
            {post.category}
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            mb: designTokens.spacing.sm,
            fontWeight: designTokens.typography.fontWeight.bold,
          }}
          component="h2"
        >
          {post.title}
        </Typography>

        {/* Location */}
        {post.location && (
          <Typography
            variant="body2"
            sx={{
              mb: designTokens.spacing.md,
              color: designTokens.colors.textSecondary,
            }}
          >
            📍 <span role="region" aria-label="Location">{post.location}</span>
          </Typography>
        )}

        {/* Image */}
        <LazyImage
          src={imageUrl}
          alt={`Image from ${post.title}`}
          height={designTokens.components.postCard.imageHeight}
          borderRadius={designTokens.borderRadius.md}
        />

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            mb: designTokens.spacing.lg,
            color: designTokens.colors.textPrimary,
            lineHeight: designTokens.typography.lineHeight.relaxed,
          }}
        >
          {post.description}
        </Typography>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: designTokens.spacing.sm,
            borderTop: `1px solid ${designTokens.colors.border}`,
            pt: designTokens.spacing.md,
          }}
          role="group"
          aria-label="Post interactions"
        >
          <LikeButton likeCount={post.likes?.length || 0} />

          <IconButton
            size="small"
            onClick={() => setCommentDialogOpen(true)}
            aria-label="Open comments"
            title="Comments"
            sx={{
              minWidth: '40px',
              minHeight: '40px',
              color: designTokens.colors.textSecondary,
              '&:hover': {
                color: designTokens.colors.primary,
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
              },
              '&:focus': {
                outline: `2px solid ${designTokens.colors.primary}`,
                outlineOffset: '2px',
              },
            }}
          >
            <CommentIcon fontSize="small" />
          </IconButton>

          <Typography variant="caption" sx={{ color: designTokens.colors.textTertiary, ml: 'auto' }}>
            {post.comments?.length || 0} {t('comments.title', 'Comments')}
          </Typography>
        </Box>
      </SurfaceCard>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: designTokens.typography.fontWeight.bold }}>
          {t('comments.title', 'Comments')}
        </DialogTitle>
        <DialogContent>
          {/* Existing comments */}
          <Box sx={{ mb: designTokens.spacing.lg, maxHeight: '200px', overflowY: 'auto' }}>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment, idx) => (
                <Box key={idx} sx={{ mb: designTokens.spacing.md }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: designTokens.typography.fontWeight.semibold }}>
                    {comment.author}
                  </Typography>
                  <Typography variant="body2" sx={{ color: designTokens.colors.textSecondary }}>
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" sx={{ color: designTokens.colors.textTertiary }}>
                    {new Date(comment.date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ color: designTokens.colors.textTertiary }}>
                {t('comments.noComments', 'Be the first to comment!')}
              </Typography>
            )}
          </Box>

          {/* New comment input */}
          <Box sx={{ display: 'flex', gap: designTokens.spacing.sm }}>
            <TextField
              fullWidth
              size="small"
              placeholder={t('comments.placeholder', 'Write a comment...')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              multiline
              rows={2}
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              sx={{ alignSelf: 'flex-end' }}
            >
              {t('common.send', 'Send')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCard;
