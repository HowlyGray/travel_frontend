/**
 * performance.js - Performance optimization utilities
 */

// Debounce function for search/filter inputs
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Memoized image URLs to prevent re-fetching
const imageCache = new Map();

export const getCachedImageUrl = (id, fallback = 'https://via.placeholder.com/400x300') => {
  if (imageCache.has(id)) {
    return imageCache.get(id);
  }
  imageCache.set(id, fallback);
  return fallback;
};

// Intersection Observer for lazy loading
export const observeElement = (element, callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  if (element) {
    observer.observe(element);
  }

  return observer;
};
