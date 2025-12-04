# 🚀 Railway Deployment - Quick Start (5 Minutes)

## TL;DR - Deploy in 5 Steps

### 1️⃣ Push to GitHub
```bash
cd c:\Users\USER\Desktop\possystem-main
git add .
git commit -m "Deploy to Railway"
git push origin main
```

### 2️⃣ Go to Railway
- Visit https://railway.app
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**
- Authorize and select your repository

### 3️⃣ Add PostgreSQL Database
- Click **"+ New"** in your Railway project
- Select **"Database"** → **"PostgreSQL"**
- Railway auto-adds `DATABASE_URL` to your environment

### 4️⃣ Set Environment Variables
In Railway dashboard, go to your Next.js service → **"Variables"** and add:

```env
NODE_ENV=production
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
GCASH_SECRET_KEY=your_secret_key
```

(Leave `DATABASE_URL` as-is, Railway adds it automatically)

### 5️⃣ Deploy
- Click **"Deploy"** button
- Wait for build to complete (3-5 minutes)
- Your app is live! 🎉

---

## 🔗 Your Live URLs

After deployment, Railway gives you:
- **App URL**: `https://your-app.railway.app`
- **API**: `https://your-app.railway.app/api/*`

---

## ✅ Test Your Deployment

```bash
# Visit your app
https://your-app.railway.app

# Test API
curl https://your-app.railway.app/api/menu

# Check logs in Railway dashboard
# Go to Logs tab to see real-time output
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check build logs in Railway dashboard |
| Database error | Verify PostgreSQL service is running (green status) |
| App crashes | Check Logs tab for error messages |
| Images not loading | Verify Cloudinary credentials in variables |

---

## 📚 Full Documentation

See `RAILWAY_DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**That's it! Your Filtra Café system is now live on Railway! 🎉**
