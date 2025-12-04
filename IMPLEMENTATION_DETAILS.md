# Staff Login System - Implementation Details

## 📋 Complete Technical Overview

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT SIDE (React)                   │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ┌──────────────────┐      ┌──────────────────┐         │
│  │  Login Page      │      │  Staff Dashboard │         │
│  │  /staff-login    │      │  /staff          │         │
│  └────────┬─────────┘      └────────┬─────────┘         │
│           │                         │                    │
│           └─────────────┬───────────┘                    │
│                         │                                │
│                    localStorage                          │
│                  (staffToken, staffName)                 │
│                         │                                │
└─────────────────────────┼────────────────────────────────┘
                          │
                   HTTP Requests
                          │
┌─────────────────────────┼────────────────────────────────┐
│                    SERVER SIDE (Next.js)                  │
├─────────────────────────┼────────────────────────────────┤
│                         │                                │
│  ┌──────────────────────▼──────────────────────┐        │
│  │         API Routes (Route Handlers)         │        │
│  ├──────────────────────────────────────────────┤        │
│  │  POST   /api/staff/login                    │        │
│  │  GET    /api/orders                         │        │
│  │  PATCH  /api/orders/{id}                    │        │
│  └──────────────────────────────────────────────┘        │
│                         │                                │
│                    Prisma ORM                            │
│                         │                                │
│  ┌──────────────────────▼──────────────────────┐        │
│  │      PostgreSQL Database (Neon)             │        │
│  ├──────────────────────────────────────────────┤        │
│  │  • MenuItem                                 │        │
│  │  • Order                                    │        │
│  │  • OrderItem                                │        │
│  │  • AddOn                                    │        │
│  └──────────────────────────────────────────────┘        │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

### Login Process
```
User Input (username, password)
         ↓
POST /api/staff/login
         ↓
Validate Credentials
         ↓
Generate Token
         ↓
Return Token + User Info
         ↓
Store in localStorage
         ↓
Redirect to /staff
         ↓
Dashboard Loads
```

### Session Management
```
localStorage.setItem('staffToken', token)
localStorage.setItem('staffName', name)
         ↓
On Page Load:
  - Check if token exists
  - If not → Redirect to login
  - If yes → Load dashboard
         ↓
On Logout:
  - Remove token from localStorage
  - Remove name from localStorage
  - Redirect to login
```

---

## 📁 File Structure & Code

### 1. Login Page (`src/app/staff-login/page.tsx`)

**Key Features:**
- Beautiful gradient background
- Username and password inputs
- Password visibility toggle
- Demo credentials display
- Error handling with alerts
- Responsive design

**State Management:**
```typescript
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [showPassword, setShowPassword] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
```

**Login Handler:**
```typescript
const handleLogin = async (e: React.FormEvent) => {
  // 1. Prevent default form submission
  // 2. Validate inputs
  // 3. Send POST request to /api/staff/login
  // 4. Store token in localStorage
  // 5. Show success alert
  // 6. Redirect to /staff
}
```

---

### 2. Login API (`src/app/api/staff/login/route.ts`)

**Credentials Storage:**
```typescript
const STAFF_CREDENTIALS = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    role: 'ADMIN',
  },
  // ... more credentials
]
```

**Validation Logic:**
```typescript
1. Extract username and password from request
2. Find matching staff member
3. If found:
   - Generate token
   - Return user info
4. If not found:
   - Return 401 Unauthorized
```

**Token Generation:**
```typescript
const token = Buffer.from(`${staff.id}:${Date.now()}`).toString('base64')
```

---

### 3. Staff Dashboard (`src/app/staff/page.tsx`)

**Authentication Check:**
```typescript
useEffect(() => {
  const token = localStorage.getItem('staffToken')
  const name = localStorage.getItem('staffName')
  
  if (!token) {
    router.push('/staff-login')
    return
  }
  
  setStaffName(name || 'Staff')
  // Load orders...
}, [router])
```

**Auto-Refresh:**
```typescript
const fetchOrders = async () => {
  // Fetch from /api/orders
}

// Refresh every 5 seconds
const interval = setInterval(fetchOrders, 5000)
return () => clearInterval(interval)
```

**Status Update:**
```typescript
const handleStatusChange = async (orderId: string, newStatus: string) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  })
  // Update local state
}
```

**Logout:**
```typescript
const handleLogout = async () => {
  localStorage.removeItem('staffToken')
  localStorage.removeItem('staffName')
  await showSuccessAlert('Logged Out', '...')
  router.push('/staff-login')
}
```

---

### 4. Middleware (`src/middleware.ts`)

**Route Protection:**
```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  if (pathname === '/staff') {
    const token = request.cookies.get('staffToken')?.value
    
    if (!token) {
      return NextResponse.redirect(new URL('/staff-login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/staff/:path*'],
}
```

---

## 🎨 Responsive Design Implementation

### Tailwind Breakpoints
```
Mobile:  < 640px   (sm)
Tablet:  640-1024px (md)
Desktop: > 1024px  (lg)
```

### Grid Responsive
```typescript
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
```

### Typography Responsive
```typescript
// Mobile: smaller text
// Desktop: larger text
<h1 className="text-xl md:text-2xl font-bold">
  Staff Dashboard
</h1>
```

### Padding Responsive
```typescript
// Mobile: smaller padding
// Desktop: larger padding
<div className="p-3 md:p-4 lg:p-6">
```

### Display Responsive
```typescript
// Hidden on mobile, visible on desktop
<div className="hidden md:flex items-center gap-6">

// Visible on mobile, hidden on desktop
<button className="md:hidden">Menu</button>
```

---

## 🔄 Data Flow

### Order Fetching
```
Dashboard Mounts
         ↓
Check Authentication
         ↓
Fetch /api/orders
         ↓
Parse JSON Response
         ↓
Update State: setOrders(data)
         ↓
Render Order Cards
         ↓
Set Auto-Refresh Interval (5s)
```

### Order Status Update
```
User Clicks Status Button
         ↓
handleStatusChange(orderId, newStatus)
         ↓
PATCH /api/orders/{orderId}
  Body: { status: newStatus }
         ↓
Server Updates Database
         ↓
Return Updated Order
         ↓
Update Local State
         ↓
Show Success Alert
         ↓
UI Re-renders
```

### Payment Confirmation
```
User Clicks "✓ Confirm"
         ↓
handlePaymentConfirm(orderId)
         ↓
PATCH /api/orders/{orderId}
  Body: { paymentStatus: 'PAID' }
         ↓
Server Updates Database
         ↓
Return Updated Order
         ↓
Update Local State
         ↓
Show Success Alert
         ↓
Button Disappears
```

---

## 🎯 State Management

### Component State
```typescript
// Orders
const [orders, setOrders] = useState<Order[]>([])

// UI
const [loading, setLoading] = useState(true)
const [filter, setFilter] = useState<string>('all')
const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
const [refreshing, setRefreshing] = useState(false)

// User
const [staffName, setStaffName] = useState<string>('')

// Tracking
const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
```

### Filtering Logic
```typescript
const filteredOrders = orders.filter((order) => {
  if (filter === 'all') return true
  if (filter === 'pending') 
    return order.status === 'PENDING' || order.status === 'CONFIRMED'
  if (filter === 'preparing') 
    return order.status === 'PREPARING'
  if (filter === 'ready') 
    return order.status === 'READY'
  return true
})
```

---

## 🎨 UI Components

### Order Card Structure
```
┌─────────────────────────────────┐
│ Header (Gradient Background)    │
│ • Table Number                  │
│ • Order ID                      │
│ • Timestamp                     │
├─────────────────────────────────┤
│ Items Section (Scrollable)      │
│ • Item Name & Quantity          │
│ • Add-ons List                  │
├─────────────────────────────────┤
│ Actions Section                 │
│ • Payment Status & Confirm Btn  │
│ • Order Status Buttons          │
│ • Payment Code (if applicable)  │
│ • Total Amount                  │
└─────────────────────────────────┘
```

### Color Coding
```
Status Colors:
- PENDING:    Yellow (bg-yellow-100)
- CONFIRMED:  Blue (bg-blue-100)
- PREPARING:  Orange (bg-orange-100)
- READY:      Green (bg-green-100)

Payment Colors:
- UNPAID:     Red (bg-red-100)
- PAID:       Green (bg-green-100)
```

---

## 📊 API Response Examples

### Login Response
```json
{
  "token": "MTo3MDI2NzQ0NjE5MjU=",
  "id": "1",
  "name": "Admin User",
  "username": "admin",
  "role": "ADMIN"
}
```

### Orders Response
```json
[
  {
    "id": "clp1234567890",
    "tableNumber": 1,
    "status": "PREPARING",
    "paymentStatus": "PAID",
    "totalAmount": 250.00,
    "paymentCode": "ABC123",
    "createdAt": "2024-11-29T14:30:00Z",
    "orderItems": [
      {
        "id": "item1",
        "quantity": 2,
        "size": "MEDIUM",
        "sugarLevel": 75,
        "menuItem": {
          "name": "Iced Latte"
        },
        "addOns": [
          {
            "id": "addon1",
            "quantity": 1,
            "addOn": {
              "name": "Vanilla Syrup"
            }
          }
        ]
      }
    ]
  }
]
```

---

## 🔒 Security Considerations

### Current Implementation
- Token stored in localStorage
- Basic credential validation
- No password hashing
- No rate limiting

### Production Recommendations
```typescript
// 1. Use JWT with expiration
const token = jwt.sign(
  { id: staff.id, role: staff.role },
  process.env.JWT_SECRET,
  { expiresIn: '8h' }
)

// 2. Hash passwords
const hashedPassword = await bcrypt.hash(password, 10)

// 3. Validate token on requests
const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

// 4. Use secure cookies
response.cookies.set('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
})

// 5. Add rate limiting
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5
})
```

---

## 🚀 Performance Optimizations

### Implemented
- Auto-refresh every 5 seconds (configurable)
- Manual refresh with visual feedback
- Lazy loading of order items
- Responsive images
- CSS transitions for smooth animations
- Efficient state updates

### Potential Improvements
```typescript
// 1. Pagination
const [page, setPage] = useState(1)
const itemsPerPage = 10
const paginatedOrders = filteredOrders.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
)

// 2. Memoization
const memoizedOrders = useMemo(
  () => filteredOrders,
  [filteredOrders, filter]
)

// 3. Debouncing
const debouncedRefresh = useCallback(
  debounce(() => handleManualRefresh(), 500),
  []
)

// 4. Virtual Scrolling
import { FixedSizeList } from 'react-window'
```

---

## 📱 Mobile Optimization

### Touch Targets
- Minimum 44px × 44px buttons
- Adequate spacing between interactive elements
- Large tap areas for status buttons

### Viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Mobile Menu
- Hamburger menu for navigation
- Collapsible sections
- Full-width buttons
- Touch-friendly spacing

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Test login validation
test('should validate credentials', () => {
  expect(validateCredentials('admin', 'admin123')).toBe(true)
  expect(validateCredentials('admin', 'wrong')).toBe(false)
})

// Test filtering
test('should filter orders by status', () => {
  const orders = [
    { status: 'PENDING' },
    { status: 'READY' }
  ]
  const filtered = filterByStatus(orders, 'READY')
  expect(filtered).toHaveLength(1)
})
```

### Integration Tests
```typescript
// Test login flow
test('should login and redirect to dashboard', async () => {
  // 1. Navigate to login
  // 2. Enter credentials
  // 3. Click login
  // 4. Verify redirect to /staff
  // 5. Verify token in localStorage
})

// Test order updates
test('should update order status', async () => {
  // 1. Login
  // 2. Click status button
  // 3. Verify API call
  // 4. Verify UI update
})
```

---

## 📊 Monitoring & Logging

### Recommended Logging
```typescript
// Login attempts
console.log(`Login attempt: ${username} at ${new Date()}`)

// Order updates
console.log(`Order ${orderId} status changed to ${newStatus}`)

// Errors
console.error(`Failed to fetch orders: ${error.message}`)

// Performance
console.time('fetchOrders')
// ... fetch logic
console.timeEnd('fetchOrders')
```

### Error Tracking
```typescript
// Sentry integration
import * as Sentry from "@sentry/nextjs"

try {
  // ... code
} catch (error) {
  Sentry.captureException(error)
}
```

---

## 🔄 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] JWT secret configured
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Error logging setup
- [ ] Performance monitoring
- [ ] Security headers set
- [ ] Database backups configured

---

**Status**: ✅ Complete Implementation
**Last Updated**: November 29, 2024
**Version**: 1.0
