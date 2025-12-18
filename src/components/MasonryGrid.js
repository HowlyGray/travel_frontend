import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

/**
 * Composant MasonryGrid - Grille type Pinterest
 * Affiche les éléments dans une grille en colonnes avec hauteurs variables
 */
const MasonryGrid = ({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = 16
}) => {
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setColumnCount(columns.lg || 4);
      } else if (width >= 960) {
        setColumnCount(columns.md || 3);
      } else if (width >= 600) {
        setColumnCount(columns.sm || 2);
      } else {
        setColumnCount(columns.xs || 1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  // Distribuer les enfants dans les colonnes
  const distributeItems = () => {
    const cols = Array.from({ length: columnCount }, () => []);
    React.Children.forEach(children, (child, index) => {
      cols[index % columnCount].push(child);
    });
    return cols;
  };

  const columnArrays = distributeItems();

  return (
    <Box
      sx={{
        display: 'flex',
        gap: `${gap}px`,
        width: '100%',
      }}
    >
      {columnArrays.map((column, colIndex) => (
        <Box
          key={colIndex}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`,
            flex: 1,
          }}
        >
          {column}
        </Box>
      ))}
    </Box>
  );
};

export default MasonryGrid;
