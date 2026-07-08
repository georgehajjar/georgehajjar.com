import { HiArrowUpRight } from 'react-icons/hi2';
import { cn } from '../../lib/cn';

type Props = {
  className?: string;
};

/**
 * Up-right diagonal arrow that slides on hover — pair with `Button variant="link"`
 * (or any ancestor with the `group` class) for the external-link CTA pattern.
 */
export function ExternalArrow({ className }: Props) {
  return (
    <HiArrowUpRight
      aria-hidden
      className={cn(
        'h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
        className,
      )}
    />
  );
}
