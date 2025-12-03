# Gami Protocol Token Links

## Overview
This document establishes the direct links between the GAMI token across all three repositories:
- ICO Website
- Blockchain/Chain
- Universal Wallet

## Token Information

### GAMI Token (Liquid Utility)
- **Type**: ERC20
- **Symbol**: GAMI
- **Decimals**: 18
- **Total Supply**: 1,000,000,000 (1 Billion)
- **Contract**: `/Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website (1)/contracts/src/GamiToken.sol`

### XP Token (Soulbound)
- **Type**: Soulbound (Non-transferable)
- **Symbol**: XP
- **Decimals**: 0
- **Precompile Address**: `0x0000000000000000000000000000000000000800`
- **Interface**: `/Users/marcusmattus/Gami_Protocol/gami-protocol-chain/contracts/src/interfaces/IGamiXP.sol`

## Repository Links

### 1. ICO Website
**Path**: `/Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website (1)`

**Key Files**:
- Token Config: `contracts/tokenConfig.ts`
- Token Contract: `contracts/src/GamiToken.sol`
- Frontend Integration: `frontend/src/components/DualToken.tsx`

### 2. Blockchain/Chain
**Path**: `/Users/marcusmattus/Gami_Protocol/gami-protocol-chain`

**Key Files**:
- XP Interface: `contracts/src/interfaces/IGamiXP.sol`
- Treasury Interface: `contracts/src/interfaces/IGamiTreasury.sol`

### 3. Universal Wallet
**Path**: `/Users/marcusmattus/Gami_Protocol/Gami_Universal_Wallet/Gami_Wallet`

**Key Files**:
- Token Config: `src/config/tokenConfig.ts`

## Configuration Files

### Main Token Configuration
Location: `/Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website (1)/contracts/tokenConfig.ts`

This is the master configuration file that contains:
- Token metadata (name, symbol, decimals)
- Allocation information
- Vesting schedules
- Contract addresses
- Links to all repositories

### Wallet Token Configuration
Location: `/Users/marcusmattus/Gami_Protocol/Gami_Universal_Wallet/Gami_Wallet/src/config/tokenConfig.ts`

This file imports configuration from the main config and provides:
- Token list for wallet display
- Network configuration
- ABI imports
- Feature descriptions

## Integration Points

### ICO Website → Chain
- Displays token supply from chain contracts
- Shows XP mechanism using chain interfaces
- References contract addresses

### ICO Website → Wallet
- Users can connect wallet to purchase tokens
- Token information displayed matches wallet config

### Wallet → Chain
- Reads token balances from chain
- Calls XP precompile for reputation display
- Submits transactions to chain

## Smart Contract Addresses

### Testnet (To be updated after deployment)
- **GAMI Token**: `0x0000000000000000000000000000000000000000`
- **XP Precompile**: `0x0000000000000000000000000000000000000800` (Fixed)
- **Treasury Precompile**: `0x0000000000000000000000000000000000000801` (Fixed)

### Mainnet (To be updated after deployment)
- TBD

## Token Features

### GAMI
- Transferable ERC20 token
- Fixed supply of 1 billion
- Vesting schedules for team/investors
- Trading controls (pausable)
- Protocol currency for all operations

### XP
- Soulbound (non-transferable)
- Earned through protocol engagement
- Stored in native Cosmos module
- Gas-efficient precompile access
- Level system based on total XP

## Usage Examples

### Import in Frontend (ICO Website)
```typescript
import { GAMI_TOKEN_CONFIG } from '../contracts/tokenConfig';

const totalSupply = GAMI_TOKEN_CONFIG.token.totalSupply;
const xpAddress = GAMI_TOKEN_CONFIG.xpToken.precompileAddress;
```

### Import in Wallet
```typescript
import { GAMI_TOKENS, TOKEN_CONFIG } from './config/tokenConfig';

const gamiToken = GAMI_TOKENS.find(t => t.symbol === 'GAMI');
```

### Smart Contract Integration
```solidity
// Reference in contracts
// See: /Users/marcusmattus/Gami_Protocol/gami-protocol-chain/contracts/src/interfaces/IGamiXP.sol
interface IGamiXP {
    function addXP(address user, uint256 amount) external returns (bool);
    function getLevel(address user) external view returns (uint256);
}
```

## Next Steps

1. **Deploy Contracts**: Deploy GamiToken.sol to testnet
2. **Update Addresses**: Update contract addresses in all config files
3. **Test Integration**: Verify wallet can read balances
4. **Frontend Integration**: Connect ICO website to deployed contracts
5. **Documentation**: Update README files in each repository

## Maintenance

When updating token configuration:
1. Update the master config: `gami-protocol-ico-website (1)/contracts/tokenConfig.ts`
2. Sync changes to wallet config: `Gami_Wallet/src/config/tokenConfig.ts`
3. Update any hardcoded values in frontend components
4. Test all integration points
