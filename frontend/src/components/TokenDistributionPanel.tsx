import { useState } from 'react';
import { Shield, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ADMIN_CONFIG, TOKEN_DISTRIBUTION } from '../config/gamiChain';

interface TokenDistributionPanelProps {
  adminAddress?: string;
  isAdmin: boolean;
}

export default function TokenDistributionPanel({ adminAddress, isAdmin }: TokenDistributionPanelProps) {
  const [distributionEnabled, setDistributionEnabled] = useState(ADMIN_CONFIG.DISTRIBUTION_ENABLED);
  const [isDistributing, setIsDistributing] = useState(false);
  const [distributionStatus, setDistributionStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [recipientCount, setRecipientCount] = useState(0);

  const handleDistributeTokens = async () => {
    if (!isAdmin || !distributionEnabled) {
      alert('Distribution not enabled or insufficient permissions');
      return;
    }

    const confirmed = window.confirm(
      'Are you sure you want to distribute tokens to all ICO participants? This action cannot be undone.'
    );

    if (!confirmed) return;

    setIsDistributing(true);
    setDistributionStatus('processing');

    try {
      // Call the distribution function
      // This would connect to your Gami Chain backend
      const response = await fetch('/api/admin/distribute-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAddress}`,
        },
        body: JSON.stringify({
          adminAddress,
          distributionEnabled,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipientCount(data.recipientCount);
        setDistributionStatus('success');
      } else {
        throw new Error('Distribution failed');
      }
    } catch (error) {
      console.error('Token distribution error:', error);
      setDistributionStatus('error');
    } finally {
      setIsDistributing(false);
    }
  };

  const toggleDistribution = () => {
    const confirmed = window.confirm(
      `Are you sure you want to ${distributionEnabled ? 'DISABLE' : 'ENABLE'} token distribution?`
    );
    
    if (confirmed) {
      setDistributionEnabled(!distributionEnabled);
      // Update backend config
      updateDistributionConfig(!distributionEnabled);
    }
  };

  const updateDistributionConfig = async (enabled: boolean) => {
    try {
      await fetch('/api/admin/config/distribution', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAddress}`,
        },
        body: JSON.stringify({ enabled }),
      });
    } catch (error) {
      console.error('Failed to update distribution config:', error);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <section className="border-b-[3px] border-black p-8 lg:p-12 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="border-[3px] border-black bg-black text-white p-4 mb-6 inline-block">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">ADMIN: TOKEN DISTRIBUTION</h2>
        </div>
      </div>

      <div className="border-[3px] border-black bg-white p-6 space-y-6">
        {/* Distribution Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase text-sm">Distribution Status:</span>
            <div className={`px-4 py-2 border-[3px] border-black font-black uppercase text-xs ${
              distributionEnabled ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {distributionEnabled ? '✓ ENABLED' : '✗ DISABLED'}
            </div>
          </div>

          <button
            onClick={toggleDistribution}
            className="w-full px-6 py-3 border-[3px] border-black bg-yellow-400 text-black font-black uppercase text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
          >
            {distributionEnabled ? 'DISABLE DISTRIBUTION' : 'ENABLE DISTRIBUTION'}
          </button>
        </div>

        {/* Token Info */}
        <div className="border-t-[3px] border-black pt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border-[3px] border-black bg-purple-50 p-4">
              <div className="text-xs font-bold uppercase opacity-70 mb-1">ICO Allocation</div>
              <div className="text-2xl font-black">
                {TOKEN_DISTRIBUTION.ICO_ALLOCATION.toLocaleString()} GAMI
              </div>
            </div>
            <div className="border-[3px] border-black bg-purple-50 p-4">
              <div className="text-xs font-bold uppercase opacity-70 mb-1">Price per Token</div>
              <div className="text-2xl font-black">
                ${TOKEN_DISTRIBUTION.PRICE_PER_TOKEN}
              </div>
            </div>
          </div>
        </div>

        {/* Distribution Action */}
        <div className="border-t-[3px] border-black pt-6">
          <div className="border-[3px] border-black bg-red-100 p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold uppercase text-sm text-red-900 mb-1">WARNING</div>
                <p className="text-xs font-mono text-red-800">
                  This action will distribute GAMI tokens to all ICO participants based on their 
                  contributions. This action is irreversible. Ensure all data is correct before proceeding.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleDistributeTokens}
            disabled={!distributionEnabled || isDistributing}
            className="w-full px-8 py-4 border-[3px] border-black bg-black text-white font-black uppercase text-lg hover:bg-gami-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <Send className="w-5 h-5" />
            {isDistributing ? 'DISTRIBUTING...' : 'DISTRIBUTE TOKENS TO ALL PARTICIPANTS'}
          </button>
        </div>

        {/* Distribution Result */}
        {distributionStatus !== 'idle' && (
          <div className={`border-[3px] border-black p-4 ${
            distributionStatus === 'success' ? 'bg-green-100' :
            distributionStatus === 'error' ? 'bg-red-100' :
            'bg-yellow-100'
          }`}>
            <div className="flex items-center gap-3">
              {distributionStatus === 'success' && (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-700" />
                  <div>
                    <div className="font-bold uppercase text-sm text-green-900">Success!</div>
                    <p className="text-xs font-mono text-green-800">
                      Tokens distributed to {recipientCount} participants.
                    </p>
                  </div>
                </>
              )}
              {distributionStatus === 'error' && (
                <>
                  <AlertTriangle className="w-5 h-5 text-red-700" />
                  <div>
                    <div className="font-bold uppercase text-sm text-red-900">Error</div>
                    <p className="text-xs font-mono text-red-800">
                      Distribution failed. Please check logs and try again.
                    </p>
                  </div>
                </>
              )}
              {distributionStatus === 'processing' && (
                <>
                  <div className="w-5 h-5 border-[3px] border-black border-t-transparent animate-spin rounded-full"></div>
                  <div>
                    <div className="font-bold uppercase text-sm">Processing...</div>
                    <p className="text-xs font-mono">
                      Please wait while tokens are being distributed.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Admin Info */}
        <div className="text-xs font-mono text-center opacity-60 uppercase pt-4 border-t-[3px] border-black">
          Admin Address: {adminAddress?.slice(0, 10)}...{adminAddress?.slice(-8)}
        </div>
      </div>
    </section>
  );
}
