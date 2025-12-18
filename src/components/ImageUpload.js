import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardActions,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon
} from '@mui/icons-material';

export default function ImageUpload({ images, onImagesChange, maxImages = 5 }) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewDialog, setPreviewDialog] = useState({ open: false, image: null });
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Gérer la sélection de fichiers
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    // Vérifier le nombre maximal d'images
    const totalImages = images.length + files.length;
    if (totalImages > maxImages) {
      alert(`Vous ne pouvez ajouter que ${maxImages} images maximum (${totalImages - maxImages} images ignorées)`);
    }

    // Traiter les fichiers valides
    const validFiles = files.slice(0, maxImages - images.length);
    const newImages = [];

    validFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        // Vérifier la taille (max 5MB)
        if (file.size <= 5 * 1024 * 1024) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const image = {
              id: Date.now() + Math.random(),
              url: e.target.result,
              name: file.name,
              size: file.size,
              type: file.type
            };
            newImages.push(image);
            
            // Si toutes les images sont traitées, mettre à jour l'état
            if (newImages.length === validFiles.length) {
              onImagesChange([...images, ...newImages]);
              setIsUploading(false);
            }
          };
          reader.readAsDataURL(file);
        } else {
          console.warn(`Fichier ${file.name} trop volumineux (max 5MB)`);
        }
      } else {
        console.warn(`Fichier ${file.name} n'est pas une image`);
      }
    });

    if (validFiles.length > 0) {
      setIsUploading(true);
    }
  };

  // Supprimer une image
  const handleRemoveImage = (imageId) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    onImagesChange(updatedImages);
  };

  // Ouvrir la boîte de dialogue de sélection
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Ouvrir la boîte de dialogue de sélection multiple
  const openMultipleDialog = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = (e) => handleFileSelect(e);
    input.click();
  };

  // Afficher l'aperçu d'une image
  const handleImageClick = (image) => {
    setPreviewDialog({ open: true, image });
  };

  if (!isClient) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Images ({images.length}/{maxImages})
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, border: '2px dashed', borderColor: 'grey.300' }}>
          <Typography color="text.secondary">Loading image upload...</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Images ({images.length}/{maxImages})
      </Typography>

      {/* Grille d'images */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {images.map((image) => (
          <Grid item xs={6} sm={4} md={3} key={image.id}>
            <Card sx={{ position: 'relative', height: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={image.url}
                alt={image.name}
                sx={{ 
                  objectFit: 'cover',
                  cursor: 'pointer',
                  '&:hover': { opacity: 0.8 }
                }}
                onClick={() => handleImageClick(image)}
              />
              <CardActions sx={{ p: 1 }}>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveImage(image.id)}
                  sx={{ ml: 'auto' }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Bouton d'ajout d'image */}
        {images.length < maxImages && (
          <Grid item xs={6} sm={4} md={3}>
            <Card
              sx={{
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: '2px dashed',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.50',
                  borderColor: 'primary.dark'
                }
              }}
              onClick={openFileDialog}
            >
              {isUploading ? (
                <CircularProgress />
              ) : (
                <Box textAlign="center">
                  <UploadIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Ajouter une image
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Boutons d'actions rapides */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={openMultipleDialog}
          disabled={images.length >= maxImages}
        >
          Ajouter plusieurs images
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => onImagesChange([])}
          disabled={images.length === 0}
        >
          Supprimer toutes les images
        </Button>
      </Box>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* Boîte de dialogue d'aperçu */}
      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog({ open: false, image: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {previewDialog.image?.name}
          <IconButton onClick={() => setPreviewDialog({ open: false, image: null })}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {previewDialog.image && (
            <img
              src={previewDialog.image.url}
              alt={previewDialog.image.name}
              style={{ width: '100%', height: 'auto', maxHeight: '70vh', objectFit: 'contain' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog({ open: false, image: null })}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}