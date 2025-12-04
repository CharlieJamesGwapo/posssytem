# 🔑 Credentials Reference Card

## ⚠️ KEEP THIS SECURE - DO NOT SHARE

---

## 📦 Database (Neon PostgreSQL)

**Connection String:**
```
postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Details:**
- Database: `neondb`
- User: `neondb_owner`
- Branch: `production`
- Status: `Active`
- Region: `us-east-1`

**Dashboard:**
- https://console.neon.tech

---

## 🖼️ Cloudinary

**Cloud Name:** `dtr1tnutd`

**API Key:** `996924146567939`

**API Secret:** `WshNRCdR45yOImVBoMxCCeLrFY`

**Dashboard:**
- https://cloudinary.com/console

---

## 📝 How to Use

### In `.env.local`:
```env
DATABASE_URL="postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dtr1tnutd"
CLOUDINARY_API_KEY="996924146567939"
CLOUDINARY_API_SECRET="WshNRCdR45yOImVBoMxCCeLrFY"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## ✅ Setup Checklist

- [ ] Create `.env.local` file
- [ ] Copy credentials from this file
- [ ] Run `npm run db:push`
- [ ] Run `npm run seed`
- [ ] Run `npm run dev`
- [ ] Test at `http://localhost:3000`

---

## 🚀 Quick Commands

```bash
# Initialize database
npm run db:push

# Seed demo data
npm run seed

# Start development
npm run dev

# View database
npm run db:studio

# Build for production
npm run build

# Start production server
npm start
```

---

## 🔗 Useful Links

- **Neon Dashboard**: https://console.neon.tech
- **Cloudinary Dashboard**: https://cloudinary.com/console
- **Application**: http://localhost:3000
- **Staff Dashboard**: http://localhost:3000/staff

---

## 🆘 Need Help?

See **ENV_SETUP.md** for detailed setup instructions and troubleshooting.

---

**Keep this file secure and never commit credentials to Git!**
