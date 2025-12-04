# 🧪 Payment Flow Testing Guide

## Quick Test Scenario

### **Test Case: Complete Jollibee-Style Payment Flow**

---

## 🎬 Step-by-Step Testing

### **1. Start the Application**
```bash
npm run dev
```
- App runs on `http://localhost:3001` (or 3000 if available)
- Wait for "Ready in X.Xs" message

---

### **2. Customer Orders (Browser 1)**

#### **2.1 Enter Table Number**
- Go to `http://localhost:3001`
- Enter table number: `1`
- Click "✓ Start Ordering"
- ✅ Should see welcome screen then menu

#### **2.2 Browse Menu**
- See 10 coffee items (5 Iced, 5 Hot)
- Click on any item (e.g., "Iced Americano")
- ✅ Item modal should open

#### **2.3 Customize Item**
- Select size: "Medium"
- Set sugar level: 50%
- Add optional add-ons (e.g., "Extra Shot")
- Click "Add to Cart"
- ✅ Should see success notification

#### **2.4 Add More Items**
- Add 2-3 more items
- ✅ Cart count should update in header

#### **2.5 Go to Cart**
- Click "Cart" button in header
- ✅ Should see all items with customizations
- ✅ Total price should be calculated

#### **2.6 Checkout**
- Click "Proceed to Checkout"
- ✅ Should see order summary

#### **2.7 Select Payment Method**
- Choose **"💰 Cash Payment"**
- ✅ Should see blue highlight
- ✅ Instructions should appear

#### **2.8 Place Order**
- Click "✓ Place Order"
- ✅ Should see success alert
- ✅ Should redirect to receipt page

---

### **3. Receipt Page (Browser 1)**

#### **3.1 View Receipt**
- ✅ Should see:
  - Order Number (e.g., `CMIMKQ0R`)
  - Table Number: `#1`
  - Payment Method: `CASH`
  - Date & Time
  - All order items with quantities
  - Total Amount (e.g., `₱170.00`)
  - QR Code for payment
  - Clear instructions

#### **3.2 Test Print**
- Click "🖨️ Print Receipt"
- ✅ Browser print dialog should open
- ✅ Receipt should be formatted for printing
- Cancel print dialog

#### **3.3 Test Download**
- Click "📥 Download"
- ✅ Should download `receipt-[orderId].txt`
- ✅ File should contain receipt details

#### **3.4 Go to Cashier**
- Click "✓ Go to Cashier & Track Order"
- ✅ Should redirect to order tracking page
- ✅ Should see order status (PENDING)

---

### **4. Staff Dashboard (Browser 2)**

#### **4.1 Open Staff Dashboard**
- Go to `http://localhost:3001/staff`
- ✅ Should redirect to login page

#### **4.2 Login**
- Username: `admin`
- Password: `admin123`
- Click "Login"
- ✅ Should see staff dashboard

#### **4.3 View Orders**
- ✅ Should see the order you just created
- ✅ Order card should show:
  - Table Number: `🪑 Table 1`
  - Order ID (first 8 chars)
  - Time created
  - All items listed
  - Payment Status: `UNPAID` (red badge)
  - Order Status buttons

#### **4.4 Confirm Payment**
- Click **"✓ Confirm"** button next to payment status
- ✅ Should see success alert
- ✅ Payment status should change to `PAID` (green badge)

#### **4.5 Update Order Status**
- Click **"PREPARING"** button
- ✅ Order status should change to `PREPARING` (orange badge)
- Click **"READY"** button
- ✅ Order status should change to `READY` (green badge)

---

### **5. Order Tracking (Browser 1)**

#### **5.1 Check Order Status**
- Go back to order tracking page (or refresh)
- ✅ Should see order status updated to `READY`
- ✅ Visual timeline should show progress
- ✅ Should see notification "Your order is ready!"

#### **5.2 Auto-Refresh**
- Wait 5 seconds
- ✅ Page should auto-refresh
- ✅ Status should remain `READY`

---

### **6. Test Multiple Orders**

#### **6.1 Create Second Order (Browser 1)**
- Go back to menu: `http://localhost:3001`
- Enter table number: `2`
- Order different items
- Select **"📱 GCash Payment"**
- Place order
- ✅ Should see receipt with different order number

#### **6.2 View on Staff Dashboard (Browser 2)**
- Refresh staff dashboard
- ✅ Should see both orders
- ✅ First order: Table 1, PAID, READY
- ✅ Second order: Table 2, UNPAID, PENDING

#### **6.3 Confirm Second Payment**
- Click "✓ Confirm" for Table 2
- ✅ Payment status should change to `PAID`

---

## ✅ Verification Checklist

### **Customer Flow:**
- [ ] Menu loads with 10 items
- [ ] Items can be customized (size, sugar, add-ons)
- [ ] Cart updates correctly
- [ ] Checkout shows all items
- [ ] Payment method selection works
- [ ] Order is created successfully

### **Receipt Page:**
- [ ] Receipt displays all order details
- [ ] Order number is visible and readable
- [ ] QR code is displayed
- [ ] Print button works
- [ ] Download button works
- [ ] "Go to Cashier" button works
- [ ] Page is responsive on mobile

### **Staff Dashboard:**
- [ ] Login works with correct credentials
- [ ] All orders are displayed
- [ ] Payment status shows correctly (UNPAID/PAID)
- [ ] Payment confirmation button works
- [ ] Order status buttons work (CONFIRMED/PREPARING/READY)
- [ ] Real-time updates work
- [ ] Manual refresh works
- [ ] Filter buttons work (All/Pending/Preparing/Ready)

### **Order Tracking:**
- [ ] Order status updates in real-time
- [ ] Visual timeline shows progress
- [ ] Auto-refresh works every 5 seconds
- [ ] Page is responsive on mobile

### **Responsive Design:**
- [ ] Mobile (320px): Single column, touch-friendly
- [ ] Tablet (640px): Two columns, balanced
- [ ] Desktop (1024px): Three columns, full features

---

## 🐛 Troubleshooting

### **Issue: Receipt page shows error**
- ✅ **Fixed:** Removed html2canvas dependency
- Download now uses text-based format

### **Issue: Images not loading**
- ✅ **Fixed:** Added Unsplash to next.config.js

### **Issue: Database connection error**
- ✅ **Fixed:** Added fallback mock data
- App works with or without database

### **Issue: Payment confirmation not working**
- Check staff is logged in
- Verify order exists in dashboard
- Try manual refresh

---

## 📊 Expected Results

### **Successful Payment Flow:**
```
Customer Places Order
    ↓ (Receipt Generated)
Customer Goes to Cashier
    ↓ (Shows Receipt with Order Number)
Staff Confirms Payment
    ↓ (Payment Status: UNPAID → PAID)
Staff Updates Order Status
    ↓ (Status: PENDING → PREPARING → READY)
Customer Picks Up Order
    ↓ (Notified via Order Tracking Page)
Order Complete ✅
```

---

## 🎯 Key Metrics

- **Order Creation Time:** < 1 second
- **Receipt Generation:** < 500ms
- **Payment Confirmation:** < 1 second
- **Status Update:** < 1 second
- **Real-time Refresh:** Every 5 seconds
- **Response Time:** < 2 seconds

---

## 📝 Notes

- Use different table numbers for each test order
- Test on both desktop and mobile browsers
- Test all payment methods (Cash, GCash, PayMaya)
- Test with multiple items and add-ons
- Verify responsive design on different screen sizes

---

**Last Updated:** December 1, 2025
**Status:** ✅ READY FOR TESTING
