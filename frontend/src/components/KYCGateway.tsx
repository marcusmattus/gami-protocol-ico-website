import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSubmitKYC, useGetCallerKYCStatus } from '../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function KYCGateway() {
  const { identity } = useInternetIdentity();
  const { data: kycStatus } = useGetCallerKYCStatus();
  const submitKYC = useSubmitKYC();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const isAuthenticated = !!identity;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitKYC.mutateAsync({ name, email });
      setIsOpen(false);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('KYC submission error:', error);
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-white';
    if (status === 'APPROVED') return 'bg-green-400';
    if (status === 'PENDING') return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <>
      <section className="border-b-[3px] lg:border-r-[3px] border-black p-8 lg:p-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gami-purple transform translate-x-16 -translate-y-16"></div>
        
        <div className="relative z-10">
          <div className="border-[3px] border-black bg-black text-white p-4 mb-6 inline-block">
            <h2 className="text-sm font-bold uppercase tracking-wider">KYC GATEWAY</h2>
          </div>
          
          <p className="text-2xl font-bold uppercase mb-8 leading-tight">
            IDENTITY VERIFICATION REQUIRED.
          </p>

          {isAuthenticated && kycStatus && (
            <div className={`border-[3px] border-black p-4 mb-6 ${getStatusColor(kycStatus.status)}`}>
              <div className="font-bold uppercase text-sm mb-2">STATUS: {kycStatus.status}</div>
              <div className="text-xs font-mono">NAME: {kycStatus.name}</div>
              <div className="text-xs font-mono">EMAIL: {kycStatus.email}</div>
            </div>
          )}

          <button
            onClick={() => {
              if (!isAuthenticated) {
                alert('Please login first to submit KYC');
                return;
              }
              if (kycStatus) {
                alert('KYC already submitted');
                return;
              }
              setIsOpen(true);
            }}
            className="px-8 py-4 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-lg tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
          >
            SECURE ALLOCATION
          </button>

          <div className="mt-8 text-xs uppercase tracking-wider opacity-70">
            ⚡ INSTANT VERIFICATION • 🔒 SECURE PROCESS • ✓ COMPLIANT
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border-[3px] border-black rounded-none bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase">KYC SUBMISSION</DialogTitle>
            <DialogDescription className="font-mono text-sm">
              ENTER YOUR DETAILS TO SECURE YOUR ALLOCATION
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-bold uppercase text-xs">FULL NAME</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[3px] border-black rounded-none font-mono"
              />
            </div>
            <div>
              <Label htmlFor="email" className="font-bold uppercase text-xs">EMAIL ADDRESS</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[3px] border-black rounded-none font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={submitKYC.isPending}
              className="w-full px-6 py-3 border-[3px] border-black bg-black text-white font-bold uppercase hover:bg-gami-purple transition-colors disabled:opacity-50"
            >
              {submitKYC.isPending ? 'SUBMITTING...' : 'SUBMIT KYC'}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
