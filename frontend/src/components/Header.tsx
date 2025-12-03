import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';
  const text = loginStatus === 'logging-in' ? 'LOGGING IN...' : isAuthenticated ? 'LOGOUT' : 'LOGIN';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <header className="border-b-[3px] border-black bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/assets/generated/gami-logo-transparent.dim_200x200.png" alt="GAMI" className="h-12 w-12" />
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-tight">GAMI PROTOCOL</h1>
            <p className="text-xs uppercase tracking-wider">ICO GATEWAY</p>
          </div>
        </div>
        <button
          onClick={handleAuth}
          disabled={disabled}
          className="px-6 py-3 border-[3px] border-black bg-white text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors disabled:opacity-50"
        >
          {text}
        </button>
      </div>
    </header>
  );
}
