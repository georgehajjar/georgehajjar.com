import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { motion } from 'motion/react';
import { useTheme } from '../../lib/theme';

/**
 * Segmented pill with a sliding mint knob. Both icons stay visible; the
 * knob slides under the active one, which flips to ink-colour for
 * contrast. The entire surface is a single button — clicking anywhere
 * toggles the theme.
 *
 * Height matches the status `Pill` (~26px) so it lines up with other
 * chrome in the same row.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      className="border-fg/15 bg-fg/[0.04] relative flex items-center rounded-full border p-1 backdrop-blur-md"
    >
      <motion.div
        aria-hidden
        className="bg-mint shadow-mint/30 absolute top-1 left-1 h-6 w-6 rounded-full shadow-md"
        animate={{ x: isLight ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
      <span
        aria-hidden
        className={
          'relative z-10 flex h-6 w-6 items-center justify-center transition-colors ' +
          (isLight ? 'text-ink' : 'text-fg/55')
        }
      >
        <HiOutlineSun className="h-4 w-4" />
      </span>
      <span
        aria-hidden
        className={
          'relative z-10 flex h-6 w-6 items-center justify-center transition-colors ' +
          (!isLight ? 'text-ink' : 'text-fg/55')
        }
      >
        <HiOutlineMoon className="h-4 w-4" />
      </span>
    </button>
  );
}
