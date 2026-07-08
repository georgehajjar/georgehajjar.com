/**
 * Layout props for design-system primitives.
 *
 * Primitives lock typography and color at the source. Callers control
 * positioning via these explicit, typed props instead of an open
 * `className` slot. Values are constrained to specific Tailwind scales
 * so the classes are typed and JIT-detectable.
 */

export type Space =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 32;

export type MaxWidth =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'prose'
  | 'none'
  | 'full';

export type LayoutProps = {
  mb?: Space;
  mbMd?: Space;
  mt?: Space;
  mtMd?: Space;
  mx?: Space | 'auto';
  my?: Space;
  maxW?: MaxWidth;
};

const MB: Record<Space, string> = {
  0: 'mb-0',
  1: 'mb-1',
  2: 'mb-2',
  3: 'mb-3',
  4: 'mb-4',
  5: 'mb-5',
  6: 'mb-6',
  7: 'mb-7',
  8: 'mb-8',
  9: 'mb-9',
  10: 'mb-10',
  11: 'mb-11',
  12: 'mb-12',
  14: 'mb-14',
  16: 'mb-16',
  20: 'mb-20',
  24: 'mb-24',
  32: 'mb-32',
};

const MB_MD: Record<Space, string> = {
  0: 'md:mb-0',
  1: 'md:mb-1',
  2: 'md:mb-2',
  3: 'md:mb-3',
  4: 'md:mb-4',
  5: 'md:mb-5',
  6: 'md:mb-6',
  7: 'md:mb-7',
  8: 'md:mb-8',
  9: 'md:mb-9',
  10: 'md:mb-10',
  11: 'md:mb-11',
  12: 'md:mb-12',
  14: 'md:mb-14',
  16: 'md:mb-16',
  20: 'md:mb-20',
  24: 'md:mb-24',
  32: 'md:mb-32',
};

const MT: Record<Space, string> = {
  0: 'mt-0',
  1: 'mt-1',
  2: 'mt-2',
  3: 'mt-3',
  4: 'mt-4',
  5: 'mt-5',
  6: 'mt-6',
  7: 'mt-7',
  8: 'mt-8',
  9: 'mt-9',
  10: 'mt-10',
  11: 'mt-11',
  12: 'mt-12',
  14: 'mt-14',
  16: 'mt-16',
  20: 'mt-20',
  24: 'mt-24',
  32: 'mt-32',
};

const MT_MD: Record<Space, string> = {
  0: 'md:mt-0',
  1: 'md:mt-1',
  2: 'md:mt-2',
  3: 'md:mt-3',
  4: 'md:mt-4',
  5: 'md:mt-5',
  6: 'md:mt-6',
  7: 'md:mt-7',
  8: 'md:mt-8',
  9: 'md:mt-9',
  10: 'md:mt-10',
  11: 'md:mt-11',
  12: 'md:mt-12',
  14: 'md:mt-14',
  16: 'md:mt-16',
  20: 'md:mt-20',
  24: 'md:mt-24',
  32: 'md:mt-32',
};

const MX: Record<Space | 'auto', string> = {
  0: 'mx-0',
  1: 'mx-1',
  2: 'mx-2',
  3: 'mx-3',
  4: 'mx-4',
  5: 'mx-5',
  6: 'mx-6',
  7: 'mx-7',
  8: 'mx-8',
  9: 'mx-9',
  10: 'mx-10',
  11: 'mx-11',
  12: 'mx-12',
  14: 'mx-14',
  16: 'mx-16',
  20: 'mx-20',
  24: 'mx-24',
  32: 'mx-32',
  auto: 'mx-auto',
};

const MY: Record<Space, string> = {
  0: 'my-0',
  1: 'my-1',
  2: 'my-2',
  3: 'my-3',
  4: 'my-4',
  5: 'my-5',
  6: 'my-6',
  7: 'my-7',
  8: 'my-8',
  9: 'my-9',
  10: 'my-10',
  11: 'my-11',
  12: 'my-12',
  14: 'my-14',
  16: 'my-16',
  20: 'my-20',
  24: 'my-24',
  32: 'my-32',
};

const MAX_W: Record<MaxWidth, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  prose: 'max-w-prose',
  none: 'max-w-none',
  full: 'max-w-full',
};

export function layoutClasses(props: LayoutProps): string {
  const parts: string[] = [];
  if (props.mb !== undefined) parts.push(MB[props.mb]);
  if (props.mbMd !== undefined) parts.push(MB_MD[props.mbMd]);
  if (props.mt !== undefined) parts.push(MT[props.mt]);
  if (props.mtMd !== undefined) parts.push(MT_MD[props.mtMd]);
  if (props.mx !== undefined) parts.push(MX[props.mx]);
  if (props.my !== undefined) parts.push(MY[props.my]);
  if (props.maxW !== undefined) parts.push(MAX_W[props.maxW]);
  return parts.join(' ');
}
