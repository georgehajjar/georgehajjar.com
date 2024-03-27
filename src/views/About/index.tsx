const memoji = require("../../assets/memoji.png");

export function About() {
  return (
    <div
      className="flex flex-col items-center justify-center bg-black2"
      id="about"
    >
      <div className="flex w-[70%] flex-grow flex-col items-center justify-center py-20">
        <div className="mb-6 flex w-full items-start justify-start">
          <h2 className="text-white">about.</h2>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-5">
          <div className="col-span-3 flex h-full flex-col items-start gap-6">
            <p className="mb-4 text-grey">
              I'm a software developer with a deep passion for technology and
              software as a service. Technically skilled, and comfortable with
              numerous programming languages and tools. A hard worker, critical
              thinker and a fast learner, I strongly believe in the impact that
              software engineers can have on the future of business and I intend
              to be in the heart of it.
            </p>
            <p className="text-grey">
              Here are a few technologies I've been working with recently:
            </p>
            <ul className="about w-3/4 list-none columns-2 space-y-1 py-6 pl-2 text-grey">
              <li>&nbsp;React</li>
              <li>&nbsp;Typescript</li>
              <li>&nbsp;Javascript</li>
              <li>&nbsp;Angular</li>
              <li>&nbsp;Node</li>
              <li>&nbsp;Swift</li>
            </ul>

            <p className="mb-8 text-grey">
              Currently, I'm looking for my next role to build cool tech
              &nbsp;&#128640;
            </p>
            <p className="mb-8 text-grey">
              Aside from developing software, I enjoy exercising (gym, sports,
              etc.), finding the next best restaurant, cooking/baking and
              healthy living.
            </p>
          </div>
          <div className="relative col-span-2 flex h-full items-center justify-center">
            <img src={memoji} className="w-3/4" alt="memoji" />
          </div>
        </div>
      </div>
    </div>
  );
}
