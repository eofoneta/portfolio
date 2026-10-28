import Card from "./Card";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import { ProjectsDescriptionProps } from "../App";
import { getProjectMeta, projectCategories } from "../data/projects";

type Projectsprops = {
  projects: ProjectsDescriptionProps[];
};

gsap.registerPlugin(ScrollTrigger);
const Projects = ({ projects }: Projectsprops) => {
  const triggerRef = useRef(null);

  const groups = projectCategories
    .map((category) => ({
      category,
      items: projects.filter((p) => getProjectMeta(p).category === category),
    }))
    .filter((group) => group.items.length > 0);

  // running offset so card numbering continues across groups
  const groupOffsets = groups.map((_, i) =>
    groups.slice(0, i).reduce((sum, g) => sum + g.items.length, 0)
  );

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

    gsap.utils.toArray<Element>(".project-card").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="py-10">
      <div
        ref={triggerRef}
        className="overflow-hidden px-5 lg:my-16 md:my-14 my-8 flex items-end justify-between border-b border-[#7a1c2e30] pb-4"
      >
        <h2
          id="text"
          className="oswald-font text-3xl md:text-5xl lg:text-7xl text-strong/90"
        >
          Selected Works
        </h2>
        <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] hidden sm:block">
          {projects.length} projects
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {groups.map(({ category, items }, groupIndex) => (
          <section key={category} aria-labelledby={`works-${category}`}>
            <div className="px-5 pb-3 flex items-baseline justify-between border-b border-[#ffffff08]">
              <h2
                id={`works-${category}`}
                className="oswald-light uppercase text-xs tracking-widest text-[#c9566a]"
              >
                {category} Work
              </h2>
              <span className="oswald-light text-xs text-muted tabular-nums">
                {String(items.length).padStart(2, "0")}
              </span>
            </div>
            {items.map((result, i) => (
              <div key={result.id} className="project-card">
                <Card projects={result} index={groupOffsets[groupIndex] + i} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Projects;
