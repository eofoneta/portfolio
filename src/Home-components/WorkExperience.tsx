import workExperienceData from "../data/workExperience.json";
import { useRef } from "react";

const WhyHireMe = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="my-10 flex flex-row lg:justify-center flex-wrap px-5 md:flex-nowrap items-center w-full">
      <aside className="sm:w-[50%] md:ml-20 flex flex-row md:h-[200px] items-center gap-4">
        <div className="h-full bg-[#dcd2cd] w-[2px] hidden sm:block"></div>
        <div
          ref={scrollRef}
          className="space-x-2 mb-4 md:space-x-0 md:flex flex-col gap-2 text-2xl lg:text-6xl md:text-4xl sm:text-2xl oswald-font"
        >
          <span id="span">Work</span>
          <span className="overflow-clip" id="span">
            experience
          </span>
        </div>
      </aside>
      <div className="sm:w-[50%] space-y-10">
        {workExperienceData.map((item) => (
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#ffffffb2] text-xl mb-1">
                {item.role}
              </h2>
              <p className="text-sm italic opacity-60 pr-2">{item.duration}</p>
            </div>
            <p className="mb-2">{item.info1}</p>
            <p>{item.info2}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyHireMe;
