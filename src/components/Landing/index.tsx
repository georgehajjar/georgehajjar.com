import Particles from 'react-tsparticles';
import { MoveDirection, OutMode } from 'tsparticles';
import FadeIn from 'react-fade-in';

import '../styles.scss';
import { colors } from '../colors';

const dots = require('../../assets/dot-pattern.png');

export function Landing() {
  const options = {
    fpsLimit: 60,
    particles: {
      color: {
        value: colors.white,
      },
      lineLinked: {
        enable: false,
      },
      move: {
        bounce: false,
        direction: MoveDirection.none,
        enable: true,
        outMode: OutMode.out,
        random: true,
        speed: 0.1,
        straight: false,
      },
      opacity: {
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 1,
          sync: false,
        },
        random: true,
        value: 1,
      },
      shape: {
        type: 'circle',
      },
      size: {
        random: true,
        value: 3,
      },
    },
    detectRetina: true,
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: 'calc(100vh - 8rem)' }}
    >
      <Particles className="particles" options={options} />
      <div className="w-full py-20 flex justify-center items-center">
        <div className="w-70 text-white">
          <div className="flex flex-col justify-start relative">
            <FadeIn delay={300} transitionDuration={1000}>
              <img className="dots" src={dots} />
              <h1 className="mb-20">
                hey, I'm george. &#129304;&#127996;&#128760;
              </h1>
              <h3 className="mb-8">
                Software Developer,
                <br />
                Engineer &<br />
                Technology Enthusiast.
              </h3>
              <h5 className="text-grey">
                I code modern and unique things, and I love what I do.
              </h5>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
