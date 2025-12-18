import { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function FilterBar({ 
  categories, 
  onFilterChange, 
  onSortChange, 
  onDateRangeChange, 
  onLocationFilter 
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [locationQuery, setLocationQuery] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    onSortChange(e.target.value);
  };

  const handleDateRangeAccept = (newValue) => {
    setDateRange(newValue);
    onDateRangeChange(newValue);
  };

  const handleLocationSearch = () => {
    onLocationFilter(locationQuery);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box sx={{ 
      p: 3, 
      mb: 4, 
      borderRadius: '12px', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: '600', mb: 2 }}>
        🔍 Discover
      </Typography>
      
      {/* Category Filter */}
      <TextField
        select
        label="Category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="All">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>

      {/* Sort By */}
      <TextField
        select
        label="Sort By"
        value={sortBy}
        onChange={handleSortChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="Newest">Newest</MenuItem>
        <MenuItem value="Oldest">Oldest</MenuItem>
        <MenuItem value="Popular">Popular (Coming Soon)</MenuItem>
      </TextField>

      {/* Date Range Picker */}
      {isClient && (
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Date Range</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DatePicker
              label="Start Date"
              value={dateRange[0]}
              onChange={(newValue) => {
                const updatedRange = [newValue, dateRange[1]];
                setDateRange(updatedRange);
                onDateRangeChange(updatedRange);
              }}
            />
            <DatePicker
              label="End Date"
              value={dateRange[1]}
              onChange={(newValue) => {
                const updatedRange = [dateRange[0], newValue];
                setDateRange(updatedRange);
                onDateRangeChange(updatedRange);
              }}
            />
          </Box>
        </Box>
      )}
      
      {!isClient && (
        <Box sx={{ mb: 2 }}>
          <Typography gutterBottom>Date Range</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              disabled
              placeholder="Loading..."
            />
            <TextField
              label="End Date" 
              type="date"
              fullWidth
              disabled
              placeholder="Loading..."
            />
          </Box>
        </Box>
      )}

      {/* Location Search */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label="Location"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          fullWidth
        />
        <Button 
          variant="contained" 
          onClick={handleLocationSearch}
        >
          Search
        </Button>
      </Box>
    </Box>
    </LocalizationProvider>
  );
}