# Staff Dashboard - Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start the Server
```bash
npm run dev
```
Server will run at: `http://localhost:3000`

### Step 2: Access Staff Login
**Option A - From Main Menu:**
1. Go to http://localhost:3000
2. Click "Staff" button in header or mobile menu

**Option B - Direct:**
1. Go to http://localhost:3000/staff-login

### Step 3: Login with Demo Credentials
```
Username: admin
Password: admin123
```
Then click "Login to Dashboard"

---

## 📊 Dashboard Overview

```
┌─────────────────────────────────────────────────────────┐
│  ☕ Staff Dashboard  Welcome, Admin User  🔄 🚪         │
│  Total Orders: 5  |  Last Refresh: 14:32:45             │
├─────────────────────────────────────────────────────────┤
│  📊 All  |  ⏳ Pending  |  👨‍🍳 Preparing  |  ✅ Ready       │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ 🪑 Table 1   │  │ 🪑 Table 2   │  │ 🪑 Table 3   │   │
│  │ #abc12345    │  │ #def67890    │  │ #ghi34567    │   │
│  │ ⏰ 14:30:15  │  │ ⏰ 14:25:30  │  │ ⏰ 14:20:45  │   │
│  │              │  │              │  │              │   │
│  │ 📋 Items:    │  │ 📋 Items:    │  │ 📋 Items:    │   │
│  │ 2x Iced Latte│  │ 1x Hot Coffee│  │ 3x Cappuccino│   │
│  │ • 1x Vanilla │  │ • 2x Sugar   │  │ • 1x Honey   │   │
│  │              │  │              │  │              │   │
│  │ 💳 UNPAID    │  │ 💳 PAID      │  │ 💳 PAID      │   │
│  │ ✓ Confirm    │  │              │  │              │   │
│  │              │  │              │  │              │   │
│  │ 👨‍🍳 Status:   │  │ 👨‍🍳 Status:   │  │ 👨‍🍳 Status:   │   │
│  │ ✓ CONFIRMED  │  │ 👨‍🍳 PREPARING │  │ ✅ READY     │   │
│  │              │  │              │  │              │   │
│  │ 💵 ₱250.00   │  │ 💵 ₱180.00   │  │ 💵 ₱320.00   │   │
│  └──────────────┘  └──────────────┘  └──────────────┘   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎮 Dashboard Controls

### Top Bar
| Button | Function | Location |
|--------|----------|----------|
| 🔄 | Manual Refresh | Top Right |
| 🚪 | Logout | Top Right |
| ☰ | Mobile Menu | Mobile Only |

### Filter Buttons
| Filter | Shows |
|--------|-------|
| 📊 All | All orders |
| ⏳ Pending | New & confirmed orders |
| 👨‍🍳 Preparing | Orders being made |
| ✅ Ready | Completed orders |

### Order Card Actions
| Action | Button | Result |
|--------|--------|--------|
| Confirm Payment | ✓ Confirm | Changes UNPAID → PAID |
| Update Status | Status Button | Changes order state |
| View Details | Click Card | Shows full details |

---

## 📱 Responsive Layouts

### Mobile (320px - 640px)
```
┌─────────────────────┐
│ ☕ Staff  🔄 🚪 ☰   │
├─────────────────────┤
│ 📊 All ⏳ Pending    │
│ 👨‍🍳 Prep ✅ Ready    │
├─────────────────────┤
│ ┌─────────────────┐ │
│ │ 🪑 Table 1      │ │
│ │ Items...        │ │
│ │ Status...       │ │
│ │ ₱250.00         │ │
│ └─────────────────┘ │
│ ┌─────────────────┐ │
│ │ 🪑 Table 2      │ │
│ │ Items...        │ │
│ │ Status...       │ │
│ │ ₱180.00         │ │
│ └─────────────────┘ │
└─────────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────┐
│ ☕ Staff Dashboard  🔄 🚪        │
├──────────────────────────────────┤
│ 📊 All | ⏳ Pending | 👨‍🍳 Prep | ✅ │
├──────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐│
│ │ 🪑 Table 1   │  │ 🪑 Table 2   ││
│ │ Items...     │  │ Items...     ││
│ │ Status...    │  │ Status...    ││
│ │ ₱250.00      │  │ ₱180.00      ││
│ └──────────────┘  └──────────────┘│
│ ┌──────────────┐  ┌──────────────┐│
│ │ 🪑 Table 3   │  │ 🪑 Table 4   ││
│ │ Items...     │  │ Items...     ││
│ │ Status...    │  │ Status...    ││
│ │ ₱320.00      │  │ ₱150.00      ││
│ └──────────────┘  └──────────────┘│
└──────────────────────────────────┘
```

### Desktop (1024px+)
```
┌────────────────────────────────────────────────────────┐
│ ☕ Staff Dashboard  Welcome, Admin  Total: 5  🔄 🚪   │
├────────────────────────────────────────────────────────┤
│ 📊 All | ⏳ Pending | 👨‍🍳 Preparing | ✅ Ready          │
├────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│ │ 🪑 Table 1   │  │ 🪑 Table 2   │  │ 🪑 Table 3   │  │
│ │ Items...     │  │ Items...     │  │ Items...     │  │
│ │ Status...    │  │ Status...    │  │ Status...    │  │
│ │ ₱250.00      │  │ ₱180.00      │  │ ₱320.00      │  │
│ └──────────────┘  └──────────────┘  └──────────────┘  │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│ │ 🪑 Table 4   │  │ 🪑 Table 5   │  │ 🪑 Table 6   │  │
│ │ Items...     │  │ Items...     │  │ Items...     │  │
│ │ Status...    │  │ Status...    │  │ Status...    │  │
│ │ ₱150.00      │  │ ₱200.00      │  │ ₱280.00      │  │
│ └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 🔄 Typical Workflow

### Order Lifecycle
```
1. Customer Places Order
   ↓
2. Order Appears on Dashboard (PENDING)
   ↓
3. Staff Confirms Payment
   ↓
4. Staff Clicks "CONFIRMED" Button
   ↓
5. Staff Clicks "PREPARING" Button (Kitchen starts)
   ↓
6. Staff Clicks "READY" Button (Order ready for pickup)
   ↓
7. Customer Picks Up Order
```

### Dashboard Actions
```
┌─────────────────────────────────────────┐
│ STEP 1: View New Order                  │
│ • Order appears with PENDING status     │
│ • Payment shows UNPAID                  │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ STEP 2: Confirm Payment                 │
│ • Click "✓ Confirm" button              │
│ • Payment status changes to PAID        │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ STEP 3: Start Preparation               │
│ • Click "PREPARING" button              │
│ • Status updates to PREPARING           │
│ • Kitchen starts making order           │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│ STEP 4: Mark Ready                      │
│ • Click "READY" button                  │
│ • Status updates to READY               │
│ • Customer notified to pick up          │
└─────────────────────────────────────────┘
```

---

## 🎯 Common Tasks

### Task 1: View All Pending Orders
1. Click "⏳ Pending" filter
2. Dashboard shows only pending orders
3. Scroll through list

### Task 2: Update Order Status
1. Find order card
2. Click desired status button
3. Status updates immediately
4. Auto-refresh shows updated state

### Task 3: Confirm Payment
1. Find order with "UNPAID" status
2. Click "✓ Confirm" button
3. Payment status changes to "PAID"
4. Order ready for preparation

### Task 4: Refresh Orders
1. Click blue "🔄" button (top right)
2. Dashboard fetches latest orders
3. Auto-refresh also happens every 5 seconds

### Task 5: Logout
1. Click red "🚪" button (top right)
2. Confirm logout
3. Redirected to login page

---

## 🔐 Demo Credentials

### Admin Account
```
Username: admin
Password: admin123
Role: ADMIN
```

### Barista Account
```
Username: barista
Password: barista123
Role: BARISTA
```

### Manager Account
```
Username: manager
Password: manager123
Role: MANAGER
```

---

## ⚡ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Login (on login page) |
| Tab | Navigate buttons |
| Escape | Close mobile menu |

---

## 🆘 Troubleshooting

### Issue: Can't Login
**Solution**: 
- Check username and password
- Try: `admin` / `admin123`
- Clear browser cache

### Issue: Orders Not Showing
**Solution**:
- Click refresh button 🔄
- Wait 5 seconds for auto-refresh
- Check if orders exist in system

### Issue: Dashboard Not Loading
**Solution**:
- Refresh page
- Check if logged in
- Clear localStorage: `localStorage.clear()`

### Issue: Mobile Menu Not Working
**Solution**:
- Click hamburger menu ☰
- Check screen width < 768px
- Try different browser

---

## 📞 Need Help?

1. **Check**: STAFF_LOGIN_GUIDE.md for detailed docs
2. **Review**: Browser console for errors
3. **Verify**: Server is running (`npm run dev`)
4. **Test**: Demo credentials work

---

**Status**: ✅ Ready to Use
**Last Updated**: November 29, 2024
**Version**: 1.0
