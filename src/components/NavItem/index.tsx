import { cn } from '../../lib/cn';

type Props = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
};

/**
 * Nav item pill used in the Header. Default is a muted label; hover
 * adds a subtle fg-tinted pill; `isActive` swaps to a mint pill + mint
 * label.
 */
export function NavItem({ label, isActive = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-md px-2 py-1 text-sm font-normal transition-colors',
        isActive
          ? 'bg-mint/10 text-mint'
          : 'text-fg/60 hover:bg-fg/[0.04] hover:text-fg/95',
      )}
    >
      {label}
    </button>
  );
}
