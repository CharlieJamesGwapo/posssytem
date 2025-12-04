# 🔐 Environment Setup Guide

## ⚠️ Important Security Note

**NEVER commit `.env.local` to Git!** It contains sensitive credentials.

---

## 📋 Setup Instructions

### Step 1: Create `.env.local` File

1. In the project root directory (`pos/`), create a new file named `.env.local`
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your actual credentials

### Step 2: Add Your Credentials

Your credentials are ready to use. Here's what you have:

#### **Database (Neon PostgreSQL)**
```
DATABASE_URL="postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

#### **Cloudinary**
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dtr1tnutd"
CLOUDINARY_API_KEY="996924146567939"
CLOUDINARY_API_SECRET="WshNRCdR45yOImVBoMxCCeLrFY"
```

#### **GCash (Optional)**
```
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"
```

#### **App URL**
```
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🔧 Complete `.env.local` File

Copy this entire content into your `.env.local` file:

```env
# Database Connection (Neon PostgreSQL)
DATABASE_URL="postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dtr1tnutd"
CLOUDINARY_API_KEY="996924146567939"
CLOUDINARY_API_SECRET="WshNRCdR45yOImVBoMxCCeLrFY"

# GCash (Optional - for payment integration)
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## ✅ Verification Steps

### 1. Test Database Connection

After creating `.env.local`, run:

```bash
npm run db:push
```

This will:
- Connect to your Neon PostgreSQL database
- Create all tables from the Prisma schema
- Show success message if connection works

### 2. Seed Demo Data

```bash
npm run seed
```

This will populate your database with sample menu items and orders.

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to verify everything works.

---

## 🔒 Security Best Practices

### DO ✅
- Keep `.env.local` in `.gitignore` (already done)
- Use strong passwords for database
- Rotate API keys periodically
- Use environment-specific credentials
- Store credentials securely

### DON'T ❌
- Commit `.env.local` to Git
- Share credentials via email/chat
- Use test credentials in production
- Hardcode secrets in code
- Log sensitive information

---

## 🚀 Next Steps

1. **Create `.env.local`** with the credentials above
2. **Run `npm run db:push`** to setup database
3. **Run `npm run seed`** to add demo data
4. **Run `npm run dev`** to start development
5. **Visit `http://localhost:3000`** to test

---

## 📊 What Each Variable Does

| Variable | Purpose | Type |
|----------|---------|------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |
| `NEXT_PUBLIC_GCASH_MERCHANT_ID` | GCash merchant ID | Optional |
| `GCASH_SECRET_KEY` | GCash secret key | Optional |
| `NEXT_PUBLIC_APP_URL` | Application URL | Required |

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put secrets there!

---

## 🆘 Troubleshooting

### "Cannot connect to database"
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection status
- Ensure firewall allows connections
- Try connection string from Neon dashboard

### "Module not found" errors
```bash
rm -rf node_modules .next
npm install
```

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Cloudinary not working
- Verify cloud name is correct
- Check API key and secret
- Ensure Cloudinary account is active

---

## 📞 Support

- **Neon Docs**: https://neon.tech/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Next.js Env**: https://nextjs.org/docs/basic-features/environment-variables

---

## ✨ You're Ready!

Once `.env.local` is created with your credentials, your application will:
- ✅ Connect to Neon PostgreSQL
- ✅ Use Cloudinary for images
- ✅ Be ready for GCash integration
- ✅ Run locally and in production

**Create `.env.local` and run `npm run db:push` to get started!**
