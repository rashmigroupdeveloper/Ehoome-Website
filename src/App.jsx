import { Suspense } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import RouteFallback from './components/RouteFallback';
import PageTransition from './components/PageTransition';
import { routes } from './routes';
import './styles/tokens.css';
import './App.css';

// The same route objects drive rendering and chunk preloading, so the curtain
// can always find the import() belonging to wherever it is about to go.
function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <div className="app">
        <CustomCursor />
        <Header />
        <ScrollToTop />
        <PageTransition />
        <main id="main">
          <Suspense fallback={<RouteFallback />}>
            <AppRoutes />
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
