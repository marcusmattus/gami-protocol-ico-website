import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    setError(null);
    try {
      await login();
      onClose();
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-[3px] border-black rounded-none bg-white p-0 max-w-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 border-[3px] border-black bg-white p-2 hover:bg-black hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="border-b-[3px] border-black bg-gami-purple p-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black uppercase text-white">
              SIGN UP / LOG IN
            </DialogTitle>
            <DialogDescription className="font-mono text-sm text-white opacity-90 mt-2">
              EMAIL-ONLY ACCESS • PRIVY-POWERED AUTH + EMBEDDED WALLET
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6">
          <div className="border-[3px] border-black bg-white p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="border-[3px] border-black bg-gami-purple text-white w-8 h-8 flex items-center justify-center font-black flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-black uppercase text-sm mb-1">DECENTRALIZED IDENTITY</h3>
                <p className="text-xs font-mono opacity-70">
                  Passwordless email verification powered by Privy + Internet Identity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="border-[3px] border-black bg-gami-purple text-white w-8 h-8 flex items-center justify-center font-black flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-black uppercase text-sm mb-1">SECURE AUTHENTICATION</h3>
                <p className="text-xs font-mono opacity-70">
                  Cryptographic security powered by Internet Computer.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="border-[3px] border-black bg-gami-purple text-white w-8 h-8 flex items-center justify-center font-black flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-black uppercase text-sm mb-1">INSTANT ACCESS</h3>
                <p className="text-xs font-mono opacity-70">
                  One-click login across all GAMI Protocol services.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="border-[3px] border-black bg-red-100 p-4">
              <p className="text-xs font-mono text-red-900">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full px-8 py-4 border-[3px] border-black bg-black text-white font-black uppercase text-lg tracking-wider hover:bg-gami-purple hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-[3px] border-white border-t-transparent animate-spin"></span>
                AUTHENTICATING...
              </span>
            ) : (
              'CONTINUE WITH VERIFIED EMAIL'
            )}
          </button>

          <div className="border-t-[3px] border-black pt-4">
            <p className="text-xs font-mono text-center opacity-60 uppercase">
              🔒 SECURE • 🌐 DECENTRALIZED • ⚡ INSTANT
            </p>
          </div>

          <div className="text-xs font-mono opacity-50 text-center">
            By continuing, you agree to our{' '}
            <a href="/terms-and-conditions" className="underline hover:text-gami-purple">
              Terms & Conditions
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
