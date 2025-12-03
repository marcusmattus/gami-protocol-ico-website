import { useEffect, useState } from 'react';
import { useGetICOConfig } from '../hooks/useQueries';

export default function Hero() {
  const { data: icoConfig } = useGetICOConfig();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!icoConfig) return;

    const targetTime = Number(icoConfig.endTime) / 1000000; // Convert nanoseconds to milliseconds

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [icoConfig]);

  return (
    <section className="relative border-b-[3px] border-black overflow-hidden">
      <div className="bg-gami-purple text-white py-2 text-sm font-bold uppercase tracking-wider border-b-[3px] border-black overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="mx-4">⚠ DISCLAIMER: CRYPTOCURRENCY INVESTMENTS CARRY RISK. CONDUCT YOUR OWN RESEARCH. NOT FINANCIAL ADVICE. ⚠</span>
          <span className="mx-4">⚠ DISCLAIMER: CRYPTOCURRENCY INVESTMENTS CARRY RISK. CONDUCT YOUR OWN RESEARCH. NOT FINANCIAL ADVICE. ⚠</span>
          <span className="mx-4">⚠ DISCLAIMER: CRYPTOCURRENCY INVESTMENTS CARRY RISK. CONDUCT YOUR OWN RESEARCH. NOT FINANCIAL ADVICE. ⚠</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-5xl lg:text-7xl font-black uppercase mb-6 leading-none">
            GAMI: THE STRIPE OF GAMIFICATION.
          </h1>
          <p className="text-xl lg:text-2xl font-bold uppercase mb-12 tracking-wide">
            Universal Identity Layer for a $3.3 Billion Global Gamer Market.
          </p>

          <div className="border-[3px] border-black bg-white p-8 inline-block">
            <div className="text-sm font-bold uppercase mb-4 tracking-wider">ICO COUNTDOWN</div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HOURS', value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-4xl font-black border-[3px] border-black bg-gami-purple text-white p-4 mb-2">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-bold uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white py-2 text-sm font-bold uppercase tracking-wider border-t-[3px] border-black overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="mx-4">🚀 LIVE NOW: GAMI TOKEN ICO • SECURE YOUR ALLOCATION TODAY • LIMITED SUPPLY • FIRST COME FIRST SERVED 🚀</span>
          <span className="mx-4">🚀 LIVE NOW: GAMI TOKEN ICO • SECURE YOUR ALLOCATION TODAY • LIMITED SUPPLY • FIRST COME FIRST SERVED 🚀</span>
          <span className="mx-4">🚀 LIVE NOW: GAMI TOKEN ICO • SECURE YOUR ALLOCATION TODAY • LIMITED SUPPLY • FIRST COME FIRST SERVED 🚀</span>
        </div>
      </div>
    </section>
  );
}
