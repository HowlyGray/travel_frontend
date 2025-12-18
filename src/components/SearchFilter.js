import React, { useState } from 'react';
import { TextField, MenuItem, Box } from '@mui/material';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    onFilter(value);
  };

  return (
    <Box sx={{ display: 'flex', gap: '16px', mb: 4 }}>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
      />
      <TextField
        select
        label="Filter by Type"
        value={filterType}
        onChange={handleFilterChange}
        sx={{ minWidth: '200px' }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="place">Places</MenuItem>
        <MenuItem value="article">Articles</MenuItem>
        <MenuItem value="attraction">Attractions</MenuItem>
      </TextField>
    </Box>
  );
};

export default SearchFilter;