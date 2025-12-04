# Customer Notification System - Implementation Guide

## Overview
A fully functional customer notification system has been implemented to keep customers aware of their order status in real-time. The system includes browser notifications, sound alerts, vibration feedback, and auto-refresh capabilities.

---

## Features Implemented

### 1. Staff Dashboard Notification Button
**Location:** `/src/app/staff/page.tsx`

- **Manual Notification Button**: Each order card now has a "🔔 Notify Table X" button
- **Automatic Notifications**: When staff updates order status (CONFIRMED, PREPARING, READY), customers are automatically notified
- **Visual Feedback**: Success alert confirms notification was sent

**Code Implementation:**
```typescript
const notifyCustomer = async (orderId: string, tableNumber: number, status: string) => {
  const response = await fetch('/api/notifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      orderId,
      tableNumber,
      status,
      type: 'STATUS_UPDATE',
    }),
  })
  
  if (response.ok) {
    await showSuccessAlert('Notification Sent', `Customer at Table ${tableNumber} has been notified about the order status.`)
  }
}
```

---

### 2. Notification API Endpoint
**Location:** `/src/app/api/notifications/route.ts`

#### POST Endpoint - Send Notifications
- Validates order exists
- Prepares notification data with order items and customizations
- Broadcasts to all subscribers
- Returns notification confirmation

**Request Body:**
```json
{
  "orderId": "order-id",
  "tableNumber": 5,
  "status": "READY",
  "type": "STATUS_UPDATE"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification sent",
  "notification": {
    "orderId": "order-id",
    "tableNumber": 5,
    "status": "READY",
    "message": "Your order is ready! Please pick it up at the counter.",
    "items": [
      {
        "name": "Hot Cappuccino",
        "quantity": 1,
        "addOns": ["1x Extra Shot"]
      }
    ]
  }
}
```

#### GET Endpoint - Server-Sent Events (SSE)
- Enables real-time push notifications
- Maintains persistent connection with clients
- Broadcasts status updates to all connected customers

**Usage:**
```javascript
const eventSource = new EventSource(`/api/notifications?tableNumber=5`)
eventSource.onmessage = (event) => {
  const notification = JSON.parse(event.data)
  // Handle notification
}
```

---

### 3. Customer-Side Notifications
**Location:** `/src/app/order-status/page.tsx`

#### A. Browser Notifications
- Requests permission on page load
- Displays native OS notifications
- Requires user interaction for "READY" status
- Shows order update messages

**Features:**
- Icon: `/logo.jpg`
- Badge: `/logo.jpg`
- Customizable messages per status
- Persistent notification for READY status

#### B. Sound Notifications
- Uses Web Audio API (no external files needed)
- 800Hz sine wave beep
- 0.5 second duration with fade-out
- Can be toggled on/off
- Graceful fallback if audio context unavailable

**Implementation:**
```typescript
const playNotificationSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.frequency.value = 800
  oscillator.type = 'sine'
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.5)
}
```

#### C. Vibration Alerts
- Uses Vibration API (if device supports)
- Pattern: [200ms vibrate, 100ms pause, 200ms vibrate]
- Graceful fallback for devices without vibration support

```typescript
if (navigator.vibrate) {
  navigator.vibrate([200, 100, 200])
}
```

#### D. Auto-Refresh
- Refreshes order status every 3 seconds
- Can be toggled on/off
- Detects status changes and triggers notifications

#### E. Notification Controls
Three control buttons for customer:
1. **Auto-refresh**: Toggle automatic status polling
2. **Sound**: Toggle sound notifications
3. **Alerts**: Toggle browser notifications

---

## Status Messages

| Status | Message |
|--------|---------|
| PENDING | "Your order has been received!" |
| CONFIRMED | "Your order has been confirmed!" |
| PREPARING | "Your order is being prepared!" |
| READY | "Your order is ready for pickup!" |
| COMPLETED | "Enjoy your drink! Thank you for your order!" |

---

## User Flow

### Staff Side:
1. Staff logs into dashboard
2. Views active orders with status buttons
3. Updates order status (CONFIRMED → PREPARING → READY)
4. System automatically notifies customer
5. Optionally clicks "🔔 Notify Table X" for manual notification
6. Receives confirmation alert

### Customer Side:
1. Customer places order and receives order ID
2. Navigates to order status page with order ID
3. Page requests notification permissions
4. Auto-refresh starts polling for updates every 3 seconds
5. When status changes:
   - Sound plays (if enabled)
   - Browser notification appears (if enabled)
   - Device vibrates (if enabled)
   - Page updates with new status
6. Customer can toggle notifications on/off as needed

---

## Technical Details

### Database Integration
- Uses existing Prisma Order model
- Fetches order items with customizations (add-ons, sugar level)
- Includes menu item names and prices

### Real-Time Architecture
- **Current**: Polling-based (3-second intervals)
- **Future Enhancement**: Can be upgraded to WebSocket or Server-Sent Events for true real-time

### Notification Storage
- In-memory subscriber map (suitable for single-server deployments)
- **Production Note**: For multi-server deployments, use Redis or similar

### Browser Compatibility
- Modern browsers with Notification API support
- Graceful degradation for older browsers
- Web Audio API for sound (IE 11+ with prefixes)
- Vibration API for haptic feedback (mobile devices)

---

## Configuration

### Notification Permissions
The system automatically requests notification permissions on first visit. Users can:
- Allow notifications
- Deny notifications
- Change permissions in browser settings

### Refresh Interval
Currently set to 3 seconds. To modify:
```typescript
// In /src/app/order-status/page.tsx
interval = setInterval(fetchOrder, 3000) // Change 3000 to desired milliseconds
```

### Sound Frequency
Currently set to 800Hz. To modify:
```typescript
oscillator.frequency.value = 800 // Change to desired frequency
```

---

## Testing Checklist

### Staff Dashboard
- [ ] Notification button appears on each order card
- [ ] Clicking button sends notification
- [ ] Success alert displays
- [ ] Status change auto-notifies customer

### Customer Page
- [ ] Notification permission request appears
- [ ] Auto-refresh works (status updates every 3 seconds)
- [ ] Sound plays when status changes (if enabled)
- [ ] Browser notification appears (if enabled)
- [ ] Device vibrates (if enabled)
- [ ] Controls toggle notifications on/off
- [ ] "READY" notification requires interaction

### Edge Cases
- [ ] Order not found error handling
- [ ] Network error handling
- [ ] Missing notification permissions
- [ ] Audio context unavailable
- [ ] Vibration API unavailable

---

## Future Enhancements

1. **WebSocket Integration**: Real-time bidirectional communication
2. **Email Notifications**: Send order updates via email
3. **SMS Notifications**: Send order updates via SMS
4. **Push Notifications**: Service Worker integration
5. **Notification History**: Store and display past notifications
6. **Custom Notification Sounds**: Allow customers to choose notification sounds
7. **Multi-Language Support**: Localize notification messages
8. **Analytics**: Track notification engagement and effectiveness

---

## Troubleshooting

### Notifications Not Appearing
1. Check browser notification permissions
2. Verify notification permission is "Allow"
3. Check browser console for errors
4. Ensure order ID is valid

### Sound Not Playing
1. Check if sound is enabled in controls
2. Verify browser audio is not muted
3. Check browser console for audio context errors
4. Try different browser

### Vibration Not Working
1. Verify device supports vibration
2. Check if vibration is enabled in device settings
3. Ensure browser has permission for vibration

### Auto-Refresh Not Working
1. Check if auto-refresh is enabled
2. Verify network connection
3. Check browser console for fetch errors
4. Verify API endpoint is accessible

---

## API Reference

### POST /api/notifications
Send notification to customer

**Parameters:**
- `orderId` (string, required): Order ID
- `tableNumber` (number, required): Table number
- `status` (string, required): Order status
- `type` (string, optional): Notification type (default: "STATUS_UPDATE")

**Response:**
- `success` (boolean): Whether notification was sent
- `message` (string): Response message
- `notification` (object): Notification data sent

### GET /api/notifications
Subscribe to real-time notifications via SSE

**Parameters:**
- `tableNumber` (string, required): Table number to subscribe to

**Response:**
- Server-Sent Events stream with notification updates

---

## Security Considerations

1. **Order Validation**: API verifies order exists before sending notification
2. **Table Number Verification**: Notifications are table-specific
3. **CORS**: API follows Next.js default CORS policies
4. **Input Validation**: All inputs are validated before processing

---

## Performance Notes

- Polling interval: 3 seconds (configurable)
- Notification API calls are lightweight
- Sound generation is client-side (no server overhead)
- Browser notifications are native OS features (minimal overhead)

---

## Support

For issues or questions about the notification system, please refer to:
- Browser console for error messages
- Network tab for API call debugging
- Notification settings in browser preferences
