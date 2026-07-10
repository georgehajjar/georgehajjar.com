import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { layoutClasses, type LayoutProps } from '../../lib/layout';

type Rounded = '2xl' | '3xl';
type Padding = 'sm' | 'md' | 'lg';

const roundedStyles: Record<Rounded, string> = {
  '2xl': 'rounded-2xl',
  '3xl': 'rounded-3xl',
};

const paddingStyles: Record<Padding, string> = {
  sm: 'p-5 md:p-6',
  md: 'p-6 md:p-8',
  lg: 'p-6 md:p-10',
};

type Props = LayoutProps & {
  children: ReactNode;
  rounded?: Rounded;
  padding?: Padding;
};

/**
 * Glass surface card — the baseline for content blocks (Work content,
 * About profile card, etc). Locks the glass tone (`bg-fg/[0.03]`
 * ring-1 ring-fg/5) and offers typed rounding + padding tokens.
 */
export function Card({
  children,
  rounded = '2xl',
  padding = 'md',
  ...layout
}: Props) {
  return (
    <div
      className={cn(
        'bg-fg/[0.03] ring-fg/5 ring-1',
        roundedStyles[rounded],
        paddingStyles[padding],
        layoutClasses(layout),
      )}
    >
      {children}
    </div>
  );
}
