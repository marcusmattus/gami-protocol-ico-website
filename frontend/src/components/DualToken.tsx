export default function DualToken() {
  return (
    <section className="border-b-[3px] border-black bg-white p-8 lg:p-16">
      <div className="container mx-auto">
        <div className="border-[3px] border-black bg-black text-white p-6 mb-8 inline-block">
          <h2 className="text-2xl font-black uppercase">DUAL-TOKEN SYSTEM</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-[3px] border-black p-8 bg-gami-purple text-white">
            <div className="text-xs font-bold uppercase mb-4 tracking-wider opacity-90">ASSET TYPE</div>
            <div className="text-4xl font-black mb-6">XP</div>
            <div className="border-t-[3px] border-white pt-4">
              <div className="text-xs font-bold uppercase mb-2">DEFINITION</div>
              <div className="text-lg font-bold uppercase">SOULBOUND PROOF-OF-ENGAGEMENT</div>
            </div>
            <div className="mt-6 text-sm font-mono">
              • NON-TRANSFERABLE<br />
              • EARNED THROUGH ACTIVITY<br />
              • REPUTATION METRIC
            </div>
          </div>

          <div className="border-[3px] border-black p-8 bg-white">
            <div className="text-xs font-bold uppercase mb-4 tracking-wider opacity-70">ASSET TYPE</div>
            <div className="text-4xl font-black mb-6">GAMI</div>
            <div className="border-t-[3px] border-black pt-4">
              <div className="text-xs font-bold uppercase mb-2">DEFINITION</div>
              <div className="text-lg font-bold uppercase">LIQUID UTILITY</div>
            </div>
            <div className="mt-6 text-sm font-mono">
              • TRANSFERABLE TOKEN<br />
              • TRADEABLE ASSET<br />
              • PROTOCOL CURRENCY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
