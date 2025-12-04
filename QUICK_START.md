# 🚀 Quick Start Guide - Sit & Scan

Get the ordering system up and running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon recommended for easy setup)
- Git (optional)

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Setup Environment Variables
Create `.env.local` in the root directory:

```env
# Required: Database Connection
DATABASE_URL="postgresql://user:password@host:port/database"

# Optional: Cloudinary (for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Optional: GCash (for payment integration)
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Getting a Free PostgreSQL Database (Neon)
1. Go to https://neon.tech
2. Sign up for free
3. Create a new project
4. Copy the connection string to `DATABASE_URL`

## Step 3: Setup Database
```bash
# Create tables in your database
npm run db:push

# (Optional) Seed demo data
npm run seed
```

## Step 4: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser!

## 📱 Testing the Application

### Customer Interface
1. **Main Menu**: `http://localhost:3000`
   - Browse menu items by category
   - Click items to see details and add-ons
   - Add items to cart
   - Proceed to checkout

2. **Cart**: `http://localhost:3000/cart`
   - Review your order
   - Adjust quantities
   - Manage add-ons

3. **Checkout**: `http://localhost:3000/checkout`
   - Select payment method (Cash or GCash)
   - Place order
   - Receive payment code

### Staff Dashboard
1. **Dashboard**: `http://localhost:3000/staff`
   - View all incoming orders
   - Update order status
   - Confirm payments
   - Filter by status

## 🎯 Demo Workflow

### As a Customer:
1. Enter table number (e.g., 1)
2. Browse menu and select items
3. Add add-ons (extra shot, syrup, etc.)
4. Review cart
5. Choose payment method
6. Get payment code

### As Staff:
1. Open staff dashboard
2. See new orders appear in real-time
3. Click "CONFIRMED" to confirm order
4. Click "PREPARING" when starting to prepare
5. Click "READY" when order is ready
6. Confirm payment for cash orders

## 🛠️ Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Push database schema changes
npm run db:push

# Open Prisma Studio (visual database editor)
npm run db:studio

# Seed demo data
npm run seed

# Run linter
npm run lint
```

## 📊 Default Demo Data

After running `npm run seed`, you'll have:

**Menu Items:**
- Espresso (₱80)
- Cappuccino (₱120)
- Latte (₱130)
- Americano (₱100)
- Iced Latte (₱140)
- Iced Coffee (₱110)
- Croissant (₱90)
- Chocolate Muffin (₱85)
- Ham & Cheese Sandwich (₱150)
- Caesar Salad (₱180)

**Add-ons:**
- Extra Shot (₱30)
- Vanilla Syrup (₱20)
- Caramel Syrup (₱20)
- Whipped Cream (₱25)
- Oat Milk (₱15)
- Almond Milk (₱15)

**Sample Orders:**
- Table 1: Pending order
- Table 2: Order being prepared
- Table 3: Ready order

## 🎨 Customization Tips

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#8B4513',      // Brown
      secondary: '#D2691E',    // Chocolate
      accent: '#FFD700',       // Gold
    },
  },
},
```

### Add Menu Items
Use Prisma Studio:
```bash
npm run db:studio
```
Then navigate to `MenuItem` table and add new items.

### Customize Payment Code Format
Edit `src/app/api/orders/route.ts`, function `generatePaymentCode()`:
```ts
function generatePaymentCode(): string {
  // Customize format here
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}
```

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL is correct
- Ensure PostgreSQL is running
- Verify firewall allows connections

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Run `npm install` and `npm run dev`

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Database schema issues
```bash
# Reset database (WARNING: deletes all data)
npm run db:push -- --force-reset
```

## 📚 Next Steps

1. **Customize Menu**: Add your actual menu items
2. **Setup Cloudinary**: Upload real product images
3. **Configure Payments**: Setup GCash merchant account
4. **Deploy**: Deploy to Vercel, Netlify, or your server
5. **Add Features**: Implement WebSockets for real-time updates

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build
npm run build

# Deploy the .next folder
```

## 📞 Support

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Neon Docs**: https://neon.tech/docs

---

**Happy ordering! 🎉**
