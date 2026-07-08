import { lazy, Suspense } from 'react';
import { Footer, Header } from './components';
import { Landing, About, Work } from './views';

const Stylesheet = lazy(() =>
  import('./views/Stylesheet').then((m) => ({ default: m.Stylesheet })),
);

export default function App() {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path === '/stylesheet') {
      return (
        <Suspense fallback={null}>
          <Stylesheet />
        </Suspense>
      );
    }
    if (path !== '/') {
      window.history.replaceState(null, '', '/');
    }
  }

  return (
    <>
      <Header />
      <main>
        <Landing />
        <About />
        <Work />
      </main>
      <Footer />
    </>
  );
}
