# USDC Onramp Integration Guide

## Overview
The Gami Protocol ICO website now includes a **Privy-powered onramp** that allows users to purchase USDC using credit/debit cards to fund their wallets for the GAMI presale.

## Features
- 🏦 **Buy USDC with Fiat**: Users can purchase USDC directly using credit/debit cards
- ⚡ **Instant Funding**: Funds are available immediately after purchase
- 🔒 **Secure**: Powered by Privy's trusted onramp infrastructure
- 🌐 **Base Network**: USDC is purchased on the Base blockchain

## Configuration
- **Privy App ID**: `cmf15ppkw00j8l80bobzhaq0k`
- **JWKS URL**: `https://auth.privy.io/api/v1/apps/cmf15ppkw00j8l80bobzhaq0k/jwks.json`
- **Default Asset**: USDC
- **Network**: Base (Layer 2 Ethereum)

## User Flow
1. User connects their wallet via Internet Identity or Privy
2. User generates a Gami wallet (if not already created)
3. User clicks **"BUY USDC WITH CARD"** button
4. Privy onramp modal opens with payment options
5. User completes purchase with credit/debit card
6. USDC is deposited to user's wallet on Base
7. User can now participate in the GAMI presale

## Technical Implementation

### Components Added
- **OnrampButton.tsx**: Button component that triggers the Privy onramp modal
- **PrivyProvider**: Wraps the app in `main.tsx` with Privy configuration

### Integration Points
- Located in `WalletModule.tsx` alongside deposit and allocation buttons
- Uses Privy's `fundWallet()` function with Base network and USDC asset
- Styled to match the brutalist design system

### Code Location
```
frontend/
├── src/
│   ├── components/
│   │   ├── OnrampButton.tsx (NEW)
│   │   └── WalletModule.tsx (UPDATED)
│   └── main.tsx (UPDATED - Added PrivyProvider)
```

## Running the Application
```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Styling
The onramp button features:
- Green background (#22c55e) for visibility
- Brutalist black borders (3px)
- Credit card icon from lucide-react
- Hover effects matching the design system

## Future Enhancements
- Support for additional payment methods
- Multiple cryptocurrency options
- Real-time purchase notifications
- Transaction history tracking
