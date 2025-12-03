/**
 * GAMI Protocol Token Configuration
 * Links: ICO Website <-> Blockchain <-> Wallet
 */

export const GAMI_TOKEN_CONFIG = {
  // Token Information
  token: {
    name: "Gami Protocol",
    symbol: "GAMI",
    decimals: 18,
    totalSupply: "1000000000", // 1 billion tokens
    type: "ERC20",
    description: "LIQUID UTILITY - Transferable protocol currency",
  },

  // XP Token Information (Soulbound)
  xpToken: {
    name: "Gami XP",
    symbol: "XP",
    decimals: 0,
    type: "SOULBOUND",
    precompileAddress: "0x0000000000000000000000000000000000000800",
    description: "SOULBOUND PROOF-OF-ENGAGEMENT - Non-transferable reputation metric",
    interface: "IGamiXP",
  },

  // Blockchain References
  blockchain: {
    chainName: "Gami Protocol Chain",
    chainPath: "/Users/marcusmattus/Gami_Protocol/gami-protocol-chain",
    contractsPath: "/Users/marcusmattus/Gami_Protocol/gami-protocol-chain/contracts/src/interfaces",
    interfaces: {
      gamiXP: "/Users/marcusmattus/Gami_Protocol/gami-protocol-chain/contracts/src/interfaces/IGamiXP.sol",
      gamiTreasury: "/Users/marcusmattus/Gami_Protocol/gami-protocol-chain/contracts/src/interfaces/IGamiTreasury.sol",
    },
  },

  // Wallet Integration
  wallet: {
    path: "/Users/marcusmattus/Gami_Protocol/Gami_Universal_Wallet/Gami_Wallet",
    name: "Gami Universal Wallet",
    supportedTokens: ["GAMI", "XP"],
  },

  // ICO Configuration
  ico: {
    totalSupply: "1000000000",
    circulatingSupply: "400000000", // 40% post-TGE
    allocation: {
      team: { percent: 20, cliff: 12, vesting: 36 },
      investors: { percent: 30, cliff: 6, vesting: 24 },
      partners: { percent: 10, cliff: 0, vesting: 18 },
      public: { percent: 40, cliff: 0, vesting: 0 },
    },
  },

  // Contract Addresses (Testnet - Update after deployment)
  contracts: {
    gami: {
      address: "0x0000000000000000000000000000000000000000", // To be deployed
      network: "testnet",
    },
    xpPrecompile: {
      address: "0x0000000000000000000000000000000000000800",
      network: "native",
    },
    treasuryPrecompile: {
      address: "0x0000000000000000000000000000000000000801",
      network: "native",
    },
  },

  // Token Properties
  features: {
    gami: [
      "TRANSFERABLE TOKEN",
      "TRADEABLE ASSET",
      "PROTOCOL CURRENCY",
      "ERC20 STANDARD",
    ],
    xp: [
      "NON-TRANSFERABLE",
      "EARNED THROUGH ACTIVITY",
      "REPUTATION METRIC",
      "SOULBOUND",
    ],
  },

  // Links for Deep Integration
  links: {
    website: "/Users/marcusmattus/Gami_Protocol/gami-protocol-ico-website (1)",
    chain: "/Users/marcusmattus/Gami_Protocol/gami-protocol-chain",
    wallet: "/Users/marcusmattus/Gami_Protocol/Gami_Universal_Wallet/Gami_Wallet",
  },
};

export type TokenConfig = typeof GAMI_TOKEN_CONFIG;
