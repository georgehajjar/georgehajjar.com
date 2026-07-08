import { cn } from '../../lib/cn';

type Props = {
  /** Use the mint accent color instead of inheriting from parent. */
  accent?: boolean;
  className?: string;
};

/**
 * Trailing chevron with a hover-slide animation. Requires an ancestor
 * with the `group` class (Button already applies it).
 */
export function Chevron({ accent, className }: Props) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block text-base transition-transform duration-300 ease-out group-hover:translate-x-1',
        accent && 'text-mint',
        className,
      )}
    >
      ›
    </span>
  );
}
