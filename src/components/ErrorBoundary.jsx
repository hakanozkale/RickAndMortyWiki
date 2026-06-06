import { Component } from 'react';

/**
 * ErrorBoundary — Route seviyesinde hata yakalama
 * 
 * React class component gerektirir (hook desteklenmiyor)
 * Beklenmeyen hataları yakalar ve kullanıcıya geri bildirim verir
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>An unexpected error occurred. Please try again.</p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="error-details">{this.state.error.message}</pre>
            )}
            <button className="btn-modern btn-primary-modern" onClick={this.handleRetry}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
