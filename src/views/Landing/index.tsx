import { memo, useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import {
  Button,
  Chevron,
  Display,
  Pill,
  Subhead,
  Tagline,
} from '../../components';
import { workplaces } from '../Work/data';

const particleOptions: ISourceOptions = {
  fpsLimit: 60,
  fullScreen: { enable: false },
  particles: {
    color: { value: '#ffffff' },
    links: { enable: false },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'out' },
      random: true,
      speed: 0.2,
      straight: false,
    },
    number: {
      value: 90,
      density: { enable: true, width: 900, height: 900 },
    },
    opacity: {
      value: { min: 0.15, max: 0.75 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    shape: { type: 'circle' },
    size: { value: { min: 0.4, max: 1.8 } },
  },
  detectRetina: true,
};

const BEFORE = "hey, I'm ";
const NAME = 'george';
const PERIOD = '.';
const INTRO_DELAY_MS = 500;
const INTRO_LETTER_MS = 35;
const INTRO_TAIL_MS = 500;
const INTRO_DURATION_MS =
  INTRO_DELAY_MS +
  (BEFORE.length + NAME.length + PERIOD.length) * INTRO_LETTER_MS +
  INTRO_TAIL_MS;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: INTRO_LETTER_MS / 1000,
      delayChildren: INTRO_DELAY_MS / 1000,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: INTRO_TAIL_MS / 1000, ease: [0.16, 1, 0.3, 1] },
  },
};

const StarField = memo(function StarField() {
  const reduceMotion = useReducedMotion();
  const [inited, setInited] = useState(false);
  useEffect(() => {
    if (reduceMotion) return;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInited(true));
  }, [reduceMotion]);
  if (reduceMotion || !inited) return null;
  return (
    <Particles
      id="tsparticles"
      options={particleOptions}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
});

const goToWork = () =>
  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });

const goToAbout = () =>
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });

const ScrollHint = memo(function ScrollHint() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [nearTop, setNearTop] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 2400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setNearTop(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shown = mounted && nearTop;

  return (
    <motion.button
      type="button"
      onClick={goToAbout}
      aria-label="Scroll to about section"
      initial={{ opacity: 0 }}
      animate={{ opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'hover:text-mint absolute bottom-8 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center text-white/40 transition-colors md:bottom-10',
        !shown && 'pointer-events-none',
      )}
    >
      <motion.svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 1.8,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              }
        }
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </motion.button>
  );
});

export function Landing() {
  const reduceMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);

  const current = useMemo(() => workplaces.find((w) => w.current), []);

  useEffect(() => {
    if (reduceMotion) {
      setIntroDone(true);
      return;
    }
    const timer = window.setTimeout(
      () => setIntroDone(true),
      INTRO_DURATION_MS,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const bodyChars = [...BEFORE, ...NAME];

  return (
    <>
      <StarField />

      <section className="relative min-h-screen overflow-hidden">
        <ScrollHint />
        <div className="relative mx-auto flex min-h-screen max-w-screen-2xl items-center px-6 pb-16 md:px-10 md:pb-24">
          <div className="relative w-full">
            <Display
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              mb={6}
              mbMd={8}
            >
              {bodyChars.map((c, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                  {c === ' ' ? '\u00A0' : c}
                </motion.span>
              ))}
              {introDone ? (
                <motion.span
                  key="period-bounce"
                  className="text-mint"
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          duration: 1.8,
                          repeat: Infinity,
                          ease: [0.4, 0, 0.2, 1],
                        }
                  }
                >
                  {PERIOD}
                </motion.span>
              ) : (
                <motion.span
                  key="period-intro"
                  variants={letterVariants}
                  className="text-mint"
                  style={{ display: 'inline-block', whiteSpace: 'pre' }}
                >
                  {PERIOD}
                </motion.span>
              )}
            </Display>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1.6,
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {current && (
                <div className="mb-6 md:mb-8">
                  <Pill variant="status">
                    Currently building at {current.company}
                  </Pill>
                </div>
              )}
              <Subhead mb={6} mbMd={8}>
                Software Developer,
                <br />
                Engineer{' '}
                <span className="from-mint to-purple bg-gradient-to-r bg-clip-text text-transparent">
                  &amp;
                </span>
                <br />
                Technology Enthusiast.
              </Subhead>
              <Tagline maxW="xl">
                Building modern, ambitious software for the future.
              </Tagline>
              <div className="mt-10">
                <Button variant="ghost" size="lg" onClick={goToWork}>
                  See my work
                  <Chevron accent />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
