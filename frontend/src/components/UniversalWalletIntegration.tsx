import { useState } from 'react';
import { Wallet, ExternalLink, CheckCircle2, Download } from 'lucide-react';

interface UniversalWalletIntegrationProps {
  userAddress?: string;
}

export default function UniversalWalletIntegration({ userAddress }: UniversalWalletIntegrationProps) {
  const [isInstalled, setIsInstalled] = useState(false);

  const checkWalletInstalled = () => {
    // Check if Gami Universal Wallet is installed
    const gamiWallet = (window as any).gamiWallet;
    setIsInstalled(!!gamiWallet);
    return !!gamiWallet;
  };

  const connectUniversalWallet = async () => {
    const installed = checkWalletInstalled();
    
    if (!installed) {
      // Redirect to wallet download/installation
      window.open('https://wallet.gami.io', '_blank');
      return;
    }

    try {
      const gamiWallet = (window as any).gamiWallet;
      const accounts = await gamiWallet.enable();
      console.log('Connected to Gami Universal Wallet:', accounts);
    } catch (error) {
      console.error('Failed to connect to Gami Universal Wallet:', error);
    }
  };

  return (
    <div className="border-[3px] border-black bg-white p-6 space-y-4">
      <div className="flex items-center gap-3 pb-4 border-b-[3px] border-black">
        <Wallet className="w-6 h-6" />
        <h3 className="font-black uppercase text-lg">GAMI UNIVERSAL WALLET</h3>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-mono">
          Connect your Gami Universal Wallet to manage your GAMI tokens across all chains.
        </p>

        <div className="border-[3px] border-black bg-purple-50 p-4">
          <div className="text-xs font-bold uppercase mb-2">FEATURES:</div>
          <ul className="text-xs font-mono space-y-1">
            <li>✓ Multi-chain support</li>
            <li>✓ Native GAMI token management</li>
            <li>✓ Cross-chain transfers</li>
            <li>✓ Secure key management</li>
          </ul>
        </div>

        {isInstalled ? (
          <div className="border-[3px] border-black bg-green-100 p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700" />
            <span className="text-sm font-mono text-green-900">Wallet Installed</span>
          </div>
        ) : (
          <div className="border-[3px] border-black bg-yellow-100 p-4">
            <p className="text-xs font-mono text-yellow-900">
              ⚠️ Gami Universal Wallet not detected. Install it to continue.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {!isInstalled ? (
            <button
              onClick={() => window.open('https://wallet.gami.io', '_blank')}
              className="px-6 py-3 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              INSTALL WALLET
            </button>
          ) : (
            <button
              onClick={connectUniversalWallet}
              className="px-6 py-3 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              CONNECT WALLET
            </button>
          )}

          <button
            onClick={() => window.open('https://docs.gami.io/wallet', '_blank')}
            className="px-6 py-3 border-[3px] border-black bg-white text-black font-black uppercase text-sm hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            LEARN MORE
          </button>
        </div>

        <div className="text-xs font-mono text-center opacity-60 uppercase pt-2">
          🔒 SECURE • 🌐 MULTI-CHAIN • ⚡ FAST
        </div>
      </div>
    </div>
  );
}
