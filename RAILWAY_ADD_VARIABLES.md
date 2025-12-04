# ✅ Add Variables to Railway - Complete Guide

## 🎯 What to Add

You need to add these variables to your Railway service. Here's exactly what to add:

---

## 📋 Variables to Add

### 1. Database Variables
```
DATABASE_URL=postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

DIRECT_DATABASE_URL=postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### 2. Cloudinary Variables
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtr1tnutd

CLOUDINARY_API_KEY=996924146567939

CLOUDINARY_API_SECRET=WshNRCdR45yOImVBoMxCCeLrFY
```

### 3. GCash Variables
```
NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id

GCASH_SECRET_KEY=your_secret_key
```

### 4. App URLs (ALREADY SET - Verify)
```
NEXT_PUBLIC_APP_URL=https://g2possystem-production.up.railway.app

NEXT_PUBLIC_BASE_URL=https://g2possystem-production.up.railway.app

NEXT_PUBLIC_QR_SCANNER_URL=https://g2possystem-production.up.railway.app/qr-scanner
```

### 5. Environment
```
NODE_ENV=production
```

---

## 🚀 How to Add in Railway

### Step 1: Go to Variables Tab
1. Go to: https://railway.app
2. Click your project
3. Click your service
4. Click **"Variables"** tab

### Step 2: Add Each Variable
For each variable:
1. Click **"New Variable"** button
2. Enter the **Key** (left side)
3. Enter the **Value** (right side)
4. Click **"Save"** or **"Add"**

### Step 3: Example - Adding DATABASE_URL
```
Key: DATABASE_URL
Value: postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Step 4: Repeat for All Variables
Add all the variables from the list above.

---

## ✅ Checklist - Variables to Add

- [ ] DATABASE_URL
- [ ] DIRECT_DATABASE_URL
- [ ] NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] NEXT_PUBLIC_GCASH_MERCHANT_ID
- [ ] GCASH_SECRET_KEY
- [ ] NEXT_PUBLIC_APP_URL (verify it's set)
- [ ] NEXT_PUBLIC_BASE_URL (verify it's set)
- [ ] NEXT_PUBLIC_QR_SCANNER_URL (verify it's set)
- [ ] NODE_ENV

---

## 🔄 After Adding Variables

### Step 1: Verify All Variables Are Set
1. Go to **Variables** tab
2. You should see all variables listed
3. Check that values are correct (masked with ***)

### Step 2: Redeploy
1. Go to **Deployments** tab
2. Click **"Redeploy"** button
3. Wait for build to complete (2-3 minutes)

### Step 3: Test
1. Visit: https://g2possystem-production.up.railway.app
2. Go to: /qr-scanner
3. Scan a QR code
4. Should redirect to Railway URL
5. Menu should load
6. Everything should work!

---

## 📝 Quick Copy-Paste

If Railway has a "Raw Editor" or text input, you can paste this:

```env
DATABASE_URL=postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
DIRECT_DATABASE_URL=postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dtr1tnutd
CLOUDINARY_API_KEY=996924146567939
CLOUDINARY_API_SECRET=WshNRCdR45yOImVBoMxCCeLrFY
NEXT_PUBLIC_GCASH_MERCHANT_ID=your_merchant_id
GCASH_SECRET_KEY=your_secret_key
NEXT_PUBLIC_APP_URL=https://g2possystem-production.up.railway.app
NEXT_PUBLIC_BASE_URL=https://g2possystem-production.up.railway.app
NEXT_PUBLIC_QR_SCANNER_URL=https://g2possystem-production.up.railway.app/qr-scanner
NODE_ENV=production
```

---

## 🎯 Important Notes

### ⚠️ Do NOT Add Comments
Railway variables don't support comments. Only add the key=value pairs.

### ✅ Do Add All Variables
Make sure you add ALL the variables, not just some.

### 🔒 Sensitive Data
- DATABASE_URL - Keep secret
- CLOUDINARY_API_SECRET - Keep secret
- GCASH_SECRET_KEY - Keep secret

These are already in your `.env` file, so just copy them to Railway.

---

## ✨ After Everything is Set

Your system will have:
- ✅ Database connected (Neon PostgreSQL)
- ✅ Images working (Cloudinary)
- ✅ QR codes pointing to Railway
- ✅ Menu loading from Railway
- ✅ Orders working
- ✅ Staff dashboard working
- ✅ Everything on Railway (not Render)

---

## 🆘 If Something Goes Wrong

### Variables Not Showing
- Refresh the page
- Go back to Variables tab
- They should be there

### Build Fails After Adding Variables
- Check the build logs
- Look for error messages
- Verify variable values are correct

### App Still Doesn't Work
- Check Railway logs
- Verify all variables are set
- Try redeploying again

---

## 📞 Summary

**Yes, add all those variables to Railway!**

1. Go to Variables tab
2. Add each variable one by one
3. Or use Raw Editor to paste all at once
4. Redeploy
5. Test

**Your system will be fully functional on Railway! 🚀**
