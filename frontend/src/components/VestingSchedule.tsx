export default function VestingSchedule() {
  const vestingData = [
    { label: 'TEAM', percent: 20, cliff: '12M', vest: '36M', color: 'bg-gami-purple' },
    { label: 'INVESTORS', percent: 30, cliff: '6M', vest: '24M', color: 'bg-black' },
    { label: 'PARTNERS', percent: 10, cliff: '0M', vest: '18M', color: 'bg-gray-400' },
  ];

  return (
    <section className="border-b-[3px] border-black bg-white p-8 lg:p-16">
      <div className="container mx-auto">
        <div className="border-[3px] border-black bg-black text-white p-6 mb-8 inline-block">
          <h2 className="text-2xl font-black uppercase">VESTING SCHEDULE</h2>
        </div>

        <div className="space-y-6 mb-8">
          {vestingData.map((item) => (
            <div key={item.label} className="border-[3px] border-black p-6 bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="font-black text-xl uppercase">{item.label}</div>
                <div className="font-black text-2xl">{item.percent}%</div>
              </div>
              
              <div className="h-12 border-[3px] border-black bg-white mb-4 relative overflow-hidden">
                <div 
                  className={`h-full ${item.color} border-r-[3px] border-black`}
                  style={{ width: `${item.percent * 3.33}%` }}
                ></div>
              </div>

              <div className="flex gap-8 text-sm font-mono">
                <div>
                  <span className="font-bold uppercase">CLIFF:</span> {item.cliff}
                </div>
                <div>
                  <span className="font-bold uppercase">VEST:</span> {item.vest}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-[3px] border-black bg-gami-purple text-white p-6 text-center">
          <p className="text-xl font-black uppercase">ALIGNMENT: 12 MONTH CLIFF</p>
        </div>
      </div>
    </section>
  );
}
