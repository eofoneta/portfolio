import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProjectsDescriptionProps } from "../App";
import VideoBanner from "../Components/VideoBanner";

export type CardProps = {
  projects: ProjectsDescriptionProps;
  index: number;
};

const Card = ({ projects, index }: CardProps) => {
  return (
    <Link
      to={`/project/${projects.id}`}
      className="group flex flex-col sm:flex-row gap-6 border-b border-[#ffffff08] py-8 px-5 hover:bg-[#7a1c2e08] transition-all duration-300 relative"
    >
      {/* left wine accent bar on hover */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-[#7a1c2e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* ── INDEX ── */}
      <span className="oswald-light text-xs text-[#a19b98] tabular-nums shrink-0 w-6 pt-1 hidden sm:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── IMAGE ── */}
      <div className="sm:w-[240px] lg:w-[300px] shrink-0 overflow-hidden relative">
        {/* wine glow */}
        <div className="absolute -inset-2 bg-[#7a1c2e] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
        {projects.hasVideo ? (
          <VideoBanner
            videoPath={projects.videoUrl}
            className="w-full aspect-video object-cover border border-[#ffffff08] group-hover:border-[#7a1c2e50] transition-all duration-300"
          />
        ) : (
          <img
            src={projects.imageUrl}
            alt={projects.applicationName}
            className="w-full aspect-video object-cover border border-[#ffffff08] group-hover:border-[#7a1c2e50] transition-all duration-300"
            style={{ backgroundColor: projects.color }}
          />
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0 gap-4">
        <div>
          {/* type label */}
          <p className="oswald-light uppercase text-[10px] tracking-widest text-[#7a1c2e] mb-2">
            {projects.projectType}
          </p>

          {/* title */}
          <h2 className="oswald-font uppercase text-2xl lg:text-3xl group-hover:text-white transition-colors duration-300 leading-tight">
            {projects.applicationName}
          </h2>

          {/* overview — truncated */}
          <p className="quicksand-text text-sm text-[#a19b98] mt-2 leading-relaxed line-clamp-2 group-hover:text-[#dcd2cd] transition-colors duration-300">
            {projects.overview}
          </p>
        </div>

        {/* bottom row: stacks + cta */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {projects.techStacks.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="oswald-light text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#ffffff10] group-hover:border-[#7a1c2e50] group-hover:text-[#c9566a] text-[#a19b98] transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] group-hover:text-[#c9566a] transition-colors duration-300">
              View project
            </span>
            <FaArrowRightLong
              size={10}
              className="text-[#a19b98] group-hover:text-[#c9566a] group-hover:translate-x-0.5 -rotate-45 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
