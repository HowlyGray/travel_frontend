# Deployment Guide - travel_frontend

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing: `npm test -- --coverage`
- [ ] No console errors: Check browser console
- [ ] No TypeScript/ESLint warnings: `npm run build`
- [ ] All imports used properly
- [ ] No hardcoded URLs or secrets

### Performance
- [ ] Images optimized and lazy-loaded
- [ ] Bundle size acceptable: `npm run build`
- [ ] No memory leaks
- [ ] Lighthouse score ≥90

### Accessibility
- [ ] WCAG AA compliant
- [ ] All buttons/links keyboard accessible
- [ ] ARIA labels properly set
- [ ] Color contrast verified
- [ ] Touch targets ≥44px

### Features
- [ ] Dark mode working
- [ ] Translations complete (FR, EN, ES, DE)
- [ ] All navigation working
- [ ] Forms functional
- [ ] Error handling in place

### Browser Support
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

---

## Deployment to Vercel

### Step 1: Prepare Repository
```bash
# Ensure git is initialized
git init
git add .
git commit -m "Initial deployment commit"

# Push to GitHub (if not already done)
git remote add origin https://github.com/YOUR_USERNAME/travel_frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Create Vercel Account & Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and answer:
# - Link to existing project? No
# - Directory? ./
# - Command? npm run build
# - Output? build
# - Install dependencies? Yes
```

### Step 3: Configure Environment Variables
In Vercel Dashboard:
```
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=production
```

### Step 4: Set Up Auto-Deployments
- Connect GitHub repository
- Enable automatic deployments on push to main

---

## Deployment to Netlify

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Step 3: Configure Redirects (netlify.toml)
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 4: Set Environment Variables
In Netlify Dashboard → Settings → Build & Deploy → Environment

---

## Deployment to GitHub Pages

### Step 1: Update package.json
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/travel_frontend"
}
```

### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3: Update package.json scripts
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Step 4: Deploy
```bash
npm run deploy
```

---

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor performance (Web Vitals)
- [ ] Check analytics
- [ ] Monitor uptime

### Maintenance
- [ ] Update dependencies regularly
- [ ] Monitor security vulnerabilities
- [ ] Review user feedback
- [ ] Plan feature updates

### Backup & Recovery
- [ ] Database backups (if applicable)
- [ ] Code backups on GitHub
- [ ] Environment configuration backups

---

## Performance Optimization Checklist

- [ ] Minify CSS/JS
- [ ] Enable gzip compression
- [ ] Cache static assets
- [ ] Optimize images
- [ ] Remove unused packages
- [ ] Code splitting implemented
- [ ] Lazy loading enabled

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] No hardcoded credentials
- [ ] Environment variables secure
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] XSS protection enabled
- [ ] CSRF tokens (if applicable)

---

## Troubleshooting

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Pages Not Loading After Deploy
- Check 404.html redirect
- Verify build directory
- Check environment variables

### Performance Issues
- Check bundle size: `npm run build -- --analyze`
- Review Network tab in DevTools
- Check server response times

---

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Guide](https://pages.github.com)
- [React Deployment Guide](https://create-react-app.dev/deployment)

