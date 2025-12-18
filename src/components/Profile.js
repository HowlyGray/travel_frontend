import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Paper,
  Avatar,
  Chip,
  IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  Person,
  Edit,
  Settings,
  ArrowBack,
  Home,
  TravelExplore,
  PhotoLibrary,
  LocationOn,
  CalendarToday,
  Favorite,
  FavoriteBorder,
  Comment
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import ShareButton from './ShareButton';

function Profile({ username, userPosts, onBack }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('posts');
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Gestion des likes (même logique que PostList)
  const handleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  const handleUnlike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: Math.max((prev[postId] || 0) - 1, 0)
    }));
  };

  const handleCommentClick = (postId) => {
    // Pour l'instant, redirection vers le feed pour voir les commentaires
    // Dans une version complète, on pourrait ouvrir une modale ici aussi
    alert(`${t('comments.title', 'Commentaires')} - Redirection vers le feed principal pour voir les commentaires`);
  };

  const isLiked = (postId) => {
    return (likes[postId] || 0) > 0;
  };

  const getLikeCount = (postId) => {
    return likes[postId] || 0;
  };

  const getCommentCount = (postId) => {
    return comments[postId]?.length || 0;
  };

  const getStats = () => {
    const totalPosts = userPosts.length;
    const totalImages = userPosts.reduce((sum, post) => sum + (post.images?.length || 0), 0);
    const uniqueLocations = [...new Set(userPosts.map(post => post.location))].length;
    const categories = [...new Set(userPosts.map(post => post.category))];

    return {
      totalPosts,
      totalImages,
      uniqueLocations,
      categories
    };
  };

  const stats = getStats();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper sx={{ p: 4, mb: 4, textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        {/* Bouton de retour à l'accueil amélioré */}
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={onBack}
          sx={{ 
            position: 'absolute', 
            left: 20, 
            top: 20,
            backgroundColor: 'rgba(255,255,255,0.15)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '25px',
            padding: '8px 16px',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': { 
              backgroundColor: 'rgba(255,255,255,0.25)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}
        >
          {t('nav.backToHome', 'Retour à l\'accueil')}
        </Button>

        <Avatar 
          sx={{ 
            width: 120, 
            height: 120, 
            mx: 'auto', 
            mb: 2, 
            bgcolor: 'white',
            color: 'primary.main',
            fontSize: '3rem'
          }}
        >
          <Person sx={{ fontSize: '4rem' }} />
        </Avatar>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {username}
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
          {t('profile.title')}
        </Typography>

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Button variant="contained" startIcon={<Edit />} sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>
              {t('profile.editProfile')}
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" startIcon={<Settings />} sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
              {t('profile.settings')}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.50' }}>
            <Typography variant="h4" color="primary.main" gutterBottom>
              {stats.totalPosts}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('profile.myPosts')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'secondary.50' }}>
            <Typography variant="h4" color="secondary.main" gutterBottom>
              {stats.totalImages}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <PhotoLibrary sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> Photos
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.50' }}>
            <Typography variant="h4" color="success.main" gutterBottom>
              {stats.uniqueLocations}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <LocationOn sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> Lieux
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'info.50' }}>
            <Typography variant="h4" color="info.main" gutterBottom>
              {stats.categories.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <TravelExplore sx={{ fontSize: '1rem', verticalAlign: 'middle' }} /> Catégories
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* User's Posts */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        {t('profile.myPosts')}
      </Typography>

      {userPosts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Aucune publication pour le moment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Commencez à partager vos aventures de voyage !
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {userPosts.map((post, index) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              {isClient ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {post.images && post.images.length > 0 && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.images[0].url}
                      alt={post.images[0].name}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {post.description.substring(0, 100)}{post.description.length > 100 ? '...' : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip 
                        label={post.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
                      <LocationOn sx={{ fontSize: '1rem' }} />
                      {post.location}
                      <CalendarToday sx={{ fontSize: '1rem', ml: 1 }} />
                      {new Date(post.date).toLocaleDateString()}
                    </Box>
                  </CardContent>
                  
                  {/* Barre d'actions horizontale moderne - cohérente avec PostList */}
                  <Box sx={{ 
                    p: 2,
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }}>
                      {/* Bouton Like dans le profil */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        backgroundColor: isLiked(post.id) ? 'error.main' : 'grey.100',
                        borderRadius: '16px',
                        padding: '3px 10px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: isLiked(post.id) ? 'error.dark' : 'grey.200',
                          transform: 'scale(1.05)'
                        }
                      }}>
                        <IconButton
                          size="small"
                          onClick={() => isLiked(post.id) ? handleUnlike(post.id) : handleLike(post.id)}
                          sx={{ 
                            padding: '2px',
                            color: isLiked(post.id) ? 'white' : 'text.secondary',
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          {isLiked(post.id) ? <Favorite sx={{ fontSize: '16px' }} /> : <FavoriteBorder sx={{ fontSize: '16px' }} />}
                        </IconButton>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: 0.5,
                            fontWeight: 600,
                            color: isLiked(post.id) ? 'white' : 'text.secondary',
                            minWidth: '12px',
                            fontSize: '0.75rem'
                          }}
                        >
                          {getLikeCount(post.id)}
                        </Typography>
                      </Box>

                      {/* Bouton Commentaire dans le profil */}
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        backgroundColor: 'primary.main',
                        borderRadius: '16px',
                        padding: '3px 10px',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                          transform: 'scale(1.05)'
                        }
                      }}>
                        <IconButton
                          size="small"
                          onClick={() => handleCommentClick(post.id)}
                          sx={{ 
                            padding: '2px',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'transparent'
                            }
                          }}
                        >
                          <Comment sx={{ fontSize: '16px' }} />
                        </IconButton>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            ml: 0.5,
                            fontWeight: 600,
                            color: 'white',
                            minWidth: '12px',
                            fontSize: '0.75rem'
                          }}
                        >
                          {getCommentCount(post.id)}
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Bouton de partage dans le profil */}
                    <ShareButton post={post} />
                  </Box>
                  </Card>
                </motion.div>
              ) : (
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {post.images && post.images.length > 0 && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.images[0].url}
                      alt={post.images[0].name}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {post.description.substring(0, 100)}{post.description.length > 100 ? '...' : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Chip 
                        label={post.category} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
                      <LocationOn sx={{ fontSize: '1rem' }} />
                      {post.location}
                      <CalendarToday sx={{ fontSize: '1rem', ml: 1 }} />
                      {new Date(post.date).toLocaleDateString()}
                    </Box>
                    
                    {/* Barre d'actions statique */}
                    <Box sx={{ 
                      p: 2,
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      borderTop: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          backgroundColor: 'grey.100',
                          borderRadius: '16px',
                          padding: '3px 10px'
                        }}>
                          <FavoriteBorder sx={{ fontSize: '16px', color: 'text.secondary' }} />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              ml: 0.5,
                              fontWeight: 600,
                              color: 'text.secondary',
                              minWidth: '12px',
                              fontSize: '0.75rem'
                            }}
                          >
                            0
                          </Typography>
                        </Box>

                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          backgroundColor: 'primary.main',
                          borderRadius: '16px',
                          padding: '3px 10px'
                        }}>
                          <Comment sx={{ fontSize: '16px', color: 'white' }} />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              ml: 0.5,
                              fontWeight: 600,
                              color: 'white',
                              minWidth: '12px',
                              fontSize: '0.75rem'
                            }}
                          >
                            0
                          </Typography>
                        </Box>
                      </Box>
                      
                      <ShareButton post={post} />
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Profile;