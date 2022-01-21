import { useState } from 'react';
import FadeIn from 'react-fade-in';

import '../styles.scss';
import { Link } from '..';
import classNames from 'classnames';

interface Workplace {
  id: number;
  company: string;
  website?: string;
  position: string;
  dateRange: string;
  info: string[];
}

export function Work() {
  const workplaces: Workplace[] = [
    {
      id: 1,
      company: 'Synctera',
      website: 'https://synctera.com/',
      position: 'Frontend Developer',
      dateRange: 'June 2021 - Present',
      info: [
        'Creating the future of FinTech banking.',
        'Responsible for the development of core features, including accounts, customers, users, groups, roles, and permissions.',
        'Integrated with various internal APIs via React hooks.',
        'Co-lead creation of developer documentation platform, leveraging OpenAPI specification.',
        'Technologies utilized: React, Typescript, Tailwind, MUI.',
      ],
    },
    {
      id: 2,
      company: 'Novisto',
      website: 'https://novisto.com/',
      position: 'Frontend Developer',
      dateRange: 'June 2020 - June 2021',
      info: [
        'Developed a V1 software platform for ESG data management and analytics.',
        'Responsible for the development of shared/reusable components, responsive experiences (webpage/digital/mobi​le​), and unit/end-to-end testing.',
        'Responsible for the design, development and interfacing of RESTful APIs for application data management.',
        'Technologies utilized: Angular, Typescript, SCSS.',
      ],
    },
    {
      id: 3,
      company: 'Intersect',
      website: 'https://www.weareintersect.com/',
      position: 'iOS Developer',
      dateRange: 'May 2019 - Aug 2019 and May 2018 - Aug 2018',
      info: [
        "Developed President's Choice Financial iOS application in 2019.",
        'Lead iOS developer on client project in 2018 responsible for delivering a high quality employee benefits application.',
        'Worked with a cross functional team to understand requirements and recommend appropriate solutions; including Project Managers, Designers, Backend Developers, and QA Analysts.',
      ],
    },
    {
      id: 5,
      company: 'dubdub',
      position: 'Quality Engineer',
      dateRange: 'May 2017 - Aug 2017',
      info: [
        'Lead the initial implementation of automated testing for functional, system, performance/integration and regression testing on web, iOS and android based applications.',
        'Responsible for testing server side APIs.',
        'Responsible for stress/load testing on a web based application.',
      ],
    },
  ];
  const [activeWorkplace, setActiveWorkplace] = useState(
    workplaces.find((workplace) => workplace.id === 1) ?? undefined
  );

  return (
    <div
      className="min-h-full flex flex-col items-center justify-center bg-black1"
      id="work"
    >
      <div className="w-70 flex-grow flex flex-col items-center justify-center py-20">
        <div className="w-full flex justify-start items-start mb-32">
          <h2 className="text-white">work.</h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 flex flex-col pr-8 mb-8">
            {workplaces.map((workplace) => {
              return (
                <Link
                  type="tab"
                  onClick={() => setActiveWorkplace(workplace)}
                  classes={classNames(
                    activeWorkplace?.id === workplace.id && 'active'
                  )}
                  fontSize={1.6}
                  key={workplace.id}
                >
                  {workplace.company}
                </Link>
              );
            })}
          </div>
          <div className="col-span-3" style={{ minHeight: '50vh' }}>
            <FadeIn delay={300} transitionDuration={1000}>
              <h4 className="text-white mb-6">
                {activeWorkplace?.position} @{' '}
                {activeWorkplace?.website ? (
                  <Link
                    type="link-2"
                    href={activeWorkplace?.website}
                    target="_blank"
                    fontSize={2.8}
                  >
                    {activeWorkplace?.company}
                  </Link>
                ) : (
                  activeWorkplace?.company
                )}
              </h4>
              <p className="text-grey" style={{ fontFamily: 'Courier New' }}>
                {activeWorkplace?.dateRange}
              </p>
              <ul className="work w-3/4 pl-2 py-6 space-y-6 list-none text-grey">
                {activeWorkplace?.info.map((info, idx) => (
                  <li key={idx}>&nbsp;{info}</li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
