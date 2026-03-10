import { useEffect, useMemo, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ShieldCheck, Wallet2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerKYCStatus, useRecordPurchaseIntent, useGetPurchaseHistory } from '../hooks/useQueries';
import type { StablecoinSymbol } from '../backend';
import {
  ALLOWED_ONCHAIN_DOMAIN_TLDS,
  ACCEPTED_DOMAIN_LABEL,
  hasAllowedOnchainDomain,
} from '@/config/onchainDomains';

const TOKEN_PRICE_USD = 0.001; // $0.001 per GAMI
const ACCEPTED_STABLECOINS: StablecoinSymbol[] = ['USDC', 'USDT'];
const DOMAIN_BONUS_TLDS = ALLOWED_ONCHAIN_DOMAIN_TLDS;

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);

const getDomainBonusPercent = (domain: string) => {
  const normalized = domain.trim().toLowerCase();
  const tld = normalized.split('.').pop();
  if (!tld) return 0;
  return DOMAIN_BONUS_TLDS.includes(tld) ? 5 : 0;
};

export default function StablePaymentWidget() {
  const { identity } = useInternetIdentity();
  const { fundWallet, user } = usePrivy();
  const { data: kycStatus } = useGetCallerKYCStatus();
  const { data: purchaseHistory = [] } = useGetPurchaseHistory();

  const recordPurchaseIntent = useRecordPurchaseIntent();

  const [stablecoin, setStablecoin] = useState<StablecoinSymbol>('USDC');
  const [amount, setAmount] = useState('1000');
  const [domain, setDomain] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [hasFunded, setHasFunded] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resolvedDomain = kycStatus?.domain || (identity as any)?.ens?.name || '';

  useEffect(() => {
    if (resolvedDomain && !domain) {
      setDomain(resolvedDomain);
    }
  }, [resolvedDomain, domain]);

  const email =
    (identity as any)?.email?.address ||
    (identity as any)?.emails?.[0]?.address ||
    user?.email?.address ||
    '';
  const walletAddress =
    (identity as any)?.wallet?.address ||
    (user as any)?.wallet?.address ||
    'privy-embedded-wallet';

  const normalizedDomain = domain.trim().toLowerCase();

  const numericAmount = Number(amount) || 0;
  const baseTokens = numericAmount > 0 ? Math.floor(numericAmount / TOKEN_PRICE_USD) : 0;
  const bonusPercent = getDomainBonusPercent(domain);
  const bonusTokens = Math.floor(baseTokens * (bonusPercent / 100));
  const totalTokens = baseTokens + bonusTokens;

  const hasEmail = email.length > 0;
  const hasDomain = normalizedDomain.length > 0 && hasAllowedOnchainDomain(domain);
  const domainNeedsAttention = normalizedDomain.length > 0 && !hasDomain;
  const hasKYCSubmission = Boolean(kycStatus);
  const kycApproved = (kycStatus?.status || '').toString().toUpperCase() === 'APPROVED';

  const canRecordIntent = hasEmail && hasDomain && hasKYCSubmission && totalTokens > 0;

  const latestHistory = useMemo(() => purchaseHistory.slice(0, 4), [purchaseHistory]);

  const handleFundWallet = async () => {
    setError(null);
    setMessage(null);

    if (!hasEmail) {
      setError('Verified email login required before funding via Privy.');
      return;
    }

    if (!hasDomain) {
      setError(`Link a verified ENS or on-chain domain (${ACCEPTED_DOMAIN_LABEL}) to unlock payments.`);
      return;
    }

    if (!hasKYCSubmission) {
      setError('Complete KYC before accessing the stablecoin gateway.');
      return;
    }

    try {
      await fundWallet('base', { asset: stablecoin });
      setHasFunded(true);
      setMessage(`${stablecoin} funding window opened in Privy.`);
    } catch (fundError) {
      console.error('Privy fundWallet error', fundError);
      setError('Unable to open Privy on-ramp. Please try again.');
    }
  };

  const handleRecordIntent = async () => {
    if (!canRecordIntent) {
      setError('Complete email login, KYC, and domain verification first.');
      return;
    }

    setError(null);
    setMessage(null);
    try {
      await recordPurchaseIntent.mutateAsync({
        wallet: walletAddress,
        email,
        domain: domain.trim(),
        stablecoin,
        amount: numericAmount,
        estimatedGami: totalTokens,
        referralCode: referralCode.trim() || undefined,
      });
      setMessage('Purchase intent captured. We will notify you once allocation is ready.');
      setHasFunded(false);
    } catch (intentError) {
      console.error('Purchase intent error', intentError);
      setError('Failed to record purchase intent. Please retry.');
    }
  };

  return (
    <section className="border-b-[3px] border-black bg-white p-8 lg:p-12">
      <div className="border-[3px] border-black bg-black text-white p-4 mb-6 inline-flex items-center gap-3">
        <ShieldCheck className="w-5 h-5" />
        <h2 className="text-sm font-bold uppercase tracking-wider">STABLE PAYMENT GATEWAY</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border-[3px] border-black p-6 bg-white space-y-5">
          <div className="text-xs font-bold uppercase opacity-70">Step 1 · Select stablecoin</div>
          <div className="flex gap-3">
            {ACCEPTED_STABLECOINS.map((coin) => (
              <button
                key={coin}
                type="button"
                onClick={() => setStablecoin(coin)}
                className={`px-4 py-2 border-[3px] border-black font-black text-sm uppercase tracking-wide transition-colors ${
                  stablecoin === coin ? 'bg-black text-white' : 'bg-white text-black'
                }`}
              >
                {coin}
              </button>
            ))}
          </div>

          <div>
            <Label htmlFor="stable-amount" className="font-bold uppercase text-xs">
              Commit amount ({stablecoin})
            </Label>
            <Input
              id="stable-amount"
              type="number"
              min="100"
              step="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-[3px] border-black rounded-none font-mono text-lg"
            />
          </div>

          <div>
            <Label htmlFor="domain-handle" className="font-bold uppercase text-xs">
              ENS / DOMAIN HANDLE
            </Label>
            <Input
              id="domain-handle"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="gamer.eth"
              className="border-[3px] border-black rounded-none font-mono"
            />
            <p className="text-[10px] font-mono mt-1 opacity-70">
              Required for whitelist. Accepted TLDs: {ACCEPTED_DOMAIN_LABEL}
            </p>
            {domainNeedsAttention && (
              <p className="text-[10px] font-mono mt-1 text-red-600">
                Provide a verified ENS or on-chain domain ending in {ACCEPTED_DOMAIN_LABEL}.
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="referral-code" className="font-bold uppercase text-xs">
              Referral / Partner Code (Optional)
            </Label>
            <Input
              id="referral-code"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              className="border-[3px] border-black rounded-none font-mono"
              placeholder="GUILD-0001"
            />
          </div>

          <div className="border-[3px] border-black p-4 bg-gray-50 space-y-2">
            <div className="flex items-center justify-between font-mono text-sm">
              <span>Base allocation</span>
              <span>{formatNumber(baseTokens)} GAMI</span>
            </div>
            <div className="flex items-center justify-between font-mono text-sm">
              <span>Domain bonus ({bonusPercent}%)</span>
              <span>+{formatNumber(bonusTokens)} GAMI</span>
            </div>
            <div className="flex items-center justify-between font-black text-lg uppercase">
              <span>Total</span>
              <span>{formatNumber(totalTokens)} GAMI</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleFundWallet}
              className="px-4 py-3 border-[3px] border-black bg-white text-black font-black uppercase text-sm tracking-wider hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <Wallet2 className="w-4 h-4" />
              {hasFunded ? 'FUNDED WITH PRIVY' : 'FUND VIA PRIVY'}
            </button>
            <button
              type="button"
              disabled={!canRecordIntent || recordPurchaseIntent.isPending}
              onClick={handleRecordIntent}
              className="px-4 py-3 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-sm tracking-wider hover:translate-x-[2px] hover:translate-y-[2px] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {recordPurchaseIntent.isPending ? 'LOGGING...' : 'RECORD PURCHASE INTENT'}
            </button>
          </div>

          {!hasEmail && (
            <div className="border-[3px] border-black bg-yellow-100 p-4 text-xs font-mono">
              Connect with your verified email before funding. Email-only access is enforced for compliance.
            </div>
          )}

          {!hasKYCSubmission && (
            <div className="border-[3px] border-black bg-yellow-100 p-4 text-xs font-mono">
              Complete KYC first to unlock the purchase module.
            </div>
          )}

          {kycStatus && !kycApproved && (
            <div className="border-[3px] border-black bg-white p-4 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>KYC submitted ({kycStatus.status}). Purchase will finalize after approval.</span>
            </div>
          )}

          {message && (
            <div className="border-[3px] border-black bg-green-100 p-4 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="border-[3px] border-black bg-red-100 p-4 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="border-[3px] border-black p-6 bg-white space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6" />
            <div>
              <div className="text-xs font-bold uppercase opacity-70">Step 2 · Compliance trail</div>
              <p className="font-mono text-sm">Every intent is linked to your email + ENS/Domain for audit-ready KYC.</p>
            </div>
          </div>

          <div className="border-t-[3px] border-black pt-4 space-y-3">
            <div className="text-xs font-bold uppercase">Recent intents</div>
            {latestHistory.length === 0 && (
              <p className="text-xs font-mono opacity-70">No purchase intents recorded yet.</p>
            )}
            {latestHistory.map((intent) => {
              const timestamp = typeof intent.createdAt === 'number' ? intent.createdAt : Number(intent.createdAt);
              return (
                <div key={intent.id} className="border-[3px] border-black p-3 font-mono text-xs bg-gray-50">
                  <div className="flex items-center justify-between">
                    <span>
                      {intent.stablecoin} → {formatNumber(intent.estimatedGami)} GAMI
                    </span>
                    <span className="uppercase text-[10px]">{intent.status}</span>
                  </div>
                  <div className="opacity-70">{intent.email}</div>
                  <div className="opacity-70">{intent.domain}</div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] uppercase">
                    <ArrowRight className="w-3 h-3" />
                    <span>{new Date(timestamp).toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t-[3px] border-black pt-4 text-xs font-mono">
            PRIVY WALLET PAYMENTS · MULTI-STABLE SUPPORT · AUTO XP BONUS FOR VERIFIED DOMAINS
          </div>
        </div>
      </div>
    </section>
  );
}
