# Gami Protocol ICO - Neobrutalism UI with Privy.io Integration

## Project Overview
Recreate the Gami Protocol ICO interface with **neobrutalism design principles** while integrating **Privy.io** for Web3 authentication and wallet features.

## Design System: Neobrutalism Principles

### 1. Color Palette
```
Primary: #000000 (Black)
Accent: #FFD700 or #FF6B6B (Bold, contrasting colors)
Background: #FFFFFF or #F5F5F5 (Clean, minimal)
Text: #222222 (High contrast)
Borders: Thick 3-4px black outlines
```

### 2. Typography
- Font Family: Inter, Roboto, or system sans-serif (no serif fonts)
- Font Weights: Bold (700), Regular (400)
- Large, readable sizes (18px-32px for headings)
- No fancy decorative effects

### 3. Components
- Buttons: Thick black border (4px), solid background color, bold text, no shadows
- Cards: Black 4px border, no subtle shadows, direct elevation
- Form Fields: Black borders, minimal padding, raw appearance
- Images: 3px black border, no rounded corners
- Dividers: Thick black lines, no gradients

### 4. Layout and Structure
- Grid-based layout resembling wireframes
- Generous whitespace (padding: 1.5rem-2rem)
- Block elements with clear boundaries
- No rounded corners (border-radius: 0)
- Direct, straightforward interactions

## Privy.io Integration Features

### Authentication Flow
1. Email/SMS Login: Easy onboarding for non-crypto users
2. Social Login: Google, GitHub, Discord
3. Wallet Connection: MetaMask, Coinbase, Phantom
4. Embedded Wallet: Auto-created wallet for new users

### Key Features to Implement
- Multi-auth login modal (Privy-powered)
- User dashboard with wallet display
- Transaction management and signing
- Gas fee sponsorship handling
- Fiat onramp integration
- Wallet disconnection handling
- User profile/account settings

## Technical Stack

### Frontend (TypeScript/React)
```
- React 18+
- TypeScript
- Tailwind CSS (with custom neobrutalism theme)
- Privy React SDK (@privy-io/react-auth)
- Viem or Ethers.js for blockchain interaction
```

### Smart Contracts (Solidity)
```
- ICO contract with Privy wallet support
- Token distribution mechanism
- Whitelisting system (optional)
```

### Backend (Node.js/Express)
```
- Express.js
- Privy Server SDK
- Database: PostgreSQL or MongoDB
- Web3.js/Ethers.js for blockchain calls
```

## Detailed Implementation Steps

### Phase 1: UI Framework Setup

#### 1.1 Tailwind CSS Neobrutalism Theme
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        neo: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          accent: '#FFD700',
        },
      },
      borderRadius: {
        none: '0px',
      },
      borderWidth: {
        thick: '4px',
        thicker: '6px',
      },
      boxShadow: {
        neo: '4px 4px 0px rgba(0, 0, 0, 0.1)',
        'neo-hover': '6px 6px 0px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        neo: '1.5rem',
      },
    },
  },
};
```

#### 1.2 Base Neobrutalism Components

**Button Component**
```typescript
// components/NeoButton.tsx
import React from 'react';

interface NeoButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  const baseStyles = 'border-4 border-black font-bold transition-all active:translate-x-1 active:translate-y-1';

  const variants = {
    primary: 'bg-black text-white hover:shadow-neo',
    secondary: 'bg-white border-4 border-black text-black hover:shadow-neo',
    danger: 'bg-red-500 text-white border-4 border-black hover:shadow-neo',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

**Card Component**
```typescript
// components/NeoCard.tsx
import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight';
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variants = {
    default: 'border-4 border-black bg-white',
    highlight: 'border-4 border-black bg-yellow-300',
  };

  return (
    <div className={`${variants[variant]} p-6 ${className}`}>
      {children}
    </div>
  );
};
```

**Form Input Component**
```typescript
// components/NeoInput.tsx
import React from 'react';

interface NeoInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const NeoInput: React.FC<NeoInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full border-4 border-black px-4 py-2 font-bold ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <p className="text-red-500 text-sm font-bold mt-1">{error}</p>}
    </div>
  );
};
```

### Phase 2: Privy.io Integration

#### 2.1 Setup Privy Provider
```typescript
// app.tsx or main layout component
import { PrivyProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.REACT_APP_PRIVY_APP_ID!}
      config={{
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        appearance: {
          theme: 'dark',
          accentColor: '#FFD700',
        },
        supportedChains: [
          // Add supported chains
        ],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
```

#### 2.2 Login Component with Privy
```typescript
// components/PrivyLogin.tsx
import { usePrivy } from '@privy-io/react-auth';
import { NeoButton } from './NeoButton';
import { NeoCard } from './NeoCard';

export const PrivyLoginComponent: React.FC = () => {
  const { login, logout, user, authenticated } = usePrivy();

  if (authenticated && user) {
    return (
      <NeoCard variant="highlight">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome {user.email?.address || 'User'}!</h2>
          <div className="mb-6">
            <p className="font-bold">Wallet Address:</p>
            <p className="text-sm break-words">{user.wallet?.address}</p>
          </div>
          <NeoButton variant="danger" onClick={logout}>
            Logout
          </NeoButton>
        </div>
      </NeoCard>
    );
  }

  return (
    <NeoCard>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Connect Wallet or Login</h2>
        <NeoButton size="lg" onClick={login}>
          Login with Privy
        </NeoButton>
      </div>
    </NeoCard>
  );
};
```

#### 2.3 Transaction Handler with Privy
```typescript
// utils/privy-transactions.ts
import { usePrivy, useWallets } from '@privy-io/react-auth';

export const usePriorityTransactions = () => {
  const { user } = usePrivy();
  const { wallets } = useWallets();

  const sendTransaction = async (to: string, value: string) => {
    if (!wallets || wallets.length === 0) {
      throw new Error('No wallet available');
    }

    const wallet = wallets[0];

    try {
      const tx = await wallet.sendTransaction({
        to,
        value,
        chainId: 1,
      });

      console.log('Transaction sent:', tx);
      return tx;
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  return { sendTransaction, user };
};
```

### Phase 3: ICO Features Integration

#### 3.1 ICO Purchase Component
```typescript
// components/ICOPurchase.tsx
import { usePrivy } from '@privy-io/react-auth';
import { useState } from 'react';
import { NeoButton } from './NeoButton';
import { NeoInput } from './NeoInput';
import { NeoCard } from './NeoCard';

export const ICOPurchase: React.FC = () => {
  const { authenticated } = usePrivy();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!amount) return;

    setLoading(true);
    try {
      const response = await fetch('/api/ico/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();
      setTxHash(data.transactionHash);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NeoCard>
      <h2 className="text-2xl font-bold mb-4">Purchase ICO Tokens</h2>

      <NeoInput
        label="Amount (USD)"
        type="number"
        placeholder="100"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="mb-4 border-4 border-black p-4 bg-gray-100">
        <p className="font-bold">You will receive: {(parseFloat(amount) || 0) * 10} GAMI</p>
      </div>

      <NeoButton
        size="lg"
        onClick={handlePurchase}
        disabled={!authenticated || loading}
      >
        {loading ? 'Processing...' : 'Purchase Now'}
      </NeoButton>

      {txHash && (
        <div className="mt-4 border-4 border-green-500 bg-green-100 p-4">
          <p className="font-bold text-green-800">Success!</p>
          <p className="text-sm break-words">{txHash}</p>
        </div>
      )}
    </NeoCard>
  );
};
```

#### 3.2 Dashboard Component
```typescript
// components/ICODashboard.tsx
import { usePrivy } from '@privy-io/react-auth';
import { NeoCard } from './NeoCard';

export const ICODashboard: React.FC = () => {
  const { user, authenticated } = usePrivy();

  if (!authenticated) {
    return <NeoCard>Please login to view dashboard</NeoCard>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NeoCard variant="highlight">
        <h3 className="text-xl font-bold mb-4">Your Wallet</h3>
        <p className="font-bold mb-2">Address:</p>
        <p className="text-sm break-words mb-4">{user?.wallet?.address}</p>
      </NeoCard>

      <NeoCard>
        <h3 className="text-xl font-bold mb-4">Your Holdings</h3>
        <div className="border-4 border-black p-4 mb-4 bg-gray-50">
          <p className="font-bold">GAMI Tokens: 0</p>
          <p className="font-bold">USD Value: $0.00</p>
        </div>
      </NeoCard>

      <NeoCard>
        <h3 className="text-xl font-bold mb-4">ICO Stats</h3>
        <div className="border-4 border-black p-4 bg-gray-50">
          <p className="font-bold mb-2">Total Raised: $1,234,567</p>
          <p className="font-bold mb-2">Tokens Sold: 12,345,678 GAMI</p>
          <div className="border-4 border-black bg-white p-2 mt-2">
            <div className="bg-yellow-300 h-4" style={{ width: '65%' }}></div>
          </div>
        </div>
      </NeoCard>
    </div>
  );
};
```

### Phase 4: Backend Integration

#### 4.1 Express Server with Privy Verification
```typescript
// backend/server.ts
import express from 'express';
import { PrivyClient } from '@privy-io/server-auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const privy = new PrivyClient({
  appId: process.env.PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_APP_SECRET!,
});

app.use(express.json());

const verifyPrivyToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const claims = await privy.verifyAuthToken(token);
    (req as any).user = claims;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/api/ico/purchase', verifyPrivyToken, async (req, res) => {
  const { amount } = req.body;
  const user = (req as any).user;

  try {
    const userInfo = await privy.getUser(user.sub);
    const wallet = userInfo.linkedAccounts.find((acc) => acc.type === 'wallet');

    if (!wallet) {
      return res.status(400).json({ error: 'No wallet found' });
    }

    const transactionHash = await createICOTransaction(wallet.address, amount);

    res.json({ transactionHash, success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

## Implementation Checklist

- Setup Privy account and get APP_ID
- Create TypeScript React project
- Install Tailwind CSS and configure neobrutalism theme
- Build neobrutalism component library (Button, Card, Input, etc.)
- Setup PrivyProvider in root layout
- Create login component with Privy
- Create ICO purchase component
- Create dashboard component
- Setup backend Express server with Privy verification
- Deploy smart contracts (ICO contract)
- Connect frontend to smart contracts via Privy wallets
- Test end-to-end flow
- Deploy frontend to Vercel
- Deploy backend to hosting service

## Environment Variables Required

```bash
# Frontend (.env.local)
REACT_APP_PRIVY_APP_ID=cmf15ppkw00j8l80bobzhaq0k
REACT_APP_BACKEND_URL=http://localhost:3001

# Backend (.env)
PRIVY_APP_ID=cmf15ppkw00j8l80bobzhaq0k
PRIVY_APP_SECRET=your_privy_app_secret
ICO_CONTRACT_ADDRESS=0x...
RPC_URL=https://eth-mainnet.alchemyapi.io/v2/...
```

## Styling References

- Gamiprotocol.io: Reference their color scheme, layout patterns, and brand identity
- Neobrutalism examples: Check Figma's interface, Framer's updates, portfolio sites using neobrutalism

## Additional Resources

- Privy.io Documentation: https://docs.privy.io
- Privy React SDK: https://www.npmjs.com/package/@privy-io/react-auth
- Tailwind CSS: https://tailwindcss.com
- Neobrutalism design trend: https://www.behance.net

This comprehensive guide provides everything needed to build a neobrutalism-styled ICO interface with full Privy.io integration, matching the Gami Protocol brand while delivering seamless Web3 authentication and wallet management.

## Quick Reference: Neobrutalism Tailwind Config

```typescript
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neo-black': '#000000',
        'neo-white': '#FFFFFF',
        'neo-gray': '#F5F5F5',
        'neo-yellow': '#FFD700',
        'neo-red': '#FF6B6B',
        'neo-blue': '#0066FF',
      },
      spacing: {
        neo: '1.5rem',
        'neo-lg': '2.5rem',
      },
      borderRadius: {
        none: '0px',
      },
      borderWidth: {
        neo: '4px',
        'neo-thick': '6px',
      },
      boxShadow: {
        neo: '4px 4px 0px rgba(0,0,0,0.1)',
        'neo-lg': '8px 8px 0px rgba(0,0,0,0.15)',
        'neo-hover': '6px 6px 0px rgba(0,0,0,0.15)',
      },
      transitionTimingFunction: {
        neo: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};
```

## Installation Commands

```bash
npx create-react-app gami-ico --template typescript
npm install @privy-io/react-auth @privy-io/server-auth
npm install -D tailwindcss postcss autoprefixer
npm install viem ethers dotenv
npx tailwindcss init -p
npm install express cors dotenv @privy-io/server-auth
npm install -g vercel
vercel
```
