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
