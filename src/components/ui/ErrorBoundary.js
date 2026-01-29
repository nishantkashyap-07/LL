import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center">
            <div className="card-elegant">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-error-100 dark:bg-error-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-error-600 dark:text-error-400" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-4 mb-6 text-left">
                  <h3 className="font-semibold text-error-800 dark:text-error-200 mb-2">
                    Error Details:
                  </h3>
                  <pre className="text-xs text-error-700 dark:text-error-300 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleReload}
                  className="bg-primary-900 dark:bg-primary-800 hover:bg-primary-800 dark:hover:bg-primary-700 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 shadow-elegant-md hover:shadow-elegant-lg tracking-wide text-xs uppercase flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Page
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium px-8 py-4 rounded-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 tracking-wide text-xs uppercase flex items-center justify-center"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

