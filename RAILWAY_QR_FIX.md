# 🚀 Railway QR Code Fix - Complete Guide

## 🔴 Issue
QR codes are pointing to Render instead of Railway.

## ✅ Root Cause
The `NEXT_PUBLIC_BASE_URL` environment variable in Railway is not set correctly.

---

## 🎯 Quick Fix (3 Steps)

### Step 1: Get Your Railway URL
1. Go to: https://railway.app
2. Select your project
3. Click your service
4. Go to: **Settings** → **Domains**
5. Copy the Railway domain

**Your Railway URL should look like:**
```
https://possystem-production.up.railway.app
or
https://your-app-name.railway.app
```

### Step 2: Set Environment Variables in Railway Dashboard
1. In Railway, go to: **Variables** tab
2. Update these 3 variables:

```
NEXT_PUBLIC_BASE_URL = https://YOUR-RAILWAY-URL.railway.app
NEXT_PUBLIC_APP_URL = https://YOUR-RAILWAY-URL.railway.app
NEXT_PUBLIC_QR_SCANNER_URL = https://YOUR-RAILWAY-URL.railway.app/qr-scanner
```

**Replace `YOUR-RAILWAY-URL` with your actual domain**

### Step 3: Redeploy
1. Click **Deployments** tab
2. Click **Redeploy** button
3. Wait 2-3 minutes for build
4. Done! ✅

---

## 🔍 Verify the Fix

### Test 1: Check QR Scanner Page
```
Visit: https://YOUR-RAILWAY-URL.railway.app/qr-scanner
Should see: QR codes for all tables
```

### Test 2: Scan QR Code
```
Scan any QR code with phone
Should redirect to: https://YOUR-RAILWAY-URL.railway.app/?table=5
NOT to: https://posssytem-3.onrender.com
```

### Test 3: Check Welcome Screen
```
After scanning, should see:
"Table 5 - Ready to Order?"
Menu should load from Railway
```

---

## 📝 Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_BASE_URL` | Used for QR generation | `https://your-app.railway.app` |
| `NEXT_PUBLIC_APP_URL` | App public URL | `https://your-app.railway.app` |
| `NEXT_PUBLIC_QR_SCANNER_URL` | QR scanner page | `https://your-app.railway.app/qr-scanner` |

---

## 🔧 How QR Generation Works

```
1. Staff visits: /qr-scanner
2. Page calls: /api/generate-qr?table=5
3. API reads: process.env.NEXT_PUBLIC_BASE_URL
4. Generates: https://YOUR-RAILWAY-URL.railway.app/?table=5
5. Creates: QR code with that URL
6. Customer scans: Opens the Railway URL
```

---

## ✨ After Fix

### QR Code Flow
```
Customer scans QR
        ↓
Opens: https://YOUR-RAILWAY-URL.railway.app/?table=5
        ↓
Welcome screen shows "Table 5"
        ↓
Menu loads from Railway
        ↓
Customer orders
        ↓
Staff receives order
```

---

## 🆘 Troubleshooting

### QR Still Points to Render
- [ ] Check Railway Variables are saved
- [ ] Verify you clicked "Redeploy"
- [ ] Wait for build to complete
- [ ] Clear browser cache
- [ ] Try scanning again

### Menu Doesn't Load After Scan
- [ ] Check database connection
- [ ] Verify DATABASE_URL is set
- [ ] Check Railway logs for errors

### QR Scanner Page Shows Error
- [ ] Check Railway logs
- [ ] Verify all variables are set
- [ ] Try redeploying

---

## 📋 Checklist

- [ ] Have your Railway domain
- [ ] Logged into Railway dashboard
- [ ] Found Variables tab
- [ ] Updated NEXT_PUBLIC_BASE_URL
- [ ] Updated NEXT_PUBLIC_APP_URL
- [ ] Updated NEXT_PUBLIC_QR_SCANNER_URL
- [ ] Clicked Redeploy
- [ ] Waited for build (2-3 min)
- [ ] Tested QR scanning
- [ ] Verified it works

---

## 📞 Need Help?

**What's your Railway domain?**
Once you provide it, I can:
1. Update your `.env` file
2. Create exact variable names
3. Verify everything is correct

---

**Ready? Go to Railway dashboard and update those 3 variables! 🚀**
