# 🔍 QR Code Flow - Complete Explanation

## How the QR System Works

Your Filtra Café system has a complete QR-based ordering flow. Here's exactly how it works:

---

## 📱 Customer Flow

### Step 1: Customer Scans QR Code at Table
```
Customer at Table 5 → Scans QR Code with Phone Camera
```

### Step 2: QR Code Redirects to Main Menu
```
QR Code contains: https://g2possystem-production.up.railway.app/?table=5
↓
Customer's phone opens the link
↓
Redirects to Main Menu with Table Number
```

### Step 3: Welcome Screen Shows Table Number
```
Welcome Screen displays:
"Welcome to Filtra Café!"
"Table 5 - Ready to Order?"
↓
Customer clicks "Start Ordering"
```

### Step 4: Customer Browses Menu & Orders
```
Customer sees:
- Coffee Menu
- Add-ons (Extra shots, milk, etc.)
- Prices
- Images
↓
Customer adds items to cart
```

### Step 5: Checkout & Payment
```
Customer reviews cart
↓
Selects payment method (Cash or GCash)
↓
Submits order
↓
Order sent to Staff Dashboard
```

### Step 6: Order Tracking
```
Customer sees order status:
- Preparing
- Ready
- Completed
↓
Staff updates status in real-time
```

---

## 🔧 Technical Implementation

### QR Code Generation (`/api/generate-qr`)

```typescript
// When staff generates QR codes:
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
// baseUrl = "https://g2possystem-production.up.railway.app"

const qrData = `${baseUrl}/?table=5`
// qrData = "https://g2possystem-production.up.railway.app/?table=5"

// QR code is generated with this URL embedded
```

### Main Page Handling (`/page.tsx`)

```typescript
// When customer scans QR and opens the link:
const tableFromURL = searchParams.get('table')
// tableFromURL = "5"

if (tableFromURL) {
  // Set table number in app state
  setTableNumber(5)
  
  // Show welcome screen
  setShowWelcome(true)
  
  // Mark table as occupied in database
  markTableOccupied(5)
}
```

### Environment Variables

```env
# Main app URL (used for QR generation)
NEXT_PUBLIC_BASE_URL=https://g2possystem-production.up.railway.app

# QR Scanner page (for staff to view/print QR codes)
NEXT_PUBLIC_QR_SCANNER_URL=https://g2possystem-production.up.railway.app/qr-scanner
```

---

## 🎯 Key URLs

| Page | URL | Purpose |
|------|-----|---------|
| **Main Menu** | `/` | Customer ordering page |
| **QR Scanner** | `/qr-scanner` | Staff view QR codes for printing |
| **Staff Dashboard** | `/staff` | Staff manage orders |
| **Cart** | `/cart` | Customer review items |
| **Checkout** | `/checkout` | Customer payment |

---

## 📊 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                         │
└─────────────────────────────────────────────────────────────┘

1. SCAN QR CODE
   └─→ QR Code at Table 5
       └─→ Contains: https://g2possystem.railway.app/?table=5

2. OPEN LINK
   └─→ Phone opens the URL
       └─→ Browser loads main page with table=5 parameter

3. WELCOME SCREEN
   └─→ Shows "Table 5 - Ready to Order?"
       └─→ Customer clicks "Start Ordering"

4. BROWSE MENU
   └─→ See all coffee items
       └─→ See add-ons (extra shots, milk, etc.)
       └─→ See prices and images

5. ADD TO CART
   └─→ Customer selects items
       └─→ Adds to cart
       └─→ Can modify quantities

6. CHECKOUT
   └─→ Review cart
       └─→ Select payment method
       └─→ Submit order

7. STAFF RECEIVES ORDER
   └─→ Order appears in Staff Dashboard
       └─→ Staff prepares coffee
       └─→ Updates status (Preparing → Ready → Completed)

8. CUSTOMER TRACKS ORDER
   └─→ Customer sees real-time status
       └─→ Knows when coffee is ready
       └─→ Picks up when done
```

---

## 🖨️ Staff Operations

### Generating QR Codes
1. Staff goes to `/qr-scanner`
2. Page displays QR codes for all tables (1-10)
3. Staff can:
   - Print QR codes
   - Laminate them
   - Place at each table

### Managing Orders
1. Staff goes to `/staff` (Staff Dashboard)
2. Login with staff credentials
3. See incoming orders in real-time
4. Update order status
5. Mark as ready when coffee is prepared

---

## 🔐 Security Features

### Table Tracking
- Each table is marked as "OCCUPIED" when customer scans QR
- Prevents multiple customers from using same table
- Table marked as "AVAILABLE" when order is completed

### Order Association
- Each order is linked to a specific table number
- Staff knows exactly which table to deliver to
- Prevents order mix-ups

### Session Management
- Table number stored in browser (Zustand store)
- Persists during customer's session
- Cleared when order is completed

---

## 🚀 Deployment Configuration

### Current Setup
```env
# Production URLs (Railway)
NEXT_PUBLIC_BASE_URL=https://g2possystem-production.up.railway.app
NEXT_PUBLIC_QR_SCANNER_URL=https://g2possystem-production.up.railway.app/qr-scanner
```

### QR Code Generation
When staff generates QR codes, they contain:
```
https://g2possystem-production.up.railway.app/?table=1
https://g2possystem-production.up.railway.app/?table=2
https://g2possystem-production.up.railway.app/?table=3
... and so on
```

### Customer Scans
When customer scans, they're redirected to:
```
https://g2possystem-production.up.railway.app/?table=5
↓
Main page loads with table=5 parameter
↓
Welcome screen shows "Table 5"
↓
Customer starts ordering
```

---

## ✅ Testing the QR Flow

### Local Testing
```bash
# Start development server
npm run dev

# Visit QR Scanner page
http://localhost:3000/qr-scanner

# Click on a table QR code (or scan with phone)
# Should redirect to: http://localhost:3000/?table=5

# Welcome screen should show "Table 5"
```

### Production Testing
```bash
# Visit QR Scanner page
https://g2possystem-production.up.railway.app/qr-scanner

# Scan QR code with phone
# Should redirect to: https://g2possystem-production.up.railway.app/?table=5

# Welcome screen should show "Table 5"
```

---

## 🎯 What Each Component Does

### QR Scanner Page (`/qr-scanner`)
- Generates QR codes for all tables
- Displays them in a grid
- Shows table status (Available/Occupied)
- Staff can print or screenshot

### Main Page (`/`)
- Detects table number from URL parameter
- Shows welcome screen with table number
- Displays menu items
- Handles cart and checkout

### Staff Dashboard (`/staff`)
- Shows all incoming orders
- Displays table number for each order
- Allows status updates
- Real-time order management

---

## 📝 Summary

Your QR system works like this:

1. **Staff prints QR codes** from `/qr-scanner` page
2. **QR codes are placed** at each table
3. **Customer scans QR** with phone camera
4. **Phone opens main page** with table number in URL
5. **Welcome screen shows** which table they're at
6. **Customer browses menu** and orders
7. **Order goes to staff** dashboard with table number
8. **Staff prepares** and updates status
9. **Customer tracks** order in real-time
10. **Order complete** → Table marked available

---

## 🔗 Important URLs

| Action | URL |
|--------|-----|
| View QR Codes | `https://g2possystem-production.up.railway.app/qr-scanner` |
| Customer Ordering | `https://g2possystem-production.up.railway.app/?table=5` |
| Staff Dashboard | `https://g2possystem-production.up.railway.app/staff` |
| Staff Login | `https://g2possystem-production.up.railway.app/staff-login` |

---

**Your QR system is fully functional and ready for production! 🎉**

*© 2025 Filtra Café Smart Ordering System • Made by Group 2 SIT*
