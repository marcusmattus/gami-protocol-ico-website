import { useState, useEffect } from 'react';
import { GAMI_CHAIN_CONFIG } from '../config/gamiChain';

interface GamiChainConnection {
  connected: boolean;
  address: string | null;
  balance: string;
  chainId: string;
}

export function useGamiChain() {
  const [connection, setConnection] = useState<GamiChainConnection>({
    connected: false,
    address: null,
    balance: '0',
    chainId: GAMI_CHAIN_CONFIG.chainId,
  });

  const connectToGamiChain = async () => {
    try {
      // Check if window.gamiWallet exists (from Universal Wallet)
      const gamiWallet = (window as any).gamiWallet;
      
      if (!gamiWallet) {
        console.error('Gami Universal Wallet not found');
        return false;
      }

      // Request account access
      const accounts = await gamiWallet.enable();
      const address = accounts[0];

      // Get balance from Gami Chain
      const balance = await fetchBalance(address);

      setConnection({
        connected: true,
        address,
        balance,
        chainId: GAMI_CHAIN_CONFIG.chainId,
      });

      return true;
    } catch (error) {
      console.error('Failed to connect to Gami Chain:', error);
      return false;
    }
  };

  const fetchBalance = async (address: string): Promise<string> => {
    try {
      const response = await fetch(
        `${GAMI_CHAIN_CONFIG.restUrl}/cosmos/bank/v1beta1/balances/${address}`
      );
      const data = await response.json();
      
      const gamiBalance = data.balances?.find(
        (b: any) => b.denom === 'ugami'
      );
      
      return gamiBalance ? (Number(gamiBalance.amount) / 1e18).toFixed(4) : '0';
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return '0';
    }
  };

  const disconnect = () => {
    setConnection({
      connected: false,
      address: null,
      balance: '0',
      chainId: GAMI_CHAIN_CONFIG.chainId,
    });
  };

  return {
    connection,
    connectToGamiChain,
    disconnect,
  };
}
