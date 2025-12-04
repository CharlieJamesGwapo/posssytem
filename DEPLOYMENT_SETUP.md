# Deployment Setup Guide

## Frontend Deployment (Netlify)

### Step 1: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your GitHub repository
4. Netlify will auto-detect Next.js settings

### Step 2: Set Environment Variables
In Netlify Dashboard → Site settings → Build & deploy → Environment:

```
DATABASE_URL=postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtr1tnutd
CLOUDINARY_API_KEY=996924146567939
CLOUDINARY_API_SECRET=WshNRCdR45yOImVBoMxCCeLrFY
NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
GCASH_SECRET_KEY=your_secret_key
NEXT_PUBLIC_APP_URL=https://your-netlify-domain.netlify.app
NEXT_PUBLIC_BASE_URL=https://your-netlify-domain.netlify.app
```

### Step 3: Deploy
Push to GitHub and Netlify will auto-deploy:
```bash
git add .
git commit -m "Add deployment configuration"
git push
```

---

## Backend Deployment (Render)

### Step 1: Connect to Render
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Choose "Node" as the environment

### Step 2: Configure Service
- **Name**: pos-system-api
- **Environment**: Node
- **Build Command**: `npm install && npx prisma generate && npx prisma db push`
- **Start Command**: `npm run start`
- **Plan**: Free (or paid for production)

### Step 3: Set Environment Variables
In Render Dashboard → Environment:

```
DATABASE_URL=postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NODE_ENV=production
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtr1tnutd
CLOUDINARY_API_KEY=996924146567939
CLOUDINARY_API_SECRET=WshNRCdR45yOImVBoMxCCeLrFY
NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
GCASH_SECRET_KEY=your_secret_key
```

### Step 4: Deploy
Click "Create Web Service" and Render will auto-deploy from your GitHub repository.

---

## Important Notes

### Database
- Your PostgreSQL database is hosted on **Neon** (already configured)
- Both Netlify and Render will connect to the same database
- Ensure DATABASE_URL is set in both platforms

### Prisma
- The build script now includes `prisma generate` to prevent CI caching issues
- Render will automatically run `prisma db push` during build

### Environment Variables
- **NEXT_PUBLIC_*** variables are exposed to the browser (safe to share)
- **Sensitive variables** (API keys, secrets) should only be set in deployment platforms
- Never commit `.env.local` or `.env.production.local` to Git

### Custom Domain
After deployment:
1. In Netlify/Render, go to Domain settings
2. Add your custom domain
3. Update DNS records as instructed

---

## Troubleshooting

### Build Fails on Netlify
- Check that `prisma generate` runs before `next build`
- Verify DATABASE_URL is set correctly
- Check build logs in Netlify Dashboard

### Build Fails on Render
- Ensure Node version is 18+
- Check that all environment variables are set
- Verify database connection string

### Database Connection Issues
- Test connection locally: `npx prisma db push`
- Verify DATABASE_URL format
- Check Neon dashboard for connection status

---

## Next Steps

1. Push this configuration to GitHub
2. Connect Netlify to your repository
3. Connect Render to your repository
4. Set environment variables in both platforms
5. Monitor deployment logs
6. Test both frontend and backend after deployment
