import { ProjectsDescriptionProps } from "../App";
import { getProjectMeta } from "../data/projects";
import VideoBanner from "./VideoBanner";

type ProjectCoverProps = {
  project: ProjectsDescriptionProps;
  className?: string;
  size?: "sm" | "lg";
};

/**
 * Renders a project's video or image, falling back to a typographic cover
 * in the project colour when no media is available (e.g. proprietary work).
 */
const ProjectCover = ({ project, className = "", size = "sm" }: ProjectCoverProps) => {
  if (project.hasVideo && project.videoUrl) {
    return <VideoBanner videoPath={project.videoUrl} className={className} />;
  }

  if (project.imageUrl) {
    return (
      <img
        src={project.imageUrl}
        alt={project.applicationName}
        className={className}
        style={{ backgroundColor: project.color }}
      />
    );
  }

  const { organization } = getProjectMeta(project);
  const isLarge = size === "lg";

  return (
    <div
      role="img"
      aria-label={project.applicationName}
      className={`relative aspect-video overflow-hidden flex flex-col justify-between ${
        isLarge ? "p-6 md:p-10" : "p-4"
      } ${className}`}
      style={{ backgroundColor: project.color }}
    >
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#dcd2cd 1px, transparent 1px), linear-gradient(90deg, #dcd2cd 1px, transparent 1px)",
          backgroundSize: isLarge ? "40px 40px" : "24px 24px",
        }}
      />
      {/* wine glow */}
      <div className="absolute -bottom-1/3 -right-1/4 w-2/3 h-2/3 rounded-full bg-[#7a1c2e] blur-3xl opacity-30" />

      <p
        className={`relative oswald-light uppercase tracking-widest text-[#c9566a] ${
          isLarge ? "text-xs" : "text-[10px]"
        }`}
      >
        {organization}
      </p>

      <div className="relative">
        <p
          className={`oswald-font uppercase text-[#ffffffe2] leading-[0.95] ${
            isLarge ? "text-3xl md:text-5xl" : "text-2xl"
          }`}
        >
          {project.applicationName}
        </p>
        {isLarge && (
          <p className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] mt-3">
            {project.techStacks.join(" / ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectCover;
