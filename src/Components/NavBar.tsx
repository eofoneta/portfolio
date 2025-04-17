import { Link } from "react-router-dom";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { FaAt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const NavBar = () => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from(["#nav-1", "#nav-2", "#nav-3", "#nav-4", "#logo-name"], {
        y: "+=10",
        opacity: 0,
        duration: 0.4,
        delay: 0.5,
        stagger: 0.01,
      }).to(["#nav-1", "#nav-2", "#nav-3", "#nav-4", "#logo-name"], {
        opacity: 1,
        duration: 0.5,
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const [nav, setNav] = useState<boolean>(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="backdrop-blur-sm z-10 nav-font flex justify-between p-5 fixed top-0 right-0 left-0">
      <div id="logo-name">
        <Link
          to="/"
          className="transition-all duration-300 oswald-font hover:text-shadow-glow"
        >
          <span className="hidden md:block">Emmanuel Ofoneta</span>
          <span className="md:hidden">EO</span>
        </Link>
      </div>
      <ul className="flex flex-row gap-5">
        <li id="nav-1">
          <Link
            to="/"
            id="test"
            className="transition-all duration-300 hover:text-shadow-glow"
          >
            Home
          </Link>
        </li>
        <li id="nav-2">
          <Link
            to={"info"}
            className="transition-all duration-300 hover:text-shadow-glow"
          >
            Info
          </Link>
        </li>
      </ul>
      {/* socials */}
      <ul className="flex-row gap-5 hidden md:flex">
        <li id="nav-3">
          <a
            href="/Eofoneta-resume.pdf"
            target="_blank"
            className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-shadow-glow"
          >
            <span>Resume</span>
            <FaArrowRight className="-rotate-45" />
          </a>
        </li>
        <li id="nav-4">
          <Link
            to="https://www.linkedin.com/in/eofoneta"
            target="_blank"
            className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-shadow-glow"
          >
            <span>Linkedin</span>
            <FaArrowRight className="-rotate-45" />
          </Link>
        </li>
      </ul>
      {/* end of socials */}
      <button className="md:hidden transition-all" onClick={handleNav}>
        {!nav ? <FaAt size={30} /> : <IoCloseSharp size={30} />}
      </button>
      <div
        className={
          !nav
            ? "hidden"
            : "md:hidden fixed right-0 top-[80%] p-6 rounded-lg z-10 min-w-[40%] sm:w-[30%] transition-all bg-[#171717]"
        }
      >
        <ul className="flex flex-col gap-5">
          <li id="nav-3">
            <a
              href="/Eofoneta-resume.pdf"
              target="_blank"
              className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-shadow-glow"
            >
              <span>Resume</span>
              <FaArrowRight className="-rotate-45" />
            </a>
          </li>
          <li id="nav-4">
            <Link
              to="https://www.linkedin.com/in/eofoneta"
              target="_blank"
              className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-shadow-glow"
            >
              <span>Linkedin</span>
              <FaArrowRight className="-rotate-45" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
