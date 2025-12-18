import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const PhotoUpload = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #ccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
      }}
    >
      <input {...getInputProps()} />
      <CloudUpload sx={{ fontSize: '48px', color: '#666' }} />
      <Typography variant="body1">
        {isDragActive ? 'Drop the photo here' : 'Drag & drop a photo, or click to select'}
      </Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Select Photo</Button>
    </Box>
  );
};

export default PhotoUpload;