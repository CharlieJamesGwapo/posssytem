# 🎯 Filtra Café Smart Ordering System - 2025

## Made by Group 2 SIT | Scan & Order

![Filtra Café Smart Ordering System](https://img.shields.io/badge/Filtra%20Caf%C3%A9-Smart%20Ordering%202025-orange)
![Made by Group 2 SIT](https://img.shields.io/badge/Made%20by-Group%202%20SIT-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

**Filtra Café Smart Ordering System** is a modern, full-stack web application for restaurants and cafes that enables customers to order via QR codes and staff to manage orders in real-time. Built with cutting-edge technologies for 2025.

### Key Innovations
- 🔗 **QR-Based Ordering**: Customers scan table QR codes to order
- 📊 **Real-time Dashboard**: Staff sees orders in real-time
- ⚡ **Performance Optimized**: Lightning-fast load times
- 📱 **Fully Responsive**: Works on all devices
- 🔒 **Secure**: Staff authentication and data protection
- 💳 **Payment Ready**: Cash and online payment support

---

## ✨ Features

### 👥 Customer Features
- **QR Code Scanning**: Auto-detects table number
- **Browse Menu**: Beautiful category-based menu display
- **Smart Search**: Find items quickly
- **Add to Cart**: Easy item management with quantities
- **Customization**: Add-ons and special instructions
- **Multiple Payment**: Cash or GCash options
- **Order Tracking**: Real-time order status
- **Receipt**: Digital receipt generation

### 👨‍💼 Staff Features
- **Secure Login**: Staff authentication dashboard
- **Order Management**: View all incoming orders
- **Status Updates**: Update order progress (Pending → Ready)
- **Table Overview**: See all active tables
- **Payment Confirmation**: Verify payments
- **Order Details**: Complete item information with add-ons
- **Menu Management**: Add/edit items and categories
- **Real-time Sync**: Auto-refresh every 3 seconds

### 🎛️ Admin Features
- **Menu Management**: Full menu CRUD operations
- **Category Organization**: Organize items by category
- **Add-ons System**: Create flexible add-on options
- **Image Management**: Upload via Cloudinary
- **User Roles**: Staff/Admin distinction
- **Pricing Control**: Dynamic pricing with sizes

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14.0+
- **UI Library**: React 18.2+
- **Styling**: Tailwind CSS 3.3+
- **State Management**: Zustand 4.4+
- **Icons**: Lucide React 0.294+
- **QR Code**: qrcode.react 3.1+
- **Alerts**: SweetAlert2 11.10+

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **ORM**: Prisma 5.7+
- **Database**: PostgreSQL
- **Image Storage**: Cloudinary
- **Real-time**: Socket.IO compatible

### Database
- **Type**: PostgreSQL
- **Provider**: Neon (recommended for serverless)
- **Hosting**: Any PostgreSQL provider
- **ORM**: Prisma with migrations

### Deployment
- **Frontend**: Netlify
- **Backend**: Render (Node.js)
- **Database**: Neon PostgreSQL
- **Images**: Cloudinary CDN

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- PostgreSQL database (Neon recommended)
- Cloudinary account (for images)

### 1. Installation

```bash
# Clone repository
git clone https://github.com/your-repo/filtra-cafe.git
cd filtra-cafe

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 2. Environment Setup

Create `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push Prisma schema to database
npm run db:push

# Open database UI (optional)
npm run db:studio

# Seed demo data (optional)
npm run seed
```

### 4. Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application running.

---

## 📁 Project Structure

```
filtra-cafe/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Main menu page
│   │   ├── landing/                 # Landing page
│   │   ├── staff/                   # Staff dashboard
│   │   ├── staff-login/             # Login page
│   │   ├── cart/                    # Shopping cart
│   │   ├── checkout/                # Checkout page
│   │   ├── api/                     # API routes
│   │   │   ├── menu/                # Menu endpoints
│   │   │   ├── orders/              # Order endpoints
│   │   │   ├── staff/               # Staff authentication
│   │   │   └── table-status/        # Table management
│   │   └── layout.tsx               # Root layout
│   ├── components/
│   │   ├── MenuCard.tsx             # Menu item component
│   │   ├── ItemModal.tsx            # Item detail modal
│   │   ├── WelcomeScreen.tsx        # Welcome screen
│   │   └── TableBlocker.tsx         # Table access control
│   ├── store/
│   │   └── index.ts                 # Zustand store (cart, user)
│   ├── utils/
│   │   └── index.ts                 # Helper functions
│   └── middleware.ts                # Auth middleware
├── prisma/
│   ├── schema.prisma                # Database schema
│   └── seed.ts                      # Demo data seeder
├── public/
│   └── logo.jpg                     # Filtra Café logo
├── netlify.toml                     # Netlify config
├── render.yaml                      # Render config
├── next.config.js                   # Next.js config
├── tailwind.config.js               # Tailwind config
├── package.json                     # Dependencies
└── README.md                        # This file
```

---

## 🔑 Demo Credentials

### Staff Dashboard

```
Username: admin
Password: admin123
```

### Test Accounts
- Multiple staff roles available after login
- Create additional users via admin panel

---

## 📋 API Endpoints

### Menu API
```
GET  /api/menu              # Get all menu items
POST /api/menu              # Create menu item (admin)
PUT  /api/menu/:id          # Update menu item (admin)
DELETE /api/menu/:id        # Delete menu item (admin)
```

### Orders API
```
GET  /api/orders            # Get all orders (staff)
POST /api/orders            # Create order (customer)
PUT  /api/orders/:id        # Update order status (staff)
GET  /api/orders/:id        # Get order details
```

### Staff API
```
POST /api/staff/login       # Staff login
POST /api/staff/logout      # Staff logout
GET  /api/staff/me          # Get current staff
```

### Table API
```
GET  /api/table-status      # Get table status
POST /api/table-status      # Mark table occupied
DELETE /api/table-status/:id # Release table
```

---

## 🌐 Deployment

### Deploy to Netlify (Frontend)

1. Push code to GitHub
2. Connect GitHub to Netlify
3. Set environment variables
4. Deploy automatically on push

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Deploy to Render (Backend)

1. Create Render account
2. Create PostgreSQL database
3. Create Web Service connected to GitHub
4. Configure environment variables
5. Deploy with auto-sync from GitHub

See [DEPLOYMENT_2025_GUIDE.md](./DEPLOYMENT_2025_GUIDE.md) for detailed steps.

---

## 📊 Performance Optimizations

✅ Image optimization with next/image  
✅ Code splitting and lazy loading  
✅ Database query optimization  
✅ Caching strategies implemented  
✅ CSS-in-JS optimizations  
✅ Static generation where possible  
✅ API route optimization  
✅ Bundle size optimization  

---

## 🔒 Security Features

✅ Staff authentication with JWT tokens  
✅ Protected API routes with middleware  
✅ HTTPS enforced in production  
✅ SQL injection prevention (Prisma ORM)  
✅ XSS protection  
✅ CSRF tokens on forms  
✅ Environment variables security  
✅ Rate limiting ready  

---

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Optimized for all screen sizes
- ✅ Touch-friendly interface
- ✅ Performance on slow connections
- ✅ Accessibility compliant
- ✅ Dark mode ready

---

## 🧪 Testing

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# View database
npm run db:studio

# Seed test data
npm run seed
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Database Connection Issues
```bash
# Verify DATABASE_URL
echo $DATABASE_URL

# Test connection
npx prisma db execute --stdin
```

### Build Failures
```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📈 Scaling & Upgrades

### Development → Production Checklist
- [ ] Database backed up
- [ ] Environment variables updated
- [ ] HTTPS enabled
- [ ] Custom domain configured
- [ ] Error monitoring setup
- [ ] Performance monitoring enabled
- [ ] CDN configured
- [ ] Auto-scaling enabled

### Upgrade Options
- Netlify: Free → Pro (unlimited bandwidth)
- Render: Free → Paid (no spin-down)
- Neon: Free → Pro (more storage)
- Cloudinary: Free → Growth (more resources)

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - See LICENSE.md for details

---

## 👥 Team

**Filtra Café Smart Ordering System**  
Made by **Group 2 SIT**

### Credits
- Built with Next.js 14
- Styled with Tailwind CSS
- Database with Prisma + PostgreSQL
- Deployed on Netlify + Render

---

## 🎯 Roadmap

### Version 2.0 (2025)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Loyalty program integration
- [ ] Multi-location support
- [ ] Kitchen display system (KDS)
- [ ] WhatsApp integration
- [ ] AI recommendations

### Future Enhancements
- Real-time notifications with WebSockets
- Video menu items
- Voice ordering
- AR menu preview
- Social media integration

---

## 📞 Support

### Documentation
- [Full API Documentation](./API_DOCS.md)
- [Deployment Guide](./DEPLOYMENT_2025_GUIDE.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)

### Getting Help
- Check documentation first
- Search GitHub issues
- Create new issue with details
- Contact team via email

---

## 🌟 Highlights for 2025

✨ **Modern Stack**: Next.js 14, React 18, Tailwind CSS  
⚡ **Fast Performance**: Optimized for speed  
📱 **Mobile First**: Responsive and accessible  
🔒 **Secure**: Modern authentication  
🚀 **Scalable**: Ready for growth  
🎨 **Beautiful**: Premium UI/UX  
🔧 **Maintainable**: Clean code structure  

---

## 🎉 Ready to Launch!

Your **Filtra Café Smart Ordering System** is ready to revolutionize how your customers order coffee!

### Quick Links
- 🚀 [Deploy Now](./DEPLOYMENT_2025_GUIDE.md)
- 📚 [Full Documentation](#project-structure)
- 🔧 [API Reference](#-api-endpoints)
- 💡 [Features](#-features)

---

*© 2025 Filtra Café Smart Ordering System  
Made by Group 2 SIT  
"Scan & Order - The Future of Cafe Service"*

