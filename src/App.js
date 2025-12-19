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
import { InteractionsProvider } from './context/InteractionsContext';
import { designTokens } from './theme/designTokens';

function App() {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('discover');
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [dateRange, setDateRange] = useState([null, null]);
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClient(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Filtrage et tri automatiques
  useEffect(() => {
    let filtered = [...posts];

    // Filtrage par catégorie
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filtrage par recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrage par localisation
    if (locationFilter.trim()) {
      filtered = filtered.filter((post) =>
        post.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Filtrage par date
    if (dateRange[0] && dateRange[1]) {
      filtered = filtered.filter((post) => {
        const postDate = new Date(post.date);
        return postDate >= dateRange[0] && postDate <= dateRange[1];
      });
    }

    // Tri
    if (sortBy === 'Newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'Oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchQuery, sortBy, dateRange, locationFilter]);

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

  // Handler functions
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
    setPosts([...posts, newPost]);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleLocationFilter = (location) => {
    setLocationFilter(location);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('discover');
  };

  // Show login if user is not authenticated
  if (!currentUser) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login onLogin={(user) => setCurrentUser(user)} />
      </ThemeProvider>
    );
  }

  return (
    <ErrorBoundary>
      <InteractionsProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/* Header */}
          <HeaderBar
            currentUser={currentUser}
            onLogout={handleLogout}
            onProfileClick={() => setCurrentView('profile')}
            onSearch={handleSearch}
            searchQuery={searchQuery}
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
                    <FilterBar
                      categories={categories}
                      onFilterChange={handleFilterChange}
                      onSortChange={handleSortChange}
                      onDateRangeChange={handleDateRangeChange}
                      onLocationFilter={handleLocationFilter}
                    />
                  </Box>
                  <PostList posts={filteredPosts} onUpdatePosts={setPosts} defaultView="grid" />
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
                  <FilterBar
                    categories={categories}
                    onFilterChange={handleFilterChange}
                    onSortChange={handleSortChange}
                    onDateRangeChange={handleDateRangeChange}
                    onLocationFilter={handleLocationFilter}
                  />
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
      </InteractionsProvider>
    </ErrorBoundary>
  );
}

export default App;
