# 🏗️ System Architecture - Sit & Scan

Complete system architecture and data flow diagrams.

---

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTS                                   │
├──────────────────────────┬──────────────────────────────────────┤
│   Customer Interface     │      Staff Dashboard                  │
│   (http://localhost:3000)│      (http://localhost:3000/staff)   │
└──────────────┬───────────┴──────────────────┬────────────────────┘
               │                              │
               │ HTTP/REST                    │ HTTP/REST
               │                              │
┌──────────────▼──────────────────────────────▼────────────────────┐
│                    NEXT.JS SERVER                                 │
├────────────────────────────────────────────────────────────────┤
│  Pages:                      │  API Routes:                       │
│  - page.tsx (Menu)           │  - /api/menu                       │
│  - cart/page.tsx             │  - /api/orders                     │
│  - checkout/page.tsx         │  - /api/orders/[id]                │
│  - staff/page.tsx            │                                    │
└──────────────┬───────────────┴────────────────┬───────────────────┘
               │                                │
               │ Prisma Client                  │ Prisma Client
               │                                │
┌──────────────▼────────────────────────────────▼───────────────────┐
│                    POSTGRESQL DATABASE                             │
├────────────────────────────────────────────────────────────────┤
│  Tables:                                                          │
│  - MenuItem (menu items)                                          │
│  - AddOn (add-ons)                                                │
│  - Order (orders)                                                 │
│  - OrderItem (items in orders)                                    │
│  - OrderAddOn (add-ons in order items)                            │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

### Customer Ordering Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ CUSTOMER INTERFACE                                               │
└─────────────────────────────────────────────────────────────────┘
         │
         ├─→ [1] Load Menu
         │   GET /api/menu
         │   ↓
         │   Display menu items by category
         │
         ├─→ [2] View Item Details
         │   Show modal with add-ons
         │   ↓
         │   Select add-ons
         │
         ├─→ [3] Add to Cart
         │   Zustand Store: cartStore.addItem()
         │   ↓
         │   Update cart state
         │
         ├─→ [4] Review Cart
         │   Display cart items
         │   ↓
         │   Adjust quantities/add-ons
         │
         ├─→ [5] Checkout
         │   Enter table number
         │   ↓
         │   Select payment method
         │
         ├─→ [6] Place Order
         │   POST /api/orders
         │   {
         │     tableNumber: 1,
         │     paymentMethod: "CASH",
         │     items: [...]
         │   }
         │   ↓
         │   Generate payment code
         │
         └─→ [7] Order Confirmation
             Display payment code
             Clear cart
             Show success message
```

### Staff Dashboard Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ STAFF DASHBOARD                                                  │
└─────────────────────────────────────────────────────────────────┘
         │
         ├─→ [1] Load Orders
         │   GET /api/orders
         │   ↓
         │   Display all orders
         │
         ├─→ [2] Auto-Refresh (every 5 seconds)
         │   GET /api/orders
         │   ↓
         │   Update order list
         │
         ├─→ [3] Update Order Status
         │   PATCH /api/orders/[id]
         │   { status: "PREPARING" }
         │   ↓
         │   Update database
         │
         ├─→ [4] Confirm Payment
         │   PATCH /api/orders/[id]
         │   { paymentStatus: "PAID" }
         │   ↓
         │   Update database
         │
         └─→ [5] Filter Orders
             Filter by status
             Display relevant orders
```

---

## 🗂️ Component Architecture

```
App (Root Layout)
│
├── Page (Menu)
│   ├── Header
│   │   ├── Logo
│   │   ├── Table Number Display
│   │   └── Cart Button
│   ├── Category Filter
│   └── Menu Grid
│       └── MenuCard (repeated)
│           └── ItemModal (on click)
│               ├── Item Details
│               ├── Quantity Selector
│               ├── Add-ons List
│               └── Add to Cart Button
│
├── Cart Page
│   ├── Header
│   ├── Cart Items List
│   │   └── CartItem (repeated)
│   │       ├── Item Details
│   │       ├── Quantity Controls
│   │       ├── Add-ons Display
│   │       └── Remove Button
│   ├── Price Summary
│   └── Checkout Button
│
├── Checkout Page
│   ├── Order Summary
│   ├── Payment Method Selection
│   │   ├── Cash Option
│   │   └── GCash Option
│   └── Place Order Button
│
└── Staff Dashboard
    ├── Header
    ├── Status Filters
    └── Orders Grid
        └── OrderCard (repeated)
            ├── Table Number
            ├── Order Items
            ├── Payment Status
            ├── Order Status Buttons
            └── Payment Code Display
```

---

## 🔌 API Architecture

```
API Routes
│
├── /api/menu
│   ├── GET - Fetch all menu items
│   │   Response: MenuItem[]
│   │
│   └── POST - Create menu item
│       Body: { name, description, price, image, category }
│       Response: MenuItem
│
├── /api/orders
│   ├── GET - Fetch all orders
│   │   Response: Order[] (with nested items and add-ons)
│   │
│   └── POST - Create new order
│       Body: { tableNumber, paymentMethod, items[] }
│       Response: Order (with payment code if cash)
│
└── /api/orders/[id]
    ├── GET - Fetch order details
    │   Response: Order (with full details)
    │
    └── PATCH - Update order
        Body: { status?, paymentStatus? }
        Response: Updated Order
```

---

## 💾 Database Schema Diagram

```
┌──────────────────┐
│   MenuItem       │
├──────────────────┤
│ id (PK)          │
│ name             │
│ description      │
│ price            │
│ image            │
│ category         │
│ createdAt        │
│ updatedAt        │
└────────┬─────────┘
         │ 1:N
         │
    ┌────▼──────────┐
    │   AddOn       │
    ├───────────────┤
    │ id (PK)       │
    │ name          │
    │ price         │
    │ menuItemId(FK)│
    │ createdAt     │
    │ updatedAt     │
    └───────────────┘


┌──────────────────┐
│   Order          │
├──────────────────┤
│ id (PK)          │
│ tableNumber      │
│ status           │
│ paymentStatus    │
│ paymentMethod    │
│ totalAmount      │
│ paymentCode      │
│ createdAt        │
│ updatedAt        │
└────────┬─────────┘
         │ 1:N
         │
    ┌────▼──────────────┐
    │   OrderItem       │
    ├───────────────────┤
    │ id (PK)           │
    │ orderId (FK)      │
    │ menuItemId (FK)   │
    │ quantity          │
    │ createdAt         │
    │ updatedAt         │
    └────────┬──────────┘
             │ 1:N
             │
        ┌────▼──────────────┐
        │   OrderAddOn      │
        ├───────────────────┤
        │ id (PK)           │
        │ orderItemId (FK)  │
        │ addOnId (FK)      │
        │ quantity          │
        └───────────────────┘
```

---

## 🔄 State Management Flow

```
┌─────────────────────────────────────────┐
│      Zustand Cart Store                 │
├─────────────────────────────────────────┤
│ State:                                  │
│ - items: CartItem[]                     │
│ - tableNumber: number                   │
│                                         │
│ Actions:                                │
│ - addItem(item)                         │
│ - removeItem(id)                        │
│ - updateQuantity(id, qty)               │
│ - addAddOn(cartItemId, addOn)           │
│ - removeAddOn(cartItemId, addOnId)      │
│ - setTableNumber(number)                │
│ - clearCart()                           │
│ - getTotalPrice()                       │
│ - getItemCount()                        │
└─────────────────────────────────────────┘
         │
         ├─→ Used by: Menu Page
         ├─→ Used by: Cart Page
         ├─→ Used by: Checkout Page
         └─→ Used by: ItemModal
```

---

## 🔐 Authentication & Authorization

```
Current Implementation:
├── No authentication required (demo version)
│
├── Customer Access:
│   └── Public access to menu and ordering
│
└── Staff Access:
    └── Public access to /staff dashboard
    
Future Enhancement:
├── Customer Login
│   └── Track order history
│
└── Staff Authentication
    ├── Login required
    ├── Role-based access
    └── Audit logging
```

---

## 🚀 Deployment Architecture

```
Development
├── Local Machine
├── npm run dev
└── http://localhost:3000

Production (Vercel)
├── GitHub Repository
├── Automatic Deployment
├── Global CDN
└── https://yourdomain.com

Production (Self-Hosted)
├── VPS/Server
├── Node.js + PM2
├── Nginx Reverse Proxy
├── SSL Certificate
└── https://yourdomain.com
```

---

## 📊 Request/Response Flow

### Create Order Request

```
Client Request:
POST /api/orders
Content-Type: application/json

{
  "tableNumber": 1,
  "paymentMethod": "CASH",
  "items": [
    {
      "menuItemId": "item-123",
      "quantity": 2,
      "addOns": [
        {
          "id": "addon-456",
          "name": "Extra Shot",
          "price": 30,
          "quantity": 1
        }
      ]
    }
  ]
}

Server Processing:
1. Validate input
2. Fetch menu items from DB
3. Calculate total amount
4. Generate payment code (if cash)
5. Create order in DB
6. Create order items
7. Create order add-ons

Server Response:
{
  "id": "order-789",
  "tableNumber": 1,
  "status": "PENDING",
  "paymentStatus": "UNPAID",
  "paymentMethod": "CASH",
  "totalAmount": 280,
  "paymentCode": "ABC123",
  "orderItems": [
    {
      "id": "oi-001",
      "menuItem": { "name": "Cappuccino", "price": 120 },
      "quantity": 2,
      "addOns": [...]
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## 🔄 Real-Time Updates Strategy

```
Current: Polling
├── Staff Dashboard
├── Fetch orders every 5 seconds
├── GET /api/orders
└── Update UI

Future: WebSockets
├── Real-time bidirectional communication
├── Instant order updates
├── Reduced server load
└── Better user experience
```

---

## 📈 Scalability Considerations

```
Current Architecture (Single Coffee Shop)
├── Single database
├── Single server
└── Suitable for 100-500 concurrent users

Future Scaling (Multi-Location)
├── Database replication
├── Load balancing
├── Caching layer (Redis)
├── CDN for static assets
└── Microservices architecture
```

---

## 🔒 Security Architecture

```
Data Protection
├── Environment variables for secrets
├── Database connection pooling
├── Input validation
└── Error handling

Network Security
├── HTTPS/SSL
├── CORS configuration
├── Rate limiting (future)
└── DDoS protection (future)

Application Security
├── Type-safe code (TypeScript)
├── Prepared statements (Prisma)
├── No SQL injection
└── XSS protection
```

---

## 📊 Performance Architecture

```
Frontend Optimization
├── Code splitting
├── Lazy loading
├── Image optimization
└── Responsive design

Backend Optimization
├── Database indexing
├── Query optimization
├── Connection pooling
└── Caching (future)

Deployment Optimization
├── CDN for static assets
├── Compression
├── Minification
└── Caching headers
```

---

## 🎯 System Workflow Summary

```
1. Customer Scans QR Code
   ↓
2. Enters Table Number
   ↓
3. Browses Menu (GET /api/menu)
   ↓
4. Adds Items to Cart (Zustand Store)
   ↓
5. Proceeds to Checkout
   ↓
6. Selects Payment Method
   ↓
7. Places Order (POST /api/orders)
   ↓
8. Receives Payment Code
   ↓
9. Staff Sees Order (GET /api/orders)
   ↓
10. Staff Updates Status (PATCH /api/orders/[id])
    ↓
11. Customer Picks Up Order
```

---

## 📚 Architecture Layers

```
Presentation Layer
├── React Components
├── Tailwind CSS Styling
└── Lucide Icons

Business Logic Layer
├── Zustand Store
├── API Route Handlers
└── Payment Logic

Data Access Layer
├── Prisma ORM
├── Database Queries
└── Data Validation

Data Layer
└── PostgreSQL Database
```

---

## 🔗 Integration Points

```
External Services (Optional)
├── Cloudinary
│   └── Image upload and storage
│
├── GCash
│   └── Online payment processing
│
└── Email/SMS (Future)
    └── Order notifications
```

---

This architecture is designed to be:
- ✅ Simple and maintainable
- ✅ Scalable for growth
- ✅ Secure by default
- ✅ Performant
- ✅ Easy to understand
- ✅ Production-ready

---

**Architecture is clean, modern, and ready for production! 🚀**
