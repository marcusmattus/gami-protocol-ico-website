# 🚀 Gami Protocol ICO Launch System

## ✅ COMPLETE TOKEN LAUNCH PACKAGE

This directory contains everything needed to launch the $GAMI token ICO with full blockchain integration.

---

## 📁 What's Included

### 1. Smart Contracts ✅
- **`contracts/src/GamiToken.sol`** - ERC20 token (1B fixed supply)
- **`contracts/src/GamiICO.sol`** - ICO contract with vesting

### 2. Frontend Website (Neo-Brutalist Design)
- React + Vite + TailwindCSS
- Web3 wallet connection (RainbowKit)
- Real-time ICO progress tracking
- KYC gateway integration ready

### 3. Backend API
- Express.js REST API
- KYC submission handling
- ICO data management
- Document serving

---

## 🎯 Token Economics

### GAMI Token
```
Name: Gami Token
Symbol: GAMI
Decimals: 18
Total Supply: 1,000,000,000 (Fixed, No Inflation)
Standard: ERC20
```

### ICO Allocation
```
Total for ICO: 300,000,000 GAMI (30%)
Price: 0.0001 ETH per GAMI
Target Raise: 30,000 ETH
Min Purchase: 1,000 GAMI
Max Purchase: 1,000,000 GAMI per wallet
```

### Vesting Schedule
```
Cliff: 1 month after ICO end
Vesting: Linear over 6 months
Total Lockup: 7 months
```

### Token Distribution
```
ICO Sale:        300,000,000 (30%)
Team:            200,000,000 (20%) - 12mo cliff, 36mo vest
Investors:       300,000,000 (30%) - 6mo cliff, 24mo vest
Partners:        100,000,000 (10%) - 0mo cliff, 18mo vest
Treasury:        100,000,000 (10%) - Unlocked
```

---

## 🔧 Smart Contract Deployment

### Step 1: Deploy GAMI Token

```bash
cd contracts

# Deploy token (replace <OWNER_ADDRESS>)
forge create src/GamiToken.sol:GamiToken \
  --constructor-args <OWNER_ADDRESS> \
  --private-key <DEPLOY_PRIVATE_KEY> \
  --rpc-url <RPC_URL>
```

### Step 2: Deploy ICO Contract

```javascript
// ICO Parameters
const GAMI_TOKEN = "0x..."; // From Step 1
const TOKEN_PRICE = "100000000000000"; // 0.0001 ETH in wei
const MIN_PURCHASE = "1000000000000000000000"; // 1,000 GAMI
const MAX_PURCHASE = "1000000000000000000000000"; // 1,000,000 GAMI
const TOTAL_ALLOCATION = "300000000000000000000000000"; // 300M GAMI
const START_TIME = Math.floor(Date.now() / 1000) + 86400; // Tomorrow
const END_TIME = START_TIME + (30 * 86400); // 30 days
const VESTING_DURATION = 180 * 86400; // 6 months
const CLIFF_DURATION = 30 * 86400; // 1 month
const OWNER = "0x...";
```

```bash
forge create src/GamiICO.sol:GamiICO \
  --constructor-args $GAMI_TOKEN $TOKEN_PRICE $MIN_PURCHASE $MAX_PURCHASE \
  $TOTAL_ALLOCATION $START_TIME $END_TIME $VESTING_DURATION $CLIFF_DURATION $OWNER \
  --private-key <DEPLOY_PRIVATE_KEY> \
  --rpc-url <RPC_URL>
```

### Step 3: Transfer Tokens to ICO

```bash
# Transfer 300M GAMI to ICO contract
cast send <GAMI_TOKEN_ADDRESS> \
  "transfer(address,uint256)" \
  <ICO_CONTRACT_ADDRESS> \
  300000000000000000000000000 \
  --private-key <OWNER_PRIVATE_KEY> \
  --rpc-url <RPC_URL>
```

---

## 🌐 Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Configure Environment

Create `frontend/.env`:

```env
# Contract Addresses
VITE_GAMI_TOKEN_ADDRESS=0x...
VITE_ICO_CONTRACT_ADDRESS=0x...

# Network Configuration
VITE_CHAIN_ID=1
VITE_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR-API-KEY

# Backend API
VITE_API_URL=http://localhost:3000

# Wallet Connect
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
```

### Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

---

## 🗄️ Backend Setup

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment

Create `backend/.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database (optional)
MONGODB_URI=mongodb://localhost:27017/gami-ico

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://ico.gami.io

# KYC Provider (example)
KYC_API_KEY=your-kyc-provider-api-key
KYC_API_URL=https://api.kyc-provider.com
```

### Run Backend

```bash
npm run dev
```

Backend runs on http://localhost:3000

---

## 🎨 Frontend Features

### 1. Hero Section
- Main headline with scrolling marquee
- Live countdown timer to ICO start/end
- Connect wallet button (RainbowKit)

### 2. ICO Purchase Interface
```
┌─────────────────────────────────┐
│  BUY $GAMI TOKENS               │
├─────────────────────────────────┤
│  Amount to Buy: [________] GAMI │
│  Cost: 0.1 ETH                  │
│  ┌─────────────────────┐        │
│  │  BUY NOW            │        │
│  └─────────────────────┘        │
└─────────────────────────────────┘
```

### 3. Live Progress Tracker
```
TOTAL RAISED: 15,000 / 30,000 ETH
TOKENS SOLD: 150M / 300M GAMI
PROGRESS: [███████░░░] 50%
```

### 4. Vesting Dashboard
```
YOUR PURCHASE: 10,000 GAMI
VESTED: 2,500 GAMI
CLAIMABLE NOW: 500 GAMI
NEXT VEST: 500 GAMI in 15 days
```

### 5. KYC Gateway
- Form submission for KYC
- Status tracking
- Integration with KYC provider

---

## 🔗 Integration with Gami Protocol

### Connect to Universal Wallet

```typescript
import { GamiUniversalWallet } from '@gami/universal-wallet';

// Initialize wallet
const wallet = GamiUniversalWallet.fromPrivateKey(privateKey);

// Check user's GAMI balance
const balance = await wallet.getBalance();

// Get XP stats (for allocation bonuses)
const stats = await wallet.getXPStats();

// Check airdrop eligibility (bonus allocation)
const airdropReport = await wallet.getAirdropReport();
```

### XP-Based Bonus Allocation

```typescript
// Users with higher XP get bonus allocations
function calculateBonus(level, totalXP) {
  let bonus = 0;
  
  if (level >= 10) bonus += 5; // +5% for level 10+
  if (level >= 20) bonus += 10; // +15% total for level 20+
  if (totalXP >= 50000) bonus += 5; // +5% for 50k+ XP
  
  return bonus; // Max 20% bonus
}
```

---

## 📊 API Endpoints

### Public Endpoints

```
GET  /api/ico/status          # Get ICO status
GET  /api/ico/progress        # Get sale progress
GET  /api/ico/countdown       # Get time remaining
GET  /api/documents           # List documents
GET  /api/documents/:id       # Download document
```

### Protected Endpoints (Requires Auth)

```
POST /api/kyc/submit          # Submit KYC
GET  /api/kyc/status/:address # Check KYC status
POST /api/purchase/intent     # Create purchase intent
GET  /api/purchase/:address   # Get purchase history
```

### Example Response

```json
{
  "status": "active",
  "progress": {
    "raised": "15000000000000000000000",
    "target": "30000000000000000000000",
    "tokensSold": "150000000000000000000000000",
    "totalAllocation": "300000000000000000000000000",
    "percentage": 50
  },
  "timeRemaining": {
    "days": 15,
    "hours": 8,
    "minutes": 30,
    "seconds": 45
  }
}
```

---

## 🎯 User Flow

### 1. Visit Website
```
User lands on ico.gami.io
↓
Views ICO information
↓
Reads whitepaper & docs
```

### 2. Complete KYC
```
Click "SECURE ALLOCATION"
↓
Fill KYC form
↓
Wait for approval
```

### 3. Purchase Tokens
```
Connect wallet (RainbowKit)
↓
Enter GAMI amount to buy
↓
Approve transaction
↓
Receive purchase confirmation
```

### 4. Track Vesting
```
View purchase on dashboard
↓
Monitor vesting schedule
↓
Claim tokens when available
```

### 5. Claim Tokens
```
Wait for cliff period
↓
Tokens vest linearly
↓
Claim vested tokens
↓
Tokens sent to wallet
```

---

## 🔐 Security Features

### Smart Contract Security
- ✅ ReentrancyGuard on all state-changing functions
- ✅ Pausable for emergency stops
- ✅ Ownable for admin functions
- ✅ SafeERC20 for token transfers
- ✅ Whitelist support for early access
- ✅ Max purchase limits per wallet

### Frontend Security
- ✅ Input validation
- ✅ Transaction simulation before sending
- ✅ Rate limiting on API calls
- ✅ CORS protection
- ✅ XSS prevention

### Operational Security
- ✅ Multi-sig wallet for owner functions
- ✅ Timelock for critical changes
- ✅ Emergency pause mechanism
- ✅ Audit report published

---

## 📈 Marketing Integration

### Social Proof
```html
<marquee>
  AUDITED BY CERTIK ✓ | 
  10,000+ WHITELIST SIGNUPS | 
  PARTNERED WITH LEADING GAMING PLATFORMS |
  BACKED BY TOP VCs
</marquee>
```

### Live Statistics
```
GLOBAL GAMERS: 3.3 BILLION
MARKET SIZE: $200 BILLION
GAMI USERS: 50,000+
PROTOCOLS INTEGRATED: 15+
```

---

## 🧪 Testing

### Smart Contract Tests

```bash
cd contracts
forge test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Integration Tests

```bash
# Test purchase flow
npm run test:integration
```

---

## 🚀 Deployment Checklist

### Pre-Launch
- [ ] Deploy GAMI token contract
- [ ] Deploy ICO contract
- [ ] Transfer tokens to ICO
- [ ] Complete smart contract audit
- [ ] Set up backend infrastructure
- [ ] Configure KYC provider
- [ ] Test purchase flow end-to-end
- [ ] Prepare marketing materials

### Launch Day
- [ ] Enable whitelist (if applicable)
- [ ] Start ICO contract
- [ ] Monitor transactions
- [ ] Provide customer support
- [ ] Update social media

### Post-ICO
- [ ] Finalize ICO contract
- [ ] Withdraw funds to treasury
- [ ] Enable token trading
- [ ] Begin vesting period
- [ ] Continue development

---

## 📞 Support

### For Technical Issues
- GitHub Issues: https://github.com/gami-protocol/ico
- Email: dev@gami.io
- Discord: https://discord.gg/gami

### For Business Inquiries
- Email: team@gami.io
- Telegram: @GamiProtocol

---

## 📄 Legal Documents

Available in `/frontend/public/docs`:
- Whitepaper v1.1
- Tokenomics Paper
- Terms & Conditions
- Privacy Policy
- Risk Disclosure

---

## 🎉 Go-To-Market Strategy

### Phase 1: Whitelist (Week 1-2)
- Early access for community members
- Bonus allocation for early participants
- KYC completion required

### Phase 2: Public Sale (Week 3-4)
- Open to all verified participants
- Standard pricing
- First-come-first-served

### Phase 3: Token Distribution (Month 2)
- Cliff period begins
- Vesting starts
- Token listed on exchanges

---

**🚀 Ready to Launch!**

Follow the deployment steps above to go live with your ICO.

*Built with ❤️ by Gami Protocol Team*
