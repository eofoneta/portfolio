import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3, FaDocker, FaJava, FaNodeJs, FaReact } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiSpringboot, SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiMysql } from "react-icons/di";
import { GiSadCrab } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);

const TechStacks = () => {
  const scrollRef = useRef<HTMLUListElement | null>(null);

  useGSAP(() => {
    const listItems = scrollRef.current?.querySelectorAll("ul li");

    if (listItems) {
      listItems.forEach((li) => {
        gsap.fromTo(
          li,
          { y: 20, stagger: 0.3 },
          {
            y: 0,
            duration: 0.3,
            scrollTrigger: {
              trigger: li,
              start: "bottom bottom",
              once: true,
              onEnter: () => ScrollTrigger.refresh(),
            },
            ease: "power1.inOut",
          }
        );
      });
    }
  }, []);

  return (
    <div className="pt-20 md:my-[200px] flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-x-20">
      <div className="flex flex-row gap-4 sm:h-[80px] md:h-[130px] sm:sticky top-[20%]">
        <div className="h-full bg-[#dcd2cd] w-[2px] sm:block hidden" />
        <div className="overflow-y-hidden max-w-[500px] oswald-font text-xl lg:text-6xl md:text-4xl sm:text-2xl">
          <span id="techStack-span-1">Current</span>{" "}
          <br className="sm:block hidden" />
          <span id="techStack-span-2" className="overflow-clip">
            Tech Stacks
          </span>
        </div>
      </div>
      <div className="sm:w-[50%] space-y-10">
        <div>
          <h2 className="oswald-font mb-4 sm:text-lg md:text-xl lg:text-2xl">
            frontend
          </h2>
          <ul ref={scrollRef} className="text-2xl lg:text-3xl space-y-4">
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Html</span>
              <FaHtml5 size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Css</span>
              <FaCss3 size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>React</span>
              <FaReact size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Typescript</span>
              <SiTypescript size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Javascript</span>
              <IoLogoJavascript size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Tailwind</span>
              <RiTailwindCssFill size={30} />
            </li>
          </ul>
        </div>
        <div>
          <h2 className="oswald-font mb-4 sm:text-lg md:text-xl lg:text-2xl">
            backend
          </h2>
          <ul ref={scrollRef} className="text-2xl lg:text-3xl space-y-4">
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Java</span>
              <FaJava size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Rust</span>
              <GiSadCrab />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Spring boot</span>
              <SiSpringboot size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Node Js / Express</span>
              <FaNodeJs size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Postgres SQL</span>
              <BiLogoPostgresql size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>MySQl</span>
              <DiMysql size={30} />
            </li>
            <li className="flex flex-row items-center justify-between px-2 border-b-[1px] border-[#dcd2cda8]">
              <span>Docker</span>
              <FaDocker size={30} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechStacks;
