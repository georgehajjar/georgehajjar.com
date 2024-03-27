import { useState } from "react";
import classNames from "classnames";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Button } from "../Button";
import "./styles.scss";
const resume = require("../../assets/resume.pdf");

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const openClass = menuOpen && "open";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <header className="fixed top-0 z-10 flex w-full flex-col items-center justify-center border-b border-solid border-b-black2 bg-black1 bg-opacity-95">
      <div className="flex h-32 w-[70%] items-center justify-between">
        <div className="flex items-center">
          <div className="text-white" style={{ fontSize: "2.2rem" }}>
            George Hajjar
          </div>
        </div>
        <div className="hidden gap-16 md:flex">
          <div className="flex items-end gap-16">
            <Button
              type="nav-link"
              className="animated"
              fontSize={1.6}
              onClick={() => scrollTo("about")}
            >
              about
            </Button>
            <Button
              type="nav-link"
              className="animated"
              fontSize={1.6}
              onClick={() => scrollTo("work")}
            >
              work
            </Button>
          </div>
          <div className="flex items-end gap-4">
            <Button href={resume} type="btn-outline" fontSize={1.6}>
              resume
            </Button>
            <Button
              type="btn-outline"
              href="https://www.linkedin.com/in/ghajjar/"
            >
              <FaLinkedinIn className="h-[1.9rem] w-[1.9rem]" />
            </Button>
            <Button type="btn-outline" href="https://github.com/georgehajjar">
              <FaGithub className="h-[1.9rem] w-[1.9rem]" />
            </Button>
          </div>
        </div>
        <div
          className={classNames("hamburger flex md:hidden", openClass)}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {menuOpen && (
        <div
          className={classNames(
            "flex w-full flex-col items-center justify-around bg-black2 md:hidden",
            openClass,
          )}
        >
          <Button
            type="nav-link"
            className="py-5"
            fontSize={1.6}
            onClick={() => scrollTo("about")}
          >
            about
          </Button>
          <Button
            type="nav-link"
            className="py-5"
            fontSize={1.6}
            onClick={() => scrollTo("work")}
          >
            work
          </Button>
          <Button href={resume} type="nav-link" className="py-5" fontSize={1.6}>
            resume
          </Button>
          <Button
            href="https://www.linkedin.com/in/ghajjar/"
            type="nav-link"
            className="py-5"
            fontSize={1.6}
          >
            linkedin
          </Button>
          <Button
            href="https://github.com/georgehajjar"
            type="nav-link"
            className="py-5"
            fontSize={1.6}
          >
            github
          </Button>
        </div>
      )}
    </header>
  );
}
