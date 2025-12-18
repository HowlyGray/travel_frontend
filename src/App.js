import { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import createAppTheme from './theme/createAppTheme';
import { mockPosts, categories } from './data/mockPosts';
import Login from './components/Login';
import ErrorBoundary from './components/ErrorBoundary';
import HeaderBar from './components/HeaderBar';
import BottomNav from './components/BottomNav';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import FilterBar from './components/FilterBar';
import Profile from './components/Profile';
import PageTransition from './components/PageTransition';
import HeroSection from './components/HeroSection';
import { useTheme } from './context/ThemeContext';
import { designTokens } from './theme/designTokens';

function App() {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('discover');
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Error handling
  useEffect(() => {
    const handleError = (event) => {
      try {
        if (!event || !event.message) {
          event?.preventDefault();
          return false;
        }
        if (event.message === 'Script error.') {
          event.preventDefault();
          return false;
        }
        if (event.message?.includes('getBoundingClientRect')) {
          event.preventDefault();
          return false;
        }
        if (event.message?.includes('AbortError')) {
          event.preventDefault();
          return false;
        }
        if (event.message?.includes('play()')) {
          event.preventDefault();
          return false;
        }
      } catch (err) {
        console.warn('Error handler failed:', err);
      }
    };

    const handleUnhandledRejection = (event) => {
      // Ignore AbortError from media playback
      if (event?.reason?.name === 'AbortError') {
        event?.preventDefault();
        return;
      }
      if (event?.reason?.message?.includes('AbortError')) {
        event?.preventDefault();
        return;
      }
      event?.preventDefault();
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  if (!currentUser) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={(user) => setCurrentUser(user)} />
      </ThemeProvider>
    );
  }

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleSubmitPost = (formData) => {
    const newPost = {
      ...formData,
      id: posts.length + 1,
      author: currentUser,
      date: new Date().toISOString(),
      likes: [],
      comments: [],
    };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setFilteredPosts(updatedPosts);
  };

  const handleFilterChange = (category) => {
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === category));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('feed');
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* Header */}
        <HeaderBar
          currentUser={currentUser}
          onLogout={handleLogout}
          onProfileClick={() => setCurrentView('profile')}
        />

        {/* Main Content */}
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: designTokens.colors.background,
            paddingBottom: `calc(${designTokens.components.bottomNav.height} + ${designTokens.spacing.lg})`,
          }}
        >
          {/* Discover View (Hero + Feed) */}
          {currentView === 'discover' && isClient && (
            <PageTransition>
              <Box>
                {/* Hero Section */}
                <HeroSection onGetStarted={() => setCurrentView('feed')} />

                {/* Featured Content */}
                <Container maxWidth="lg" sx={{ py: designTokens.spacing.xxl }}>
                  <Box sx={{ mb: designTokens.spacing.lg }}>
                    <FilterBar categories={categories} onFilterChange={handleFilterChange} />
                  </Box>
                  <PostList posts={filteredPosts} defaultView="grid" />
                </Container>
              </Box>
            </PageTransition>
          )}

          {/* Feed View */}
          {currentView === 'feed' && isClient && (
            <PageTransition>
              <Container maxWidth="lg" sx={{ py: designTokens.spacing.lg }}>
                {/* Create Post Form */}
                <Box sx={{ mb: designTokens.spacing.xl, maxWidth: '600px', margin: '0 auto' }}>
                  <PostForm onSubmit={handleSubmitPost} currentUser={currentUser} />
                </Box>

                {/* Filters */}
                <Box sx={{ mb: designTokens.spacing.lg }}>
                  <FilterBar categories={categories} onFilterChange={handleFilterChange} />
                </Box>

                {/* Posts List */}
                <PostList posts={filteredPosts} onUpdatePosts={setPosts} />
              </Container>
            </PageTransition>
          )}

          {/* Create View */}
          {currentView === 'create' && isClient && (
            <PageTransition>
              <Container maxWidth="sm" sx={{ py: designTokens.spacing.xl }}>
                <PostForm onSubmit={handleSubmitPost} currentUser={currentUser} />
              </Container>
            </PageTransition>
          )}

          {/* Profile View */}
          {currentView === 'profile' && isClient && (
            <PageTransition>
              <Profile
                username={currentUser}
                userPosts={posts.filter((post) => post.author === currentUser)}
                onBack={() => setCurrentView('feed')}
              />
            </PageTransition>
          )}
        </Box>

        {/* Bottom Navigation */}
        <BottomNav currentView={currentView} onNavigate={handleNavigate} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
