# 🚀 Railway Deployment Guide - Filtra Café Smart Ordering System

## Overview

This guide will deploy your **full-stack Next.js application** (frontend + backend API routes) to Railway as a single service.

### What You're Deploying
- **Frontend**: Next.js React app with Tailwind CSS
- **Backend**: Next.js API routes with Prisma ORM
- **Database**: PostgreSQL (Railway-managed)
- **Type**: Monolithic Next.js 14 application

---

## 📋 Prerequisites

1. **Railway Account** - Sign up at https://railway.app
2. **GitHub Account** - Your code must be on GitHub
3. **Git installed** - For pushing code to GitHub
4. **Cloudinary Account** (optional) - For image uploads

---

## 🎯 Step-by-Step Deployment

### Step 1: Push Code to GitHub

If not already done, push your code to GitHub:

```bash
cd c:\Users\USER\Desktop\possystem-main
git init
git add .
git commit -m "Initial commit: Filtra Café Smart Ordering System"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/filtra-cafe.git
git push -u origin main
```

### Step 2: Create Railway Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway with your GitHub account
5. Select your repository: `filtra-cafe`
6. Railway will auto-detect Next.js and create a service

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will create a PostgreSQL instance automatically
4. The `DATABASE_URL` will be automatically added to your environment

### Step 4: Configure Environment Variables

In Railway dashboard:

1. Click on your **Next.js service**
2. Go to **"Variables"** tab
3. Add these environment variables:

```env
# Database (Auto-added by Railway)
DATABASE_URL=postgresql://...

# Node Environment
NODE_ENV=production

# Cloudinary (if using image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# GCash (if using payment integration)
NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
GCASH_SECRET_KEY=your_secret_key

# App URL (Railway will provide this)
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

**To find your Railway app URL:**
- Go to your service → **"Settings"** → **"Domains"**
- Copy the Railway-provided domain (e.g., `https://possystem-production.up.railway.app`)

### Step 5: Configure Build & Start Commands

1. Click on your **Next.js service**
2. Go to **"Settings"** tab
3. Set these commands:

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma db push
```

**Start Command:**
```bash
npm start
```

4. Click **"Deploy"**

### Step 6: Monitor Deployment

1. Go to **"Deployments"** tab
2. Watch the build logs
3. Once complete, your app will be live at the Railway domain

---

## ✅ Verification Checklist

After deployment, verify everything works:

### 1. Check Application is Running
```bash
# Visit your Railway app URL
https://your-app.railway.app
```

### 2. Test API Endpoints
```bash
# Test menu endpoint
curl https://your-app.railway.app/api/menu

# Test health check (if available)
curl https://your-app.railway.app/api/health
```

### 3. Test Database Connection
- If you see data loading on the frontend, database is connected
- Check Railway logs for any database errors

### 4. Test Key Features
- [ ] Customer ordering flow works
- [ ] Staff login page loads
- [ ] Menu items display
- [ ] Images load (if using Cloudinary)
- [ ] Orders can be submitted

---

## 🔧 Troubleshooting

### Issue: Build Fails

**Check the logs:**
1. Go to **Deployments** tab
2. Click the failed deployment
3. Scroll through build logs to find the error

**Common fixes:**
- Ensure `package.json` has all dependencies
- Check Node version (should be 18+)
- Verify all environment variables are set

### Issue: Database Connection Error

**Solution:**
1. Verify `DATABASE_URL` is set in Railway variables
2. Check that PostgreSQL service is running (green status)
3. Ensure `npx prisma db push` ran successfully in build logs

### Issue: App Crashes After Deployment

**Check logs:**
1. Go to **Logs** tab in your service
2. Look for error messages
3. Common issues:
   - Missing environment variables
   - Database not initialized
   - Port configuration

### Issue: Images Not Loading

**Solution:**
1. Verify Cloudinary credentials are set
2. Check `next.config.js` has Cloudinary domain in `remotePatterns`
3. Ensure images are uploaded to Cloudinary

---

## 📊 Railway Dashboard Overview

### Key Sections

- **Overview**: Service status and metrics
- **Deployments**: Deployment history and logs
- **Variables**: Environment variables
- **Settings**: Build/start commands, domains
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, network usage

---

## 🚀 Advanced Configuration

### Custom Domain (Optional)

1. Go to your service → **Settings** → **Domains**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `filtra-cafe.com`)
4. Follow DNS setup instructions
5. Wait for SSL certificate (usually 5-10 minutes)

### Auto-Deploy on GitHub Push

Railway automatically deploys when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Railway will automatically build and deploy
```

### Rollback to Previous Deployment

1. Go to **Deployments** tab
2. Find the previous working deployment
3. Click **"Redeploy"**

---

## 📝 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Auto-added by Railway |
| `NODE_ENV` | Environment mode | `production` |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | `https://your-app.railway.app` |

### Optional Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_GCASH_MERCHANT_ID` | GCash merchant ID |
| `GCASH_SECRET_KEY` | GCash secret key |

---

## 🎯 Post-Deployment Tasks

### 1. Update Frontend Configuration

If you have hardcoded API URLs, update them to use Railway URL:

```typescript
// Before
const API_URL = "http://localhost:3000"

// After
const API_URL = process.env.NEXT_PUBLIC_APP_URL || "https://your-app.railway.app"
```

### 2. Seed Demo Data (Optional)

SSH into Railway or run locally:

```bash
npm run seed
```

### 3. Test Payment Integration

If using GCash:
1. Verify merchant credentials are set
2. Test payment flow in staging mode
3. Enable production mode once verified

### 4. Set Up Monitoring

Railway provides built-in monitoring:
- Go to **Metrics** tab
- Monitor CPU, memory, network usage
- Set up alerts if needed

---

## 📱 Testing Your Deployment

### Customer Flow
1. Visit your Railway app URL
2. Scan QR code (or use test QR)
3. Browse menu
4. Add items to cart
5. Submit order
6. Verify order appears in staff dashboard

### Staff Flow
1. Go to `/staff` or staff login page
2. Login with staff credentials
3. Verify orders appear in real-time
4. Test order status updates
5. Test receipt generation

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** - Use Railway variables instead
2. **Use strong staff passwords** - Change default credentials
3. **Enable HTTPS** - Railway provides free SSL
4. **Rotate API keys** - Regularly update Cloudinary/GCash keys
5. **Monitor logs** - Check for suspicious activity

---

## 💡 Performance Tips

1. **Enable image optimization** - Next.js handles this automatically
2. **Use ISR for menu** - Cache menu data with Incremental Static Regeneration
3. **Optimize database queries** - Use Prisma select to limit fields
4. **Enable compression** - Railway handles this automatically

---

## 🆘 Getting Help

### Railway Support
- Docs: https://docs.railway.app
- Status: https://status.railway.app
- Community: https://discord.gg/railway

### Next.js Support
- Docs: https://nextjs.org/docs
- Community: https://github.com/vercel/next.js/discussions

---

## 📞 Quick Reference Commands

```bash
# Local testing before deployment
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed demo data

# Git
git add .
git commit -m "message"
git push origin main # Triggers Railway deployment
```

---

## ✨ You're All Set!

Your Filtra Café Smart Ordering System is now deployed on Railway! 🎉

**Your Live URLs:**
- 🌐 **Frontend**: https://your-app.railway.app
- 🔧 **API**: https://your-app.railway.app/api/*
- 📱 **Customer**: https://your-app.railway.app
- 👥 **Staff**: https://your-app.railway.app/staff

---

*© 2025 Filtra Café Smart Ordering System • Made by Group 2 SIT • Scan & Order*
