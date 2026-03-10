import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

interface InternetIdentityContextType {
  identity: any | null;
  isInitializing: boolean;
  loginStatus: 'idle' | 'logging-in' | 'success' | 'error';
  login: () => Promise<void>;
  logout: () => void;
  clear: () => Promise<void>;
}

const InternetIdentityContext = createContext<InternetIdentityContextType>({
  identity: null,
  isInitializing: false,
  loginStatus: 'idle',
  login: async () => {},
  logout: () => {},
  clear: async () => {},
});

export function InternetIdentityProvider({ children }: { children: React.ReactNode }) {
  const { login: privyLogin, logout: privyLogout, authenticated, user, ready } = usePrivy();
  const [loginStatus, setLoginStatus] = useState<'idle' | 'logging-in' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (authenticated) {
      setLoginStatus('success');
    }
  }, [authenticated]);

  const login = async () => {
    try {
      setLoginStatus('logging-in');
      await privyLogin();
      setLoginStatus('success');
    } catch (error) {
      console.error('Login error:', error);
      setLoginStatus('error');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await privyLogout();
      setLoginStatus('idle');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const clear = async () => {
    await logout();
  };

  const identity = authenticated ? user : null;

  return (
    <InternetIdentityContext.Provider 
      value={{ 
        identity, 
        isInitializing: !ready, 
        loginStatus,
        login, 
        logout,
        clear
      }}
    >
      {children}
    </InternetIdentityContext.Provider>
  );
}

export function useInternetIdentity() {
  return useContext(InternetIdentityContext);
}
