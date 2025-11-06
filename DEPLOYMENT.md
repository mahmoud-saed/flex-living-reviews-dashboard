# Deployment Guide - Vercel

## 🚀 Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (logged in via GitHub)
- Project pushed to GitHub repository

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Flex Living Reviews Dashboard"
   git remote add origin https://github.com/YOUR_USERNAME/flex-living-reviews-dashboard.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your `flex-living-reviews-dashboard` repository
   - Click **Deploy** (no configuration needed!)
   - Wait ~2 minutes for build to complete

3. **Access Your Live Site**
   - Vercel will provide: `https://flex-living-reviews-dashboard.vercel.app`
   - Auto-deploys on every push to `main` branch

---

## ⚠️ Important: File System Limitation

### What Works on Vercel:
✅ All pages (Home, Dashboard, Property pages)  
✅ Reading reviews from `/data` folder  
✅ API endpoint `/api/reviews/hostaway`  
✅ All filtering and sorting features  

### What Doesn't Work on Vercel:
❌ **Saving review selections** (file system is read-only)

### Current Behavior:
- The "Select for Display" checkboxes on the dashboard will appear to work
- However, selections won't persist after page refresh
- This is a **known limitation** for demo purposes

---

## 🔧 Making Review Selections Work (Optional)

To enable persistent review selections on Vercel, you'll need a database:

### Option 1: Vercel Postgres (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Link project
vercel link

# 3. Create Postgres database
vercel postgres create

# 4. Update lib/storage.ts to use database
```

### Option 2: Vercel KV (Simpler)
```bash
# Create KV store in Vercel dashboard
# Update lib/storage.ts to use @vercel/kv
```

### Option 3: External Database
- Supabase (Free tier: PostgreSQL)
- MongoDB Atlas (Free tier: 512MB)
- PlanetScale (Free tier: MySQL)

---

## 🎨 Environment Variables (Future)

If you add external APIs later:

1. **In Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add variables:
     ```
     HOSTAWAY_API_KEY=your_key_here
     GOOGLE_PLACES_API_KEY=your_key_here
     DATABASE_URL=your_connection_string
     ```

2. **In Your Code:**
   ```typescript
   const apiKey = process.env.HOSTAWAY_API_KEY;
   ```

3. **Redeploy** - Vercel auto-redeploys with new env vars

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard Features:
- **Analytics**: Page views, performance metrics
- **Logs**: Runtime errors and API calls
- **Deployments**: View all deployment history
- **Domains**: Add custom domain (e.g., reviews.flexliving.com)

---

## 🔄 Auto-Deploy Workflow

Once connected to GitHub:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Vercel automatically builds and deploys
4. Get a preview URL for each push
5. Main branch deploys to production

---

## 🌟 Performance Optimization

Vercel automatically handles:
- ✅ Edge caching for static pages
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Global CDN distribution
- ✅ Serverless functions for APIs

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally first
- Verify Node version compatibility (18+)

### API Routes Not Working
- Check serverless function logs
- Verify `/data` files are included in git
- Test API locally first

### Styling Issues
- Clear Vercel cache: Settings → Clear Cache
- Check Tailwind CSS configuration
- Verify all CSS files are imported

---

## 📝 For Portfolio/Demo

This project is **deployment-ready** as a demo:
- Shows your Next.js, TypeScript, and React skills
- Demonstrates API design and data normalization
- Beautiful, responsive UI
- Real-world use case implementation

**Note in README or Portfolio:**
> "This is a demo application using local JSON storage. In production, it would be connected to a database like PostgreSQL for persistent data storage."

---

## ✅ Pre-Deployment Checklist

- [x] Project name updated to `flex-living-reviews-dashboard`
- [x] `.gitignore` includes `.env`, `node_modules`, `.next`
- [x] `npm run build` succeeds locally
- [x] All documentation files included
- [x] README.md has clear setup instructions
- [x] `vercel.json` configured
- [x] No sensitive data in code

**You're ready to deploy! 🚀**

