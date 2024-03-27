import { useState } from "react";
import FadeIn from "react-fade-in";
import classNames from "classnames";
import { Button } from "../../components";

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
      company: "Synctera",
      website: "https://synctera.com/",
      position: "Sr. Software Engineer, Frontend",
      dateRange: "June 2021 - March 2024",
      info: [
        "Feature leader and subject-matter expert on complex web features. Developed and managed features including: account management, transaction processing (ACH, EFT, fees/rewards, etc.), customer and business management; US-to-Canada expansion; user permissions; geographical restrictions; customer access restrictions; and four-eyes integration.",
        "Contributed to the improvement of frontend development processes using React and Typescript. Lead the development of standardized utility functions, reducing development time by 35%; introduced global code standards; and created reusable component wrappers.",
        "Actively collaborated with the product team (product manager, design lead, and technical lead) on all pod-specific features to gather requirements and to create and refine UX.",
        "Contributed to defining endpoint structures and data schemas in collaboration with backend developers, enhancing frontend-backend alignment. Utilized React hooks to integrate a variety of internal APIs into our web application.",
        "Provided technical and developmental support to colleagues in areas of expertise. Initiated and maintained weekly communication with team members to foster knowledge-sharing, discuss ongoing projects, and collaborate on addressing technical challenges.",
      ],
    },
    {
      id: 2,
      company: "Novisto",
      website: "https://novisto.com/",
      position: "Software Engineer, Frontend",
      dateRange: "June 2020 - June 2021",
      info: [
        "Developed a software platform for ESG data management and analytics using Angular and Typescript.",
        "Responsible for the development of shared/reusable components, responsive experiences (web/mobile​), and unit/end-to-end testing.",
        "Responsible for the design, development and interfacing of RESTful APIs for application data management.",
      ],
    },
    {
      id: 3,
      company: "Intersect",
      website: "https://www.weareintersect.com/",
      position: "iOS Developer",
      dateRange: "May 2019 - Aug 2019 and May 2018 - Aug 2018",
      info: [
        "Developed President's Choice Financial iOS application in 2019 using Swift.",
        "Lead iOS developer on client project in 2018 responsible for delivering a high quality employee benefits application.",
        "Worked with a cross functional team to understand requirements and recommend appropriate solutions; including Project Managers, Designers, Backend Developers, and QA Analysts.",
      ],
    },
    {
      id: 5,
      company: "dubdub",
      position: "Quality Engineer",
      dateRange: "May 2017 - Aug 2017",
      info: [
        "Lead the initial implementation of automated testing for functional, system, performance/integration and regression testing on web, iOS and android based applications.",
        "Responsible for testing server side APIs.",
        "Responsible for stress/load testing on a web based application.",
      ],
    },
  ];
  const [activeWorkplace, setActiveWorkplace] = useState(
    workplaces.find((workplace) => workplace.id === 1) ?? undefined,
  );

  return (
    <div
      className="flex flex-col items-center justify-center bg-black1"
      id="work"
    >
      <div className="flex w-[70%] flex-grow flex-col items-center justify-center py-20">
        <div className="mb-32 flex w-full items-start justify-start">
          <h2 className="text-white">work.</h2>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 mb-8 flex flex-col pr-8">
            {workplaces.map((workplace) => {
              return (
                <Button
                  type="tab"
                  onClick={() => setActiveWorkplace(workplace)}
                  className={classNames(
                    activeWorkplace?.id === workplace.id && "active",
                  )}
                  fontSize={1.6}
                  key={workplace.id}
                >
                  {workplace.company}
                </Button>
              );
            })}
          </div>
          <div className="col-span-3 min-h-[50vh]">
            <FadeIn delay={300} transitionDuration={1000}>
              <h4 className="mb-6 text-white">
                {activeWorkplace?.position} @{" "}
                {activeWorkplace?.website ? (
                  <Button
                    type="link-2"
                    href={activeWorkplace?.website}
                    fontSize={2.8}
                  >
                    {activeWorkplace?.company}
                  </Button>
                ) : (
                  activeWorkplace?.company
                )}
              </h4>
              <p className="text-grey">{activeWorkplace?.dateRange}</p>
              <ul className="work w-3/4 list-none space-y-6 py-6 pl-2 text-grey">
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
