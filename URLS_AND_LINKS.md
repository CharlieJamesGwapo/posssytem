# 🌐 FILTRA CAFÉ - QUICK URLS & LINKS

## 🚀 Main Pages

### 1. View & Print QR Codes
```
http://localhost:3000/tables
```
**What you'll see:**
- All 10 table QR codes in a grid
- Print button for all codes
- Download buttons for individual codes
- Table status (Available/Occupied)

---

### 2. Main Menu (Home Page)
```
http://localhost:3000/
```
**What you'll see:**
- Menu of all coffee drinks
- Categories (Iced, Hot)
- Item cards with prices
- Add to cart functionality

---

### 3. Welcome Screen (From QR Scan)
```
http://localhost:3000/?table=1
http://localhost:3000/?table=2
... (up to table 10)
```
**What you'll see:**
- Welcome to Filtra Café
- Your Table Number (auto-detected)
- Start Ordering button

**👉 This is what happens when customer scans QR code!**

---

### 4. Shopping Cart
```
http://localhost:3000/cart
```
**What you'll see:**
- All items added to cart
- Quantity controls
- Remove items
- Cart total
- Proceed to checkout button

---

### 5. Checkout
```
http://localhost:3000/checkout
```
**What you'll see:**
- Order summary
- Itemized list
- Total amount
- Payment method selection (Cash, GCash, PayMaya)
- Confirm order button

---

### 6. Order Status / Receipt
```
http://localhost:3000/receipt?orderId=XYZ&table=2
```
**What you'll see:**
- Order confirmation receipt
- Print button
- Download button
- Order number
- Table number
- Items ordered
- Total amount

---

### 7. Order Status Tracking
```
http://localhost:3000/order-status?orderId=XYZ&table=2
```
**What you'll see:**
- Order status progress
- Current step (Confirmed/Preparing/Ready/Completed)
- Estimated time
- Items being prepared

---

## 📱 Test URLs for Each Table

Click on any to test auto-detection:

### Test Table Auto-Detection
```
Table 1:  http://localhost:3000/?table=1
Table 2:  http://localhost:3000/?table=2
Table 3:  http://localhost:3000/?table=3
Table 4:  http://localhost:3000/?table=4
Table 5:  http://localhost:3000/?table=5
Table 6:  http://localhost:3000/?table=6
Table 7:  http://localhost:3000/?table=7
Table 8:  http://localhost:3000/?table=8
Table 9:  http://localhost:3000/?table=9
Table 10: http://localhost:3000/?table=10
```

**What happens:**
- Page opens
- Automatically detects table number from URL
- Welcome screen shows that table number
- No manual input needed!

---

## 🔌 API Endpoints (For Developers)

### Get All Tables
```
GET http://localhost:3000/api/tables
```

### Create New Table
```
POST http://localhost:3000/api/tables
Content-Type: application/json

{
  "tableNumber": 11
}
```

### Get Menu
```
GET http://localhost:3000/api/menu
```

### Create Order
```
POST http://localhost:3000/api/orders
Content-Type: application/json

{
  "tableNumber": 2,
  "totalAmount": 245,
  "paymentMethod": "CASH",
  "items": [
    {
      "menuItemId": "...",
      "quantity": 1,
      "size": "Medium",
      "sugarLevel": 75,
      "addOns": [...]
    }
  ]
}
```

### Get Order
```
GET http://localhost:3000/api/orders/ORDER_ID
```

### Get QR Code (Testing)
```
GET http://localhost:3000/api/qr-tables?table=2
```

---

## 💾 Database Management

### Open Prisma Studio (View/Edit Database)
```bash
npm run db:studio
```
Opens visual database editor at: `http://localhost:5555`

---

## 🎯 Quick Navigation Map

```
┌────────────────────────────────────────────────┐
│           FILTRA CAFÉ SYSTEM                   │
└────────────────────────────────────────────────┘
         │
         ├─ CUSTOMER ENTRY
         │  └─ QR Code Scan
         │     └─ http://localhost:3000/?table=2
         │
         ├─ WELCOME SCREEN
         │  └─ Shows Table #2 (auto-detected)
         │
         ├─ MAIN MENU
         │  └─ http://localhost:3000/
         │     ├─ Browse by category
         │     ├─ View items
         │     └─ Add to cart
         │
         ├─ SHOPPING CART
         │  └─ http://localhost:3000/cart
         │     ├─ Review items
         │     ├─ Modify quantities
         │     └─ Proceed to checkout
         │
         ├─ CHECKOUT
         │  └─ http://localhost:3000/checkout
         │     ├─ Review total
         │     ├─ Select payment method
         │     └─ Confirm order
         │
         ├─ RECEIPT
         │  └─ http://localhost:3000/receipt
         │     ├─ Order confirmation
         │     ├─ Print/Download
         │     └─ Track status
         │
         └─ ADMIN / QR MANAGEMENT
            └─ http://localhost:3000/tables
               ├─ View all QR codes
               ├─ Print all QR codes
               └─ Download individual codes
```

---

## 📋 Common Tasks & URLs

### For Customers

**"I want to order"**
1. Scan QR code on table
   - Auto-opens: `http://localhost:3000/?table=X`
2. See welcome screen with your table number
3. Click "Start Ordering"
4. Browse menu at: `http://localhost:3000/`
5. Add items to cart at: `http://localhost:3000/cart`
6. Checkout at: `http://localhost:3000/checkout`
7. See receipt at: `http://localhost:3000/receipt`

**"Where's my order?"**
- Go to: `http://localhost:3000/order-status`
- See preparation progress
- Get ready notification

---

### For Staff / Admin

**"Print QR codes"**
1. Go to: `http://localhost:3000/tables`
2. Click "Print All QR Codes"
3. Print and laminate

**"Add new table"**
- API: `POST /api/tables` with `{"tableNumber": 11}`

**"View all orders"**
- Check database: `npm run db:studio`

**"View menu items"**
- API: `GET /api/menu`
- Database: `npm run db:studio`

---

## 🔗 Direct Link List

### Copy & Paste Ready
```
Home Page:
http://localhost:3000/

QR Code Management:
http://localhost:3000/tables

Menu:
http://localhost:3000/

Cart:
http://localhost:3000/cart

Checkout:
http://localhost:3000/checkout

Receipt:
http://localhost:3000/receipt

Order Status:
http://localhost:3000/order-status

Database Studio:
http://localhost:5555
(after running: npm run db:studio)
```

---

## 🧪 Testing URLs (Copy & Paste)

### Test QR Code Auto-Detection
```
http://localhost:3000/?table=1
http://localhost:3000/?table=2
http://localhost:3000/?table=3
http://localhost:3000/?table=4
http://localhost:3000/?table=5
http://localhost:3000/?table=6
http://localhost:3000/?table=7
http://localhost:3000/?table=8
http://localhost:3000/?table=9
http://localhost:3000/?table=10
```

### Test APIs
```
View Tables:
http://localhost:3000/api/tables

View Menu:
http://localhost:3000/api/menu

Generate QR for Table 2:
http://localhost:3000/api/qr-tables?table=2
```

---

## ✅ Your Complete System

| Feature | URL | Status |
|---------|-----|--------|
| QR Code Management | `/tables` | ✅ Ready |
| Main Menu | `/` | ✅ Ready |
| Shopping Cart | `/cart` | ✅ Ready |
| Checkout | `/checkout` | ✅ Ready |
| Receipt | `/receipt` | ✅ Ready |
| Order Status | `/order-status` | ✅ Ready |
| Database | `npm run db:studio` | ✅ Ready |
| API Endpoints | `/api/*` | ✅ Ready |

---

## 🎉 You're All Set!

**Everything is configured and ready to use.**

### Quick Start:
1. Open: `http://localhost:3000/tables`
2. Click: "Print All QR Codes"
3. Print and place on tables
4. Customers scan and order!

**That's it! Your system is complete!** 🚀

---

*Last Updated: December 2, 2025*
*Filtra Café - Smart Table Ordering System*
