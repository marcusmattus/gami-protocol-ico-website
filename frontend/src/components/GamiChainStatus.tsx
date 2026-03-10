import { useState, useEffect } from 'react';
import { Activity, Zap, Database } from 'lucide-react';
import { GAMI_CHAIN_CONFIG } from '../config/gamiChain';

export default function GamiChainStatus() {
  const [chainStatus, setChainStatus] = useState({
    isOnline: false,
    blockHeight: 0,
    validators: 0,
    tps: 0,
  });

  useEffect(() => {
    const checkChainStatus = async () => {
      try {
        const response = await fetch(`${GAMI_CHAIN_CONFIG.restUrl}/cosmos/base/tendermint/v1beta1/node_info`);
        const data = await response.json();
        
        setChainStatus({
          isOnline: true,
          blockHeight: data.default_node_info?.other?.latest_block_height || 0,
          validators: data.default_node_info?.other?.validators || 0,
          tps: Math.floor(Math.random() * 1000) + 500, // Mock TPS
        });
      } catch (error) {
        console.error('Failed to fetch chain status:', error);
        setChainStatus({
          isOnline: false,
          blockHeight: 0,
          validators: 0,
          tps: 0,
        });
      }
    };

    checkChainStatus();
    const interval = setInterval(checkChainStatus, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-[3px] border-black bg-white p-6">
      <div className="flex items-center gap-3 pb-4 border-b-[3px] border-black mb-4">
        <Activity className="w-6 h-6" />
        <h3 className="font-black uppercase text-lg">GAMI CHAIN STATUS</h3>
        <div className={`ml-auto w-3 h-3 rounded-full ${chainStatus.isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border-[3px] border-black bg-purple-50 p-4 text-center">
          <Database className="w-6 h-6 mx-auto mb-2" />
          <div className="text-xs font-bold uppercase opacity-70 mb-1">Block Height</div>
          <div className="text-2xl font-black">{chainStatus.blockHeight.toLocaleString()}</div>
        </div>

        <div className="border-[3px] border-black bg-purple-50 p-4 text-center">
          <Activity className="w-6 h-6 mx-auto mb-2" />
          <div className="text-xs font-bold uppercase opacity-70 mb-1">Validators</div>
          <div className="text-2xl font-black">{chainStatus.validators}</div>
        </div>

        <div className="border-[3px] border-black bg-purple-50 p-4 text-center">
          <Zap className="w-6 h-6 mx-auto mb-2" />
          <div className="text-xs font-bold uppercase opacity-70 mb-1">TPS</div>
          <div className="text-2xl font-black">{chainStatus.tps}</div>
        </div>
      </div>

      <div className="mt-4 text-xs font-mono text-center opacity-60 uppercase">
        {chainStatus.isOnline ? '🟢 CHAIN ACTIVE' : '🔴 CHAIN OFFLINE'}
      </div>

      <button
        onClick={() => window.open(GAMI_CHAIN_CONFIG.blockExplorer, '_blank')}
        className="w-full mt-4 px-6 py-3 border-[3px] border-black bg-white text-black font-black uppercase text-sm hover:bg-black hover:text-white transition-colors"
      >
        VIEW BLOCK EXPLORER
      </button>
    </div>
  );
}
