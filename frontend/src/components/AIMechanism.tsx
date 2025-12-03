import { useGetSystemStatus } from '../hooks/useQueries';
import { useEffect, useState } from 'react';

export default function AIMechanism() {
  const { data: systemStatus } = useGetSystemStatus();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="border-b-[3px] border-black bg-white p-8 lg:p-16">
      <div className="container mx-auto">
        <div className="border-[3px] border-black bg-black text-white p-6 mb-8 inline-block">
          <h2 className="text-2xl font-black uppercase">AI MECHANISM: ALGORITHMIC EMISSION CONTROL</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="border-[3px] border-black bg-white p-6 w-full text-center">
              <div className="font-black uppercase text-lg">INPUT: PROTOCOL REVENUE</div>
            </div>
            
            <div className="text-4xl font-black">↓</div>
            
            <div className="border-[3px] border-black bg-gami-purple text-white p-6 w-full text-center">
              <div className="font-black uppercase text-lg">MCP CORE ANALYSIS</div>
            </div>
            
            <div className="text-4xl font-black">↓</div>
            
            <div className="border-[3px] border-black bg-white p-6 w-full text-center">
              <div className="font-black uppercase text-lg">OUTPUT: DYNAMIC XP:GAMI RATE</div>
            </div>
          </div>

          <div 
            className={`border-[3px] border-black p-6 text-center transition-all ${
              pulse ? 'bg-gami-purple text-white border-[5px]' : 'bg-white text-black'
            }`}
          >
            <div className="font-black uppercase text-xl">
              SYSTEM STATUS: {systemStatus?.status || 'EMISSION INVARIANT MAINTAINED'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
