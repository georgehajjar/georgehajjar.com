import { ReactNode } from 'react';
import classNames from 'classnames';
import './styles.scss';

type LinkType =
  | 'link-1'
  | 'link-2'
  | 'link-3'
  | 'nav-link'
  | 'btn-outline'
  | 'btn-filled-1'
  | 'btn-filled-2'
  | 'tab';

interface LinkProps {
  type: LinkType;
  href?: string;
  classes?: string;
  fontSize?: number;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  target?: string;
}

export function Link({
  type,
  href,
  classes,
  fontSize,
  children,
  onClick,
  target,
}: LinkProps) {
  return (
    <a
      href={href}
      className={classNames(type, classes)}
      style={{ fontSize: `${fontSize}rem` }}
      onClick={onClick}
      target={target}
    >
      {children}
    </a>
  );
}
