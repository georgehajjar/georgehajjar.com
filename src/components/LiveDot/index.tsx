import { cn } from '../../lib/cn';

type Size = 'sm' | 'md';

const sizes: Record<Size, string> = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

type Props = {
  size?: Size;
  'aria-label'?: string;
};

/** Pulsing mint dot — signals "live" / "active" / "here now". */
export function LiveDot({ size = 'md', 'aria-label': ariaLabel }: Props) {
  const dim = sizes[size];
  return (
    <span
      className={cn('relative inline-flex', dim)}
      aria-label={ariaLabel}
      role={ariaLabel ? 'status' : undefined}
    >
      <span className="bg-mint absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
      <span className={cn('bg-mint relative inline-flex rounded-full', dim)} />
    </span>
  );
}
