import { useGetICOProgress } from '../hooks/useQueries';

export default function ICOProgress() {
  const { data: progress } = useGetICOProgress();

  const progressPercent = progress ? Number(progress.progressPercent) : 0;
  const amountRaised = progress ? Number(progress.amountRaised) : 0;
  const targetAmount = 1000000000; // 1 billion target

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <section className="border-b-[3px] border-black p-8 lg:p-12 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="border-[3px] border-black bg-black text-white p-4 mb-6 inline-block">
          <h2 className="text-sm font-bold uppercase tracking-wider">ICO PROGRESS</h2>
        </div>

        <div className="relative inline-block mb-6">
          <svg width="280" height="280" className="transform -rotate-90">
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="black"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="140"
              cy="140"
              r="120"
              stroke="#6E3CFB"
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform rotate-0">
              <div className="text-5xl font-black">{progressPercent}%</div>
              <div className="text-xs font-bold uppercase mt-2">COMPLETE</div>
            </div>
          </div>
        </div>

        <div className="border-[3px] border-black p-6 bg-white inline-block">
          <div className="text-xs font-bold uppercase mb-2 opacity-70">ALLOCATION RAISED</div>
          <div className="text-2xl font-black font-mono mb-4">
            {amountRaised.toLocaleString()} / {targetAmount.toLocaleString()}
          </div>
          <div className="text-xs font-bold uppercase">GAMI TOKENS</div>
        </div>
      </div>
    </section>
  );
}
