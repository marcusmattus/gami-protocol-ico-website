import Hero from '../components/Hero';
import KYCGateway from '../components/KYCGateway';
import WalletModule from '../components/WalletModule';
import MarketData from '../components/MarketData';
import LegalDocs from '../components/LegalDocs';
import SupplyBlock from '../components/SupplyBlock';
import VestingSchedule from '../components/VestingSchedule';
import AIMechanism from '../components/AIMechanism';
import DualToken from '../components/DualToken';
import ICOProgress from '../components/ICOProgress';
import ErrorBoundary from '../components/ErrorBoundary';

export default function HomePage() {
    return (
        <>
            <ErrorBoundary>
                <Hero />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <MarketData />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <div className="grid lg:grid-cols-2 gap-0">
                    <KYCGateway />
                    <ICOProgress />
                </div>
            </ErrorBoundary>
            
            <ErrorBoundary>
                <WalletModule />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <SupplyBlock />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <VestingSchedule />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <AIMechanism />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <DualToken />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <LegalDocs />
            </ErrorBoundary>
        </>
    );
}
