# QR Code Table Management System - User Guide

## 🎯 Quick Start

### For Customers

#### Step 1: Click "Scan QR" Button
- On the main menu page, look for the blue **"Scan QR"** button in the header
- Available on both desktop and mobile devices

#### Step 2: View Your Table QR Code
- You'll see all available table QR codes displayed
- Each table shows:
  - **Table Number** (in a colored badge)
  - **QR Code Image**
  - **Status** (Green ✓ = Available, Red ⚠️ = Occupied)

#### Step 3: Select Your Table
- **If table is available (green)**: 
  - Tap/click the QR code
  - You'll see: "✅ Table X is now reserved for you!"
  - Automatically redirected to the menu to start ordering

- **If table is occupied (red)**:
  - You cannot select it
  - Try another available table instead

#### Step 4: Place Your Order
- Browse the menu
- Add items to your cart
- Proceed to checkout
- Your table number is automatically tracked

---

### For Staff

#### Accessing the Staff Dashboard
1. Click **"Staff"** button on main page
2. Log in with your credentials
3. You'll see the **Table Status Panel** at the top

#### Understanding the Table Status Panel

**Occupied Tables (Red Section)**
- Shows all tables currently being used by customers
- Example: "Table 1, Table 3, Table 5"
- These tables cannot be selected by new customers

**Available Tables (Green Section)**
- Shows all empty tables ready for customers
- Example: "Table 2, Table 4, Table 6, Table 7, Table 8, Table 9, Table 10"
- Customers can select these tables

**Summary Statistics**
- **Total Tables**: Total number of tables in the restaurant
- **Occupied**: Number of tables with active customers
- **Available**: Number of empty tables

#### Monitoring in Real-Time
- The panel automatically updates every 3 seconds
- No manual refresh needed
- Click **"Refresh"** button for immediate update

#### When a Customer Finishes
1. Customer completes their order and pays
2. Table is automatically marked as **AVAILABLE**
3. Status panel updates in real-time
4. Table becomes available for next customer

---

## 📊 System Status Indicators

### Customer View (QR Scanner Page)

| Status | Color | Icon | Meaning |
|--------|-------|------|---------|
| Available | Green | ✓ | Table is ready for ordering |
| Occupied | Red | ⚠️ | Table is in use, cannot select |
| Processing | Blue | ⟳ | Your selection is being processed |

### Staff View (Dashboard)

| Section | Color | Shows |
|---------|-------|-------|
| Occupied Tables | Red | Tables with active customers |
| Available Tables | Green | Empty tables ready for use |
| Summary | Amber/Green/Red | Overall statistics |

---

## 🔄 Complete Customer Journey

```
1. Customer arrives at restaurant
   ↓
2. Customer opens menu on their phone/tablet
   ↓
3. Customer clicks "Scan QR" button
   ↓
4. QR Scanner page loads showing all tables
   ↓
5. Customer sees their table number (e.g., Table 5)
   ↓
6. Customer taps Table 5 QR code
   ↓
7. System checks: Is Table 5 available?
   ├─ YES → Table marked OCCUPIED ✅
   │         Customer sees: "Table 5 is now reserved for you!"
   │         Redirected to menu
   │         Staff dashboard updates in real-time
   │
   └─ NO → Table is occupied ❌
           Customer sees: "Table 5 is currently occupied"
           Customer must select another table
   ↓
8. Customer browses menu and adds items
   ↓
9. Customer places order
   ↓
10. Order is linked to Table 5
    ↓
11. Staff sees order for Table 5
    ↓
12. Staff prepares order
    ↓
13. Order is delivered to Table 5
    ↓
14. Customer enjoys meal
    ↓
15. Customer pays and leaves
    ↓
16. Table 5 is marked AVAILABLE
    ↓
17. Next customer can select Table 5
```

---

## 🛡️ Safety Features

### Prevents Duplicate Orders
- ✅ Only one customer can order per table at a time
- ✅ Occupied tables are visually disabled
- ✅ System prevents clicking occupied tables
- ✅ Clear error messages if table is taken

### Real-Time Updates
- ✅ Staff dashboard updates every 3 seconds
- ✅ Customers see current table availability
- ✅ No stale data or outdated information

### Error Handling
- ✅ Clear alerts if something goes wrong
- ✅ Helpful error messages
- ✅ Automatic retry options
- ✅ Fallback to manual table entry

---

## 📱 Mobile vs Desktop

### Desktop View
- Full header with all buttons visible
- Larger QR code display
- Comfortable for kiosk setup

### Mobile View
- Compact header with menu button
- Touch-friendly QR code buttons
- Optimized for phone/tablet screens
- All features fully functional

---

## 🎨 Visual Examples

### QR Scanner Page
```
┌─────────────────────────────────────┐
│  Scan Your Table QR                 │
│  Tap or scan any table's QR code    │
├─────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │  1   │  │  2   │  │  3   │      │
│  │ [QR] │  │ [QR] │  │ [QR] │      │
│  │ ✓    │  │ ⚠️   │  │ ✓    │      │
│  └──────┘  └──────┘  └──────┘      │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐      │
│  │  4   │  │  5   │  │  6   │      │
│  │ [QR] │  │ [QR] │  │ [QR] │      │
│  │ ✓    │  │ ✓    │  │ ⚠️   │      │
│  └──────┘  └──────┘  └──────┘      │
└─────────────────────────────────────┘
```

### Staff Dashboard Table Status
```
┌─────────────────────────────────────┐
│  Table Status Overview              │
├─────────────────────────────────────┤
│  Occupied Tables (3)                │
│  ┌─────────────────────────────────┐│
│  │ Table 2  │ Table 5  │ Table 8   ││
│  └─────────────────────────────────┘│
│                                     │
│  Available Tables (7)               │
│  ┌─────────────────────────────────┐│
│  │ Table 1  │ Table 3  │ Table 4   ││
│  │ Table 6  │ Table 7  │ Table 9   ││
│  │ Table 10 │                      ││
│  └─────────────────────────────────┘│
│                                     │
│  Total: 10 | Occupied: 3 | Free: 7 │
└─────────────────────────────────────┘
```

---

## ❓ FAQ

**Q: What if I accidentally click the wrong table?**
A: You'll be redirected to the menu for that table. You can go back and select a different table.

**Q: Can two customers order from the same table?**
A: No. Once a table is marked occupied, no other customer can select it until the first customer finishes and pays.

**Q: How do I know if my table is available?**
A: Look for the green checkmark (✓) next to the table number. Red warning (⚠️) means it's occupied.

**Q: What if the system shows my table as occupied but it's empty?**
A: Contact staff. They can manually reset the table status in the dashboard.

**Q: Can I change tables after I start ordering?**
A: You would need to contact staff to reassign your order to a different table.

**Q: How often does the staff dashboard update?**
A: Every 3 seconds automatically, or click "Refresh" for immediate update.

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Scan QR" button not visible | Refresh page or check if on mobile menu |
| QR codes not loading | Check internet connection |
| Table shows occupied but empty | Contact staff to reset table status |
| Can't select any table | All tables may be occupied, wait for one to free up |
| Staff dashboard not updating | Click "Refresh" button or wait 3 seconds |

---

**Last Updated**: December 2, 2024
**System Status**: ✅ Fully Operational
