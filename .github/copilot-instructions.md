# Copilot Instructions for Travel Frontend

## Project Overview
**travel_frontend** is a React-based travel photo sharing and analytics platform with internationalization support (FR, EN, ES, DE). It uses Material-UI for the design system and features user authentication, post filtering, image uploads, social analytics, and multi-language support.

## Architecture Overview

### Component Structure
- **Page Components**: `Login`, `Profile`, `AnalyticsDashboard` - full-page views controlled by `currentView` state in `App.js`
- **Feature Components**: `PostForm`, `PostList`, `FilterBar`, `ShareButton`, `ImageUpload`, `PhotoUpload`
- **Utility Components**: `ErrorBoundary` (wraps App), `LanguageSelector` (dropdown for i18n), `SearchFilter`
- **State Management**: Lift state to `App.js` - use props/callbacks for child communication (no Redux/Context yet)

### Key Data Patterns
- **Posts Model** (`mockPosts.js`): 
  ```javascript
  { id, title, description, location, category, date, author, images: [{id, url, name, size, type}] }
  ```
- **Categories**: Aventure, Nourriture, Culture, Relaxation (with 'All' filter option)
- **Images**: Array of objects with metadata (size, type, url via picsum.photos)

### View Navigation
- Two main views controlled by `currentView` state: `'feed'` (default) and `'profile'`
- Navigation occurs via `setCurrentView('feed')` or `setCurrentView('profile')`
- Return buttons in Profile and other views should call `setCurrentView('feed')`
- Home button intelligently hides on feed view to avoid redundancy

## Critical Patterns & Conventions

### Internationalization (i18n)
- **Setup**: `src/i18n/index.js` initializes i18next with language detection (localStorage → navigator → default French)
- **Usage**: Always use `const { t } = useTranslation()` in components, then `t('namespace.key')`
- **Structure**: Keys organized as `login.title`, `form.titleField`, `categories.adventure`, `comments.placeholder`
- **Locales**: JSON files in `src/i18n/locales/{en,fr,es,de}.json`
- **Default Language**: French (fallbackLng: 'fr') per `i18n/index.js`
- When adding new UI text: add translations to ALL four language files simultaneously

### Form Handling
- Uses `react-hook-form` pattern with controlled components (TextField + onChange)
- Data submission in `PostForm`: collect formData object, reset state after submit
- Image handling: separate `images` state, passed to onSubmit callback
- Category dropdown integrates with filter system

### Error Handling
- **ErrorBoundary**: Wraps entire App, catches React render errors
- **Graceful DOM Errors**: Special handling for `getBoundingClientRect` errors (common in Material-UI)
- **Global Event Listeners**: App.js attaches error/unhandledrejection handlers with event.preventDefault()
- **isClient State**: useEffect delays rendering to prevent hydration mismatches
- Pattern: catch errors, log safely, prevent default, continue gracefully

### Component Styling
- Material-UI theme with primary (#1976d2) and secondary (#dc004e) colors
- Use `sx` prop for inline styles, `createTheme()` for global overrides
- Responsive design: Grid component with spacing, Container for max-width
- Paper/Card for elevation, Box for layout primitives
- Icons from `@mui/icons-material` (Favorite, Home, Person, Logout, etc.)

### Image Handling
- `ImageUpload.js`: Drag-and-drop with `react-dropzone`
- `PhotoUpload.js`: Separate component (possibly for profile avatars)
- Images stored with metadata: id, url, name (filename), size (bytes), type (MIME)

### Social Features
- **Likes**: Tracked per post with state, toggle Favorite/FavoriteBorder icons
- **Comments**: Modal dialog system with timestamp and author info
- **Sharing**: `ShareButton.js` uses `react-share` for social media integration
- Each feature should emit callback to parent (PostList) which updates App-level state

### Analytics Dashboard
- Uses `recharts` for data visualization
- Accessed via navigation, separate view (not on feed)
- Data likely derived from posts array (counts, dates, categories)

## Developer Workflows

### Local Development
```bash
npm start                 # Runs on http://localhost:3000, auto-reload on changes
npm test                  # Jest test runner in watch mode
npm run build             # Production build to /build folder
npm run eject             # One-way operation to expose webpack config (avoid!)
```

### Testing
- Jest + React Testing Library configured in `setupTests.js`
- Test files use `.test.js` suffix
- Mock data available in `data/mockPosts.js` for seeding test data

### Build Configuration
- Create React App (CRA) handles webpack, babel, ESLint
- No custom webpack config in this repo
- ESLint extends `react-app` preset

## Important Conventions

### State Lifting
- Do NOT use local component state for data that needs sharing (use App state)
- Example: `currentUser` in App, passed as prop to components, updated via `handleLogin` callback
- Filter state in App, passed to FilterBar and PostList

### Translation Keys
- Always define keys before use (add to all four language JSON files)
- Use hierarchical naming: `domain.action` or `domain.entity.property`
- Never hardcode user-facing strings

### Imports Order
- React/libraries first (React, useState, useTranslation)
- Material-UI imports grouped (Container, Button, etc. on separate lines)
- Icons from @mui/icons-material
- Local imports (components, data) last
- Use named imports for components, default for i18n

### Callback Pattern
- Parent components receive `onCallback` props (e.g., `onSubmit`, `onLogin`, `onFilterChange`)
- Child components call these props as functions, passing data up
- Example: `PostForm` calls `onSubmit(formData)`, App handles state update

## Known Issues & Workarounds

1. **DOM GetBoundingClientRect Errors**: Caught by ErrorBoundary, harmless in Material-UI animations
2. **Cross-Origin Script Errors**: Suppressed in global error handler (events.preventDefault)
3. **Language Detection**: Falls back to French if no language in storage/navigator
4. **isClient Hydration**: 100ms delay ensures DOM ready before rendering (fixes layout issues)

## Files to Reference When Adding Features

- **New UI Elements**: Reference `PostForm.js` or `FilterBar.js` for Material-UI + i18n patterns
- **Navigation**: See `App.js` currentView logic and return navigation in `Profile.js`
- **Form Validation**: Check `Login.js` for basic validation patterns
- **Image Uploads**: Examine `ImageUpload.js` (dropzone) and storage pattern
- **Internationalization**: Verify all four language files and i18n key hierarchy
- **Error Scenarios**: Check `ErrorBoundary.js` and App.js error event handlers

## Code Style Notes

- Functional components with hooks (useState, useEffect, useTranslation)
- No class components except ErrorBoundary (React.Component)
- PropTypes optional (not currently used, type inference from JSDoc possible)
- Consistent spacing (2-4 spaces), semicolons used
- Comments in French throughout codebase (preserve when editing)
