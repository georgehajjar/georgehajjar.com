import { lazy, Suspense } from 'react';
import { Footer, Header, ThemeToggle } from './components';
import { Landing, About, Work } from './views';

function StylesheetThemeToggle() {
  return (
    <div className="pointer-events-none fixed top-0 right-0 z-50 flex h-14 items-center pr-4 md:pr-10">
      <div className="pointer-events-auto">
        <ThemeToggle />
      </div>
    </div>
  );
}

const Stylesheet = lazy(() =>
  import('./views/Stylesheet').then((m) => ({ default: m.Stylesheet })),
);

export default function App() {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path === '/stylesheet') {
      return (
        <>
          <Suspense fallback={null}>
            <Stylesheet />
          </Suspense>
          <StylesheetThemeToggle />
        </>
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
