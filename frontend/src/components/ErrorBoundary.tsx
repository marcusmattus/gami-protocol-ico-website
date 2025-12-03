import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-white flex items-center justify-center p-4">
                    <div className="border-[3px] border-black bg-white p-8 max-w-2xl w-full">
                        <div className="flex items-center gap-4 mb-6">
                            <AlertTriangle className="w-12 h-12 text-gami-purple" />
                            <h1 className="text-3xl font-black uppercase">ERROR</h1>
                        </div>
                        <div className="border-[3px] border-black bg-black text-white p-4 mb-6">
                            <p className="font-mono text-sm">
                                {this.state.error?.message || 'AN UNEXPECTED ERROR OCCURRED'}
                            </p>
                        </div>
                        <p className="font-mono text-sm mb-6">
                            SOMETHING WENT WRONG WHILE LOADING THE APPLICATION. PLEASE REFRESH THE PAGE OR TRY AGAIN
                            LATER.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="border-[3px] border-black bg-gami-purple text-white px-6 py-3 font-black uppercase hover:bg-black hover:border-gami-purple transition-colors w-full"
                        >
                            RELOAD PAGE
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
