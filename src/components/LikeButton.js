/**
 * LikeButton.js - Interactive like button with heart animation
 */

import React, { useState } from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import { Favorite as LikeFilledIcon, FavoriteBorder as LikeEmptyIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { designTokens } from '../theme/designTokens';

const LikeButton = ({ liked = false, likeCount = 0, onLike, small = false }) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [count, setCount] = useState(likeCount);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);
    if (onLike) {
      onLike(!isLiked);
    }
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
          aria-label={isLiked ? 'Unlike post' : 'Like post'}
          aria-pressed={isLiked}
          title={isLiked ? 'Unlike' : 'Like'}
          sx={{
            minWidth: buttonSize,
            minHeight: buttonSize,
            color: isLiked ? designTokens.colors.error : designTokens.colors.textSecondary,
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
          {isLiked ? (
            <LikeFilledIcon sx={{ fontSize: size }} />
          ) : (
            <LikeEmptyIcon sx={{ fontSize: size }} />
          )}
        </IconButton>
      </motion.div>

      {count > 0 && !small && (
        <Typography
          variant="caption"
          sx={{
            color: designTokens.colors.textSecondary,
            fontWeight: designTokens.typography.fontWeight.medium,
          }}
        >
          {count}
        </Typography>
      )}
    </Box>
  );
};

export default LikeButton;
