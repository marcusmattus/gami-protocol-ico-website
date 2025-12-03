import { useGetTotalSupply, useGetCirculatingSupply } from '../hooks/useQueries';

export default function SupplyBlock() {
  const { data: totalSupply } = useGetTotalSupply();
  const { data: circulatingSupply } = useGetCirculatingSupply();

  const formatNumber = (num: bigint | undefined) => {
    if (!num) return '---';
    return num.toLocaleString('en-US').replace(/,/g, ' ');
  };

  return (
    <section className="border-b-[3px] border-black bg-white p-8 lg:p-16">
      <div className="container mx-auto">
        <div className="border-[3px] border-black bg-black text-white p-6 mb-8 inline-block">
          <h2 className="text-3xl font-black uppercase">TOTAL SUPPLY: 1,000,000,000 FIXED.</h2>
        </div>
        
        <p className="text-2xl font-bold uppercase mb-12 text-gami-purple">NO INFLATION GAMES.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-[3px] border-black p-8 bg-white hover:bg-black hover:text-white transition-colors">
            <div className="text-xs font-bold uppercase mb-4 tracking-wider opacity-70">TOTAL SUPPLY</div>
            <div className="text-4xl font-black font-mono">{formatNumber(totalSupply)}</div>
          </div>
          
          <div className="border-[3px] border-black p-8 bg-gami-purple text-white">
            <div className="text-xs font-bold uppercase mb-4 tracking-wider opacity-90">CIRCULATING SUPPLY (POST-TGE)</div>
            <div className="text-4xl font-black font-mono">{formatNumber(circulatingSupply)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
