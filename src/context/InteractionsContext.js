import React, { createContext, useContext, useState, useEffect } from 'react';

const InteractionsContext = createContext();

export const useInteractions = () => {
  const context = useContext(InteractionsContext);
  if (!context) {
    throw new Error('useInteractions must be used within an InteractionsProvider');
  }
  return context;
};

export const InteractionsProvider = ({ children }) => {
  // Charger les données depuis localStorage
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem('userLikes');
    return saved ? JSON.parse(saved) : {};
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('userBookmarks');
    return saved ? JSON.parse(saved) : {};
  });

  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('userComments');
    return saved ? JSON.parse(saved) : {};
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('userLikes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem('userBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('userComments', JSON.stringify(comments));
  }, [comments]);

  // Fonctions pour gérer les likes
  const toggleLike = (postId) => {
    setLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const isLiked = (postId) => {
    return !!likes[postId];
  };

  // Fonctions pour gérer les bookmarks
  const toggleBookmark = (postId) => {
    setBookmarks(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const isBookmarked = (postId) => {
    return !!bookmarks[postId];
  };

  // Fonctions pour gérer les commentaires
  const addComment = (postId, comment) => {
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment]
    }));
  };

  const getComments = (postId) => {
    return comments[postId] || [];
  };

  const getCommentCount = (postId) => {
    return (comments[postId] || []).length;
  };

  // Obtenir tous les posts likés
  const getLikedPosts = () => {
    return Object.keys(likes).filter(postId => likes[postId]);
  };

  // Obtenir tous les posts bookmarkés
  const getBookmarkedPosts = () => {
    return Object.keys(bookmarks).filter(postId => bookmarks[postId]);
  };

  const value = {
    // Likes
    toggleLike,
    isLiked,
    getLikedPosts,
    // Bookmarks
    toggleBookmark,
    isBookmarked,
    getBookmarkedPosts,
    // Comments
    addComment,
    getComments,
    getCommentCount,
  };

  return (
    <InteractionsContext.Provider value={value}>
      {children}
    </InteractionsContext.Provider>
  );
};
