import workExperienceData from "../data/workExperience.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
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
                {/* role */}
                <h2 className="oswald-font uppercase tracking-wide text-lg lg:text-2xl md:text-xl group-hover:text-white transition-colors duration-300 leading-tight">
                  {item.role}
                </h2>
              </div>
              {/* duration pill */}
              <span className="oswald-light text-xs uppercase tracking-widest text-[#7a1c2e] border border-[#7a1c2e40] px-2 py-1 shrink-0 group-hover:border-[#7a1c2e90] transition-all duration-300">
                {item.duration}
              </span>
            </div>

            {/* body */}
            <div className="pl-9 space-y-1.5">
              <p className="quicksand-text text-sm text-[#a19b98] leading-relaxed group-hover:text-[#dcd2cd] transition-colors duration-300">
                {item.info1}
              </p>
              <p className="quicksand-text text-sm text-[#a19b98] leading-relaxed group-hover:text-[#dcd2cd] transition-colors duration-300">
                {item.info2}
              </p>
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
