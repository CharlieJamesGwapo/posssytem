# 🔧 Filtra Café - Complete Environment Setup Guide

## Made by Group 2 SIT | 2025

---

## 📋 Quick Setup Checklist

- [ ] Clone repository
- [ ] Install Node.js 18+
- [ ] Copy .env.local file
- [ ] Get database credentials
- [ ] Get Cloudinary credentials
- [ ] Run `npm install`
- [ ] Run `npm run db:push`
- [ ] Run `npm run seed` (optional)
- [ ] Start dev server: `npm run dev`
- [ ] Access at http://localhost:3000

---

## 🗄️ Database Setup

### Option 1: Neon (Free, Cloud-Based - RECOMMENDED)

**Advantages**: Free tier, serverless, auto-backups, easy setup

1. Go to https://neon.tech
2. Sign up for free account
3. Create new project
4. Copy the connection string (looks like):
   ```
   postgresql://neondb_owner:abc123@ep-xxxxx-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   ```
5. Paste into `DATABASE_URL` in `.env.local`

### Option 2: Render PostgreSQL (Free, Shared)

1. Go to https://render.com
2. Create account / login
3. Click "Databases" → "New +"
4. Choose PostgreSQL
5. Fill in database name, region
6. Copy connection string
7. Paste into `DATABASE_URL` in `.env.local`

### Option 3: Local PostgreSQL

**For development only**

1. Install PostgreSQL locally
2. Create database:
   ```bash
   createdb filtra_cafe
   ```
3. Set connection string:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/filtra_cafe?sslmode=disable"
   ```

### Verify Database Connection

```bash
npx prisma db execute --stdin
# If connection works, you'll see a successful response
```

---

## 🖼️ Cloudinary Setup (Image Storage)

### Free Account Creation

1. Go to https://cloudinary.com
2. Click "Sign Up"
3. Create free account (includes 25GB storage)
4. Go to Dashboard → Copy API Credentials

### Get Your Credentials

1. **Cloud Name**: Visible in dashboard
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   ```

2. **API Key**: In Settings → Security
   ```env
   CLOUDINARY_API_KEY="your_api_key"
   ```

3. **API Secret**: In Settings → Security
   ```env
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

### Test Cloudinary Upload

```bash
# After setting env vars, test upload
curl -F "file=@path/to/image.jpg" \
  -F "upload_preset=your_preset" \
  https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload
```

---

## 💳 Payment Integration Setup

### GCash Integration (Optional)

1. Register at https://business.gcash.com
2. Apply for merchant account
3. Get these credentials:
   ```env
   NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
   GCASH_SECRET_KEY="your_secret_key"
   ```

### Cash Payment (Built-in)

No setup needed - cash payment works out of box with auto-generated payment codes.

---

## 🔐 Environment Variables Complete Reference

### Create `.env.local` file

Copy and paste this template, filling in your credentials:

```env
# ============================================
# DATABASE CONFIGURATION
# ============================================
# PostgreSQL connection string
# For Neon: postgresql://user:pass@host/db?sslmode=require
# For local: postgresql://postgres:password@localhost:5432/filtra_cafe
DATABASE_URL="your_postgresql_connection_string_here"

# ============================================
# CLOUDINARY CONFIGURATION (Image Storage)
# ============================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# ============================================
# PAYMENT CONFIGURATION
# ============================================
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"

# ============================================
# APPLICATION CONFIGURATION
# ============================================
# Local development URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# For production (update after deployment):
# NEXT_PUBLIC_APP_URL="https://your-site.netlify.app"

# ============================================
# DEPLOYMENT CONFIGURATION
# ============================================
NODE_ENV="development"
NODE_VERSION="18.17.0"

# Optional: For advanced features
# NEXTAUTH_SECRET="your_secret_key_here"
```

### Environment Variables by Deployment

**Local Development**:
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Netlify Production**:
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

**Render Production**:
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-service.onrender.com
```

---

## 📦 Installation Steps

### 1. Clone Repository

```bash
# HTTPS
git clone https://github.com/your-username/filtra-cafe.git

# Or SSH
git clone git@github.com:your-username/filtra-cafe.git

# Navigate to directory
cd filtra-cafe
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup Environment Variables

```bash
# Copy template
cp .env.example .env.local

# Edit with your credentials
nano .env.local  # Linux/Mac
# or
notepad .env.local  # Windows
```

### 4. Initialize Database

```bash
# Create tables and apply migrations
npm run db:push

# Verify with Prisma Studio
npm run db:studio
```

### 5. Seed Demo Data (Optional)

```bash
# Add sample menu items, staff, tables
npm run seed
```

### 6. Start Development Server

```bash
npm run dev
```

Access at: http://localhost:3000

---

## ✅ Verification Checklist

After setup, verify everything works:

```bash
# 1. Check Node version
node --version  # Should be 18+ or 20+

# 2. Check npm packages installed
npm list | grep -E "next|react|prisma"

# 3. Test database connection
npm run db:push

# 4. Start dev server
npm run dev

# 5. In another terminal, test API
curl http://localhost:3000/api/menu

# 6. Test database access
npm run db:studio
```

---

## 🚀 First Run

### Local Development

```bash
# Terminal 1: Start development server
npm run dev

# Terminal 2: Open Prisma Studio (optional)
npm run db:studio

# Terminal 3: Monitor logs
npm run lint
```

### Access Application

- **Customer**: http://localhost:3000
- **Landing**: http://localhost:3000/landing
- **Staff Login**: http://localhost:3000/staff-login
- **Database**: http://localhost:5555 (Prisma Studio)

### Test Login

```
Username: admin
Password: admin123
```

---

## 🔍 Troubleshooting Environment Setup

### Issue: "Cannot find module"

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run db:push
```

### Issue: Database Connection Error

```bash
# Solution: Verify DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin

# Check if database exists
psql $DATABASE_URL -c "\dt"
```

### Issue: Prisma Client Generation Failed

```bash
# Solution: Regenerate Prisma Client
npx prisma generate

# If still fails:
npm run db:push --force
```

### Issue: Port 3000 Already in Use

```bash
# Solution: Use different port
npm run dev -- -p 3001

# Or kill process on port 3000:
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Cloudinary Upload Failing

```bash
# Solution: Check credentials
echo $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
echo $CLOUDINARY_API_KEY

# Test manually
curl -X POST https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload \
  -F "file=@test.jpg" \
  -F "api_key=YOUR_KEY" \
  -F "api_secret=YOUR_SECRET"
```

---

## 📝 Environment File Examples

### Minimal Setup (Local Only)

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/filtra_cafe"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Development Setup

```env
DATABASE_URL="postgresql://user:pass@neon-host/database?sslmode=require"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="demo_cloud"
CLOUDINARY_API_KEY="demo_key"
CLOUDINARY_API_SECRET="demo_secret"
NEXT_PUBLIC_GCASH_MERCHANT_ID="demo_merchant"
GCASH_SECRET_KEY="demo_secret"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### Production Setup (Netlify)

```env
DATABASE_URL="postgresql://user:pass@neon-host/database?sslmode=require"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="production_cloud"
CLOUDINARY_API_KEY="prod_key"
CLOUDINARY_API_SECRET="prod_secret"
NEXT_PUBLIC_GCASH_MERCHANT_ID="prod_merchant"
GCASH_SECRET_KEY="prod_secret"
NEXT_PUBLIC_APP_URL="https://filtra-cafe.netlify.app"
NODE_ENV="production"
```

---

## 🎯 Next Steps

1. **Complete this setup** ✅
2. **Test locally** with `npm run dev`
3. **Add menu items** via admin panel
4. **Create staff accounts** 
5. **Generate table QR codes**
6. **Deploy to production** (see DEPLOYMENT_2025_GUIDE.md)

---

## 📞 Getting Help

If you encounter issues:

1. Check error message carefully
2. Review this guide's troubleshooting section
3. Check NextJS/Prisma documentation
4. Search GitHub issues
5. Create detailed bug report

---

## 🎉 Ready to Start!

Your **Filtra Café Smart Ordering System** environment is now ready!

```bash
npm run dev
```

Visit http://localhost:3000 and start using the system! 🚀

---

*© 2025 Filtra Café Smart Ordering System | Made by Group 2 SIT*
