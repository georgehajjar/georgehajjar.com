import Particles, { IOptions, RecursivePartial } from "react-tsparticles";
import { MoveDirection, OutMode } from "tsparticles";
import FadeIn from "react-fade-in";
import { colors } from "../../colors";

const dots = require("../../assets/dot-pattern.png");

const particleOptions: RecursivePartial<IOptions> = {
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
      speed: 0.2,
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
      type: "circle",
    },
    size: {
      random: true,
      value: 3,
    },
  },
  detectRetina: true,
};

export function Landing() {
  return (
    <>
      <Particles className="particles" options={particleOptions} />
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <div className="w-[70%] text-white">
            <div className="relative flex flex-col justify-start">
              <FadeIn delay={400} transitionDuration={1000}>
                <img className="dots" src={dots} alt="dots" />
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
    </>
  );
}
