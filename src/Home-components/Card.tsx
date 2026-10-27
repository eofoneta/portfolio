import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProjectsDescriptionProps } from "../App";
import ProjectCover from "../Components/ProjectCover";
import { getProjectMeta } from "../data/projects";

export type CardProps = {
  projects: ProjectsDescriptionProps;
  index: number;
};

const Card = ({ projects, index }: CardProps) => {
  const { organization } = getProjectMeta(projects);

  return (
    <Link
      to={`/project/${projects.id}`}
      className="group flex flex-col sm:flex-row gap-6 border-b border-[#ffffff08] py-8 px-5 hover:bg-[#7a1c2e08] transition-all duration-300 relative"
    >
      {/* left wine accent bar on hover */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-[#7a1c2e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* ── INDEX ── */}
      <span className="oswald-light text-xs text-muted tabular-nums shrink-0 w-6 pt-1 hidden sm:block">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* ── IMAGE ── */}
      <div className="sm:w-[240px] lg:w-[300px] shrink-0 overflow-hidden relative">
        {/* wine glow */}
        <div className="absolute -inset-2 bg-[#7a1c2e] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10" />
        <ProjectCover
          project={projects}
          className="w-full aspect-video object-cover border border-[#ffffff08] group-hover:border-[#7a1c2e50] transition-all duration-300"
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-col justify-between flex-1 min-w-0 gap-4">
        <div>
          {/* organization / type label */}
          <div className="flex items-center gap-2 mb-2">
            <p className="oswald-light uppercase text-[10px] tracking-widest text-[#7a1c2e]">
              {organization}
            </p>
            {projects.link && (
              <span className="flex items-center gap-1 oswald-light uppercase text-[9px] tracking-widest text-muted">
                <span className="w-1 h-1 rounded-full bg-[#c9566a]" />
                Live
              </span>
            )}
          </div>

          {/* title */}
          <h3 className="oswald-font uppercase text-2xl lg:text-3xl group-hover:text-strong transition-colors duration-300 leading-tight">
            {projects.applicationName}
          </h3>

          {/* overview — truncated */}
          <p className="quicksand-text text-sm text-muted mt-2 leading-relaxed line-clamp-2 group-hover:text-fg transition-colors duration-300">
            {projects.overview}
          </p>
        </div>

        {/* bottom row: stacks + cta */}
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            {projects.techStacks.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="oswald-light text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#ffffff10] group-hover:border-[#7a1c2e50] group-hover:text-[#c9566a] text-muted transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="oswald-light uppercase text-[10px] tracking-widest text-muted group-hover:text-[#c9566a] transition-colors duration-300">
              View project
            </span>
            <FaArrowRightLong
              size={10}
              className="text-muted group-hover:text-[#c9566a] group-hover:translate-x-0.5 -rotate-45 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
