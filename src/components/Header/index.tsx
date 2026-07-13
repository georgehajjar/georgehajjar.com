import { useEffect, useRef, useState } from 'react';
import { HiBars3, HiXMark } from 'react-icons/hi2';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../Button';
import { ConnectMenu } from '../ConnectMenu';
import { NavItem } from '../NavItem';
import { ThemeToggle } from '../ThemeToggle';
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
  const [hovering, setHovering] = useState(false);
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
    const onMove = (e: PointerEvent) => {
      const shouldHover = e.clientY < 80;
      setHovering((prev) => (prev === shouldHover ? prev : shouldHover));
    };
    const onLeave = () => setHovering(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const compute = () => {
      if (suppressActiveRef.current) return;
      const marker = window.innerHeight * 0.7;
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

  const barVisible = scrolled || hovering;

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40">
        <div
          aria-hidden
          className={cn(
            'border-fg/5 absolute inset-0 border-b backdrop-blur-xl transition-[opacity,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            barVisible
              ? 'bg-ink/80 shadow-fg/10 dark:shadow-fg/[0.04] opacity-100 shadow-lg'
              : 'bg-ink/60 opacity-0',
          )}
        />
        <div
          aria-hidden
          className={cn(
            'bg-mint/70 absolute inset-x-0 top-0 h-px origin-left transition-opacity duration-500',
            barVisible ? 'opacity-100' : 'opacity-0',
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
        <div className="relative h-14">
          <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-6 md:px-10">
            <button
              onClick={goHome}
              aria-hidden={!barVisible}
              className={cn(
                'font-display hover:text-mint text-fg text-lg font-medium tracking-tight transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                barVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
              )}
            >
              george<span className="text-mint">.</span>
            </button>

            <div className="flex items-center gap-3">
              <div
                aria-hidden={!barVisible}
                className={cn(
                  'hidden items-center gap-3 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex',
                  barVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <nav className="flex items-center gap-1">
                  <NavItem
                    label="about"
                    isActive={activeSection === 'about'}
                    onClick={() => go('about')}
                  />
                  <NavItem
                    label="work"
                    isActive={activeSection === 'work'}
                    onClick={() => go('work')}
                  />
                </nav>
                <ConnectMenu />
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="hover:text-mint text-fg/80 flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden"
              >
                <HiBars3 className="h-6 w-6" />
              </button>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

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
                className="font-display text-fg text-lg font-medium tracking-tight"
              >
                george<span className="text-mint">.</span>
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="hover:text-mint text-fg/80 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              >
                <HiXMark className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
              <button
                onClick={() => go('about')}
                className="font-display hover:text-mint text-fg text-5xl font-semibold tracking-tight transition-colors"
              >
                about<span className="text-mint">.</span>
              </button>
              <button
                onClick={() => go('work')}
                className="font-display hover:text-mint text-fg text-5xl font-semibold tracking-tight transition-colors"
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
