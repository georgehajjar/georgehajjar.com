import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { Button } from '../Button';

export function Footer() {
  return (
    <footer className="bg-ink border-fg/5 border-t">
      <div className="text-fg/40 mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-6 text-sm md:px-10">
        <div>
          {new Date().getFullYear()} &copy;{' '}
          <a
            href="/stylesheet"
            className="hover:text-mint underline-offset-4 transition-colors hover:underline"
          >
            Website
          </a>{' '}
          by <span className="text-fg/70">George Hajjar</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            href="https://www.linkedin.com/in/ghajjar/"
            aria-label="LinkedIn"
            className="px-2.5"
          >
            <FaLinkedinIn className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            href="https://github.com/georgehajjar"
            aria-label="GitHub"
            className="px-2.5"
          >
            <FaGithub className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
