# 🔧 Fix QR Code URLs in Railway

## 🔴 Problem
When you scan QR codes in Railway, they redirect to Render URLs instead of Railway URLs.

## ✅ Solution
Update the environment variables in Railway dashboard.

---

## 🎯 Steps to Fix

### Step 1: Find Your Railway App URL
1. Go to: https://railway.app
2. Click on your project
3. Click on your service
4. Go to **"Settings"** → **"Domains"**
5. Copy your Railway domain (e.g., `https://possystem-production.up.railway.app`)

### Step 2: Update Environment Variables in Railway
1. Go to your service in Railway
2. Click on **"Variables"** tab
3. Find and update these variables:

```env
NEXT_PUBLIC_BASE_URL=https://YOUR-RAILWAY-DOMAIN.railway.app
NEXT_PUBLIC_APP_URL=https://YOUR-RAILWAY-DOMAIN.railway.app
NEXT_PUBLIC_QR_SCANNER_URL=https://YOUR-RAILWAY-DOMAIN.railway.app/qr-scanner
```

Replace `YOUR-RAILWAY-DOMAIN` with your actual Railway domain.

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** button
3. Wait for build to complete (2-3 minutes)

### Step 4: Test
1. Visit: https://YOUR-RAILWAY-DOMAIN.railway.app/qr-scanner
2. Scan a QR code
3. Should now redirect to Railway URL, not Render

---

## 📝 Example

If your Railway domain is: `https://filtra-cafe-prod.railway.app`

Set these variables:
```env
NEXT_PUBLIC_BASE_URL=https://filtra-cafe-prod.railway.app
NEXT_PUBLIC_APP_URL=https://filtra-cafe-prod.railway.app
NEXT_PUBLIC_QR_SCANNER_URL=https://filtra-cafe-prod.railway.app/qr-scanner
```

---

## 🔍 How It Works

The QR code generation uses `NEXT_PUBLIC_BASE_URL`:

```typescript
// In /api/generate-qr
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
const qrData = `${baseUrl}/?table=5`
// Result: https://YOUR-RAILWAY-DOMAIN.railway.app/?table=5
```

When customer scans, they're redirected to the Railway URL.

---

## ✅ Verification

After fixing:
1. QR codes should contain Railway URL
2. Scanning should redirect to Railway domain
3. Menu should load from Railway
4. Orders should work from Railway

---

## 📞 Quick Checklist

- [ ] Found your Railway domain
- [ ] Updated NEXT_PUBLIC_BASE_URL in Railway Variables
- [ ] Updated NEXT_PUBLIC_APP_URL in Railway Variables
- [ ] Updated NEXT_PUBLIC_QR_SCANNER_URL in Railway Variables
- [ ] Clicked Redeploy in Railway
- [ ] Waited for build to complete
- [ ] Tested QR code scanning

---

**Once you provide your Railway domain, I can help you set the exact URLs!**
