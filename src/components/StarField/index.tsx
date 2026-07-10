import { memo, useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

const DENSITY_AREA = 900 * 900;
const PARTICLES_PER_AREA = 90;
const MIN_ALPHA = 0.15;
const MAX_ALPHA = 0.75;
const MIN_SIZE = 0.4;
const MAX_SIZE = 1.8;
const BASE_SPEED = 0.05;
const TURN_STRENGTH = 0.04;
const SPEED_REGRESSION = 0.05;
const INFLUENCE = 70;
const PUSH_STRENGTH = 1.5;
const PUSH_DECAY = 0.87;
const FADE_IN_FRAMES = 90;
const EDGE_PAD = 24;

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSpeed: number;
  size: number;
  age: number;
  alphaPhase: number;
  alphaSpeed: number;
  pushEnergy: number;
};

function makeStar(w: number, h: number): Star {
  const angle = Math.random() * Math.PI * 2;
  const baseSpeed = BASE_SPEED * (0.5 + Math.random() * 1.2);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * baseSpeed,
    vy: Math.sin(angle) * baseSpeed,
    baseSpeed,
    size: MIN_SIZE + Math.pow(Math.random(), 1.8) * (MAX_SIZE - MIN_SIZE),
    age: FADE_IN_FRAMES,
    alphaPhase: Math.random() * Math.PI * 2,
    alphaSpeed: 0.3 + Math.random() * 1.0,
    pushEnergy: 0,
  };
}

/**
 * Interactive starfield background. Fixed to the viewport, tracks the
 * window cursor. Custom canvas 2D — no particle library. Stars drift
 * along curved paths, respawn at edges, and gently repel from the
 * cursor with a spring-decay wake.
 *
 * Respects `prefers-reduced-motion` by disabling drift + interactivity
 * (dots render but stay still).
 */
type Rgb = { r: number; g: number; b: number };

function parseColor(raw: string, fallback: Rgb): Rgb {
  const m = raw.match(
    /(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)/,
  );
  if (m) {
    return { r: +m[1], g: +m[2], b: +m[3] };
  }
  const hex = raw.trim().match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  return fallback;
}

export const StarField = memo(function StarField() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const cursorRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const fgRef = useRef<Rgb>({ r: 255, g: 255, b: 255 });
  const mintRef = useRef<Rgb>({ r: 138, g: 255, b: 128 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      fgRef.current = parseColor(cs.getPropertyValue('--color-fg'), {
        r: 255,
        g: 255,
        b: 255,
      });
      mintRef.current = parseColor(cs.getPropertyValue('--color-mint'), {
        r: 138,
        g: 255,
        b: 128,
      });
    };
    readColors();
    const obs = new MutationObserver(readColors);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    const rebuild = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimsRef.current = { w, h };
      const count = Math.round(((w * h) / DENSITY_AREA) * PARTICLES_PER_AREA);
      starsRef.current = Array.from({ length: count }, () => makeStar(w, h));
    };
    rebuild();
    window.addEventListener('resize', rebuild);

    const onMove = (e: PointerEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => (cursorRef.current = null);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - t0) / 1000;
      const { w, h } = dimsRef.current;
      ctx.clearRect(0, 0, w, h);
      const cur = cursorRef.current;
      const stars = starsRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        if (!reduce) {
          const turn = (Math.random() - 0.5) * TURN_STRENGTH * 2;
          const cos = Math.cos(turn);
          const sin = Math.sin(turn);
          const nvx = s.vx * cos - s.vy * sin;
          const nvy = s.vx * sin + s.vy * cos;
          s.vx = nvx;
          s.vy = nvy;

          const speed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
          if (speed > 0.0001) {
            const factor = s.baseSpeed / speed;
            s.vx += (s.vx * factor - s.vx) * SPEED_REGRESSION;
            s.vy += (s.vy * factor - s.vy) * SPEED_REGRESSION;
          }
        }

        if (cur) {
          const dx = s.x - cur.x;
          const dy = s.y - cur.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < INFLUENCE * INFLUENCE) {
            const dist = Math.sqrt(distSq) + 0.01;
            const falloff = 1 - dist / INFLUENCE;
            const force = falloff * falloff * PUSH_STRENGTH;
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
            s.pushEnergy = Math.min(1, s.pushEnergy + falloff * falloff * 0.2);
          }
        }
        s.pushEnergy *= PUSH_DECAY;

        if (!reduce) {
          s.x += s.vx;
          s.y += s.vy;
          s.age++;
        }

        if (
          s.x < -EDGE_PAD ||
          s.x > w + EDGE_PAD ||
          s.y < -EDGE_PAD ||
          s.y > h + EDGE_PAD
        ) {
          const fresh = makeStar(w, h);
          fresh.age = 0;
          stars[i] = fresh;
          continue;
        }

        const fadeIn = Math.min(s.age / FADE_IN_FRAMES, 1);
        const alpha01 = (Math.sin(t * s.alphaSpeed + s.alphaPhase) + 1) / 2;
        const alpha = (MIN_ALPHA + alpha01 * (MAX_ALPHA - MIN_ALPHA)) * fadeIn;

        const fg = fgRef.current;
        ctx.fillStyle = `rgba(${fg.r}, ${fg.g}, ${fg.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size + s.pushEnergy * 0.12, 0, Math.PI * 2);
        ctx.fill();

        if (s.pushEnergy > 0.05) {
          const mint = mintRef.current;
          ctx.fillStyle = `rgba(${mint.r}, ${mint.g}, ${mint.b}, ${s.pushEnergy * 0.35})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size + s.pushEnergy * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', rebuild);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      obs.disconnect();
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
});
