# Alert System & Login Integration Guide

## 🚀 New Features Added

### 1. Token Release Alert System
A popup notification system that alerts users when GAMI tokens are about to be released.

#### Features:
- **🔔 Auto-popup**: Appears 3 seconds after page load (only once per session)
- **📧 Email Subscription**: Users can subscribe for release notifications
- **🎯 Direct Link to Countdown**: Button to scroll smoothly to the ICO countdown clock
- **💾 Local Storage**: Remembers if user subscribed or dismissed
- **🎨 Brutalist Design**: Matches the website's design system
- **✨ Smooth Animations**: Slide-up animation on appearance

#### User Flow:
1. User visits website
2. After 3 seconds, alert pops up (bottom-right corner)
3. User options:
   - Enter email to subscribe for notifications
   - Click "VIEW COUNTDOWN" to jump to ICO clock
   - Close/dismiss the alert (won't show again)
4. On subscription: Success message displays with countdown link

#### Technical Details:
- **Component**: `TokenReleaseAlert.tsx`
- **Location**: Bottom-right corner (fixed position)
- **Storage**: Uses localStorage for persistence
  - `gami-alert-subscribed`: Tracks subscription status
  - `gami-alert-email`: Stores email (for future backend integration)
  - `gami-alert-dismissed`: Tracks if user dismissed
- **Scroll Target**: `#countdown-clock` ID on Hero countdown

### 2. Fixed Login System
Integrated Privy authentication to replace the stub Internet Identity system.

#### What Was Fixed:
- ✅ **Login Button Now Works**: Privy modal opens on click
- ✅ **Logout Functionality**: Proper logout with state management
- ✅ **Header Integration**: Shows login/logout status correctly
- ✅ **Wallet Connection**: Works with existing wallet module
- ✅ **Auth State Persistence**: Maintains auth across page refreshes

#### Authentication Flow:
1. User clicks "LOGIN" in header
2. Privy modal opens with auth options:
   - Email
   - SMS
   - Social logins (Google, Twitter, Discord, etc.)
   - Wallet connections
3. User authenticates
4. Button changes to "LOGOUT"
5. User identity stored in context
6. Access to wallet features enabled

#### Technical Implementation:
**Updated Files:**
- `useInternetIdentity.tsx`: Now uses Privy hooks (`usePrivy`)
- `main.tsx`: Wrapped with PrivyProvider
- `Header.tsx`: Already set up, now works with Privy
- `AuthModal.tsx`: Works with new auth system

**Auth Context:**
```typescript
interface InternetIdentityContextType {
  identity: any | null;          // Current user
  isInitializing: boolean;       // Loading state
  loginStatus: 'idle' | 'logging-in' | 'success' | 'error';
  login: () => Promise<void>;    // Trigger login
  logout: () => void;            // Trigger logout
  clear: () => Promise<void>;    // Clear session
}
```

## 📁 Files Modified/Created

### New Files:
```
frontend/src/components/
├── TokenReleaseAlert.tsx (NEW) - Alert popup component
└── OnrampButton.tsx (EXISTING) - USDC purchase button
```

### Modified Files:
```
frontend/src/
├── hooks/
│   └── useInternetIdentity.tsx (UPDATED) - Now uses Privy
├── components/
│   ├── Hero.tsx (UPDATED) - Added countdown ID
│   └── WalletModule.tsx (UPDATED) - Added onramp button
├── pages/
│   └── HomePage.tsx (UPDATED) - Added alert component
├── main.tsx (UPDATED) - Added PrivyProvider
└── index.css (UPDATED) - Added slide-up animation
```

## 🎨 Styling

### Alert Popup:
- **Position**: Fixed bottom-right (z-index: 50)
- **Max Width**: 448px (max-w-md)
- **Border**: 3px solid black (brutalist style)
- **Shadow**: 8px offset shadow
- **Animation**: Slide-up from bottom
- **Colors**: 
  - Purple header (#6E3CFB)
  - White content area
  - Green subscribe button

### Countdown Clock:
- **ID**: `countdown-clock`
- **Scroll Margin**: 96px from top (scroll-mt-24)
- **Smooth Scroll**: Enabled via JavaScript

## 🔧 Configuration

### Privy Settings (in main.tsx):
```typescript
<PrivyProvider
  appId="cmf15ppkw00j8l80bobzhaq0k"
  config={{
    appearance: {
      theme: 'light',
      accentColor: '#6E3CFB',
    },
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
    },
  }}
>
```

### Alert Timing:
```typescript
// Show after 3 seconds
setTimeout(() => {
  setIsVisible(true);
}, 3000);
```

## 🚀 Running the Application

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

## 🧪 Testing

### Test Login:
1. Click "LOGIN" button in header
2. Verify Privy modal opens
3. Try email/SMS auth
4. Check logout works
5. Verify state persists on refresh

### Test Alert:
1. Load homepage (fresh/incognito)
2. Wait 3 seconds
3. Alert should appear bottom-right
4. Test email subscription
5. Click "VIEW COUNTDOWN"
6. Verify scroll to countdown
7. Close alert and refresh - should not reappear

### Test Onramp:
1. Login first
2. Generate wallet
3. Click "BUY USDC WITH CARD"
4. Verify Privy onramp modal opens

## 📊 Analytics (Future Enhancement)

Track these events:
- Alert shown
- Email subscribed
- Alert dismissed
- Countdown link clicked
- Login attempts
- Successful logins

## 🔐 Security Notes

- Email stored in localStorage (client-side only)
- In production, send to backend API
- Implement email validation
- Add CAPTCHA for subscription
- Validate email format
- Rate limit subscriptions

## 🎯 Future Enhancements

### Alert System:
- [ ] Backend API for email storage
- [ ] Email verification
- [ ] Push notifications
- [ ] Telegram/Discord alerts
- [ ] Customizable alert preferences
- [ ] Multiple alert types (price, volume, etc.)

### Login:
- [ ] Add wallet-only login option
- [ ] Profile pictures
- [ ] User settings page
- [ ] Remember me functionality
- [ ] Two-factor authentication

## 📝 Notes

- Alert dismissal is permanent (until localStorage cleared)
- Subscription requires valid email format
- Countdown scrolls to center of viewport
- Login persists across browser sessions
- All animations respect prefers-reduced-motion

## 🐛 Troubleshooting

**Alert not showing:**
- Clear localStorage
- Check console for errors
- Verify 3-second delay

**Login not working:**
- Check Privy app ID is correct
- Verify internet connection
- Check browser console
- Try incognito mode

**Countdown scroll not working:**
- Verify #countdown-clock ID exists
- Check smooth scroll support
- Try hard refresh
