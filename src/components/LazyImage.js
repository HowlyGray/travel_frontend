/**
 * LazyImage.js - Optimized lazy-loaded image with placeholder
 */

import React, { useState } from 'react';
import { Box, Skeleton } from '@mui/material';

const LazyImage = ({ src, alt, height = '300px', borderRadius = '8px', objectFit = 'cover' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        borderRadius,
      }}
    >
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}

      <Box
        component="img"
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(true);
          setError(true);
        }}
        sx={{
          width: '100%',
          height: '100%',
          objectFit,
          borderRadius,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
        }}
        loading="lazy"
      />

      {error && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#999',
            fontSize: '14px',
          }}
        >
          Image not available
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;
