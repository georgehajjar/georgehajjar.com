import { ReactNode } from "react";
import classNames from "classnames";
import "./styles.scss";

type ButtonType =
  | "link-1"
  | "link-2"
  | "link-3"
  | "nav-link"
  | "btn-outline"
  | "btn-filled-1"
  | "btn-filled-2"
  | "tab";

interface LinkProps {
  type: ButtonType;
  href?: string;
  className?: string;
  fontSize?: number;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

export function Button({
  type,
  href,
  className,
  fontSize,
  children,
  onClick,
}: LinkProps) {
  return (
    <a
      href={href}
      className={classNames(type, className)}
      style={{ fontSize: `${fontSize}rem` }}
      onClick={onClick}
      target={href && "_blank"}
    >
      {children}
    </a>
  );
}
