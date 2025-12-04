# 🚀 RUN THE SYSTEM NOW

## ⚡ Choose Your Method

### Method 1: Windows (EASIEST) ⭐
```bash
QUICK_START.bat
```
**That's it!** The script will:
1. Install dependencies
2. Initialize database
3. Seed demo data
4. Start the server

Then visit: **http://localhost:3000**

---

### Method 2: Linux/macOS
```bash
chmod +x QUICK_START.sh
./QUICK_START.sh
```

Then visit: **http://localhost:3000**

---

### Method 3: Manual (All Platforms)

**Step 1: Install Dependencies**
```bash
npm install
```

**Step 2: Initialize Database**
```bash
npm run db:push
```

**Step 3: Seed Demo Data**
```bash
npm run seed
```

**Step 4: Start Development Server**
```bash
npm run dev
```

Then visit: **http://localhost:3000**

---

## 📱 Access Your System

| Page | URL | Purpose |
|------|-----|---------|
| **Customer Ordering** | http://localhost:3000 | Order drinks |
| **Staff Dashboard** | http://localhost:3000/staff | Manage orders |
| **Order Tracking** | http://localhost:3000/order-status?orderId=[id]&table=[num] | Track order |

---

## ✨ What You'll See

### Customer Side
1. Welcome screen with Flitra Café branding
2. Enter table number (e.g., 1)
3. Browse menu (Iced & Hot drinks)
4. Select a drink and customize
5. Add to cart (SweetAlert notification)
6. View cart
7. Checkout with payment options
8. Order confirmation with code
9. Real-time order tracking

### Staff Side
1. Dashboard with all orders
2. Filter by status
3. Update order status
4. Confirm payments
5. Auto-refreshing every 5 seconds

---

## 🎯 Test Flow

### Customer Test
```
1. Go to http://localhost:3000
2. Enter table: 1
3. Select: Iced Americano
4. Size: Medium
5. Sugar: 75%
6. Add-on: Extra Shot
7. Add to Cart (✓ Alert)
8. View Cart
9. Checkout
10. Payment: Cash
11. Place Order (✓ Alert)
12. Track Order (Real-time updates)
```

### Staff Test
```
1. Go to http://localhost:3000/staff
2. See all orders
3. Click order from Table 1
4. Change status: PENDING → PREPARING
5. Change status: PREPARING → READY
6. See auto-refresh
```

---

## 🍵 Pre-loaded Data

**10 Drinks:**
- Iced: Americano, Spanish Latte, Caramel Latte, Mocha, Cappuccino
- Hot: Americano, Spanish Latte, Caramel Latte, Mocha, Cappuccino

**12 Add-ons:**
- Extra Shot (₱30)
- Vanilla Syrup (₱20)
- Caramel Syrup (₱20)
- Whipped Cream (₱25)
- Oat Milk (₱15)
- Almond Milk (₱15)

**3 Sample Orders:**
- Table 1, 2, 3 with items

---

## 🔧 Useful Commands

```bash
# Start development server
npm run dev

# Initialize database
npm run db:push

# Seed demo data
npm run seed

# Open Prisma Studio (database GUI)
npm run db:studio

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## 🐛 Troubleshooting

### Port 3000 in use?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Database error?
```bash
npm run db:push
```

### Module not found?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Still having issues?
Check `COMPLETE_SETUP_GUIDE.md` for detailed troubleshooting

---

## 📊 System Status

✅ Database: Connected  
✅ API: Ready  
✅ UI: Complete  
✅ SweetAlert: Integrated  
✅ Order Tracking: Live  
✅ Staff Dashboard: Operational  

---

## 🎉 You're Ready!

**Pick a method above and start now!**

The system is fully functional and ready to use.

---

## 📚 Documentation

- `COMPLETE_SETUP_GUIDE.md` - Full setup guide
- `IMPLEMENTATION_SUMMARY.md` - What's included
- `SYSTEM_OVERVIEW.md` - Architecture & flows
- `WHAT_WAS_BUILT.md` - Feature list
- `FINAL_INSTRUCTIONS.md` - Quick reference

---

**Questions?** Check the documentation or review the code in `src/` directory.

**Happy ordering! ☕**
