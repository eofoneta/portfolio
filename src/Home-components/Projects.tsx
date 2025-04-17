import Card from "./Card";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { ProjectsDescriptionProps } from "../App";

type Projectsprops = {
  projects: ProjectsDescriptionProps[];
};

gsap.registerPlugin(ScrollTrigger);
const Projects = ({ projects }: Projectsprops) => {
  const triggerRef = useRef(null);

  useGSAP(() => {
    new SplitType("#text", {
      types: "chars",
      charClass: "char1",
    });

    gsap.fromTo(
      ".char1",
      { y: 100 },
      {
        y: 0,
        duration: 0.5,
        stagger: 0.01,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "bottom bottom",
          once: true,
          onEnter: () => ScrollTrigger.refresh(),
        },
      }
    );
  }, []);

  return (
    <div className="py-10">
      <h1
        ref={triggerRef}
        className="overflow-hidden lg:my-16 md:my-14 my-8 oswald-font text-3xl md:text-5xl lg:text-7xl text-center text-[#ffffffe2]"
        id="text"
      >
        Selected Works
      </h1>
      <div>
        {projects?.map((result) => (
          <Card key={result.id} projects={result} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
