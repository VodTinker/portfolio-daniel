import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
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
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Algo salió mal
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Por favor, recarga la página para continuar.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full font-medium hover:scale-105 transition-transform"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
