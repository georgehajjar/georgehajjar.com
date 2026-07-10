import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '../../lib/cn';

type Props = {
  /** Numeric target to count up to. */
  target: number;
  prefix?: string;
  suffix?: string;
  /** Animation length, ms. Default 1400. */
  duration?: number;
  /** Class applied to the outer span. Defaults to the mint-highlight style. */
  className?: string;
};

function formatValue(current: number, target: number): string {
  const done = Math.abs(current - target) < 0.02;
  if (done) {
    return Number.isInteger(target) ? String(target) : current.toFixed(1);
  }
  if (Math.abs(target) >= 10) return String(Math.round(current));
  return current.toFixed(1);
}

/**
 * Number that eases from 0 to `target` when scrolled into view. Triggers
 * once. Respects `prefers-reduced-motion` by rendering the final value
 * immediately.
 */
export function Counter({
  target,
  prefix = '',
  suffix = '',
  duration = 1400,
  className = 'text-mint font-medium',
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(reduce ? target : 0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplayed(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const startAnim = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayed(target * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAnim();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [target, duration, reduce]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {formatValue(displayed, target)}
      {suffix}
    </span>
  );
}
