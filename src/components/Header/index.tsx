import { useEffect, useRef, useState } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../Button';
import { ConnectMenu } from '../ConnectMenu';
import { cn } from '../../lib/cn';
import resume from '../../assets/resume.pdf';

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const suppressActiveRef = useRef(false);
  const suppressTimerRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const compute = () => {
      if (suppressActiveRef.current) return;
      const marker = window.innerHeight * 0.35;
      const aboutTop =
        document.getElementById('about')?.getBoundingClientRect().top ??
        Infinity;
      const workTop =
        document.getElementById('work')?.getBoundingClientRect().top ??
        Infinity;
      if (workTop <= marker) setActiveSection('work');
      else if (aboutTop <= marker) setActiveSection('about');
      else setActiveSection(null);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute, { passive: true });
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'about' || hash === 'work') {
      const el = document.getElementById(hash);
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'auto' });
        }, 0);
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (suppressTimerRef.current)
        window.clearTimeout(suppressTimerRef.current);
    };
  }, []);

  const suppressUntilScrollEnd = () => {
    suppressActiveRef.current = true;
    const release = () => {
      suppressActiveRef.current = false;
      window.removeEventListener('scrollend', release);
      if (suppressTimerRef.current) {
        window.clearTimeout(suppressTimerRef.current);
        suppressTimerRef.current = null;
      }
    };
    window.addEventListener('scrollend', release, { once: true });
    if (suppressTimerRef.current) window.clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = window.setTimeout(release, 1500);
  };

  const go = (id: string) => {
    setMenuOpen(false);
    if (id === 'about' || id === 'work') setActiveSection(id);
    else setActiveSection(null);
    suppressUntilScrollEnd();
    scrollTo(id);
  };

  const goHome = () => {
    setMenuOpen(false);
    setActiveSection(null);
    suppressUntilScrollEnd();
    scrollTop();
  };

  return (
    <>
      <header
        aria-hidden={!scrolled}
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b border-white/5 backdrop-blur-xl transition-[opacity,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled
            ? 'bg-ink/80 opacity-100 shadow-lg shadow-black/20'
            : 'bg-ink/60 pointer-events-none opacity-0',
        )}
      >
        <div
          aria-hidden
          className="bg-mint/70 absolute inset-x-0 top-0 h-px origin-left"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6 md:px-10">
          <button
            onClick={goHome}
            className="font-display hover:text-mint text-lg font-medium tracking-tight text-white transition-colors"
          >
            george<span className="text-mint">.</span>
          </button>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-6">
              <Button
                variant="nav"
                onClick={() => go('about')}
                className={
                  activeSection === 'about'
                    ? '!text-white after:!scale-x-100'
                    : ''
                }
              >
                about
              </Button>
              <Button
                variant="nav"
                onClick={() => go('work')}
                className={
                  activeSection === 'work'
                    ? '!text-white after:!scale-x-100'
                    : ''
                }
              >
                work
              </Button>
            </nav>
            <ConnectMenu />
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="hover:text-mint flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors md:hidden"
          >
            <HiBars3 className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-ink/95 fixed inset-0 z-50 flex flex-col backdrop-blur-2xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
              <button
                onClick={goHome}
                className="font-display text-lg font-medium tracking-tight text-white"
              >
                george<span className="text-mint">.</span>
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="hover:text-mint flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors"
              >
                <HiXMark className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
              <button
                onClick={() => go('about')}
                className="font-display hover:text-mint text-5xl font-semibold tracking-tight text-white transition-colors"
              >
                about<span className="text-mint">.</span>
              </button>
              <button
                onClick={() => go('work')}
                className="font-display hover:text-mint text-5xl font-semibold tracking-tight text-white transition-colors"
              >
                work<span className="text-mint">.</span>
              </button>
              <div className="mt-6 flex flex-col items-center gap-4">
                <Button
                  variant="ghost"
                  size="lg"
                  href={resume}
                  onClick={() => setMenuOpen(false)}
                >
                  resume
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="https://www.linkedin.com/in/ghajjar/"
                  onClick={() => setMenuOpen(false)}
                >
                  linkedin
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  href="https://github.com/georgehajjar"
                  onClick={() => setMenuOpen(false)}
                >
                  github
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
