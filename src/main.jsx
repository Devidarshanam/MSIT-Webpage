import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/styles.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App runtime error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '4rem auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0b2a6b', marginTop: 0 }}>Something went wrong loading MSIT</h2>
          <p style={{ color: '#475569', lineHeight: 1.6 }}>The application encountered an unexpected issue while rendering.</p>
          <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', overflowX: 'auto', color: '#b91c1c' }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button 
            style={{ marginTop: '1rem', padding: '0.65rem 1.4rem', background: '#0b2a6b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear Cache & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

