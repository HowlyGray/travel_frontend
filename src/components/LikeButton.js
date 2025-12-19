/**
 * LikeButton.js - Interactive like button with heart animation
 */

import React, { useState } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import { Favorite as LikeFilledIcon, FavoriteBorder as LikeEmptyIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { designTokens } from '../theme/designTokens';
import { useInteractions } from '../context/InteractionsContext';

const LikeButton = ({ postId, small = false }) => {
  const [animate, setAnimate] = useState(false);
  const { toggleLike, isLiked } = useInteractions();

  const handleClick = () => {
    setAnimate(true);
    toggleLike(postId);
    setTimeout(() => setAnimate(false), 300);
  };

  const size = small ? '20px' : '24px';
  const buttonSize = small ? '32px' : '40px';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: designTokens.spacing.xs,
      }}
    >
      <motion.div
        animate={animate ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <IconButton
          size={small ? 'small' : 'medium'}
          onClick={handleClick}
          aria-label={isLiked(postId) ? 'Unlike post' : 'Like post'}
          aria-pressed={isLiked(postId)}
          title={isLiked(postId) ? 'Unlike' : 'Like'}
          sx={{
            minWidth: buttonSize,
            minHeight: buttonSize,
            color: isLiked(postId) ? designTokens.colors.error : designTokens.colors.textSecondary,
            transition: designTokens.transitions.fast,
            '&:hover': {
              color: designTokens.colors.error,
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            },
            '&:active': {
              transform: 'scale(0.9)',
            },
          }}
        >
          {isLiked(postId) ? (
            <LikeFilledIcon sx={{ fontSize: size }} />
          ) : (
            <LikeEmptyIcon sx={{ fontSize: size }} />
          )}
        </IconButton>
      </motion.div>
    </Box>
  );
};

export default LikeButton;
