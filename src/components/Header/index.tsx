import { useState } from 'react';
import classNames from 'classnames';

import { Link } from '../Link';
import './styles.scss';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openClass = menuOpen && 'open';

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <header className="w-full flex flex-col justify-center items-center">
      <div className="header-container flex justify-between items-center">
        <div className="flex items-center">
          <div className="name ml-2 text-white">George Hajjar</div>
        </div>
        <div className="hidden items-end md:flex">
          <Link
            type="nav-link"
            classes="animated ml-16"
            fontSize={1.6}
            onClick={() => scrollTo('about')}
          >
            about
          </Link>
          <Link
            type="nav-link"
            classes="animated ml-16"
            fontSize={1.6}
            onClick={() => scrollTo('work')}
          >
            work
          </Link>
          <Link href="" type="btn-outline" classes="ml-16" fontSize={1.6}>
            resume
          </Link>
        </div>
        <div
          className={classNames('hamburger flex md:hidden', openClass)}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {menuOpen && (
        <div
          className={classNames(
            'w-full flex flex-col justify-around items-center bg-black2 md:hidden',
            openClass
          )}
        >
          <Link
            type="nav-link"
            classes="py-5"
            fontSize={1.6}
            onClick={() => scrollTo('about')}
          >
            about
          </Link>
          <Link
            type="nav-link"
            classes="py-5"
            fontSize={1.6}
            onClick={() => scrollTo('work')}
          >
            work
          </Link>
          <Link href="" type="nav-link" classes="py-5" fontSize={1.6}>
            resume
          </Link>
        </div>
      )}
    </header>
  );
}
