import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { FaArrowRight } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { FaAt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

const NavBar = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

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
    <div
      className="backdrop-blur-sm z-10 nav-font flex justify-between p-5 fixed top-0 right-0 left-0 border-b border-[#7a1c2e30]"
    >
      <div id="logo-name">
        <Link
          to="/"
          className="transition-all duration-300 oswald-font group relative"
        >
          <span className="hidden md:block">Emmanuel Ofoneta</span>
          <span className="md:hidden">EO</span>
          {/* wine underline that expands on hover */}
          <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-[#7a1c2e] group-hover:w-full transition-all duration-300" />
        </Link>
      </div>
      <ul className="flex flex-row gap-5">
        <li id="nav-1">
          <Link
            to="/"
            className={`transition-all duration-300 relative group ${
              isActive("/") ? "text-[#c9566a]" : "hover:text-[#c9566a]"
            }`}
          >
            Home
            {/* active: full-width persistent underline; hover: expands from zero */}
            <span
              className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#7a1c2e] transition-all duration-300 ${
                isActive("/") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
            {/* subtle glow dot for active state */}
            {isActive("/") && (
              <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9566a] shadow-[0_0_6px_2px_#c9566a88]" />
            )}
          </Link>
        </li>
        <li id="nav-2">
          <Link
            to="/info"
            className={`transition-all duration-300 relative group ${
              isActive("/info") ? "text-[#c9566a]" : "hover:text-[#c9566a]"
            }`}
          >
            Info
            <span
              className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-[#7a1c2e] transition-all duration-300 ${
                isActive("/info") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
            {isActive("/info") && (
              <span className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#c9566a] shadow-[0_0_6px_2px_#c9566a88]" />
            )}
          </Link>
        </li>
      </ul>
      {/* socials */}
      <ul className="flex-row gap-5 hidden md:flex">
        <li id="nav-3">
          <a
            href="/Eofoneta-resume.pdf"
            target="_blank"
            className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-[#c9566a]"
          >
            <span>Resume</span>
            <FaArrowRight className="-rotate-45" />
          </a>
        </li>
        <li id="nav-4">
          <Link
            to="https://www.linkedin.com/in/eofoneta"
            target="_blank"
            className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-[#c9566a]"
          >
            <span>Linkedin</span>
            <FaArrowRight className="-rotate-45" />
          </Link>
        </li>
      </ul>
      {/* end of socials */}
      <button
        className="md:hidden transition-all hover:text-[#c9566a]"
        onClick={handleNav}
      >
        {!nav ? <FaAt size={30} /> : <IoCloseSharp size={30} />}
      </button>
      <div
        className={
          !nav
            ? "hidden"
            : "md:hidden fixed right-0 top-[80%] p-6 rounded-lg z-10 min-w-[40%] sm:w-[30%] transition-all bg-[#171717] border border-[#7a1c2e30]"
        }
      >
        <ul className="flex flex-col gap-5">
          <li id="nav-3">
            <a
              href="/Eofoneta-resume.pdf"
              target="_blank"
              className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-[#c9566a]"
            >
              <span>Resume</span>
              <FaArrowRight className="-rotate-45" />
            </a>
          </li>
          <li id="nav-4">
            <Link
              to="https://www.linkedin.com/in/eofoneta"
              target="_blank"
              className="flex flex-row gap-2 justify-center items-center transition-all duration-300 hover:text-[#c9566a]"
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
