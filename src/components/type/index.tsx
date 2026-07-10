import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/cn';
import { layoutClasses, type LayoutProps } from '../../lib/layout';

/**
 * Typography primitives. Styles are locked at the source.
 *
 * **Contract:** the only positioning knobs are the typed layout props
 * (`mb`, `mt`, `maxW`, etc). There is no `className` slot — font,
 * size, color, and opacity are decided at the primitive level and
 * cannot be overridden at the call site.
 */

type Props = LayoutProps & {
  children: ReactNode;
  id?: string;
};

type HeadingProps = Props & {
  /** Append a mint period after the children — the signature heading accent. */
  accentPeriod?: boolean;
};

const AccentPeriod = () => <span className="text-mint">.</span>;

/**
 * Display — the hero H1. Renders `motion.h1` so callers can pass
 * animation props (variants, initial, animate, whileInView, etc.) for
 * kinetic hero moments while keeping the display font/size/color locked.
 */
type DisplayProps = LayoutProps &
  Omit<HTMLMotionProps<'h1'>, 'className' | 'children'> & {
    children: ReactNode;
    accentPeriod?: boolean;
  };

export function Display({
  children,
  accentPeriod,
  mb,
  mbMd,
  mt,
  mtMd,
  mx,
  my,
  maxW,
  ...motionProps
}: DisplayProps) {
  return (
    <motion.h1
      className={cn(
        'font-display text-fg text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl lg:text-8xl',
        layoutClasses({ mb, mbMd, mt, mtMd, mx, my, maxW }),
      )}
      {...motionProps}
    >
      {children}
      {accentPeriod && <AccentPeriod />}
    </motion.h1>
  );
}

export function SectionTitle({
  children,
  id,
  accentPeriod,
  ...layout
}: HeadingProps) {
  return (
    <h2
      id={id}
      className={cn(
        'font-display text-fg text-4xl font-semibold tracking-tight md:text-5xl',
        layoutClasses(layout),
      )}
    >
      {children}
      {accentPeriod && <AccentPeriod />}
    </h2>
  );
}

export function Subhead({
  children,
  id,
  accentPeriod,
  ...layout
}: HeadingProps) {
  return (
    <h3
      id={id}
      className={cn(
        'font-display text-fg/85 text-2xl leading-[1.15] font-medium tracking-tight md:text-4xl',
        layoutClasses(layout),
      )}
    >
      {children}
      {accentPeriod && <AccentPeriod />}
    </h3>
  );
}

export function CardTitle({ children, id, ...layout }: Props) {
  return (
    <h4
      id={id}
      className={cn(
        'font-display text-fg text-xl font-medium md:text-2xl',
        layoutClasses(layout),
      )}
    >
      {children}
    </h4>
  );
}

export function Tagline({ children, id, ...layout }: Props) {
  return (
    <p
      id={id}
      className={cn(
        'text-fg/50 text-lg font-light md:text-xl',
        layoutClasses(layout),
      )}
    >
      {children}
    </p>
  );
}

export function Body({ children, id, ...layout }: Props) {
  return (
    <p
      id={id}
      className={cn(
        'text-fg/70 text-base leading-relaxed md:text-lg',
        layoutClasses(layout),
      )}
    >
      {children}
    </p>
  );
}

export function Meta({ children, ...layout }: Props) {
  return (
    <div className={cn('text-fg/40 text-sm', layoutClasses(layout))}>
      {children}
    </div>
  );
}

type LabelProps = Props & {
  as?: 'div' | 'dt' | 'dd' | 'span';
};

export function Label({
  children,
  as: Component = 'div',
  ...layout
}: LabelProps) {
  return (
    <Component
      className={cn(
        'text-fg/40 text-xs tracking-[0.2em] uppercase',
        layoutClasses(layout),
      )}
    >
      {children}
    </Component>
  );
}
