# GAMI ICO Website - Quick Start Guide

## 🚀 Running the Application

```bash
cd frontend
npm install
npm run dev
```

The app will be available at: **http://localhost:5173**

## ✨ New Features Implemented

### 1. 🔔 Token Release Alert System
- Auto-popup after 3 seconds
- Email subscription for release notifications
- Direct link to ICO countdown clock
- Smooth scroll and animations
- Persistent (won't show again after dismissal)

### 2. 🔐 Working Login System
- Privy authentication integrated
- Multiple login options (Email, SMS, Social, Wallet)
- Header button now fully functional
- Session persistence across refreshes

### 3. 💳 USDC Onramp Integration
- Buy USDC with credit/debit card
- Powered by Privy
- Direct integration in wallet module
- Base network support

## 📋 Feature Summary

### Authentication
- **Provider**: Privy
- **App ID**: `cmf15ppkw00j8l80bobzhaq0k`
- **Login Options**: Email, SMS, Google, Twitter, Discord, Wallet
- **Features**: Embedded wallets, session persistence

### Alert System
- **Trigger**: 3 seconds after page load
- **Storage**: localStorage
- **Actions**: Subscribe, View Countdown, Dismiss
- **Design**: Brutalist, matches site theme

### Onramp
- **Asset**: USDC
- **Network**: Base (Ethereum L2)
- **Method**: Credit/Debit card
- **Integration**: Wallet Module

## 🎯 User Flows

### First-Time Visitor:
1. Land on homepage
2. Alert pops up after 3 seconds
3. Subscribe for notifications or view countdown
4. Click "LOGIN" in header
5. Authenticate with Privy
6. Generate wallet
7. Buy USDC via onramp
8. Participate in ICO

### Returning User:
1. Login state persists
2. Alert won't show again (if dismissed/subscribed)
3. Direct access to wallet features
4. Quick ICO participation

## 🎨 Design System

- **Colors**: 
  - Purple: #6E3CFB
  - Black: #000000
  - White: #FFFFFF
  - Green: #22C55E (onramp)

- **Style**: Brutalist
  - 3px black borders
  - Bold typography
  - Sharp corners
  - High contrast

- **Animations**:
  - Slide-up (alerts)
  - Smooth scroll
  - Hover effects

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TokenReleaseAlert.tsx (Alert popup)
│   │   ├── OnrampButton.tsx (USDC purchase)
│   │   ├── WalletModule.tsx (Wallet management)
│   │   ├── Hero.tsx (Countdown clock)
│   │   ├── Header.tsx (Login button)
│   │   └── AuthModal.tsx (Auth dialog)
│   ├── hooks/
│   │   └── useInternetIdentity.tsx (Auth context)
│   ├── pages/
│   │   └── HomePage.tsx (Main page)
│   ├── main.tsx (App entry + Privy setup)
│   └── index.css (Styles + animations)
└── package.json
```

## 🔧 Key Components

### TokenReleaseAlert
```typescript
<TokenReleaseAlert scrollToCountdown={scrollToCountdown} />
```
- Manages alert visibility
- Handles email subscriptions
- Scrolls to countdown on click

### OnrampButton
```typescript
<OnrampButton />
```
- Opens Privy onramp modal
- Configures USDC on Base
- Handles loading states

### useInternetIdentity
```typescript
const { identity, login, logout, loginStatus } = useInternetIdentity();
```
- Auth context provider
- Wraps Privy hooks
- Manages login state

## 🧪 Testing Checklist

- [ ] Alert appears after 3 seconds
- [ ] Email subscription works
- [ ] View Countdown button scrolls
- [ ] Alert dismissal persists
- [ ] Login button opens Privy modal
- [ ] Login persists on refresh
- [ ] Logout works correctly
- [ ] Onramp button opens modal
- [ ] Wallet generation works
- [ ] All animations smooth

## 📚 Documentation

- **ALERT_LOGIN_GUIDE.md** - Detailed alert & auth documentation
- **ONRAMP_GUIDE.md** - USDC onramp integration guide
- **ICO_LAUNCH_GUIDE.md** - ICO launch instructions
- **DEPLOYMENT_STATUS.md** - Deployment information

## 🔑 Environment Variables

No additional env vars needed! Privy App ID is hardcoded in `main.tsx`.

## 🐛 Common Issues

**Login not working?**
- Check internet connection
- Try incognito mode
- Clear browser cache

**Alert not showing?**
- Clear localStorage
- Hard refresh (Cmd+Shift+R)
- Check console for errors

**Onramp not opening?**
- Ensure you're logged in
- Wallet must be generated
- Check browser console

## 🚀 Production Deployment

1. Build the app:
```bash
npm run build
```

2. Preview build:
```bash
npm run preview
```

3. Deploy `dist/` folder to hosting service

## 📊 Next Steps

### Backend Integration:
- Store email subscriptions in database
- Send actual notification emails
- Track user analytics
- Implement KYC verification

### Enhanced Features:
- Push notifications
- SMS alerts
- Telegram/Discord integration
- Multi-language support
- Dark mode

## 🎉 All Set!

Your GAMI ICO website now has:
✅ Working login system
✅ Token release alerts
✅ USDC onramp integration
✅ Smooth user experience
✅ Professional design

Start the dev server and test all features!
