# Complete Table Management & QR Workflow

## 🎯 End-to-End Customer Journey

### Phase 1: Customer Arrival
```
┌─────────────────────────────────────────────────────┐
│ CUSTOMER ARRIVES AT CAFÉ                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Customer walks to Table 1                          │
│  Sees QR code on table                              │
│  Scans with phone camera                            │
│                                                     │
│  QR Code: http://172.22.174.17:3000/?table=1       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 2: Ordering
```
┌─────────────────────────────────────────────────────┐
│ CUSTOMER ORDERS                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. Redirected to menu page                         │
│  2. Table number pre-filled (Table 1)               │
│  3. Browses menu                                    │
│  4. Selects "Medium Ice Coffee" (₱145)              │
│  5. Adds to cart                                    │
│  6. Proceeds to checkout                            │
│  7. Selects payment method (Cash)                   │
│  8. Places order                                    │
│                                                     │
│  ✅ Order created in database                       │
│  ✅ Table 1 auto-marked as OCCUPIED                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 3: Staff Notification
```
┌─────────────────────────────────────────────────────┐
│ STAFF DASHBOARD (Real-time)                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Staff sees new order:                              │
│  - Table 1 (🪑)                                     │
│  - 1x Medium Ice Coffee (₱145)                      │
│  - Status: PENDING                                  │
│  - Payment: CASH (Code: ABC123)                     │
│                                                     │
│  Staff clicks "PREPARING" button                    │
│                                                     │
│  ✅ Order status updated                            │
│  ✅ Customer notified (sound + browser alert)       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 4: Preparation
```
┌─────────────────────────────────────────────────────┐
│ BARISTA PREPARES DRINK                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Barista sees order on screen                       │
│  Prepares Medium Ice Coffee                         │
│  Takes ~3 minutes                                   │
│                                                     │
│  Staff clicks "READY" button                        │
│                                                     │
│  ✅ Order marked as READY                           │
│  ✅ Customer notified immediately                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 5: Customer Notification
```
┌─────────────────────────────────────────────────────┐
│ CUSTOMER RECEIVES NOTIFICATION                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🔊 Sound alert plays (800Hz beep)                  │
│  📳 Device vibrates (if enabled)                    │
│  🔔 Browser notification appears:                   │
│     "Order Update"                                  │
│     "Your order is ready for pickup!"               │
│                                                     │
│  Customer sees order status page updated:           │
│  Status: READY ✅                                   │
│  Progress: 100%                                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 6: Pickup
```
┌─────────────────────────────────────────────────────┐
│ CUSTOMER PICKS UP DRINK                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Customer goes to counter                           │
│  Shows payment code (if cash): ABC123               │
│  Receives Medium Ice Coffee                         │
│  Enjoys drink at Table 1                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 7: Table Cleanup
```
┌─────────────────────────────────────────────────────┐
│ CUSTOMER LEAVES & STAFF MANAGES TABLE                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Customer finishes and leaves                       │
│  Table 1 is now empty                               │
│                                                     │
│  Staff opens Table Manager:                         │
│  1. Click Coffee Cup Icon (🪑) in header             │
│  2. Table Manager modal opens                       │
│  3. Find Table 1 (shows RED/OCCUPIED)               │
│  4. Click "✓ Clear" button                          │
│  5. Confirm action                                  │
│                                                     │
│  ✅ Table 1 marked as AVAILABLE (GREEN)             │
│  ✅ QR code ready for next customer                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Phase 8: Next Customer
```
┌─────────────────────────────────────────────────────┐
│ READY FOR NEXT CUSTOMER                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Table 1 is now:                                    │
│  ✅ Clean                                           │
│  ✅ Available (GREEN status)                        │
│  ✅ QR code ready to scan                           │
│                                                     │
│  Next customer arrives                              │
│  Scans QR code on Table 1                           │
│  Process repeats...                                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔄 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER SIDE                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. QR Scanner                                              │
│     └─ Scans table QR code                                  │
│        └─ Redirects to menu with table number               │
│                                                             │
│  2. Menu & Ordering                                         │
│     └─ Browse items                                         │
│        └─ Customize (size, sugar, add-ons)                  │
│           └─ Add to cart                                    │
│              └─ Checkout                                    │
│                 └─ Place order                              │
│                                                             │
│  3. Order Status Page                                       │
│     └─ Auto-refresh every 3 seconds                         │
│        └─ Receive notifications (sound + browser)           │
│           └─ See real-time status updates                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    STAFF SIDE                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Staff Dashboard                                         │
│     └─ View all active orders                               │
│        └─ See table numbers                                 │
│           └─ Update order status                            │
│              └─ Notify customers                            │
│                                                             │
│  2. Table Manager (NEW!)                                    │
│     └─ View all table statuses                              │
│        └─ Mark tables as AVAILABLE/OCCUPIED                 │
│           └─ Manage QR codes                                │
│              └─ Real-time sync with orders                  │
│                                                             │
│  3. Order Management                                        │
│     └─ PENDING → CONFIRMED → PREPARING → READY              │
│        └─ Send notifications to customers                   │
│           └─ Confirm payments                               │
│              └─ Complete orders                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    DATABASE                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Tables (10 total)                                          │
│  ├─ Table Number (1-10)                                     │
│  ├─ Status (AVAILABLE/OCCUPIED)                             │
│  ├─ QR Code URL                                             │
│  └─ Last Updated                                            │
│                                                             │
│  Orders                                                     │
│  ├─ Order ID                                                │
│  ├─ Table Number (linked)                                   │
│  ├─ Status (PENDING/CONFIRMED/PREPARING/READY)              │
│  ├─ Items (with customizations)                             │
│  ├─ Total Amount                                            │
│  └─ Timestamps                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 API Flow

### 1. Customer Places Order
```
POST /api/orders
{
  "tableNumber": 1,
  "items": [
    {
      "menuItemId": "coffee-1",
      "quantity": 1,
      "size": "Medium",
      "price": 145,
      "sugarLevel": 100,
      "addOns": []
    }
  ],
  "paymentMethod": "CASH"
}

Response:
{
  "id": "order-123",
  "tableNumber": 1,
  "status": "PENDING",
  "totalAmount": 145,
  "paymentCode": "ABC123"
}
```

### 2. Table Auto-Updates
```
GET /api/table-status

Response:
[
  {
    "tableNumber": 1,
    "status": "OCCUPIED",  ← Auto-updated
    "isAvailable": false
  },
  ...
]
```

### 3. Staff Updates Order Status
```
PATCH /api/orders/order-123
{
  "status": "PREPARING"
}

Then:
POST /api/notifications
{
  "orderId": "order-123",
  "tableNumber": 1,
  "status": "PREPARING",
  "type": "STATUS_UPDATE"
}
```

### 4. Staff Manages Table
```
POST /api/table-status
{
  "action": "mark-available",
  "tableNumber": 1
}

Response:
{
  "success": true,
  "table": {
    "tableNumber": 1,
    "status": "AVAILABLE"
  }
}
```

---

## 📊 Table Status Lifecycle

```
┌─────────────────────────────────────────────────────┐
│                 TABLE LIFECYCLE                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  AVAILABLE (Green 🟢)                               │
│  ├─ No active orders                                │
│  ├─ QR code ready to scan                           │
│  └─ Customer can order                              │
│                                                     │
│  ↓ (Customer scans QR and places order)             │
│                                                     │
│  OCCUPIED (Red 🔴)                                  │
│  ├─ Active order exists                             │
│  ├─ Order being prepared                            │
│  └─ Customer waiting                                │
│                                                     │
│  ↓ (Order completed, customer leaves)               │
│                                                     │
│  AVAILABLE (Green 🟢)                               │
│  ├─ Staff clicks "Clear"                            │
│  ├─ Table cleaned                                   │
│  └─ Ready for next customer                         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Key Integration Points

### 1. QR Scanner → Menu
```
QR Code scanned
    ↓
URL: http://172.22.174.17:3000/?table=1
    ↓
Menu page loads with table pre-filled
    ↓
Customer can start ordering immediately
```

### 2. Order Placement → Table Status
```
Customer places order
    ↓
POST /api/orders (with tableNumber)
    ↓
Order created in database
    ↓
GET /api/table-status (auto-updates)
    ↓
Table 1 marked as OCCUPIED
```

### 3. Order Status → Customer Notification
```
Staff updates order to READY
    ↓
PATCH /api/orders (status: READY)
    ↓
POST /api/notifications
    ↓
Customer receives:
├─ Sound alert (800Hz beep)
├─ Browser notification
├─ Vibration (if enabled)
└─ Order status page updates
```

### 4. Order Completion → Table Management
```
Order completed
    ↓
Staff opens Table Manager
    ↓
Clicks "Clear" on Table 1
    ↓
POST /api/table-status (mark-available)
    ↓
Table 1 status: AVAILABLE
    ↓
QR code ready for next customer
```

---

## ✅ Complete Feature Checklist

- [x] QR code generation for tables
- [x] QR scanner integration
- [x] Menu ordering with table number
- [x] Order placement with pricing
- [x] Staff dashboard with orders
- [x] Order status management (PENDING → READY)
- [x] Customer notifications (sound + browser)
- [x] Table status tracking
- [x] **Table Manager UI** (NEW!)
- [x] Mark table as available/occupied
- [x] Real-time table status updates
- [x] Mobile responsive design
- [x] Error handling
- [x] Payment confirmation
- [x] Receipt generation

---

## 🚀 Getting Started

### For Customers
1. Scan QR code on table
2. Browse menu
3. Place order
4. Wait for notification
5. Pick up drink

### For Staff
1. Log into dashboard
2. See incoming orders
3. Update order status
4. Open Table Manager
5. Mark tables as available/occupied

---

## 📞 Support

For issues or questions, refer to:
- `TABLE_MANAGEMENT_GUIDE.md` - Detailed guide
- `TABLE_MANAGEMENT_SUMMARY.md` - Quick reference
- `VERIFICATION_GUIDE.md` - Testing procedures

---

**Status**: ✅ **FULLY FUNCTIONAL**

**Version**: 1.0.0  
**Date**: December 3, 2024  
**All Features**: Production Ready
