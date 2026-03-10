import { useEffect } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import Hero from './components/Hero';
import KYCGateway from './components/KYCGateway';
import MarketData from './components/MarketData';
import LegalDocs from './components/LegalDocs';
import SupplyBlock from './components/SupplyBlock';
import VestingSchedule from './components/VestingSchedule';
import AuditBadge from './components/AuditBadge';
import AIMechanism from './components/AIMechanism';
import DualToken from './components/DualToken';
import ICOProgress from './components/ICOProgress';
import ProfileSetup from './components/ProfileSetup';
import Header from './components/Header';
import Footer from './components/Footer';
import StablePaymentWidget from './components/StablePaymentWidget';
import WalletModule from './components/WalletModule';

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  useEffect(() => {
    document.body.style.overflow = showProfileSetup ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showProfileSetup]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black font-mono text-xl">INITIALIZING...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white text-black font-mono">
        <Header />
        <main>
          <Hero />
          <MarketData />
          <div className="grid lg:grid-cols-2 gap-0">
            <KYCGateway />
            <ICOProgress />
          </div>
          <StablePaymentWidget />
          <WalletModule />
          <SupplyBlock />
          <VestingSchedule />
          <AIMechanism />
          <DualToken />
          <LegalDocs />
        </main>
        <Footer />
        <AuditBadge />
      </div>
      {showProfileSetup && <ProfileSetup />}
    </>
  );
}
