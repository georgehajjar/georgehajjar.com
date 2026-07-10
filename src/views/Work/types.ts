import type { IconType } from 'react-icons';

export interface Role {
  title: string;
  dateRange: string;
}

export interface Workplace {
  id: number;
  company: string;
  website?: string;
  location?: string;
  current?: boolean;
  roles: Role[];
  stack: string[];
  info: string[];
}

export interface StackMeta {
  Icon?: IconType;
  /** Brand hex. Omit for monotone marks so the icon inherits currentColor. */
  color?: string;
}
