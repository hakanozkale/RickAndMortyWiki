import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { inject } from '@vercel/analytics';
import queryClient from './api/queryClient';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Initialize Vercel Analytics
inject();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
