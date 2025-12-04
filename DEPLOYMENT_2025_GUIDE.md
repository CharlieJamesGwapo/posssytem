# 🚀 Filtra Café Smart Ordering System - 2025 Deployment Guide

## Made by Group 2 SIT - Scan & Order

Welcome to the complete deployment guide for **Filtra Café Smart Ordering System**. This guide provides step-by-step instructions for deploying the full-stack application to **Netlify** (frontend) and **Render** (backend API).

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Frontend Deployment (Netlify)](#frontend-deployment-netlify)
4. [Backend Deployment (Render)](#backend-deployment-render)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Configuration](#post-deployment-configuration)
7. [Troubleshooting](#troubleshooting)

---

## 🏢 System Overview

### Filtra Café Smart Ordering System - 2025
- **Type**: Full-Stack Next.js 14 + Prisma + PostgreSQL
- **Architecture**: Single deployment with API routes
- **Frontend**: Next.js (React 18 + Tailwind CSS)
- **Backend**: Next.js API Routes + Prisma ORM
- **Database**: PostgreSQL (Neon or any PostgreSQL provider)
- **Image Storage**: Cloudinary
- **Real-time Updates**: Polling with Auto-Refresh

### Key Features
✅ Customer QR-based ordering  
✅ Staff dashboard with real-time order management  
✅ Menu management system  
✅ Payment integration (Cash + GCash)  
✅ Table management with QR codes  
✅ Order tracking and notifications  
✅ Receipt generation  
✅ Performance optimized  

---

## 📋 Prerequisites

Before deployment, ensure you have:

1. **GitHub Account** - For version control
2. **Netlify Account** - Free tier available (https://netlify.com)
3. **Render Account** - Free tier available (https://render.com)
4. **PostgreSQL Database** - Neon (free tier) or any PostgreSQL provider
5. **Cloudinary Account** - For image uploads (optional, free tier)
6. **Domain** (Optional) - Can connect your own domain

### Required Credentials
- Database URL (PostgreSQL connection string)
- Cloudinary Cloud Name
- Cloudinary API Key & Secret
- GCash Merchant ID & Secret (if using GCash)

---

## 🌐 Frontend Deployment (Netlify)

### Step 1: Push Code to GitHub

```bash
cd possystem-main
git init
git add .
git commit -m "Initial commit: Filtra Café Smart Ordering System 2025"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/filtra-cafe.git
git push -u origin main
```

### Step 2: Create Netlify Site

1. Go to [https://netlify.com](https://netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorize
4. Select your repository: `filtra-cafe`
5. Configure build settings:
   - **Base directory**: (leave empty)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - Click **"Show advanced"**

### Step 3: Add Environment Variables (Netlify)

In the Netlify dashboard, go to **Site settings** → **Build & deploy** → **Environment**

Add these variables:

```env
DATABASE_URL="your_postgresql_connection_string"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_APP_URL="https://your-site.netlify.app"
NODE_VERSION="18.17.0"
```

### Step 4: Deploy

1. Netlify will automatically detect the push to GitHub
2. Click **"Trigger deploy"** or wait for automatic deployment
3. Monitor the deployment progress in the **Deploys** tab
4. Once complete, your site will be live at `https://your-site.netlify.app`

### Step 5: Connect Custom Domain (Optional)

1. Go to **Domain settings**
2. Click **"Add domain"**
3. Enter your domain and follow DNS setup instructions

---

## 🔧 Backend Deployment (Render)

### Step 1: Create PostgreSQL Database

**Option A: Using Neon (Recommended)**

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project
4. Copy the connection string

**Option B: Using Render Database**

1. In Render dashboard, go to **Databases**
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `filtra-cafe-db`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 15
4. Create and copy the connection string

### Step 2: Create Render Web Service

1. Go to [https://render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository (`filtra-cafe`)
4. Configure:
   - **Name**: `filtra-cafe-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma db push`
   - **Start Command**: `npm run start`
   - **Instance Type**: Free tier (auto-spins down after inactivity)

### Step 3: Add Environment Variables (Render)

In the web service settings, go to **Environment** and add:

```env
DATABASE_URL="your_neon_or_render_postgresql_url"
NODE_ENV=production
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_APP_URL="https://your-service.onrender.com"
```

### Step 4: Deploy

1. Render will automatically detect the push
2. Go to **Deployments** tab
3. Monitor the build and deployment
4. Once live, your API will be at `https://your-service.onrender.com`

---

## 🔐 Environment Variables

### Complete Environment Setup

Create `.env.local` in your project root:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# GCash (Payment Integration)
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000" # Local dev
# For production:
# NEXT_PUBLIC_APP_URL="https://filtra-cafe.netlify.app"

# Build Configuration (Netlify/Render)
NODE_VERSION="18.17.0"
NODE_ENV="production"
```

### Getting Database Credentials

**For Neon:**
1. Go to Neon Console
2. Select Project
3. Copy Connection String from Connection Details
4. Format: `postgresql://user:password@host:port/database?sslmode=require`

**For PostgreSQL Local:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/filtra_cafe?sslmode=disable"
```

---

## ⚙️ Post-Deployment Configuration

### 1. Initialize Database

The build command includes `npx prisma db push` which automatically:
- Creates tables from schema
- Applies migrations
- Generates Prisma Client

### 2. Seed Demo Data (Optional)

SSH into Render or run locally:

```bash
npm run seed
```

This creates demo menu items, add-ons, and test staff accounts.

### 3. Update API Endpoints

Update your frontend to point to backend:

```typescript
// In your API calls, replace localhost with Render URL:
const API_URL = process.env.NEXT_PUBLIC_APP_URL
// Or specific Render service URL
const API_URL = "https://filtra-cafe-api.onrender.com"
```

### 4. Connect Frontend to Backend

If using separate deployments:

1. In Netlify site settings, add redirect for API:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://filtra-cafe-api.onrender.com/api/:splat"
  status = 200
```

2. Or update frontend environment variable:

```env
NEXT_PUBLIC_API_URL="https://filtra-cafe-api.onrender.com"
```

---

## 🧪 Testing Deployment

### 1. Test Frontend

```bash
# Local testing
npm run dev

# Production build test
npm run build
npm run start
```

### 2. Test API Endpoints

```bash
# Test menu endpoint
curl https://your-site.netlify.app/api/menu

# Test health endpoint
curl https://your-site.onrender.com/api/health
```

### 3. Test Database Connection

```bash
# Check database via Prisma Studio (local)
npm run db:studio

# Check in production logs
```

### 4. Test Features

- ✅ Customer ordering flow
- ✅ Staff login and dashboard
- ✅ Menu browsing
- ✅ Cart functionality
- ✅ Order submission
- ✅ Real-time order updates

---

## 🐛 Troubleshooting

### Issue: Database Connection Failed

**Solution:**
1. Verify DATABASE_URL is correct
2. Check firewall/IP whitelist in database settings
3. Ensure database is running and accessible
4. For Neon, allow Netlify/Render IPs to connect

```bash
# Test connection locally:
npx prisma db execute --stdin < /dev/null
```

### Issue: Build Fails on Netlify/Render

**Solution:**
1. Check build logs for specific errors
2. Verify Node version matches (18.17.0+)
3. Ensure all dependencies are installed
4. Check for missing environment variables

```bash
# Clear build cache:
# Netlify: Site settings → Deploys → Trigger clear cache & redeploy
# Render: Rebuild from scratch
```

### Issue: Images Not Loading

**Solution:**
1. Verify Cloudinary credentials in environment variables
2. Check image URLs are using HTTPS
3. Ensure Cloudinary domain is in next.config.js remotePatterns

```javascript
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'res.cloudinary.com',
  },
]
```

### Issue: API Endpoints Returning 404

**Solution:**
1. Verify API routes exist in `/src/app/api/`
2. Check netlify.toml redirects configuration
3. For Render, ensure service is properly deployed
4. Check CORS settings if calling from different domain

### Issue: Slow Performance

**Solution:**
1. Enable image optimization in next.config.js
2. Use ISR (Incremental Static Regeneration) for menu
3. Implement database query caching
4. Upgrade to paid tier on Netlify/Render for better performance

---

## 🎯 Production Checklist

Before going live, ensure:

- [ ] Database is properly configured and accessible
- [ ] All environment variables are set
- [ ] Images are optimized and loading
- [ ] SSL/HTTPS is enabled
- [ ] Custom domain is configured (if applicable)
- [ ] Email notifications are working
- [ ] Staff login credentials are updated
- [ ] Menu items are added
- [ ] Payment integration is tested
- [ ] 404 page is customized
- [ ] Backup strategy is in place
- [ ] Monitoring/alerts are configured

---

## 📞 Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Render Documentation](https://render.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Helpful Commands

```bash
# Build and test locally
npm run build && npm run start

# Push to GitHub
git add . && git commit -m "Updates" && git push

# View database
npm run db:studio

# Run migrations
npm run db:push

# Seed data
npm run seed
```

### Contact
**Project**: Filtra Café Smart Ordering System  
**Made by**: Group 2 SIT  
**Version**: 2025  
**License**: MIT

---

## 🎉 Final Steps

Once deployed:

1. **Test Everything**: Go through the complete ordering flow
2. **Share Links**: Distribute frontend and staff links
3. **Monitor Logs**: Check Netlify/Render logs regularly
4. **Gather Feedback**: Get user feedback and iterate
5. **Scale Up**: Upgrade to paid plans as traffic increases

### Your Live System

🌐 **Frontend**: https://your-site.netlify.app  
🔧 **Backend**: https://your-service.onrender.com  
📱 **Customer Flow**: Scan QR Code → Order Coffee → Pay  
👥 **Staff Dashboard**: Login → Manage Orders → Update Status  

---

## ✨ 2025 System Features

✅ Modern QR-based ordering system  
✅ Real-time order management  
✅ Beautiful responsive UI  
✅ Secure staff authentication  
✅ Payment integration  
✅ Performance optimized  
✅ Fully scalable architecture  

**Your Filtra Café Smart Ordering System is now live! 🚀**

---

*© 2025 Filtra Café Smart Ordering System • Made by Group 2 SIT • Scan & Order*
