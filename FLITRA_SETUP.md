# 🎉 Flitra Café - Sit & Scan Ordering System

A fully functional, responsive ordering system for Flitra Café with real-time order management, multiple payment options, and beautiful UI.

## ✨ Features

### 👥 Customer Features
- **Welcome Screen**: Beautiful, engaging landing page with table number entry
- **Menu Browsing**: Browse drinks by category (Iced Drinks, Hot Drinks)
- **Item Customization**: 
  - Choose drink size (Small, Medium, Large)
  - Adjust sugar level (0%, 25%, 50%, 75%, 100%)
  - Add extras (Extra shots, syrups, milk alternatives)
  - View ingredients and allergens
- **Shopping Cart**: Full cart management with edit/remove options
- **Checkout**: Multiple payment methods (Cash, GCash, PayMaya)
- **Order Confirmation**: Real-time order status tracking
- **Responsive Design**: Fully optimized for mobile and desktop

### 🍰 Menu Items (10 Drinks)
**Iced Drinks:**
- Iced Americano
- Iced Spanish Latte
- Iced Caramel Latte
- Iced Mocha
- Iced Cappuccino

**Hot Drinks:**
- Hot Americano
- Hot Spanish Latte
- Hot Caramel Latte
- Hot Mocha
- Hot Cappuccino

### 💳 Payment Methods
- **Cash**: Pay at counter with generated code
- **GCash**: Scan QR code for online payment
- **PayMaya**: Scan QR code for online payment

### 👨‍💼 Staff Dashboard (Coming Soon)
- Real-time order queue
- Order status management
- Customer notifications

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Database credentials (Neon PostgreSQL)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Setup Environment Variables
Create `.env.local` file in the project root:

```env
DATABASE_URL="postgresql://neondb_owner:npg_rUuXWTxYeS07@ep-jolly-poetry-a4wtflp6-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dtr1tnutd"
CLOUDINARY_API_KEY="996924146567939"
CLOUDINARY_API_SECRET="WshNRCdR45yOImVBoMxCCeLrFY"
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Initialize Database
```bash
npm run db:push
```

### Step 4: Seed Demo Data
```bash
npm run seed
```

This creates:
- 10 menu items (all drinks with sizes, ingredients, allergens)
- 12 add-ons (extra shots, syrups, milk alternatives)
- 3 sample orders for testing

### Step 5: Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 📱 User Flow

### 1. Welcome Screen
- Customer scans QR code at table
- Enters table number
- Clicks "Start Ordering"

### 2. Menu Screen
- Browse categories (Iced Drinks, Hot Drinks)
- View drink cards with descriptions
- Click to customize

### 3. Item Details
- See full description, ingredients, allergens
- Choose size
- Adjust sugar level with slider
- Add extras
- Review price
- Add to cart

### 4. Shopping Cart
- View all items with customizations
- Edit quantities
- Remove items
- See total price
- Proceed to checkout

### 5. Checkout
- Review order summary
- Select payment method
- Get payment code (for cash) or QR code
- Place order

### 6. Order Confirmation
- See order number/code
- Copy code to clipboard
- View payment instructions
- Return to menu or wait for order

---

## 🎨 Design Features

### Color Scheme
- **Primary**: Amber/Orange (Coffee theme)
- **Accents**: Green (success), Blue (cash), Purple (GCash), Red (PayMaya)
- **Background**: Gradient from amber to orange

### Responsive Breakpoints
- **Mobile**: Full-width, optimized touch targets
- **Tablet**: 2-column grid
- **Desktop**: 3-4 column grid

### UI Components
- Smooth animations and transitions
- Gradient buttons with hover effects
- Card-based layout
- Modal dialogs for customization
- Floating action buttons (mobile)
- Toast notifications (coming soon)

---

## 📊 Database Schema

### MenuItem
- id, name, description, price
- image, category
- ingredients (JSON), allergens (JSON), sizes (JSON)

### Order
- id, tableNumber, branch
- status (PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED)
- paymentStatus (UNPAID, PAID, REFUNDED)
- paymentMethod (CASH, GCASH, PAYMAYA, CARD)
- totalAmount, paymentCode, estimatedTime

### OrderItem
- id, orderId, menuItemId, quantity
- size, sugarLevel, itemTotal
- notes (special instructions)

### OrderAddOn
- id, orderItemId, addOnId, quantity

### AddOn
- id, name, price, menuItemId

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Database
npm run db:push         # Push schema to database
npm run db:studio       # Open Prisma Studio
npm run seed            # Seed demo data

# Build
npm run build           # Build for production
npm start               # Start production server

# Lint
npm run lint            # Run ESLint
```

---

## 📂 Project Structure

```
pos/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── menu/          # Menu API
│   │   │   ├── orders/        # Orders API
│   │   │   └── ...
│   │   ├── cart/              # Cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── staff/             # Staff dashboard
│   │   ├── page.tsx           # Home/Menu page
│   │   └── layout.tsx
│   ├── components/
│   │   ├── MenuCard.tsx       # Menu item card
│   │   ├── ItemModal.tsx      # Item customization modal
│   │   └── WelcomeScreen.tsx  # Welcome screen
│   └── store/
│       └── cartStore.ts       # Zustand cart state
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
├── public/                    # Static files
└── package.json
```

---

## 🎯 Key Features Implemented

✅ **Welcome Screen**
- Beautiful gradient background
- Animated logo
- Table number display
- Engaging call-to-action

✅ **Menu System**
- Category filtering
- Responsive grid layout
- Item cards with descriptions
- Add-on indicators

✅ **Customization Modal**
- Size selection
- Sugar level slider
- Ingredient display
- Allergen warnings
- Add-on selection
- Price calculation

✅ **Shopping Cart**
- Item management
- Size and sugar level display
- Add-on management
- Total calculation
- Mobile-optimized

✅ **Checkout**
- Order summary
- 3 payment methods
- Payment instructions
- Order confirmation

✅ **Responsive Design**
- Mobile-first approach
- Touch-friendly buttons
- Optimized spacing
- Floating action buttons
- Hamburger menu

✅ **Data Management**
- Zustand state management
- Persistent cart
- Table number tracking
- Real-time calculations

---

## 🔐 Security Notes

- API routes validate all inputs
- Database queries use Prisma ORM (SQL injection safe)
- Environment variables for sensitive data
- CORS headers configured
- Input sanitization on forms

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Push to GitHub, connect to Vercel
```

### Docker
```bash
docker build -t flitra-cafe .
docker run -p 3000:3000 flitra-cafe
```

---

## 📞 Support & Troubleshooting

### "Cannot connect to database"
- Verify `.env.local` file exists
- Check DATABASE_URL is correct
- Ensure Neon database is active

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### "Module not found"
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### "Prisma schema out of sync"
```bash
npm run db:push
npm run seed
```

---

## 📈 Future Enhancements

- [ ] Real-time order tracking with WebSockets
- [ ] Staff dashboard with order management
- [ ] Email/SMS notifications
- [ ] Loyalty program integration
- [ ] Analytics dashboard
- [ ] Multi-branch support
- [ ] Inventory management
- [ ] Advanced reporting

---

## 📝 License

Built for Flitra Café © 2025

---

## 🎉 You're All Set!

Your Flitra Café ordering system is ready to go. Start taking orders and delight your customers with a smooth, beautiful ordering experience!

**Happy ordering! ☕**
