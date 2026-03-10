import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { CreditCard } from 'lucide-react';
import type { StablecoinSymbol } from '../backend';

const STABLECOINS: StablecoinSymbol[] = ['USDC', 'USDT'];

export default function OnrampButton() {
  const { fundWallet } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState<StablecoinSymbol>('USDC');

  const handleFundWallet = async () => {
    try {
      setIsLoading(true);
      await fundWallet('base', {
        asset,
      });
    } catch (error) {
      console.error('Fund wallet error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-[3px] border-black bg-white p-3 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase">Payment token</span>
        <div className="flex gap-2">
          {STABLECOINS.map((coin) => (
            <button
              key={coin}
              type="button"
              onClick={() => setAsset(coin)}
              className={`px-3 py-1 border-[3px] border-black text-xs font-black uppercase tracking-wide transition-colors ${
                asset === coin ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {coin}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleFundWallet}
        disabled={isLoading}
        className="w-full px-6 py-3 border-[3px] border-black bg-green-500 text-white font-black uppercase text-sm tracking-wider hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <CreditCard className="w-5 h-5" />
        {isLoading ? 'OPENING...' : `BUY ${asset} WITH CARD`}
      </button>

      <p className="text-[10px] font-mono uppercase opacity-70">
        Powered by Privy — supports Base USDC + wrapped USDT for instant stablecoin funding.
      </p>
    </div>
  );
}
