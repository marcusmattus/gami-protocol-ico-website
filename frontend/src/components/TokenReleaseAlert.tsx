import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface TokenReleaseAlertProps {
  scrollToCountdown: () => void;
}

export default function TokenReleaseAlert({ scrollToCountdown }: TokenReleaseAlertProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('gami-alert-subscribed');
    if (!hasSubscribed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store subscription (in production, send to backend)
      localStorage.setItem('gami-alert-subscribed', 'true');
      localStorage.setItem('gami-alert-email', email);
      setIsSubscribed(true);
      setShowSuccess(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('gami-alert-dismissed', 'true');
  };

  const handleViewCountdown = () => {
    scrollToCountdown();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slide-up">
      <div className="border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-gami-purple text-white p-4 border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 animate-pulse" />
            <h3 className="font-black uppercase text-sm">TOKEN RELEASE ALERT</h3>
          </div>
          <button
            onClick={handleClose}
            className="hover:bg-white hover:text-black transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!isSubscribed ? (
            <>
              <p className="font-mono text-sm">
                Get notified when GAMI tokens are released! Be the first to know.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="YOUR EMAIL ADDRESS"
                  required
                  className="w-full px-4 py-3 border-[3px] border-black font-mono text-sm uppercase placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gami-purple"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 border-[3px] border-black bg-black text-white font-black uppercase text-sm hover:bg-gami-purple transition-colors"
                >
                  NOTIFY ME
                </button>
              </form>

              <button
                onClick={handleViewCountdown}
                className="w-full px-6 py-3 border-[3px] border-black bg-white text-black font-black uppercase text-sm hover:bg-gami-purple hover:text-white transition-colors"
              >
                VIEW COUNTDOWN
              </button>
            </>
          ) : showSuccess ? (
            <div className="space-y-3">
              <div className="border-[3px] border-black bg-green-100 p-4">
                <p className="font-mono text-sm text-green-900">
                  ✓ SUCCESS! You'll be notified when tokens are released.
                </p>
              </div>
              <button
                onClick={handleViewCountdown}
                className="w-full px-6 py-3 border-[3px] border-black bg-gami-purple text-white font-black uppercase text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform"
              >
                VIEW COUNTDOWN
              </button>
            </div>
          ) : null}

          <div className="text-xs font-mono text-center opacity-60 uppercase">
            🔔 INSTANT ALERTS • 📧 EMAIL NOTIFICATIONS
          </div>
        </div>
      </div>
    </div>
  );
}
