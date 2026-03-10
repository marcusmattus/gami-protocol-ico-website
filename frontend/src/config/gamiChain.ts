// Gami Chain Configuration
export const GAMI_CHAIN_CONFIG = {
  chainId: 'gami-1',
  chainName: 'Gami Protocol',
  rpcUrl: process.env.VITE_GAMI_RPC_URL || 'http://localhost:26657',
  restUrl: process.env.VITE_GAMI_REST_URL || 'http://localhost:1317',
  nativeCurrency: {
    name: 'GAMI',
    symbol: 'GAMI',
    decimals: 18,
  },
  blockExplorer: 'https://explorer.gami.io',
};

// Gami Token Contract
export const GAMI_TOKEN_ADDRESS = process.env.VITE_GAMI_TOKEN_ADDRESS || '0x0';

// ICO Contract
export const ICO_CONTRACT_ADDRESS = process.env.VITE_ICO_CONTRACT_ADDRESS || '0x0';

// Token Distribution Settings
export const TOKEN_DISTRIBUTION = {
  ICO_ALLOCATION: 1_000_000_000, // 1 billion tokens for ICO
  PRICE_PER_TOKEN: 0.001, // $0.001 per token
  MIN_PURCHASE: 1000, // Minimum 1000 tokens
  MAX_PURCHASE: 10_000_000, // Maximum 10 million tokens per wallet
};

// Admin Settings
export const ADMIN_CONFIG = {
  DISTRIBUTION_ENABLED: false, // Set to true to enable token distribution
  ADMIN_ADDRESSES: [
    // Add admin addresses here
  ],
};
