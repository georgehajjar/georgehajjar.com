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

export const workplaces: Workplace[] = [
  {
    id: 0,
    company: 'Chainalysis',
    website: 'https://www.chainalysis.com/',
    location: 'Remote',
    current: true,
    roles: [
      {
        title: 'Senior Software Engineer, Frontend',
        dateRange: 'May 2026 – Present',
      },
      {
        title: 'Software Engineer II, Frontend',
        dateRange: 'June 2024 – May 2026',
      },
    ],
    stack: ['React', 'TypeScript', 'AWS', 'Design Systems'],
    info: [
      'Frontend authority across multiple teams within the product group. Provide technical leadership, architectural guidance, and drive frontend best practices, standards, and strategic decisions.',
      'Sole frontend developer on 8 person team. Own the entire frontend stack, delivering user-facing features end-to-end using React and Typescript.',
      'Independently owned and delivered a full-stack production AWS service integrating external data sources and internal systems to deliver a new blockchain data report generating ~$1M in revenue.',
      'Reduced frontend technical debt in the Compliance product by 20% through establishing a clear technical vision, introducing best practices, implementing product-specific utility functions, and leading the migration to the company-wide design system.',
      'Active member of the cross-product Design System Ambassadors team, collaborating with 10+ engineers and designers to define, implement, and maintain shared UI components and standards across all product lines.',
    ],
  },
  {
    id: 1,
    company: 'Synctera',
    website: 'https://synctera.com/',
    location: 'Remote',
    roles: [
      {
        title: 'Sr. Software Engineer, Frontend',
        dateRange: 'June 2021 – March 2024',
      },
    ],
    stack: ['React', 'TypeScript'],
    info: [
      'Feature leader and subject-matter expert on complex web features. Developed and managed features including: account management, transaction processing (ACH, EFT, fees/rewards, etc.), customer and business management; US-to-Canada expansion; user permissions; geographical restrictions; customer access restrictions; and four-eyes integration.',
      'Contributed to the improvement of frontend development processes using React and Typescript. Lead the development of standardized utility functions, reducing development time by 35%; introduced global code standards; and created reusable component wrappers.',
      'Actively collaborated with the product team (product manager, design lead, and technical lead) on all pod-specific features to gather requirements and to create and refine UX.',
      'Contributed to defining endpoint structures and data schemas in collaboration with backend developers, enhancing frontend-backend alignment. Utilized React hooks to integrate a variety of internal APIs into our web application.',
      'Provided technical and developmental support to colleagues in areas of expertise. Initiated and maintained weekly communication with team members to foster knowledge-sharing, discuss ongoing projects, and collaborate on addressing technical challenges.',
    ],
  },
  {
    id: 2,
    company: 'Novisto',
    website: 'https://novisto.com/',
    location: 'Toronto',
    roles: [
      {
        title: 'Software Engineer, Frontend',
        dateRange: 'June 2020 – June 2021',
      },
    ],
    stack: ['Angular', 'TypeScript'],
    info: [
      'Developed a software platform for ESG data management and analytics using Angular and Typescript.',
      'Responsible for the development of shared/reusable components, responsive experiences (web/mobile\u200B), and unit/end-to-end testing.',
      'Responsible for the design, development and interfacing of RESTful APIs for application data management.',
    ],
  },
  {
    id: 3,
    company: 'Intersect',
    website: 'https://www.weareintersect.com/',
    location: 'Toronto',
    roles: [
      {
        title: 'iOS Developer',
        dateRange: 'May 2019 – Aug 2019 · May 2018 – Aug 2018',
      },
    ],
    stack: ['Swift', 'iOS'],
    info: [
      "Developed President's Choice Financial iOS application in 2019 using Swift.",
      'Lead iOS developer on client project in 2018 responsible for delivering a high quality employee benefits application.',
      'Worked with a cross functional team to understand requirements and recommend appropriate solutions; including Project Managers, Designers, Backend Developers, and QA Analysts.',
    ],
  },
  {
    id: 5,
    company: 'dubdub',
    location: 'Toronto',
    roles: [
      {
        title: 'Quality Engineer',
        dateRange: 'May 2017 – Aug 2017',
      },
    ],
    stack: ['iOS', 'QA Automation'],
    info: [
      'Lead the initial implementation of automated testing for functional, system, performance/integration and regression testing on web, iOS and android based applications.',
      'Responsible for testing server side APIs.',
      'Responsible for stress/load testing on a web based application.',
    ],
  },
];
