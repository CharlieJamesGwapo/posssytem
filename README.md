# Sit & Scan - Smart Ordering System

A modern, fully functional chatbot-based ordering system for restaurants and cafes built with Next.js, Tailwind CSS, Neon PostgreSQL, and Cloudinary.

## Features

### Customer Interface
- **Menu Browsing**: Browse items by category with beautiful card layouts
- **Item Details**: View descriptions, prices, and add-ons for each item
- **Shopping Cart**: Add/remove items, adjust quantities, manage add-ons
- **Table Management**: Input table number at the start
- **Payment Options**: 
  - Cash payment with unique payment codes
  - GCash online payment integration
- **Order Confirmation**: Receive order code after successful checkout

### Staff Dashboard
- **Real-time Order Monitoring**: View all incoming orders with auto-refresh
- **Order Status Management**: Update order status (Pending → Confirmed → Preparing → Ready)
- **Payment Confirmation**: Confirm cash payments before preparing orders
- **Order Filtering**: Filter by status (All, Pending, Preparing, Ready)
- **Order Details**: View complete order information including add-ons

### Admin Features
- **Menu Management**: Add, edit, and manage menu items
- **Category Organization**: Organize items by category
- **Add-ons Management**: Create and manage item add-ons
- **Image Upload**: Upload item images via Cloudinary

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Neon PostgreSQL with Prisma ORM
- **Image Storage**: Cloudinary
- **UI Components**: Lucide React Icons
- **Real-time**: Polling (can be upgraded to WebSockets)

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (Neon recommended)
- Cloudinary account (optional, for image uploads)
- GCash merchant account (optional, for payment integration)

## Installation

1. **Clone and Install Dependencies**
```bash
cd pos
npm install
```

2. **Environment Setup**
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# GCash (optional)
NEXT_PUBLIC_GCASH_MERCHANT_ID="your_merchant_id"
GCASH_SECRET_KEY="your_secret_key"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

3. **Database Setup**
```bash
# Push Prisma schema to database
npm run db:push

# (Optional) Open Prisma Studio to manage data
npm run db:studio
```

4. **Seed Demo Data** (optional)
```bash
npm run seed
```

5. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Project Structure

```
pos/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Customer menu page
│   │   ├── cart/page.tsx            # Shopping cart
│   │   ├── checkout/page.tsx        # Payment & checkout
│   │   ├── staff/page.tsx           # Staff dashboard
│   │   ├── api/
│   │   │   ├── menu/route.ts        # Menu API
│   │   │   ├── orders/route.ts      # Orders API
│   │   │   └── orders/[id]/route.ts # Order details API
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── MenuCard.tsx             # Menu item card
│   │   └── ItemModal.tsx            # Item details modal
│   └── store/
│       └── cartStore.ts             # Zustand cart store
├── prisma/
│   └── schema.prisma                # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Usage

### For Customers

1. **Scan QR Code**: Scan the table QR code to access the ordering system
2. **Enter Table Number**: Input your table number
3. **Browse Menu**: Select items from different categories
4. **Customize Items**: Add add-ons and adjust quantities
5. **Review Cart**: Check your cart and make adjustments
6. **Checkout**: Select payment method (Cash or GCash)
7. **Receive Code**: Get your payment/order code

### For Staff

1. **Access Dashboard**: Visit `/staff` page
2. **Monitor Orders**: View incoming orders in real-time
3. **Update Status**: Change order status as you prepare items
4. **Confirm Payment**: Verify cash payments before preparing
5. **Filter Orders**: Use filters to focus on specific statuses

## API Endpoints

### Menu
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create new menu item

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order status/payment

## Database Schema

### MenuItem
- id, name, description, price, image, category, createdAt, updatedAt

### AddOn
- id, name, price, menuItemId, createdAt, updatedAt

### Order
- id, tableNumber, status, paymentStatus, paymentMethod, totalAmount, paymentCode, createdAt, updatedAt

### OrderItem
- id, orderId, menuItemId, quantity, createdAt, updatedAt

### OrderAddOn
- id, orderItemId, addOnId, quantity

## Customization

### Adding Menu Items
1. Use Prisma Studio: `npm run db:studio`
2. Or create via API: `POST /api/menu`

### Styling
- Modify `tailwind.config.js` for color scheme
- Update `src/app/globals.css` for global styles
- Coffee-themed colors: Primary (#8B4513), Secondary (#D2691E), Accent (#FFD700)

### Payment Integration
- For GCash: Implement payment gateway in checkout page
- For Cash: Customize payment code format in `src/app/api/orders/route.ts`

## Future Enhancements

- [ ] WebSocket integration for real-time notifications
- [ ] Admin panel for menu management
- [ ] Email/SMS notifications
- [ ] Order history and analytics
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Kitchen display system (KDS)
- [ ] Inventory management
- [ ] Loyalty program integration

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection limits
- Ensure firewall allows database connections

### Image Upload Issues
- Verify Cloudinary credentials
- Check image file size (max 10MB recommended)
- Ensure CORS is enabled in Cloudinary settings

### Payment Issues
- Test payment codes are generated correctly
- Verify GCash merchant credentials
- Check payment gateway API responses

## Support

For issues or questions, please refer to:
- Next.js Documentation: https://nextjs.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Neon PostgreSQL: https://neon.tech/docs

## License

MIT License - Feel free to use this project for your business.

---

**Built with ❤️ for coffee shops and restaurants**
"# possystem" 
"# posssytem" 
"# posssytem" 
"# posssytem" 
