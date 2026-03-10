#!/bin/bash

# Gami Protocol ICO - Integration Setup Script
# This script sets up connections to the Gami Universal Wallet and Gami Protocol Chain

set -e

echo "════════════════════════════════════════════════════════════════"
echo "  GAMI PROTOCOL ICO - INTEGRATION SETUP"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
ICO_DIR="$(pwd)"
WALLET_DIR="/Users/marcusmattus/Gami_Protocol/gami-universal-wallet"
CHAIN_DIR="/Users/marcusmattus/Gami_Protocol/gami-protocol-chain"

echo -e "${BLUE}📁 ICO Directory:${NC} $ICO_DIR"
echo -e "${BLUE}👛 Wallet Directory:${NC} $WALLET_DIR"
echo -e "${BLUE}⛓️  Chain Directory:${NC} $CHAIN_DIR"
echo ""

# Check if directories exist
if [ ! -d "$WALLET_DIR" ]; then
    echo -e "${YELLOW}⚠️  Warning: Gami Universal Wallet directory not found${NC}"
    echo "   Expected at: $WALLET_DIR"
fi

if [ ! -d "$CHAIN_DIR" ]; then
    echo -e "${YELLOW}⚠️  Warning: Gami Protocol Chain directory not found${NC}"
    echo "   Expected at: $CHAIN_DIR"
fi

# Create integrations directory
echo -e "${BLUE}Creating integrations directory...${NC}"
mkdir -p "$ICO_DIR/frontend/src/integrations"

# Create wallet integration symlink
if [ -d "$WALLET_DIR/src" ]; then
    echo -e "${BLUE}Setting up Wallet integration...${NC}"
    if [ -L "$ICO_DIR/frontend/src/integrations/wallet" ]; then
        rm "$ICO_DIR/frontend/src/integrations/wallet"
    fi
    ln -sf "$WALLET_DIR/src" "$ICO_DIR/frontend/src/integrations/wallet"
    echo -e "${GREEN}✓ Wallet integration linked${NC}"
else
    echo -e "${YELLOW}⚠️  Wallet source not found, skipping link${NC}"
fi

# Create chain integration symlink
if [ -d "$CHAIN_DIR/wallet-sdk" ]; then
    echo -e "${BLUE}Setting up Chain SDK integration...${NC}"
    if [ -L "$ICO_DIR/frontend/src/integrations/chain" ]; then
        rm "$ICO_DIR/frontend/src/integrations/chain"
    fi
    ln -sf "$CHAIN_DIR/wallet-sdk" "$ICO_DIR/frontend/src/integrations/chain"
    echo -e "${GREEN}✓ Chain SDK integration linked${NC}"
else
    echo -e "${YELLOW}⚠️  Chain SDK not found, skipping link${NC}"
fi

# Create environment file if it doesn't exist
echo ""
echo -e "${BLUE}Setting up environment variables...${NC}"
ENV_FILE="$ICO_DIR/frontend/.env"

if [ ! -f "$ENV_FILE" ]; then
    cat > "$ENV_FILE" << 'EOF'
# Gami Chain Configuration
VITE_GAMI_RPC_URL=http://localhost:26657
VITE_GAMI_REST_URL=http://localhost:1317
VITE_GAMI_TOKEN_ADDRESS=0x0
VITE_ICO_CONTRACT_ADDRESS=0x0

# Privy Configuration
VITE_PRIVY_APP_ID=cmf15ppkw00j8l80bobzhaq0k

# Admin Configuration
VITE_ADMIN_ADDRESS=your_admin_address_here
EOF
    echo -e "${GREEN}✓ Created .env file${NC}"
else
    echo -e "${YELLOW}ℹ️  .env file already exists${NC}"
fi

# Create type definitions for integrations
echo ""
echo -e "${BLUE}Creating TypeScript definitions...${NC}"
cat > "$ICO_DIR/frontend/src/integrations/index.d.ts" << 'EOF'
// Type definitions for Gami Protocol integrations

declare global {
  interface Window {
    gamiWallet?: {
      enable: () => Promise<string[]>;
      getAccounts: () => Promise<string[]>;
      signTransaction: (tx: any) => Promise<any>;
      disconnect: () => Promise<void>;
    };
  }
}

export {};
EOF
echo -e "${GREEN}✓ Created type definitions${NC}"

# Update package.json scripts
echo ""
echo -e "${BLUE}Updating package.json scripts...${NC}"
cd "$ICO_DIR/frontend"

# Add integration scripts if they don't exist
if command -v jq &> /dev/null; then
    jq '.scripts["wallet:link"] = "cd ../gami-universal-wallet && npm link" | 
        .scripts["chain:link"] = "cd ../gami-protocol-chain && npm link"' package.json > package.json.tmp
    mv package.json.tmp package.json
    echo -e "${GREEN}✓ Updated package.json${NC}"
else
    echo -e "${YELLOW}ℹ️  jq not found, skipping package.json update${NC}"
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ INTEGRATION SETUP COMPLETE${NC}"
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Review .env file and update with your actual values"
echo "  2. Start the Gami Chain node (if available)"
echo "  3. Run 'npm run dev' to start the ICO website"
echo ""
echo "Integration status:"
if [ -L "$ICO_DIR/frontend/src/integrations/wallet" ]; then
    echo -e "  ${GREEN}✓ Wallet integrated${NC}"
else
    echo -e "  ${YELLOW}⚠ Wallet not integrated${NC}"
fi

if [ -L "$ICO_DIR/frontend/src/integrations/chain" ]; then
    echo -e "  ${GREEN}✓ Chain integrated${NC}"
else
    echo -e "  ${YELLOW}⚠ Chain not integrated${NC}"
fi

echo ""
