import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/mockPosts';
import ImageUpload from './ImageUpload';

function PostForm({ onSubmit, currentUser }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      images: images,
      username: currentUser,
      date: formData.date
    });
    
    // Réinitialiser le formulaire
    setFormData({
      title: '',
      description: '',
      location: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    setImages([]);
  };

  const translatedCategories = [
    t('categories.all'),
    t('categories.adventure'),
    t('categories.food'),
    t('categories.culture'),
    t('categories.relaxation')
  ];

  return (
    <Paper sx={{ p: 3, mb: 4, backgroundColor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>
        {t('form.title')}
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label={t('form.titleField')}
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label={t('form.descriptionField')}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="location"
              label={t('form.locationField')}
              variant="outlined"
              fullWidth
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="date"
              label={t('form.dateField')}
              type="date"
              variant="outlined"
              fullWidth
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="category"
              label={t('form.categoryField')}
              select
              variant="outlined"
              fullWidth
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <ImageUpload 
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {t('form.publish')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default PostForm;