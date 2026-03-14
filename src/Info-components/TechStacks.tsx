import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { FaDocker, FaJava, FaNodeJs, FaReact } from "react-icons/fa6";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiSpringboot, SiTypescript, SiGo } from "react-icons/si";
import { BiLogoPostgresql } from "react-icons/bi";
import { DiMysql } from "react-icons/di";
import { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

const frontendStacks: { label: string; icon: ReactNode }[] = [
  { label: "TypeScript / JavaScript", icon: <SiTypescript size={22} /> },
  { label: "Java", icon: <FaJava size={22} /> },
  { label: "Go", icon: <SiGo size={22} /> },
];

const backendStacks: { label: string; icon: ReactNode }[] = [
  { label: "React", icon: <FaReact size={22} /> },
  { label: "Spring Boot", icon: <SiSpringboot size={22} /> },
  { label: "Node.js / Express", icon: <FaNodeJs size={22} /> },
  { label: "Tailwind CSS", icon: <RiTailwindCssFill size={22} /> },
];

const toolsStacks: { label: string; icon: ReactNode }[] = [
  { label: "PostgreSQL", icon: <BiLogoPostgresql size={22} /> },
  { label: "MySQL", icon: <DiMysql size={22} /> },
  { label: "Docker", icon: <FaDocker size={22} /> },
];

const StackList = ({
  label,
  items,
  index,
}: {
  label: string;
  items: { label: string; icon: ReactNode }[];
  index: string;
}) => (
  <div className="stack-group">
    <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] mb-2">
      {index} — {label}
    </p>
    <ul className="space-y-0">
      {items.map((item, i) => (
        <li
          key={item.label}
          className="stack-item group flex items-center justify-between px-3 py-3 border-b border-[#ffffff0f] hover:border-[#7a1c2e60] hover:bg-[#7a1c2e10] transition-all duration-300 cursor-default"
        >
          {/* index + label */}
          <div className="flex items-center gap-4">
            <span className="oswald-light text-xs text-[#a19b98] w-5 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="oswald-font uppercase text-xl lg:text-2xl tracking-wide group-hover:text-white transition-colors duration-300">
              {item.label}
            </span>
          </div>

          {/* icon in accent box */}
          <div className="w-9 h-9 flex items-center justify-center border border-[#ffffff15] group-hover:border-[#7a1c2e] group-hover:text-[#c9566a] transition-all duration-300 text-[#a19b98]">
            {item.icon}
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const TechStacks = () => {
  useGSAP(() => {
    gsap.utils.toArray<Element>(".stack-item").forEach((el) => {
      gsap.fromTo(
        el,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="pt-20 md:my-[200px] flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-x-20">
      {/* SIDEBAR */}
      <div className="flex flex-row gap-4 sm:h-[80px] md:h-[130px] sm:sticky top-[20%]">
        <div className="h-full bg-[#dcd2cd] w-[2px] sm:block hidden" />
        <div className="overflow-y-hidden max-w-[500px] oswald-font text-xl lg:text-6xl md:text-4xl sm:text-2xl">
          <span id="techStack-span-1">Current</span>
          <br className="sm:block hidden" />
          <span id="techStack-span-2" className="overflow-clip">
            Tech Stacks
          </span>
        </div>
      </div>

      {/* STACKS */}
      <div className="sm:w-[50%] space-y-12">
        <StackList label="Languages" items={frontendStacks} index="01" />
        <StackList label="Frameworks & Libraries" items={backendStacks} index="02" />
        <StackList label="Infrastructure & Tools" items={toolsStacks} index="03" />
      </div>
    </div>
  );
};

export default TechStacks;
