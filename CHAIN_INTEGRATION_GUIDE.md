# Gami Protocol ICO - Chain & Wallet Integration Guide

## 🎯 Overview

This guide explains the integration between the ICO website, Gami Universal Wallet, and Gami Protocol Chain (L1).

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ICO Website (Frontend)                    │
├─────────────────────────────────────────────────────────────┤
│  • User Interface                                            │
│  • Privy Authentication                                      │
│  • ICO Countdown (10 days from now)                         │
│  • Token Purchase Interface                                  │
└────────────┬────────────────────────────┬───────────────────┘
             │                            │
             ↓                            ↓
┌────────────────────────┐    ┌─────────────────────────────┐
│  Gami Universal Wallet │    │  Gami Protocol Chain (L1)   │
├────────────────────────┤    ├─────────────────────────────┤
│  • Multi-chain Support │    │  • Cosmos SDK Based         │
│  • Key Management      │    │  • Native GAMI Token        │
│  • Transaction Signing │    │  • Token Distribution       │
│  • Chrome Extension    │    │  • Block Explorer           │
└────────────────────────┘    └─────────────────────────────┘
```

## 🚀 New Features Implemented

### 1. ⏰ Dynamic ICO Countdown
- **Starts**: 10 days from current date
- **Updates**: Real-time every second
- **Fallback**: Uses backend config if available
- **Ends When**: ICO raise is filled

**Location**: `Hero.tsx`

```typescript
// Countdown automatically starts from 10 days ahead
const tenDaysFromNow = now + (10 * 24 * 60 * 60 * 1000);
```

### 2. 👛 Universal Wallet Integration
- **Connect Button**: Detects if wallet is installed
- **Install Option**: Redirects to wallet download
- **Multi-chain**: Works across all supported chains
- **Features**:
  - Key management
  - Transaction signing
  - Balance checking
  - Cross-chain transfers

**Location**: `UniversalWalletIntegration.tsx`

**Wallet Check**:
```typescript
const gamiWallet = (window as any).gamiWallet;
if (gamiWallet) {
  const accounts = await gamiWallet.enable();
}
```

### 3. ⛓️ Gami Chain Connection
- **Native L1 Integration**: Direct connection to Gami Protocol Chain
- **Real-time Status**: Block height, validators, TPS
- **Token Source**: GAMI tokens come from L1 chain
- **RPC/REST APIs**: Cosmos SDK standard endpoints

**Location**: `useGamiChain.ts`, `GamiChainStatus.tsx`

**Chain Config**:
```typescript
{
  chainId: 'gami-1',
  rpcUrl: 'http://localhost:26657',
  restUrl: 'http://localhost:1317',
  nativeCurrency: 'GAMI'
}
```

### 4. 🎁 Token Distribution Panel (Admin Only)
- **Admin Access**: Only visible to admin users
- **Enable/Disable**: Toggle distribution on/off
- **Distribute**: One-click distribution to all participants
- **Safety**: Requires confirmation before distributing
- **Status Tracking**: Real-time distribution progress

**Location**: `TokenDistributionPanel.tsx`

**Admin Controls**:
- Enable/Disable distribution
- Distribute to all participants
- View allocation status
- Track distribution history

## 📁 New Files Created

```
frontend/
├── src/
│   ├── config/
│   │   └── gamiChain.ts                    # Chain configuration
│   ├── components/
│   │   ├── UniversalWalletIntegration.tsx  # Wallet connection UI
│   │   ├── GamiChainStatus.tsx             # Chain status display
│   │   └── TokenDistributionPanel.tsx      # Admin distribution panel
│   ├── hooks/
│   │   └── useGamiChain.ts                 # Chain connection hook
│   └── integrations/
│       ├── wallet/                         # Symlink to universal-wallet
│       ├── chain/                          # Symlink to protocol-chain
│       └── index.d.ts                      # TypeScript definitions
└── .env.example                            # Environment variables

setup-chain-integration.sh                  # Setup script
```

## 🔧 Configuration

### Environment Variables (.env)

```bash
# Gami Chain Configuration
VITE_GAMI_RPC_URL=http://localhost:26657
VITE_GAMI_REST_URL=http://localhost:1317
VITE_GAMI_TOKEN_ADDRESS=0x0
VITE_ICO_CONTRACT_ADDRESS=0x0

# Admin Configuration
VITE_ADMIN_ADDRESS=your_admin_address_here
```

### Token Distribution Settings

```typescript
const TOKEN_DISTRIBUTION = {
  ICO_ALLOCATION: 1_000_000_000,  // 1 billion tokens
  PRICE_PER_TOKEN: 0.001,          // $0.001 per token
  MIN_PURCHASE: 1000,               // Min 1000 tokens
  MAX_PURCHASE: 10_000_000,        // Max 10M per wallet
};
```

### Admin Configuration

```typescript
const ADMIN_CONFIG = {
  DISTRIBUTION_ENABLED: false,      // Toggle to enable
  ADMIN_ADDRESSES: [
    // Add admin wallet addresses here
  ],
};
```

## 🎮 Setup Instructions

### 1. Run Integration Setup Script

```bash
cd /Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website\ \(1\)
./setup-chain-integration.sh
```

This script will:
- Create symlinks to wallet and chain directories
- Generate `.env` file with configuration
- Set up TypeScript type definitions
- Update package.json scripts

### 2. Configure Environment

```bash
cd frontend
cp .env.example .env
# Edit .env with your actual values
```

### 3. Start Gami Chain (Optional)

If you have the chain running locally:

```bash
cd /Users/marcusmattus/Gami_Protocol/gami-protocol-chain/chain-core
./local_node.sh
```

### 4. Start ICO Website

```bash
cd frontend
npm install
npm run dev
```

## 🎯 User Flow

### Regular User:
1. Visit ICO website
2. See countdown (10 days from now)
3. Install Gami Universal Wallet (if not installed)
4. Connect wallet to website
5. View Gami Chain status
6. Login with Privy
7. Purchase GAMI tokens
8. Tokens held in escrow until distribution

### Admin User:
1. Login as admin
2. See admin distribution panel
3. Enable token distribution
4. Click "Distribute Tokens"
5. Tokens sent to all participants
6. Distribution tracked on-chain

## 🔐 Admin Operations

### Enabling Distribution

1. Admin logs in
2. Token Distribution Panel appears
3. Click "ENABLE DISTRIBUTION"
4. Confirm action
5. Distribution is now enabled

### Distributing Tokens

1. Ensure distribution is enabled
2. Click "DISTRIBUTE TOKENS TO ALL PARTICIPANTS"
3. Confirm distribution
4. Wait for processing
5. Success message with recipient count
6. Tokens sent from L1 chain to participants

### Safety Features

- ✅ Confirmation dialogs
- ✅ Admin-only access
- ✅ Enable/disable toggle
- ✅ Irreversible warning
- ✅ Status tracking
- ✅ Error handling

## 🔗 Integration Points

### Wallet Integration

```typescript
// Check if wallet is installed
const gamiWallet = (window as any).gamiWallet;

// Connect wallet
await gamiWallet.enable();

// Get accounts
const accounts = await gamiWallet.getAccounts();

// Sign transaction
const signed = await gamiWallet.signTransaction(tx);
```

### Chain Integration

```typescript
// Connect to chain
const { connection, connectToGamiChain } = useGamiChain();

// Get balance
const balance = await fetchBalance(address);

// Check chain status
const status = await fetch(`${RPC_URL}/node_info`);
```

### Distribution API

```typescript
// Distribute tokens (admin only)
POST /api/admin/distribute-tokens
{
  "adminAddress": "0x...",
  "distributionEnabled": true
}

// Response
{
  "recipientCount": 1523,
  "totalDistributed": "500000000",
  "txHash": "0x..."
}
```

## 📊 Token Distribution Process

1. **ICO Ends**: Countdown reaches zero OR target reached
2. **Admin Enables**: Admin toggles distribution ON
3. **Distribute Trigger**: Admin clicks distribute button
4. **On-Chain Execution**:
   - Backend queries all ICO participants
   - Calculates token amounts per address
   - Creates distribution transaction on L1
   - Batch sends to all recipients
5. **Confirmation**: Users receive tokens in their wallets
6. **Verification**: View on block explorer

## 🧪 Testing

### Test Wallet Integration

```bash
# 1. Open browser console
window.gamiWallet

# 2. If undefined, install wallet
# Visit: https://wallet.gami.io

# 3. Connect wallet
await window.gamiWallet.enable()

# 4. Check accounts
await window.gamiWallet.getAccounts()
```

### Test Chain Connection

```bash
# Check if chain is running
curl http://localhost:26657/status

# Check REST API
curl http://localhost:1317/cosmos/base/tendermint/v1beta1/node_info
```

### Test Admin Panel

1. Set admin address in `.env`
2. Login with admin account
3. Verify panel appears
4. Test enable/disable toggle
5. Test distribution (use testnet)

## 🚨 Important Notes

### Before Distribution:
- ✅ Verify all participant data
- ✅ Check token contract address
- ✅ Ensure chain is synced
- ✅ Test on testnet first
- ✅ Backup all data

### Security:
- 🔐 Admin keys stored securely
- 🔐 Multi-sig recommended for mainnet
- 🔐 Rate limiting on distribution
- 🔐 Transaction verification
- 🔐 Audit logs

## 📈 Monitoring

Track these metrics:
- ICO countdown progress
- Total raised
- Participants count
- Distribution status
- Chain health (block height, validators)
- Token transfers

## 🔧 Troubleshooting

**Wallet not detected:**
- Check if extension is installed
- Refresh page
- Check browser console

**Chain connection failed:**
- Verify RPC URL in `.env`
- Check if chain is running
- Test with `curl`

**Distribution failed:**
- Check admin permissions
- Verify distribution is enabled
- Check token balance in contract
- Review transaction logs

## 📚 Additional Resources

- **Wallet Docs**: `/Users/marcusmattus/Gami_Protocol/gami-universal-wallet/README.md`
- **Chain Docs**: `/Users/marcusmattus/Gami_Protocol/gami-protocol-chain/README.md`
- **ICO Guide**: `ALERT_LOGIN_GUIDE.md`
- **Quick Start**: `QUICK_START.md`

## 🎉 Summary

✅ 10-day countdown from now
✅ Universal Wallet integration
✅ Gami L1 Chain connection
✅ Token distribution panel (admin)
✅ Auto-distribution capability
✅ Real-time chain status
✅ Secure token management

The ICO website is now fully integrated with the Gami ecosystem!
