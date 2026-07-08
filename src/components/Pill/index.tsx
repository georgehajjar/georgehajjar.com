import type { ElementType, ReactNode } from 'react';
import { LiveDot } from '../LiveDot';
import { cn } from '../../lib/cn';

type Variant = 'status' | 'tag';
type Size = 'sm' | 'md';

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  as?: ElementType;
  className?: string;
  /** Optional label revealed above the pill on hover. */
  tooltip?: string;
};

const variantClasses: Record<Variant, string> = {
  status: 'border-mint/30 bg-mint/10 px-3 py-1.5 text-xs text-mint',
  tag: 'border-white/15 bg-white/[0.02] text-white/90 transition-colors duration-300 hover:border-mint/60 hover:text-mint',
};

const tagSizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
};

/**
 * Pill-shaped chip. `status` = mint accent with a pulsing LiveDot for
 * ambient signals (location, availability). `tag` = neutral chip for
 * listing skills, tech stacks, hobbies, etc. Optional `tooltip` reveals
 * a short label above the pill on hover.
 */
export function Pill({
  children,
  variant = 'tag',
  size = 'md',
  as: Component = 'div',
  className,
  tooltip,
}: Props) {
  return (
    <Component
      className={cn(
        'inline-flex cursor-default items-center gap-2 rounded-full border',
        variantClasses[variant],
        variant === 'tag' && tagSizeClasses[size],
        tooltip && 'group relative',
        className,
      )}
    >
      {variant === 'status' && <LiveDot />}
      {children}
      {tooltip && (
        <span
          role="tooltip"
          className="bg-ink/95 text-mint pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-md border border-white/10 px-2.5 py-1 text-xs whitespace-nowrap opacity-0 shadow-lg shadow-black/30 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100"
        >
          {tooltip}
        </span>
      )}
    </Component>
  );
}
