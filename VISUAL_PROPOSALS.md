# 🎨 Propositions Visuelles Concrètes - Wireframes & Implémentation

## Vue Mobile - Layout Inspiré Instagram

### Avant (Actuel)
```
┌────────────────────────────────────┐
│ ✈️ Travel Discoveries [Home] [👤] │ ← Header encombré
├────────────────────────────────────┤
│ 🔍 Discover (Filtres)              │
│ Category: [Dropdown]               │
│ Sort: [Dropdown]                   │
│ Date Range: [Dates]                │
│ Location: [Search]                 │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐   │
│ │ Ajouter une nouvelle post     │   │
│ │ [Title] [Desc] [Loc] [Cat]   │   │
│ │ [Images...] [Publish]        │   │
│ └──────────────────────────────┘   │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐   │
│ │ [Image]                      │   │
│ │ Post 1                       │   │
│ │ ❤️ 💬 📤                     │   │ ← Actions à droite
│ └──────────────────────────────┘   │
│                                    │
│ ┌──────────────────────────────┐   │
│ │ [Image]                      │   │
│ │ Post 2                       │   │
│ │ ❤️ 💬 📤                     │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘
```

### Après (Proposé)
```
┌────────────────────────────────────┐
│  ✈️ TravelShare        [🌐]        │ ← Header épuré
├────────────────────────────────────┤
│                                    │
│  📰 Feed                           │ ← Découvrir via bottom nav
│                                    │
│  ┌──────────────────────────────┐  │
│  │ [Image]                      │  │
│  │ Amazing Sunset 🌅            │  │
│  │ Bali, Indonesia              │  │
│  │ ──────────────────────────── │  │ ← Photo full-width (Instagram)
│  │ 5 days ago                   │  │
│  ├──────────────────────────────┤  │
│  │ ❤️  237      💬  12      ⋯   │  │ ← Actions compactes
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ [Image]                      │  │
│  │ Street Food Adventure 🍜     │  │
│  │ Tokyo, Japan                 │  │
│  ├──────────────────────────────┤  │
│  │ ❤️  412      💬  28      ⋯   │  │
│  └──────────────────────────────┘  │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ [Image]                      │  │
│  │ Mountain Hike 🏔️             │  │
│  │ Swiss Alps                   │  │
│  ├──────────────────────────────┤  │
│  │ ❤️  189      💬  8       ⋯   │  │
│  └──────────────────────────────┘  │
│                                    │
│                    ↓ (espace bottom) │
├────────────────────────────────────┤
│ [🏠] [🔍] [⊕] [❤️] [👤]          │ ← Bottom Nav (Instagram-style)
└────────────────────────────────────┘
```

---

## Détails Visuels - Post Card

### Structure Proposée
```
┌─────────────────────────────────────────┐
│  User Avatar  UserName  •  3 days ago  │ ← Header post
├─────────────────────────────────────────┤
│                                         │
│            [High-Quality Image]         │
│                 (16:9 ratio)            │
│                                         │
├─────────────────────────────────────────┤
│  ❤️  237      💬  12      📤           │ ← Action bar compacte
├─────────────────────────────────────────┤
│  <b>Liked by user1 and 234 others</b>  │
│                                         │
│  <b>username</b> Incredible sunset...  │
│  <i>See more</i>                       │
│                                         │
│  View all 12 comments                  │
│  Comment 1: "Beautiful!" - user2       │
│  Comment 2: "Where is this?" - user3   │
│                                         │
│  [Avatar] [Write a comment...]    [📤] │ ← Input area
└─────────────────────────────────────────┘
```

---

## Code - Implémentation Componant PostCard Amélioré

```jsx
// src/components/PostCard.js (NOUVEAU - Composant réutilisable)
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  MoreVert,
  Send,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PostCard = ({ post, onLike, onUnlike, isLiked, likeCount, comments = [] }) => {
  const { t } = useTranslation();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLikeClick = () => {
    setIsAnimating(true);
    if (isLiked) {
      onUnlike(post.id);
    } else {
      onLike(post.id);
    }
    setTimeout(() => setIsAnimating(false), 600);
  };

  const displayedComments = showAllComments ? comments : comments.slice(-2);
  const remainingComments = Math.max(0, comments.length - 2);

  return (
    <Card sx={{
      borderRadius: 2,
      border: '1px solid #e0e0e0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      mb: 3,
    }}>
      
      {/* ===== HEADER POST ===== */}
      <CardHeader
        avatar={<Avatar src={post.authorAvatar} alt={post.author} />}
        action={<IconButton size="small"><MoreVert /></IconButton>}
        title={<Typography variant="body2" sx={{ fontWeight: 600 }}>{post.author}</Typography>}
        subheader={<Typography variant="caption">{new Date(post.date).toLocaleDateString()}</Typography>}
        sx={{ pb: 2 }}
      />
      
      {/* ===== IMAGE PRINCIPALE ===== */}
      {post.images && post.images.length > 0 && (
        <CardMedia
          component="img"
          image={post.images[0].url}
          alt={post.title}
          sx={{
            aspectRatio: '16 / 9',
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              filter: 'brightness(0.95)',
            },
          }}
        />
      )}
      
      {/* ===== ACTION BAR (Like, Comment, Share) ===== */}
      <CardActions sx={{
        p: 2,
        pb: 1,
        gap: 1,
        justifyContent: 'flex-start',
      }}>
        
        {/* Like Button avec animation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <motion.div
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            <IconButton
              size="small"
              onClick={handleLikeClick}
              sx={{
                color: isLiked ? '#FF6B6B' : '#999',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#FF6B6B',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                },
              }}
            >
              {isLiked ? <Favorite sx={{ fontSize: 20 }} /> : <FavoriteBorder sx={{ fontSize: 20 }} />}
            </IconButton>
          </motion.div>
          <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 30 }}>
            {likeCount}
          </Typography>
        </Box>
        
        {/* Comment Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={() => setShowCommentInput(!showCommentInput)}
            sx={{
              color: '#999',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
          >
            <ChatBubbleOutline sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography variant="caption" sx={{ fontWeight: 600, minWidth: 30 }}>
            {comments.length}
          </Typography>
        </Box>
      </CardActions>
      
      <Divider sx={{ my: 1 }} />
      
      {/* ===== CONTENU POST ===== */}
      <CardContent sx={{ pb: 2 }}>
        
        {/* Lieu et titre */}
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {post.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            📍 {post.location}
          </Typography>
        </Box>
        
        {/* Description (tronquée) */}
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: '#666',
            lineHeight: 1.5,
          }}
        >
          {post.description.length > 150
            ? `${post.description.substring(0, 150)}...`
            : post.description}
        </Typography>
        
        {/* Commentaires */}
        {comments.length > 0 && (
          <Box sx={{ mt: 2 }}>
            {remainingComments > 0 && !showAllComments && (
              <Typography
                variant="caption"
                sx={{
                  color: '#999',
                  cursor: 'pointer',
                  display: 'block',
                  mb: 1,
                  fontWeight: 500,
                }}
                onClick={() => setShowAllComments(true)}
              >
                {t('post.viewAllComments', `Voir tous les ${comments.length} commentaires`)}
              </Typography>
            )}
            
            <List sx={{ p: 0 }}>
              {displayedComments.map((comment) => (
                <ListItem key={comment.id} sx={{ py: 1, px: 0 }}>
                  <ListItemAvatar>
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem' }}>
                      {comment.author[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2">
                        <strong>{comment.author}</strong> {comment.text}
                      </Typography>
                    }
                    secondary={<Typography variant="caption">2 jours ago</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
      
      {/* ===== INPUT COMMENTAIRE ===== */}
      {showCommentInput && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 1, backgroundColor: '#fafafa' }}>
            <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>J</Avatar>
            <TextField
              fullWidth
              placeholder={t('comments.placeholder', 'Ajouter un commentaire...')}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  // Envoyer le commentaire
                  setNewComment('');
                }
              }}
              multiline
              maxRows={3}
              size="small"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setNewComment('')}
                    >
                      <Send sx={{ fontSize: 18 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </motion.div>
      )}
    </Card>
  );
};

export default PostCard;
```

---

## Code - Theme Moderne Appliqué

```javascript
// src/theme/createAppTheme.js
import { createTheme } from '@mui/material/styles';

export const designTokens = {
  colors: {
    primary: '#FF6B6B',
    primaryLight: '#FF8787',
    primaryDark: '#E53935',
    secondary: '#FFA500',
    secondaryLight: '#FFB74D',
    secondaryDark: '#F57C00',
    success: '#52C41A',
    error: '#FF4D4F',
    warning: '#FA8C16',
    info: '#1890FF',
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
  },
  
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const createAppTheme = (mode = 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: designTokens.colors.primary,
        light: designTokens.colors.primaryLight,
        dark: designTokens.colors.primaryDark,
      },
      secondary: {
        main: designTokens.colors.secondary,
        light: designTokens.colors.secondaryLight,
        dark: designTokens.colors.secondaryDark,
      },
      success: { main: designTokens.colors.success },
      error: { main: designTokens.colors.error },
      warning: { main: designTokens.colors.warning },
      info: { main: designTokens.colors.info },
      background: {
        default: mode === 'light' ? designTokens.colors.neutral[50] : '#121212',
        paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
      },
      text: {
        primary: mode === 'light' ? designTokens.colors.neutral[900] : '#FFFFFF',
        secondary: mode === 'light' ? designTokens.colors.neutral[600] : '#B0B0B0',
      },
      divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
    },
    
    typography: {
      fontFamily: '"Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", sans-serif',
      
      h1: {
        fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h2: {
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.6,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
      
      body1: {
        fontSize: 'clamp(0.875rem, 2vw, 0.95rem)',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: 'clamp(0.8125rem, 1.8vw, 0.875rem)',
        fontWeight: 400,
        lineHeight: 1.5,
      },
      
      button: {
        fontWeight: 600,
        fontSize: '0.9375rem',
        textTransform: 'none',
        letterSpacing: '0.2px',
      },
      
      caption: {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.4,
        color: designTokens.colors.neutral[600],
      },
    },
    
    spacing: 8,
    shape: { borderRadius: designTokens.borderRadius.md },
    
    components: {
      // ===== BUTTON =====
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.sm,
            textTransform: 'none',
            fontWeight: 600,
            transition: designTokens.transitions.normal,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: designTokens.shadows.md,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          contained: {
            boxShadow: designTokens.shadows.sm,
            '&:hover': {
              boxShadow: designTokens.shadows.md,
            },
          },
          outlined: {
            border: `2px solid ${designTokens.colors.primary}`,
            '&:hover': {
              backgroundColor: `rgba(255, 107, 107, 0.04)`,
            },
          },
          text: {
            '&:hover': {
              backgroundColor: `rgba(255, 107, 107, 0.08)`,
            },
          },
        },
      },
      
      // ===== ICON BUTTON =====
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.xs,
            minWidth: 44,
            minHeight: 44,
            transition: designTokens.transitions.fast,
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 107, 0.08)',
            },
            '&:focus-visible': {
              outline: `2px solid ${designTokens.colors.primary}`,
              outlineOffset: 2,
            },
          },
          sizeSmall: {
            minWidth: 40,
            minHeight: 40,
          },
        },
      },
      
      // ===== CARD =====
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.md,
            boxShadow: designTokens.shadows.sm,
            border: '1px solid rgba(0, 0, 0, 0.05)',
            transition: designTokens.transitions.normal,
            '&:hover': {
              boxShadow: designTokens.shadows.md,
              borderColor: designTokens.colors.primary,
            },
          },
        },
      },
      
      // ===== TEXT FIELD =====
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: designTokens.borderRadius.sm,
              transition: designTokens.transitions.fast,
              '&:hover fieldset': {
                borderColor: designTokens.colors.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: designTokens.colors.primary,
                boxShadow: `0 0 0 3px rgba(255, 107, 107, 0.1)`,
              },
            },
          },
        },
      },
      
      // ===== CHIP =====
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: designTokens.borderRadius.sm,
            fontWeight: 500,
            transition: designTokens.transitions.fast,
          },
          outlined: {
            '&:hover': {
              backgroundColor: `rgba(255, 107, 107, 0.08)`,
              borderColor: designTokens.colors.primary,
            },
          },
          filled: {
            backgroundColor: designTokens.colors.neutral[200],
          },
        },
      },
    },
  });
};
```

---

## Code - Bottom Navigation Bar

```jsx
// src/components/BottomNavigation.js
import React from 'react';
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from '@mui/material';
import {
  Home,
  Explore,
  Add,
  FavoriteBorder,
  Favorite,
  Person,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export default function BottomTabNavigation({
  currentView,
  onNavigate,
  notificationCount = 0,
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #e0e0e0',
        zIndex: 1000,
        '@media (max-width: 600px)': {
          height: 56,
        },
      }}
    >
      <BottomNavigation
        value={currentView}
        onChange={(event, newValue) => onNavigate(newValue)}
        sx={{
          backgroundColor: 'transparent',
          height: { xs: 56, md: 64 },
          
          '& .Mui-selected': {
            color: '#FF6B6B !important',
          },
          
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            flex: 1,
            transition: 'all 0.2s ease',
            color: '#999',
            
            '&:hover': {
              color: '#FF6B6B',
              backgroundColor: 'rgba(255, 107, 107, 0.05)',
            },
            
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              marginTop: 4,
            },
          },
        }}
      >
        <BottomNavigationAction
          label={t('nav.feed', 'Accueil')}
          value="feed"
          icon={<Home />}
        />
        
        <BottomNavigationAction
          label={t('nav.discover', 'Découvrir')}
          value="discover"
          icon={<Explore />}
        />
        
        <BottomNavigationAction
          label={t('nav.create', 'Créer')}
          value="create"
          icon={<Add sx={{ fontSize: 28, fontWeight: 'bold' }} />}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
            },
          }}
        />
        
        <BottomNavigationAction
          label={t('nav.activity', 'Activité')}
          value="activity"
          icon={
            <Badge badgeContent={notificationCount} color="error">
              {currentView === 'activity' ? <Favorite /> : <FavoriteBorder />}
            </Badge>
          }
        />
        
        <BottomNavigationAction
          label={t('nav.profile', 'Profil')}
          value="profile"
          icon={<Person />}
        />
      </BottomNavigation>
    </Box>
  );
}
```

---

## Code - Update App.js avec Nouveau Design

```jsx
// src/App.js - Version Améliorée
import { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider, Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import { createAppTheme, designTokens } from './theme/createAppTheme';
import ErrorBoundary from './components/ErrorBoundary';
import BottomTabNavigation from './components/BottomNavigation';
import HeaderBar from './components/HeaderBar';
import Login from './components/Login';
import FeedView from './views/FeedView';
import DiscoverView from './views/DiscoverView';
import CreatePostModal from './components/CreatePostModal';
import ActivityView from './views/ActivityView';
import ProfileView from './views/ProfileView';

import { mockPosts } from './data/mockPosts';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function App() {
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('feed');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [posts, setPosts] = useState(mockPosts);
  const [isClient, setIsClient] = useState(false);
  const [theme] = useState(() => createAppTheme('light'));

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Gestion globale des erreurs
  useEffect(() => {
    const handleError = (event) => {
      if (!event?.message) return event?.preventDefault?.();
      if (event.message === 'Script error.' || event.message.includes('getBoundingClientRect')) {
        event.preventDefault();
      }
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleNavigate = (view) => {
    if (view === 'create') {
      setShowCreateModal(true);
    } else {
      setCurrentView(view);
      setShowCreateModal(false);
    }
  };

  const handleLogin = (username) => {
    setCurrentUser(username);
    setCurrentView('feed');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('feed');
  };

  const handleCreatePost = (newPost) => {
    const post = {
      ...newPost,
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      author: currentUser,
      authorAvatar: '👤',
    };
    setPosts([post, ...posts]);
    setShowCreateModal(false);
  };

  if (!currentUser) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        
        {/* Header */}
        <HeaderBar
          currentUser={currentUser}
          onLogout={handleLogout}
        />
        
        {/* Main Content with Page Transitions */}
        <Box
          sx={{
            pb: { xs: 8, sm: 4 },  // Bottom padding pour bottom nav
            minHeight: '100vh',
            backgroundColor: 'background.default',
          }}
        >
          {isClient && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <Container maxWidth="md">
                  {currentView === 'feed' && <FeedView posts={posts} />}
                  {currentView === 'discover' && <DiscoverView posts={posts} />}
                  {currentView === 'activity' && <ActivityView />}
                  {currentView === 'profile' && <ProfileView posts={posts} username={currentUser} />}
                </Container>
              </motion.div>
            </AnimatePresence>
          )}
        </Box>
        
        {/* Create Post Modal */}
        <CreatePostModal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePost}
          currentUser={currentUser}
        />
        
        {/* Bottom Navigation */}
        <BottomTabNavigation
          currentView={currentView}
          onNavigate={handleNavigate}
          notificationCount={0}
        />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
```

---

## 🎯 Résumé des Changements Visuels

### Avant vs Après

| Élément | Avant | Après |
|---------|-------|-------|
| **Couleur Primaire** | #1976d2 (Bleu) | #FF6B6B (Coral) |
| **Header** | Encombré avec 3 boutons | Épuré avec logo et selector langue |
| **Navigation** | Menu horizontal dans header | Bottom navigation sticky |
| **Post Card** | Basique avec actions à droite | Moderne avec header/image/actions compactes |
| **Interactions** | Statiques | Animations fluides (scale, fade, stagger) |
| **Espacement** | Inconsistant | Système 8px cohérent |
| **Mobile Layout** | Desktop-first | Mobile-first responsive |
| **Feedback Utilisateur** | Minimal | Animations de like, transitions |

---

## 📱 Test Responsive

### Mobile (XS: 0-599px)
```
✅ Bottom nav visible
✅ Single column layout
✅ Touch targets ≥ 44x44px
✅ Font sizes scaled avec clamp()
✅ Full-width images
```

### Tablet (SM: 600-959px)
```
✅ Bottom nav still present
✅ 2-column grid pour images
✅ Wider cards
✅ Better spacing
```

### Desktop (MD+: 960px+)
```
✅ Optional: Side rail instead of bottom nav
✅ 3-column grid
✅ Wider container (max-width: md)
```

---

**Prochaines étapes:**
1. Implémenter le nouveau thème dans `App.js`
2. Créer `PostCard.js` réutilisable
3. Créer `BottomNavigation.js`
4. Refactoriser les views (FeedView, DiscoverView, ProfileView)
5. Tester sur mobile et desktop
