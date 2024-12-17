import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { ERROR_MESSAGES } from '../lib/supabase/config';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private getErrorMessage(error: Error): string {
    // Map known error messages to user-friendly messages
    const errorMessages = Object.values(ERROR_MESSAGES).flatMap(category => 
      Object.values(category)
    );
    
    return errorMessages.includes(error.message) 
      ? error.message 
      : 'An unexpected error occurred. Please try again later.';
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="bg-red-50 p-8 rounded-lg max-w-md text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
            <p className="text-red-600 mb-4">
              {this.state.error && this.getErrorMessage(this.state.error)}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}