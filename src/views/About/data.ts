import {
  SiClaude,
  SiOpencode,
  SiReact,
  SiTypescript,
  SiWindsurf,
} from 'react-icons/si';
import type { Hobby, Technology } from './types';

export const technologies: Technology[] = [
  {
    label: 'Claude Code',
    desc: 'daily coding companion',
    Icon: SiClaude,
    color: '#D97757',
  },
  {
    label: 'OpenCode',
    desc: 'open-source terminal agent',
    Icon: SiOpencode,
  },
  {
    label: 'Windsurf',
    desc: 'AI-first editor',
    Icon: SiWindsurf,
  },
  {
    label: 'React',
    desc: 'component-based UI',
    Icon: SiReact,
    color: '#61DAFB',
  },
  {
    label: 'Typescript',
    desc: 'type-safe javascript',
    Icon: SiTypescript,
    color: '#3178C6',
  },
];

export const hobbies: Hobby[] = [
  {
    icon: '🏋️',
    label: 'Gym',
    note: 'lift weights 5 times a week, run twice, train for hyrox',
  },
  {
    icon: '⚽',
    label: 'Sports',
    note: 'volleyball, tennis, pickleball',
  },
  {
    icon: '🍽️',
    label: 'Restaurants',
    note: 'always chasing the next great tasting menu in the 6ix',
  },
  {
    icon: '🥘',
    label: 'Cooking',
    note: 'love to host dinner parties and try new recipes',
  },
  {
    icon: '🌱',
    label: 'Healthy living',
    note: 'organic food, early bedtimes, sunlight, no screens before bed',
  },
];
