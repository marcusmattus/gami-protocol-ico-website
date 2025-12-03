#!/bin/bash

# Gami Protocol ICO - Complete Integration Setup Script
# This script connects the ICO website to the Gami Chain and Universal Wallet

set -e

echo "╔══════════════════════════════════════════════════════╗"
echo "║   Gami Protocol ICO - Integration Setup             ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
ICO_DIR="/Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website (1)"
WALLET_DIR="/Users/marcusmattus/Gami_Protocol/gami-universal-wallet"
CHAIN_DIR="/Users/marcusmattus/Gami_Protocol/gami-protocol-chain"

echo -e "${BLUE}Step 1: Setting up Universal Wallet Integration${NC}"
echo "------------------------------------------------"

# Check if universal wallet exists
if [ -d "$WALLET_DIR" ]; then
    echo -e "${GREEN}✓${NC} Universal wallet found"
    
    # Build universal wallet if not built
    if [ ! -d "$WALLET_DIR/dist" ]; then
        echo "Building universal wallet..."
        cd "$WALLET_DIR"
        npm install
        npm run build
        echo -e "${GREEN}✓${NC} Universal wallet built"
    else
        echo -e "${GREEN}✓${NC} Universal wallet already built"
    fi
else
    echo -e "${YELLOW}⚠${NC} Universal wallet not found at $WALLET_DIR"
fi

echo ""
echo -e "${BLUE}Step 2: Installing ICO Smart Contracts${NC}"
echo "------------------------------------------------"

cd "$ICO_DIR/contracts"

# Create foundry.toml if it doesn't exist
if [ ! -f "foundry.toml" ]; then
    cat > foundry.toml << 'EOF'
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.20"

[rpc_endpoints]
localhost = "http://localhost:8545"
gami = "http://localhost:8545"
EOF
    echo -e "${GREEN}✓${NC} Created foundry.toml"
fi

# Initialize forge if needed
if [ ! -d "lib" ]; then
    forge init --no-git --force
    echo -e "${GREEN}✓${NC} Initialized Forge project"
fi

# Install OpenZeppelin
if [ ! -d "lib/openzeppelin-contracts" ]; then
    forge install OpenZeppelin/openzeppelin-contracts --no-git
    echo -e "${GREEN}✓${NC} Installed OpenZeppelin contracts"
fi

# Create remappings
echo "@openzeppelin/=lib/openzeppelin-contracts/" > remappings.txt
echo -e "${GREEN}✓${NC} Created remappings"

echo ""
echo -e "${BLUE}Step 3: Setting up Frontend${NC}"
echo "------------------------------------------------"

cd "$ICO_DIR/frontend"

# Install frontend dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Frontend dependencies already installed"
fi

# Create vite.config.js if it doesn't exist
if [ ! -f "vite.config.js" ]; then
    cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@gami/universal-wallet': path.resolve(__dirname, '../../gami-universal-wallet/dist')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
EOF
    echo -e "${GREEN}✓${NC} Created vite.config.js"
fi

# Create .env.example
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
# Contract Addresses (Update after deployment)
VITE_GAMI_TOKEN_ADDRESS=0x...
VITE_ICO_CONTRACT_ADDRESS=0x...

# Network Configuration
VITE_CHAIN_ID=1337
VITE_RPC_URL=http://localhost:8545
VITE_CHAIN_NAME=Gami Protocol

# Backend API
VITE_API_URL=http://localhost:3000

# WalletConnect
VITE_WALLETCONNECT_PROJECT_ID=your-project-id
EOF
    echo -e "${GREEN}✓${NC} Created .env.example"
fi

echo ""
echo -e "${BLUE}Step 4: Setting up Backend${NC}"
echo "------------------------------------------------"

cd "$ICO_DIR/backend"

# Install backend dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${GREEN}✓${NC} Backend dependencies already installed"
fi

# Create .env.example for backend
if [ ! -f ".env.example" ]; then
    cat > .env.example << 'EOF'
# Server Configuration
PORT=3000
NODE_ENV=development

# Database (Optional)
MONGODB_URI=mongodb://localhost:27017/gami-ico

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://ico.gami.io

# Blockchain
RPC_URL=http://localhost:8545
GAMI_TOKEN_ADDRESS=0x...
ICO_CONTRACT_ADDRESS=0x...

# KYC Provider (Example)
KYC_API_KEY=your-kyc-api-key
KYC_API_URL=https://api.kyc-provider.com
EOF
    echo -e "${GREEN}✓${NC} Created backend .env.example"
fi

echo ""
echo -e "${BLUE}Step 5: Creating Deployment Script${NC}"
echo "------------------------------------------------"

cd "$ICO_DIR/contracts"

# Create deploy script
cat > script/Deploy.s.sol << 'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/GamiToken.sol";
import "../src/GamiICO.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy GAMI Token
        GamiToken token = new GamiToken(deployer);
        console.log("GAMI Token deployed at:", address(token));
        
        // ICO Parameters
        uint256 tokenPrice = 0.0001 ether;
        uint256 minPurchase = 1_000 * 10**18;
        uint256 maxPurchase = 1_000_000 * 10**18;
        uint256 totalAllocation = 300_000_000 * 10**18;
        uint256 startTime = block.timestamp + 1 days;
        uint256 endTime = startTime + 30 days;
        uint256 vestingDuration = 180 days;
        uint256 cliffDuration = 30 days;
        
        // Deploy ICO Contract
        GamiICO ico = new GamiICO(
            address(token),
            tokenPrice,
            minPurchase,
            maxPurchase,
            totalAllocation,
            startTime,
            endTime,
            vestingDuration,
            cliffDuration,
            deployer
        );
        console.log("ICO Contract deployed at:", address(ico));
        
        // Transfer tokens to ICO
        token.transfer(address(ico), totalAllocation);
        console.log("Transferred tokens to ICO");
        
        // Set ICO contract as exempt from trading restrictions
        token.setExemption(address(ico), true);
        console.log("Set ICO contract exemption");
        
        vm.stopBroadcast();
        
        console.log("\n=== Deployment Complete ===");
        console.log("GAMI Token:", address(token));
        console.log("ICO Contract:", address(ico));
        console.log("\nAdd these to your .env file:");
        console.log("VITE_GAMI_TOKEN_ADDRESS=%s", address(token));
        console.log("VITE_ICO_CONTRACT_ADDRESS=%s", address(ico));
    }
}
EOF

echo -e "${GREEN}✓${NC} Created deployment script"

echo ""
echo -e "${BLUE}Step 6: Creating Quick Start Scripts${NC}"
echo "------------------------------------------------"

cd "$ICO_DIR"

# Create start-all.sh
cat > start-all.sh << 'EOF'
#!/bin/bash

# Start all services for Gami ICO

set -e

echo "Starting Gami ICO Services..."

# Start backend
echo "Starting backend..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════╗"
echo "║   Gami ICO Services Running           ║"
echo "╠════════════════════════════════════════╣"
echo "║  Frontend: http://localhost:5173      ║"
echo "║  Backend:  http://localhost:3000      ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
EOF

chmod +x start-all.sh
echo -e "${GREEN}✓${NC} Created start-all.sh"

# Create README for ICO directory
cat > README.md << 'EOF'
# Gami Protocol ICO Website

Complete token launch system with smart contracts, frontend, and backend.

## 🚀 Quick Start

### 1. Run Integration Setup
```bash
./setup-integration.sh
```

### 2. Deploy Smart Contracts
```bash
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url localhost --broadcast
```

### 3. Update Environment Files
Copy the contract addresses from deployment output to:
- `frontend/.env`
- `backend/.env`

### 4. Start All Services
```bash
./start-all.sh
```

## 📚 Documentation

- **[ICO_LAUNCH_GUIDE.md](./ICO_LAUNCH_GUIDE.md)** - Complete launch guide
- **[contracts/README.md](./contracts/README.md)** - Smart contract docs
- **[frontend/README.md](./frontend/README.md)** - Frontend setup
- **[backend/README.md](./backend/README.md)** - Backend API docs

## 🔗 Integration

This ICO connects to:
- **Gami Protocol Chain** - Main blockchain
- **Universal Wallet** - User wallet management
- **XP System** - Bonus allocation based on XP

## 📞 Support

- Discord: https://discord.gg/gami
- Docs: https://docs.gami.io
- Email: team@gami.io
EOF

echo -e "${GREEN}✓${NC} Created README.md"

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║              Integration Setup Complete!             ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo -e "${GREEN}✓${NC} Smart contracts configured"
echo -e "${GREEN}✓${NC} Frontend setup complete"
echo -e "${GREEN}✓${NC} Backend setup complete"
echo -e "${GREEN}✓${NC} Integration scripts created"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Deploy contracts: cd contracts && forge script script/Deploy.s.sol"
echo "2. Copy contract addresses to .env files"
echo "3. Start services: ./start-all.sh"
echo ""
echo -e "${YELLOW}Read ICO_LAUNCH_GUIDE.md for complete instructions${NC}"
echo ""
