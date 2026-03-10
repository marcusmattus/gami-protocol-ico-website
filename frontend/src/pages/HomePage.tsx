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
import TokenReleaseAlert from '../components/TokenReleaseAlert';
import UniversalWalletIntegration from '../components/UniversalWalletIntegration';
import GamiChainStatus from '../components/GamiChainStatus';
import TokenDistributionPanel from '../components/TokenDistributionPanel';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function HomePage() {
    const { identity } = useInternetIdentity();
    
    // Check if user is admin (you can customize this logic)
    const isAdmin = identity && (identity as any).isAdmin === true;
    const userAddress = identity ? (identity as any).wallet?.address : undefined;

    const scrollToCountdown = () => {
        const element = document.getElementById('countdown-clock');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

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
                <div className="grid lg:grid-cols-2 gap-0">
                    <div className="border-r-[3px] border-b-[3px] border-black p-8">
                        <UniversalWalletIntegration userAddress={userAddress} />
                    </div>
                    <div className="border-b-[3px] border-black p-8">
                        <GamiChainStatus />
                    </div>
                </div>
            </ErrorBoundary>

            {isAdmin && (
                <ErrorBoundary>
                    <TokenDistributionPanel 
                        adminAddress={userAddress} 
                        isAdmin={isAdmin} 
                    />
                </ErrorBoundary>
            )}
            
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

            <TokenReleaseAlert scrollToCountdown={scrollToCountdown} />
        </>
    );
}
