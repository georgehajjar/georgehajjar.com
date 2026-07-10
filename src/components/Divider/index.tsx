import { cn } from '../../lib/cn';
import { layoutClasses, type LayoutProps } from '../../lib/layout';

type Props = LayoutProps;

/**
 * Hairline horizontal divider — `h-px w-full bg-fg/5`.
 * Use LayoutProps (`my`, `mb`, `mt`) for spacing.
 */
export function Divider(props: Props) {
  return (
    <div
      role="separator"
      className={cn('bg-fg/5 h-px w-full', layoutClasses(props))}
    />
  );
}
