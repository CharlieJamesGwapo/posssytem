# 🔧 Update Railway Variables - Step by Step

## 🎯 Fix QR Code URLs in Railway

Follow these exact steps to fix the QR code issue.

---

## 📍 Step 1: Find Your Railway Domain

1. Go to: **https://railway.app**
2. Click on your **project**
3. Click on your **service** (the Next.js app)
4. Click on **"Settings"** tab
5. Click on **"Domains"** section
6. You'll see your domain like: `https://possystem-production.up.railway.app`

**Copy this domain - you'll need it!**

---

## 🔐 Step 2: Go to Variables in Railway

1. In the same service, click on **"Variables"** tab
2. You should see existing variables like:
   - DATABASE_URL
   - CLOUDINARY_API_KEY
   - etc.

---

## ✏️ Step 3: Update/Add These Variables

### Variable 1: NEXT_PUBLIC_BASE_URL
```
Key: NEXT_PUBLIC_BASE_URL
Value: https://YOUR-RAILWAY-DOMAIN.railway.app
```

**Example:**
```
Key: NEXT_PUBLIC_BASE_URL
Value: https://possystem-production.up.railway.app
```

### Variable 2: NEXT_PUBLIC_APP_URL
```
Key: NEXT_PUBLIC_APP_URL
Value: https://YOUR-RAILWAY-DOMAIN.railway.app
```

**Example:**
```
Key: NEXT_PUBLIC_APP_URL
Value: https://possystem-production.up.railway.app
```

### Variable 3: NEXT_PUBLIC_QR_SCANNER_URL
```
Key: NEXT_PUBLIC_QR_SCANNER_URL
Value: https://YOUR-RAILWAY-DOMAIN.railway.app/qr-scanner
```

**Example:**
```
Key: NEXT_PUBLIC_QR_SCANNER_URL
Value: https://possystem-production.up.railway.app/qr-scanner
```

---

## 💾 Step 4: Save Variables

1. After entering each variable, click **"Save"** or **"Add"**
2. You should see all three variables listed
3. They should show your Railway domain

---

## 🔄 Step 5: Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** button
3. Select **"Redeploy latest commit"**
4. Wait for build to complete (2-3 minutes)
5. You should see: "✓ Build succeeded"

---

## ✅ Step 6: Test

### Test 1: Visit QR Scanner
```
https://YOUR-RAILWAY-DOMAIN.railway.app/qr-scanner
```

### Test 2: Scan a QR Code
1. Use your phone camera
2. Scan any QR code
3. Should open: `https://YOUR-RAILWAY-DOMAIN.railway.app/?table=5`
4. Should NOT open Render URL

### Test 3: Complete Order
1. See welcome screen with table number
2. Browse menu
3. Add items
4. Checkout
5. Everything should work from Railway

---

## 📋 Variables Summary

| Variable | Value |
|----------|-------|
| NEXT_PUBLIC_BASE_URL | https://possystem-production.up.railway.app |
| NEXT_PUBLIC_APP_URL | https://possystem-production.up.railway.app |
| NEXT_PUBLIC_QR_SCANNER_URL | https://possystem-production.up.railway.app/qr-scanner |

*(Replace with your actual Railway domain)*

---

## 🎉 Done!

Once redeployed, your QR codes will:
- ✅ Point to Railway
- ✅ Not point to Render
- ✅ Work correctly
- ✅ Redirect customers to Railway app

---

## 🆘 If It Still Doesn't Work

1. **Check Variables are Saved**
   - Go back to Variables tab
   - Verify all 3 variables are there
   - Check values are correct

2. **Check Build Completed**
   - Go to Deployments tab
   - Verify latest deployment says "✓ Build succeeded"
   - Not "Building..." or "Failed"

3. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Try scanning QR again

4. **Check Logs**
   - Go to Logs tab
   - Look for any error messages
   - Search for "NEXT_PUBLIC_BASE_URL"

---

## 📞 Quick Reference

**Your Railway Domain:**
```
https://possystem-production.up.railway.app
```

**Set these 3 variables to that domain:**
```
NEXT_PUBLIC_BASE_URL=https://possystem-production.up.railway.app
NEXT_PUBLIC_APP_URL=https://possystem-production.up.railway.app
NEXT_PUBLIC_QR_SCANNER_URL=https://possystem-production.up.railway.app/qr-scanner
```

**Then redeploy!**

---

**You're all set! Go fix those QR codes! 🚀**
