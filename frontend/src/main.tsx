import ReactDOM from 'react-dom/client';
import { InternetIdentityProvider } from './hooks/useInternetIdentity';
import { initEditor } from './hooks/useEditor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';
import './index.css';

const queryClient = new QueryClient();
const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || 'cmf15ppkw00j8l80bobzhaq0k';

if (!import.meta.env.VITE_PRIVY_APP_ID) {
    console.warn('VITE_PRIVY_APP_ID is not defined. Falling back to the default Privy app id.');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initEditor());
} else {
    initEditor();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PrivyProvider
        appId={privyAppId}
        config={{
            appearance: {
                theme: 'light',
                accentColor: '#6E3CFB',
            },
            loginMethods: ['email'],
            embeddedWallets: {
                createOnLogin: 'users-without-wallets',
            },
        }}
    >
        <QueryClientProvider client={queryClient}>
            <InternetIdentityProvider>
                <App />
            </InternetIdentityProvider>
        </QueryClientProvider>
    </PrivyProvider>
);
