# Vercel Deployment Fix - Environment Variables Setup

## Problem
The deployed site at https://posssytem.vercel.app shows "No items found" because the database connection is failing.

## Solution: Configure Vercel Environment Variables

You need to add these environment variables in your Vercel dashboard:

### 1. Go to Vercel Dashboard
- Visit https://vercel.com/dashboard
- Select your project: "posssytem"

### 2. Add Environment Variables
Go to Settings → Environment Variables and add:

**Database Variables:**
- Name: `DATABASE_URL`
  Value: `postgresql://neondb_owner:npg_k2Ot8xgZoWdh@ep-bitter-silence-ahmvjdfe-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

- Name: `DIRECT_DATABASE_URL`
  Value: `postgresql://neondb_owner:npg_k2Ot8xgZoWdh@ep-bitter-silence-ahmvjdfe-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`

**Cloudinary Variables:**
- Name: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
  Value: `dtr1tnutd`

- Name: `CLOUDINARY_API_KEY`
  Value: `587976584879274`

- Name: `CLOUDINARY_API_SECRET`
  Value: `E-0s7u1ZJb4qL8nR2kH3xW9mF6c`

**App URLs:**
- Name: `NEXT_PUBLIC_APP_URL`
  Value: `https://posssytem.vercel.app`

- Name: `NEXT_PUBLIC_BASE_URL`
  Value: `https://posssytem.vercel.app`

### 3. Redeploy
After adding the variables:
1. Go to the "Deployments" tab
2. Click the three dots next to the latest deployment
3. Select "Redeploy"

### 4. Alternative: Use Vercel CLI
```bash
vercel env add DATABASE_URL production
vercel env add DIRECT_DATABASE_URL production
vercel env add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME production
vercel env add CLOUDINARY_API_KEY production
vercel env add CLOUDINARY_API_SECRET production
vercel env add NEXT_PUBLIC_APP_URL production
vercel env add NEXT_PUBLIC_BASE_URL production
```

Then redeploy:
```bash
vercel --prod
```

## Verification
After redeployment, visit:
- https://posssytem.vercel.app/api/menu (should return menu items)
- https://posssytem.vercel.app (should show products)

## Quick Test
You can test the API endpoint by visiting:
https://posssytem.vercel.app/api/menu

It should return a JSON array with 10 menu items instead of an error.
