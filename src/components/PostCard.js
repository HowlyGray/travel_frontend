/**
 * PostCard.js - Carte de post moderne inspirée Instagram/Pinterest
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
  Chip,
} from '@mui/material';
import {
  Comment as CommentIcon,
  LocationOn as LocationIcon,
  MoreVert as MoreVertIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';
import LazyImage from './LazyImage';
import { designTokens } from '../theme/designTokens';
import { useInteractions } from '../context/InteractionsContext';

const PostCard = ({ post, onUpdate }) => {
  const { t } = useTranslation();
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [currentImageIndex] = useState(0);

  const {
    toggleBookmark,
    isBookmarked,
    addComment,
    getComments,
    getCommentCount,
  } = useInteractions();

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        author: 'Current User',
        content: newComment,
        date: new Date().toISOString(),
      };
      addComment(post.id, comment);
      setNewComment('');
      setCommentDialogOpen(false);
    }
  };

  const handleToggleBookmark = () => {
    toggleBookmark(post.id);
  };

  const images = post.images || [];
  const hasMultipleImages = images.length > 1;

  return (
    <>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="article"
        aria-label={`Post by ${post.author}: ${post.title}`}
        sx={{
          backgroundColor: designTokens.colors.surface,
          borderRadius: designTokens.components.card.borderRadius,
          boxShadow: designTokens.shadows.card,
          overflow: 'hidden',
          transition: designTokens.transitions.base,
          '&:hover': {
            boxShadow: designTokens.shadows.cardHover,
            transform: 'translateY(-4px)',
          },
        }}
      >
        {/* Header - Style Instagram */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: designTokens.components.postCard.contentPadding,
            pb: designTokens.spacing.sm,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.sm }}>
            <Avatar
              sx={{
                width: designTokens.components.avatar.sm,
                height: designTokens.components.avatar.sm,
                background: designTokens.colors.gradientPrimary,
                fontWeight: designTokens.typography.fontWeight.semibold,
              }}
            >
              {post.author?.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: designTokens.typography.fontWeight.semibold,
                  color: designTokens.colors.textPrimary,
                  fontSize: designTokens.typography.fontSize.sm,
                }}
              >
                {post.author}
              </Typography>
              {post.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <LocationIcon
                    sx={{
                      fontSize: '14px',
                      color: designTokens.colors.textTertiary,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: designTokens.colors.textSecondary,
                      fontSize: designTokens.typography.fontSize.xs,
                    }}
                  >
                    {post.location}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <IconButton size="small" sx={{ color: designTokens.colors.textSecondary }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Image - Pleine largeur comme Instagram */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            backgroundColor: designTokens.colors.gray100,
          }}
        >
          {images.length > 0 ? (
            <LazyImage
              src={images[currentImageIndex]?.url || 'https://via.placeholder.com/600x400?text=No+Image'}
              alt={`Image ${currentImageIndex + 1} from ${post.title}`}
              height="auto"
              borderRadius="0"
              sx={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: designTokens.colors.gray200,
              }}
            >
              <Typography variant="body2" sx={{ color: designTokens.colors.textTertiary }}>
                Aucune image
              </Typography>
            </Box>
          )}

          {/* Indicateurs d'images multiples */}
          {hasMultipleImages && (
            <Box
              sx={{
                position: 'absolute',
                top: designTokens.spacing.md,
                right: designTokens.spacing.md,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: designTokens.colors.white,
                padding: '6px 12px',
                borderRadius: designTokens.borderRadius.full,
                fontSize: designTokens.typography.fontSize.xs,
                fontWeight: designTokens.typography.fontWeight.semibold,
              }}
            >
              {currentImageIndex + 1} / {images.length}
            </Box>
          )}
        </Box>

        {/* Actions - Style Instagram */}
        <Box sx={{ p: designTokens.components.postCard.contentPadding, pt: designTokens.spacing.sm }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: designTokens.spacing.sm,
            }}
            role="group"
            aria-label="Post interactions"
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <LikeButton postId={post.id} />

              <IconButton
                size="medium"
                onClick={() => setCommentDialogOpen(true)}
                aria-label="Open comments"
                sx={{
                  color: designTokens.colors.textPrimary,
                  '&:hover': {
                    backgroundColor: designTokens.colors.overlayLight,
                  },
                }}
              >
                <CommentIcon />
              </IconButton>

              <ShareButton post={post} />
            </Box>

            <IconButton
              size="medium"
              onClick={handleToggleBookmark}
              aria-label={isBookmarked(post.id) ? 'Unsave' : 'Save'}
              sx={{
                color: designTokens.colors.textPrimary,
                '&:hover': {
                  backgroundColor: designTokens.colors.overlayLight,
                },
              }}
            >
              {isBookmarked(post.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
          </Box>

          {/* Likes count */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: designTokens.typography.fontWeight.semibold,
              mb: designTokens.spacing.xs,
              color: designTokens.colors.textPrimary,
            }}
          >
            {post.likes?.length || 0} {t('likes', 'j\'aime')}
          </Typography>

          {/* Title & Description */}
          <Box sx={{ mb: designTokens.spacing.xs }}>
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontWeight: designTokens.typography.fontWeight.semibold,
                mr: designTokens.spacing.xs,
                color: designTokens.colors.textPrimary,
              }}
            >
              {post.author}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: designTokens.colors.textPrimary,
                lineHeight: designTokens.typography.lineHeight.normal,
              }}
            >
              {post.description}
            </Typography>
          </Box>

          {/* Category badge */}
          {post.category && (
            <Chip
              label={post.category}
              size="small"
              sx={{
                backgroundColor: designTokens.colors.overlayLight,
                color: designTokens.colors.textSecondary,
                fontWeight: designTokens.typography.fontWeight.medium,
                fontSize: designTokens.typography.fontSize.xs,
                height: '24px',
                mb: designTokens.spacing.xs,
              }}
            />
          )}

          {/* Comments preview */}
          {getCommentCount(post.id) > 0 && (
            <Typography
              variant="caption"
              sx={{
                color: designTokens.colors.textTertiary,
                cursor: 'pointer',
                display: 'block',
                mb: designTokens.spacing.xs,
                '&:hover': {
                  color: designTokens.colors.textSecondary,
                },
              }}
              onClick={() => setCommentDialogOpen(true)}
            >
              Voir les {getCommentCount(post.id)} commentaire{getCommentCount(post.id) > 1 ? 's' : ''}
            </Typography>
          )}

          {/* Date */}
          <Typography
            variant="caption"
            sx={{
              color: designTokens.colors.textTertiary,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: designTokens.typography.letterSpacing.wide,
            }}
          >
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
        </Box>
      </Box>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onClose={() => setCommentDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: designTokens.typography.fontWeight.bold }}>
          {t('comments.title', 'Comments')}
        </DialogTitle>
        <DialogContent>
          {/* Existing comments */}
          <Box sx={{ mb: designTokens.spacing.lg, maxHeight: '200px', overflowY: 'auto' }}>
            {getComments(post.id).length > 0 ? (
              getComments(post.id).map((comment, idx) => (
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
                {t('comments.noComments', 'Soyez le premier à commenter!')}
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
