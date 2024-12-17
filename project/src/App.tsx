import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ArtworkView } from './pages/ArtworkView';
import { NetworkStatus } from './components/NetworkStatus';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artwork/:id" element={<ArtworkView />} />
            </Routes>
          </Layout>
          <NetworkStatus />
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}