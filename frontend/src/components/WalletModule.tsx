import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerWallet, useGenerateWallet, useDeposit, useFixAllocation } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wallet, ArrowDownToLine, Wrench, Copy, CheckCircle2 } from 'lucide-react';
import AuthModal from './AuthModal';
import Confetti from './Confetti';

export default function WalletModule() {
  const { identity } = useInternetIdentity();
  const { data: wallet, isLoading } = useGetCallerWallet();
  const generateWallet = useGenerateWallet();
  const deposit = useDeposit();
  const fixAllocation = useFixAllocation();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isAuthenticated = !!identity;

  // Trigger confetti on successful deposit
  useEffect(() => {
    if (deposit.isSuccess) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  }, [deposit.isSuccess]);

  const handleGenerateWallet = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    try {
      await generateWallet.mutateAsync();
    } catch (error) {
      console.error('Wallet generation error:', error);
    }
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const amount = BigInt(depositAmount);
      await deposit.mutateAsync(amount);
      setShowDepositModal(false);
      setDepositAmount('');
    } catch (error) {
      console.error('Deposit error:', error);
    }
  };

  const handleFixAllocation = async () => {
    try {
      await fixAllocation.mutateAsync();
    } catch (error) {
      console.error('Fix allocation error:', error);
    }
  };

  const handleCopyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatBalance = (balance: bigint) => {
    return balance.toLocaleString();
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 20) return address;
    return `${address.slice(0, 10)}...${address.slice(-10)}`;
  };

  return (
    <>
      <section className="border-b-[3px] border-black p-8 lg:p-12 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gami-purple transform -translate-x-16 translate-y-16"></div>
        
        <div className="relative z-10">
          <div className="border-[3px] border-black bg-black text-white p-4 mb-6 inline-block">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-wider">WALLET MANAGEMENT</h2>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="space-y-6">
              <p className="text-2xl font-bold uppercase mb-8 leading-tight">
                CONNECT YOUR WALLET TO PARTICIPATE IN THE ICO.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-8 py-4 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-lg tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
              >
                CONNECT WALLET
              </button>
            </div>
          ) : isLoading ? (
            <div className="border-[3px] border-black bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-[3px] border-black border-t-transparent animate-spin"></div>
                <span className="font-mono text-sm uppercase">LOADING WALLET...</span>
              </div>
            </div>
          ) : !wallet ? (
            <div className="space-y-6">
              <p className="text-2xl font-bold uppercase mb-8 leading-tight">
                GENERATE YOUR GAMI WALLET.
              </p>
              <button
                onClick={handleGenerateWallet}
                disabled={generateWallet.isPending}
                className="px-8 py-4 border-[3px] border-black bg-black text-white font-black uppercase text-lg tracking-wider hover:bg-gami-purple hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {generateWallet.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-[3px] border-white border-t-transparent animate-spin"></span>
                    GENERATING...
                  </span>
                ) : (
                  'GENERATE WALLET'
                )}
              </button>
              <div className="mt-4 text-xs uppercase tracking-wider opacity-70">
                ⚡ INSTANT SETUP • 🔒 SECURE • ✓ IC-BASED
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-[3px] border-black bg-white p-6 space-y-4">
                <div>
                  <div className="text-xs font-bold uppercase mb-2 opacity-70">WALLET ADDRESS</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-sm break-all flex-1">{truncateAddress(wallet.address)}</div>
                    <button
                      onClick={handleCopyAddress}
                      className="border-[3px] border-black bg-white p-2 hover:bg-black hover:text-white transition-colors flex-shrink-0"
                      title="Copy address"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="border-t-[3px] border-black pt-4">
                  <div className="text-xs font-bold uppercase mb-2 opacity-70">GAMI TOKEN BALANCE</div>
                  <div className="text-3xl font-black uppercase">{formatBalance(wallet.balance)} GAMI</div>
                </div>

                <div className="text-xs font-mono opacity-50">
                  CREATED: {new Date(Number(wallet.createdAt) / 1000000).toLocaleDateString()}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowDepositModal(true)}
                  disabled={deposit.isPending}
                  className="px-6 py-4 border-[3px] border-black bg-white text-black font-black uppercase text-sm tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ArrowDownToLine className="w-5 h-5" />
                  DEPOSIT
                </button>

                <button
                  onClick={handleFixAllocation}
                  disabled={fixAllocation.isPending}
                  className="px-6 py-4 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-sm tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Wrench className="w-5 h-5" />
                  {fixAllocation.isPending ? 'FIXING...' : 'FIX ALLOCATION'}
                </button>
              </div>

              <div className="border-[3px] border-black bg-yellow-100 p-4">
                <p className="text-xs font-mono uppercase">
                  ⚠️ WALLET STATUS: ACTIVE • READY FOR ICO PARTICIPATION
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {showConfetti && <Confetti />}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
        <DialogContent className="border-[3px] border-black rounded-none bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase">DEPOSIT GAMI TOKENS</DialogTitle>
            <DialogDescription className="font-mono text-sm">
              ENTER THE AMOUNT OF GAMI TOKENS TO DEPOSIT
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDeposit} className="space-y-4">
            <div>
              <Label htmlFor="amount" className="font-bold uppercase text-xs">AMOUNT (GAMI)</Label>
              <Input
                id="amount"
                type="number"
                min="1"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                required
                className="border-[3px] border-black rounded-none font-mono text-lg"
                placeholder="0"
              />
            </div>
            <div className="border-[3px] border-black bg-gray-100 p-4">
              <p className="text-xs font-mono">
                NOTE: This is a mock deposit function for demonstration purposes.
              </p>
            </div>
            <button
              type="submit"
              disabled={deposit.isPending || !depositAmount}
              className="w-full px-6 py-3 border-[3px] border-black bg-black text-white font-bold uppercase hover:bg-gami-purple transition-colors disabled:opacity-50"
            >
              {deposit.isPending ? 'DEPOSITING...' : 'CONFIRM DEPOSIT'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
