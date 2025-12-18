# Phase 9: Deployment Checklist

## Pre-Deployment QA (2-3 hours)

### Code Review
- [ ] All code reviewed and approved
- [ ] No console.error or console.log in production code
- [ ] No TODO comments remaining
- [ ] No hardcoded URLs or API keys
- [ ] Remove unused imports and dead code
- [ ] Package.json dependencies are minimal and updated

### Testing
- [ ] Run full test suite: `npm test -- --coverage`
- [ ] All tests pass (target: 100% on critical paths)
- [ ] Manual testing on dev environment complete
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Chrome on Android)
- [ ] Accessibility testing with screen reader

### Build Verification
```bash
npm run build
# Check:
# - Build succeeds without warnings
# - No critical vulnerabilities: npm audit
# - Bundle size acceptable: < 500KB gzipped
```

### Performance Audit
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Lighthouse Best Practices ≥ 90
- [ ] Lighthouse SEO ≥ 90
- [ ] First Contentful Paint (FCP) < 2.5s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1

```bash
# Run locally
npm start
# Open DevTools > Lighthouse
```

### Accessibility Audit
- [ ] WCAG 2.1 AA compliance verified
- [ ] Keyboard navigation works
- [ ] Color contrast >= 4.5:1 for text
- [ ] All interactive elements have aria-labels
- [ ] Form labels properly associated
- [ ] No keyboard traps
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)

### Security Audit
- [ ] No hardcoded secrets in code
- [ ] Environment variables properly configured
- [ ] HTTPS enforced
- [ ] CSP headers set
- [ ] CORS properly configured
- [ ] Dependencies audited: `npm audit`
- [ ] No sensitive data in localStorage (only theme + lang)
- [ ] Input validation on all forms

---

## Infrastructure Setup

### 1. Domain & DNS
- [ ] Domain purchased
- [ ] DNS records configured
- [ ] SSL certificate provisioned
- [ ] HTTPS enforced via redirect
- [ ] CDN configured (if applicable)

### 2. Vercel Setup (if chosen)
```bash
# Install CLI
npm install -g vercel

# Set environment variables
vercel env add REACT_APP_ENV
vercel env add REACT_APP_API_URL

# Deploy
vercel deploy --prod
```

Vercel Dashboard:
- [ ] Project created
- [ ] GitHub connected
- [ ] Environment variables set
- [ ] Build settings verified
- [ ] Auto-deployments enabled
- [ ] Preview deployments configured
- [ ] Domain connected
- [ ] Analytics enabled

### 3. Netlify Setup (if chosen)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Netlify Dashboard:
- [ ] Site created
- [ ] Build configuration set
- [ ] Environment variables configured
- [ ] Custom domain added
- [ ] HTTPS provisioned
- [ ] Deploy notifications configured
- [ ] Webhooks setup
- [ ] Analytics enabled

---

## CI/CD Pipeline Configuration

### GitHub Actions
- [ ] Workflows created in `.github/workflows/`
- [ ] Build workflow: `build-test.yml`
- [ ] Deploy workflow: `deploy-vercel.yml` or `deploy-netlify.yml`
- [ ] Secrets configured:
  - [ ] VERCEL_TOKEN
  - [ ] VERCEL_ORG_ID
  - [ ] VERCEL_PROJECT_ID
  - [ ] SLACK_WEBHOOK (optional)
- [ ] Tests run on every PR
- [ ] Deployment on push to main

Configuration:
- [ ] `lighthouserc.json` for Lighthouse CI
- [ ] `vercel.json` or `netlify.toml` for deployment config
- [ ] `.env.example` provided

---

## Final Verification Steps

### 1. Staging Deployment
- [ ] Deploy to staging environment
- [ ] Verify all features work
- [ ] Check performance on staging
- [ ] Verify analytics tracking
- [ ] Test error reporting (Sentry, etc.)

### 2. Production Deployment
```bash
# Create release tag
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0

# Deploy via CI/CD or manual
# Vercel: Auto-deploys on push to main
# Netlify: Click "Deploy site"
```

### 3. Post-Deployment Verification
- [ ] Application loads at production URL
- [ ] All pages accessible
- [ ] Dark mode toggle works
- [ ] Language selector works
- [ ] Form submission works
- [ ] Images load correctly
- [ ] No console errors
- [ ] No 404 errors
- [ ] Analytics are tracking
- [ ] Error reporting works

### 4. Smoke Tests (5 minutes)
```
1. Visit homepage
2. Switch theme (light/dark)
3. Switch language (FR/EN/ES/DE)
4. Create new post
5. Like a post
6. Add comment
7. View profile
8. Logout
9. Login
10. Check mobile responsiveness
```

---

## Monitoring & Observability

### Error Tracking (Optional: Sentry)
```bash
npm install @sentry/react @sentry/tracing

# In src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENV,
});
```

- [ ] Sentry project created
- [ ] DSN configured in environment
- [ ] Error logging verified

### Performance Monitoring
- [ ] Web Vitals tracked
- [ ] Lighthouse CI integrated
- [ ] Performance budgets set
- [ ] Alerts configured

### Analytics (Optional: Google Analytics)
- [ ] GA4 property created
- [ ] GTM container setup (optional)
- [ ] Events tracked
- [ ] Goals configured
- [ ] Dashboards created

---

## Rollback Plan

If something goes wrong:

### Immediate Actions
1. Identify issue
2. If critical: Rollback deployment
   - Vercel: Switch to previous deployment
   - Netlify: Rollback to previous build
3. Create incident ticket
4. Post status update

### Rollback Commands
```bash
# Vercel: Automatic via dashboard
# Netlify: Automatic via dashboard

# Manual fallback: Revert commit & redeploy
git revert <commit-hash>
git push origin main
```

---

## Post-Deployment (First Week)

### Daily Checks
- [ ] Monitor error tracking dashboard
- [ ] Check analytics for traffic
- [ ] Verify all features working
- [ ] Check performance metrics
- [ ] Review user feedback

### Weekly Tasks
- [ ] Review Lighthouse reports
- [ ] Check security vulnerabilities
- [ ] Update dependencies (if needed)
- [ ] Plan hotfixes (if needed)

### First Month
- [ ] Gather user feedback
- [ ] Optimize performance based on real-world data
- [ ] Plan next features
- [ ] Document lessons learned

---

## Deployment Commands Reference

### Build
```bash
npm run build
```

### Verify Build
```bash
npm run build --verbose
npm audit
npm test -- --coverage
```

### Deploy to Vercel
```bash
vercel deploy --prod
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

---

## Success Criteria

✅ All test pass
✅ Lighthouse score ≥ 90 on all metrics
✅ WCAG AA accessibility compliance
✅ No critical security vulnerabilities
✅ App loads in < 3 seconds
✅ No console errors
✅ All features functional
✅ Mobile responsive
✅ Dark mode working
✅ All languages working
✅ User can create/like/comment on posts
✅ Analytics tracking
✅ Error reporting working

---

## Support Contacts

- **Deployment Issues**: Check CI/CD logs
- **Performance Issues**: Review Lighthouse reports
- **User Issues**: Check error tracking (Sentry)
- **Site Down**: Check deployment platform status
