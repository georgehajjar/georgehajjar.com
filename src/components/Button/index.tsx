import type { MouseEvent, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'ghost' | 'link';
type Size = 'sm' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink';

const sizeStyles: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-xs',
  lg: 'px-5 py-2.5 text-sm',
};

const variants: Record<Variant, string> = {
  ghost:
    'rounded-full border border-fg/15 bg-fg/[0.02] text-fg/90 hover:border-mint/60 hover:text-mint',
  link: 'text-mint hover:text-purple underline-offset-4 hover:underline',
};

const isPill = (v: Variant) => v === 'ghost';

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
  /** Present → renders <a>. Absent → renders <button>. */
  href?: string;
  /** If unset, inferred from an http(s) href — external links open in a new tab. */
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  role?: string;
  title?: string;
  'aria-label'?: string;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'dialog';
};

export function Button({
  variant = 'ghost',
  size = 'sm',
  className,
  children,
  href,
  external,
  ...rest
}: Props) {
  const classes = cn(
    base,
    variants[variant],
    isPill(variant) && sizeStyles[size],
    className,
  );

  if (href !== undefined) {
    const isExternal = external ?? /^https?:\/\//.test(href);
    const targetProps = isExternal
      ? { target: '_blank' as const, rel: 'noreferrer' as const }
      : {};
    return (
      <a href={href} className={classes} {...targetProps} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
