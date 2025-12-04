# ⚡ Filtra Café - Quick Start (5 Minutes Setup)

## 2025 Smart Ordering System - Made by Group 2 SIT

### 🎯 Get your system running in 5 minutes!

---

## 📋 What You'll Need

- Node.js 18+ (https://nodejs.org)
- Git (https://git-scm.com)
- PostgreSQL connection string (from Neon or Render)
- Text editor (VS Code recommended)

---

## ⚡ The 5-Minute Setup

### Step 1: Get the Code (1 min)

```bash
# Clone the repository
git clone https://github.com/your-username/filtra-cafe.git
cd filtra-cafe

# Install dependencies
npm install
```

### Step 2: Configure Database (2 min)

**Option A: Use Neon (Easiest)**
1. Go to https://neon.tech
2. Create free account
3. Create project → Copy connection string
4. Save it somewhere (you'll need it next)

**Option B: Local PostgreSQL**
```bash
createdb filtra_cafe
```

### Step 3: Create `.env.local` File (1 min)

In the `filtra-cafe` folder, create `.env.local`:

```env
DATABASE_URL="your_database_url_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="demo"
CLOUDINARY_API_KEY="demo"
CLOUDINARY_API_SECRET="demo"
```

Replace `your_database_url_here` with your actual connection string.

### Step 4: Setup Database (1 min)

```bash
npm run db:push
npm run seed
```

### Step 5: Start! (< 1 min)

```bash
npm run dev
```

**That's it!** 🎉

---

## 🌐 Access Your System

Once running, open these in your browser:

| Role | URL | Login |
|------|-----|-------|
| **Customer** | http://localhost:3000 | Scan QR code |
| **Staff** | http://localhost:3000/staff-login | admin / admin123 |
| **Database** | http://localhost:5555 | (Prisma Studio) |

---

## 🧪 Quick Test

### Test Customer Flow
1. Go to http://localhost:3000
2. Click "Scan QR Code"
3. Use table number 1
4. Browse menu
5. Add items to cart
6. Checkout

### Test Staff Dashboard
1. Go to http://localhost:3000/staff-login
2. Username: `admin`
3. Password: `admin123`
4. See orders appear in real-time

---

## 📱 What Can You Do?

### Customers Can:
- ✅ Scan table QR code
- ✅ Browse menu items
- ✅ Add items to cart
- ✅ Customize add-ons
- ✅ Place orders
- ✅ Pay (cash or online)
- ✅ Track order status
- ✅ Get receipt

### Staff Can:
- ✅ View incoming orders
- ✅ Update order status
- ✅ Manage menu
- ✅ See table status
- ✅ Confirm payments

---

## 🚀 Common Commands

```bash
# Start development server
npm run dev

# View database with UI
npm run db:studio

# Rebuild database
npm run db:push

# Add demo data
npm run seed

# Build for production
npm run build

# Start production
npm run start

# Check for errors
npm run lint
```

---

## 🛑 Stuck? Quick Fixes

### Error: "Cannot connect to database"
```bash
# Check your DATABASE_URL in .env.local
# Make sure it's correct and database exists
npm run db:push
```

### Error: "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### Error: "Module not found"
```bash
# Reinstall everything
rm -rf node_modules
npm install
npm run db:push
```

### Blank screen?
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Or restart dev server: Ctrl+C then npm run dev
```

---

## 🌟 Next Steps

### 1. Add Your Logo
- Replace `public/logo.jpg` with your cafe logo
- Image should be 200x200px or larger

### 2. Add Menu Items
- Go to staff dashboard
- Click "Menu Management"
- Add your coffee items with prices and images

### 3. Create QR Codes
- Staff dashboard → Table Management
- Generate QR codes for each table
- Print and place on tables

### 4. Deploy Online
- See [DEPLOYMENT_2025_GUIDE.md](./DEPLOYMENT_2025_GUIDE.md)
- Deploy frontend to Netlify
- Deploy backend to Render
- Live in 10 minutes!

---

## 📊 System Overview

```
┌─────────────────────────────────────────────┐
│        Filtra Café Smart Ordering          │
│            2025 | Group 2 SIT              │
├─────────────────────────────────────────────┤
│                                             │
│  Frontend (React + Next.js + Tailwind)     │
│  ├── Customer Menu & Ordering              │
│  ├── Staff Dashboard                       │
│  └── Admin Management                      │
│                                             │
│  Backend (Next.js API Routes)              │
│  ├── Menu Management API                   │
│  ├── Order Processing                      │
│  ├── Staff Authentication                  │
│  └── Payment Integration                   │
│                                             │
│  Database (PostgreSQL + Prisma ORM)        │
│  ├── Menu Items & Categories               │
│  ├── Orders & Transactions                 │
│  ├── Staff & Users                         │
│  └── Table Management                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Use Neon for database** - No setup, free tier, auto-backups
2. **Keep `.env.local` secret** - Never commit it to Git
3. **Use Cloudinary free tier** - 25GB storage included
4. **Test on mobile** - Use `npm run dev -- -H 0.0.0.0` then visit your IP
5. **Enable dark mode** - Check Tailwind config for theme options

---

## 🔐 Security Tips

1. Change default staff password after setup
2. Use environment variables for secrets
3. Enable HTTPS in production
4. Regular database backups
5. Monitor logs for errors

---

## 📈 Performance Tips

- Images auto-optimize with Next.js
- Database queries use Prisma (optimized)
- CSS is minified by Tailwind
- JavaScript code-split automatically
- Static assets cached

---

## 🎓 Learn More

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://prisma.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Neon Docs**: https://neon.tech/docs

---

## 🆘 Still Need Help?

### Debug Steps:
1. Check terminal for error messages
2. Open browser console (F12)
3. Check `.env.local` for typos
4. Verify database connection
5. Try restarting: `Ctrl+C` then `npm run dev`

### Resources:
- Documentation: See other markdown files
- GitHub Issues: Check for similar problems
- Stack Overflow: Search your error message

---

## 🎉 Congratulations!

You now have a fully functional **Filtra Café Smart Ordering System**!

```
✅ System running locally
✅ Database configured
✅ API working
✅ Ready to add menu items
✅ Ready to test ordering
✅ Ready to deploy online
```

### What's Next?

1. **Test the system**: Try customer & staff flows
2. **Add your data**: Menu items, staff accounts
3. **Customize**: Update branding, colors, text
4. **Deploy**: Take it live on Netlify + Render
5. **Iterate**: Get feedback and improve

---

## 🚀 Ready to Deploy?

When you're ready to go live:

```bash
# Build production version
npm run build

# Test it locally
npm run start

# Push to GitHub
git add .
git commit -m "Ready for production"
git push origin main

# Then follow DEPLOYMENT_2025_GUIDE.md
```

---

## 📞 Contact

**Made by Group 2 SIT**  
**Version**: 2025  
**System**: Filtra Café Smart Ordering System  
**Tagline**: "Scan & Order - The Future of Cafe Service"

---

*Happy ordering! 🎉 Filtra Café is now running on your machine.*

*© 2025 Filtra Café Smart Ordering System*
