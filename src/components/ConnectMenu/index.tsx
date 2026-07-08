import { useEffect, useRef, useState, type ReactNode } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { HiEnvelope } from 'react-icons/hi2';
import resume from '../../assets/resume.pdf';
import { Button } from '../Button';

type Item = { label: string; href: string; icon: ReactNode };

const items: Item[] = [
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/ghajjar/',
    icon: <FaLinkedinIn className="h-3.5 w-3.5" />,
  },
  {
    label: 'github',
    href: 'https://github.com/georgehajjar',
    icon: <FaGithub className="h-3.5 w-3.5" />,
  },
  {
    label: 'email',
    href: 'mailto:georgehajjar99@gmail.com',
    icon: <HiEnvelope className="h-3.5 w-3.5" />,
  },
  {
    label: 'resume',
    href: resume,
    icon: (
      <span className="text-xs" aria-hidden>
        ↗
      </span>
    ),
  },
];

export function ConnectMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        variant="ghost"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        contact
      </Button>
      {open && (
        <div className="absolute top-full right-0 z-50 pt-2">
          <div
            role="menu"
            className="bg-ink/95 flex min-w-[11rem] flex-col gap-0.5 rounded-2xl border border-white/10 p-2 shadow-lg shadow-black/30 backdrop-blur-xl"
          >
            {items.map((item) => {
              const external = /^https?:\/\//.test(item.href);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="hover:text-mint flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="inline-flex w-4 justify-center">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
