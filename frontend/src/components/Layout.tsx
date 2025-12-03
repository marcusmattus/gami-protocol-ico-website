import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import Header from './Header';
import Footer from './Footer';
import AuditBadge from './AuditBadge';
import ProfileSetup from './ProfileSetup';
import ErrorBoundary from './ErrorBoundary';

export default function Layout() {
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
                <div className="text-black font-mono text-xl animate-pulse">INITIALIZING...</div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white text-black font-mono">
                <Header />
                <ErrorBoundary>
                    <main>
                        <Outlet />
                    </main>
                </ErrorBoundary>
                <Footer />
                <AuditBadge />
            </div>
            {showProfileSetup && <ProfileSetup />}
        </>
    );
}
