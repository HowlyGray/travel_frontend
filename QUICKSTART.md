# Quick Start Guide - Travel Frontend

## 🚀 Get Started in 5 Minutes

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/travel_frontend.git
cd travel_frontend
npm install
```

### 2. Create Environment File
```bash
cp .env.example .env.local
# Edit .env.local with your settings (optional for local dev)
```

### 3. Start Development Server
```bash
npm start
```
This opens **http://localhost:3000** in your browser. Changes auto-reload!

### 4. Run Tests
```bash
npm test                # Interactive watch mode
npm run test:coverage  # Coverage report
```

---

## 📁 Project Structure at a Glance

```
src/
├── components/       # React components (PostCard, LikeButton, etc.)
├── theme/           # Design tokens and theme configuration
├── context/         # React Context (ThemeContext)
├── utils/           # Utility functions (performance, helpers)
├── i18n/            # Internationalization (translations)
├── data/            # Mock data for development
└── App.js           # Root component
```

---

## 🎨 Key Features

✅ **Responsive Design** - Works on mobile, tablet, desktop
✅ **Dark Mode** - Toggle in header, saved to localStorage
✅ **Multi-language** - FR, EN, ES, DE translations
✅ **Accessibility** - WCAG 2.1 AA compliant
✅ **Performance** - Lazy loading, optimized images
✅ **Animations** - Smooth transitions with Framer Motion

---

## 🛠️ Common Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start dev server on port 3000 |
| `npm test` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run build` | Create production build |
| `npm audit` | Check for security vulnerabilities |
| `npm run pre-deploy` | Full pre-deployment check |
| `npm run deploy:vercel` | Deploy to Vercel |

---

## 🌍 Translations

Add a new UI text:

1. **Add to all 4 language files** in `src/i18n/locales/`:
   ```json
   // fr.json
   {
     "myFeature": {
       "title": "Mon Titre"
     }
   }
   ```

2. **Use in component**:
   ```javascript
   import { useTranslation } from 'react-i18next';
   
   function MyComponent() {
     const { t } = useTranslation();
     return <h1>{t('myFeature.title')}</h1>;
   }
   ```

---

## 🎭 Theme & Styling

**Use design tokens** from `src/theme/designTokens.js`:

```javascript
import { designTokens } from '../theme/designTokens';

// Example: Using colors
sx={{
  color: designTokens.colors.primary,
  padding: designTokens.spacing.md
}}
```

**Switch theme**:
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { mode, toggleMode } = useTheme();
  return <button onClick={toggleMode}>Toggle</button>;
}
```

---

## 📝 Adding a New Component

1. **Create component file** `src/components/MyComponent.js`:
```javascript
import React from 'react';
import { Box } from '@mui/material';
import { designTokens } from '../theme/designTokens';

export default function MyComponent() {
  return (
    <Box sx={{ padding: designTokens.spacing.md }}>
      My Component
    </Box>
  );
}
```

2. **Add translations** to all 4 language files
3. **Create tests** in `src/components/MyComponent.test.js`
4. **Use component** in other components via import

---

## 🧪 Testing

Use **React Testing Library** patterns:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });
});
```

Run tests:
```bash
npm test
```

---

## 🚀 Deploying

### Pre-deployment Check
```bash
npm run pre-deploy
```

### Deploy to Vercel
```bash
npm run deploy:vercel
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🐛 Debugging

### Check console for errors
Open DevTools (F12) → Console tab

### Run tests
```bash
npm test
```

### Check build
```bash
npm run build
# Check ./build folder created successfully
```

### Performance check
```bash
npm start
# Open DevTools → Lighthouse tab → Analyze page load
```

---

## 📚 Documentation

- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Complete project overview
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - How to deploy
- **[PHASE9_DEPLOYMENT_CHECKLIST.md](./PHASE9_DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist
- **Code comments** - Inline documentation in key files

---

## 🤝 Contributing

1. Create a new branch: `git checkout -b feature/my-feature`
2. Make changes and test: `npm test`
3. Check build: `npm run build`
4. Commit: `git commit -am "Add my feature"`
5. Push: `git push origin feature/my-feature`
6. Create Pull Request on GitHub

---

## 🆘 Troubleshooting

### Port 3000 already in use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
PORT=3001 npm start
```

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tests fail
```bash
npm test -- --clearCache
npm test
```

### Dependencies issues
```bash
npm audit fix
npm install
npm start
```

---

## 📱 Testing on Mobile

### Local device
```bash
# Get your machine IP
ipconfig getifaddr en0  # macOS
ipconfig               # Windows

# Then visit: http://YOUR_IP:3000 from phone
```

### Chrome DevTools (mobile emulation)
- Open DevTools (F12)
- Click device icon (top-left)
- Select device preset

---

## 🎯 Next Steps

1. ✅ Run `npm start`
2. ✅ Explore the app
3. ✅ Check dark mode toggle in header
4. ✅ Switch languages
5. ✅ Create and like posts
6. ✅ Read [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
7. ✅ Deploy when ready!

---

## 📞 Support

- Check documentation files
- Review code comments
- Run tests: `npm test`
- Check build logs: `npm run build`
- GitHub Issues for bugs

---

**Happy coding! 🎉**

The app is fully functional and ready to customize. Start with the components you need and build from there!
