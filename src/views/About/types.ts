import type { IconType } from 'react-icons';

export interface Technology {
  label: string;
  desc: string;
  Icon: IconType;
  /** Brand hex. Omit for monotone marks so the icon inherits currentColor. */
  color?: string;
}

export interface Hobby {
  icon: string;
  label: string;
  /** Optional note revealed on hover as the Pill's tooltip. */
  note?: string;
}
