import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

import '../styles.scss';
import { Link } from '..';

const memoji = require('../../assets/memoji.png');

export function About() {
  return (
    <div
      className="min-h-full flex flex-col items-center justify-center bg-black2"
      id="about"
    >
      <div className="w-70 flex-grow flex flex-col items-center justify-center py-20">
        <div className="w-full flex justify-start items-start mb-6">
          <h2 className="text-white">about.</h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-5">
          <div className="col-span-3 h-full flex flex-col justify-between items-start">
            <p className="mb-4 text-grey">
              I'm a Front End developer with a deep passion for technology and
              software as a service. Technically skilled, and comfortable with
              numerous programming languages and tools. A hard worker, critical
              thinker and a fast learner, I strongly believe in the impact that
              software engineers can have on the future of business and I intend
              to be in the heart of it.
            </p>
            <p className="text-grey">
              Here are a few technologies I’ve been working with recently:
            </p>
            <ul className="about w-3/4 columns-2 pl-2 py-6 space-y-1 list-none text-grey">
              <li>&nbsp;React</li>
              <li>&nbsp;Typescript</li>
              <li>&nbsp;Javascript</li>
              <li>&nbsp;Angular</li>
              <li>&nbsp;Node</li>
              <li>&nbsp;Swift</li>
            </ul>

            <p className="mb-8 text-grey">
              Currently, I’m focused on creating the fastest and easiest way to
              build the future of FinTech banking at{' '}
              <Link
                href="https://synctera.com/"
                type="link-2"
                target="_blank"
                fontSize={1.7}
              >
                Synctera &#128640;
              </Link>
            </p>
            <p className="mb-8 text-grey">
              Aside from developing software, I enjoy playing tennis,
              exercising, cooking/baking and healthy eating.
            </p>
            <div className="flex">
              <Link
                href="https://www.linkedin.com/in/ghajjar/"
                type="btn-outline"
                classes="mr-6"
                target="_blank"
              >
                <FaLinkedinIn style={{ height: '2.5rem', width: '2.5rem' }} />
              </Link>
              <Link
                href="https://github.com/georgehajjar"
                type="btn-outline"
                target="_blank"
              >
                <FaGithub style={{ height: '2.5rem', width: '2.5rem' }} />
              </Link>
            </div>
          </div>
          <div className="col-span-2 h-full flex justify-center items-center relative">
            <img src={memoji} className="w-full" alt="memoji" />
          </div>
        </div>
      </div>
    </div>
  );
}
