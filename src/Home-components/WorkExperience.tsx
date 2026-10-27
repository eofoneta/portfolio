import workExperienceData from "../data/workExperience.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// remaining highlights are revealed with "See more"
const MAX_HIGHLIGHTS = 2;

const WorkExperience = () => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
    // expanding changes page height, so re-measure scroll-triggered animations below
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  useGSAP(() => {
    gsap.utils.toArray<Element>(".work-item").forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
          delay: i * 0.04,
        }
      );
    });
  }, []);

  return (
    <div className="pt-20 md:my-[200px] flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-x-20 px-5">
      {/* SIDEBAR */}
      <div className="flex flex-row gap-4 sm:h-[80px] md:h-[130px] sm:sticky top-[20%]">
        <div className="h-full bg-[#dcd2cd] w-[2px] sm:block hidden" />
        <div className="overflow-y-hidden max-w-[500px] oswald-font text-xl lg:text-6xl md:text-4xl sm:text-2xl">
          <span>Work</span>
          <br className="sm:block hidden" />
          <span className="overflow-clip">Experience</span>
        </div>
      </div>

      {/* ENTRIES */}
      <div className="sm:w-[50%] space-y-0">
        {workExperienceData.map((item, i) => (
          <div
            key={i}
            className="work-item relative group border-b border-[#ffffff0f] py-6 hover:bg-[#7a1c2e08] transition-all duration-300 px-3 -mx-3"
          >
            {/* top row */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4">
                {/* index */}
                <span className="oswald-light text-xs text-[#a19b98] tabular-nums pt-1 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  {/* role */}
                  <h2 className="oswald-font uppercase tracking-wide text-lg lg:text-2xl md:text-xl group-hover:text-white transition-colors duration-300 leading-tight">
                    {item.role}
                  </h2>
                  {/* company + location */}
                  <p className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] mt-1.5">
                    <span className="text-[#c9566a]">{item.company}</span> · {item.location}
                  </p>
                </div>
              </div>
              {/* duration pill */}
              <span className="oswald-light text-xs uppercase tracking-widest text-[#7a1c2e] border border-[#7a1c2e40] px-2 py-1 shrink-0 group-hover:border-[#7a1c2e90] transition-all duration-300">
                {item.duration}
              </span>
            </div>

            {/* body */}
            <div className="pl-9">
              <ul className="space-y-1.5">
                {(expanded.has(i)
                  ? item.highlights
                  : item.highlights.slice(0, MAX_HIGHLIGHTS)
                ).map((highlight, j) => (
                  <li
                    key={j}
                    className="flex gap-3 quicksand-text text-sm text-[#a19b98] leading-relaxed group-hover:text-[#dcd2cd] transition-colors duration-300"
                  >
                    <span className="mt-[0.6em] w-1 h-1 rounded-full bg-[#7a1c2e] shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {item.highlights.length > MAX_HIGHLIGHTS && (
                <button
                  onClick={() => toggleExpanded(i)}
                  aria-expanded={expanded.has(i)}
                  className="mt-2 oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] hover:text-[#c9566a] transition-colors duration-300"
                >
                  {expanded.has(i) ? "See less" : "...See more"}
                </button>
              )}

              {/* technologies */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="oswald-light text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#ffffff10] group-hover:border-[#7a1c2e50] text-[#a19b98] transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* accent line on left — visible on hover */}
            <div className="absolute left-0 top-0 h-full w-[2px] bg-[#7a1c2e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;
