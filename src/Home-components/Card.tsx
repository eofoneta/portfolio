import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { ProjectsDescriptionProps } from "../App";
import VideoBanner from "../Components/VideoBanner";

export type CardProps = {
  projects: ProjectsDescriptionProps;
};

const Card = ({ projects }: CardProps) => {
  return (
    <div style={{ backgroundColor: projects.color }}>
      <Link
        to={`/project/${projects.id}`}
        className="p-5 flex flex-row flex-wrap sm:flex-nowrap justify-between items-center sm:h-screen"
      >
        <div className="hidden ml-10 sm:flex flex-col gap-y-14 w-[500px]">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-xl lg:2xl font-semibold">View project</p>
            <FaArrowRightLong />
          </div>
          <div>
            <div className="divide-x-2 divide-[#dcd2cd] opacity-50 mb-2 text-sm">
              {projects.techStacks
                .map((items, index) => (
                  <span key={index} className="px-2">
                    {items}
                  </span>
                ))
                .slice(0, 3)}
            </div>
            <h1 className="oswald-font text-3xl md:text-5xl lg:text-6xl">
              {projects.applicationName}
            </h1>
          </div>
        </div>
        {/* mobile responsivness */}
        <div className="sm:invisible flex justify-between w-[500px]">
          <div className="flex flex-col gap-y-14">
            <h1 className="oswald-font text-2xl">{projects.applicationName}</h1>
            <div className="flex flex-row gap-x-2 items-center">
              <p className="text-xl lg:2xl font-semibold">View project</p>
              <FaArrowRightLong />
            </div>
          </div>
          <span className="block sm:hidden oswald-font text-5xl text-[#dcd2cd93]">
            {projects.id}
          </span>
        </div>

        <div>
          <span className="hidden sm:block oswald-font sm:text-5xl md:text-6xl lg:text-8xl text-[#dcd2cd93]">
            {projects.id}
          </span>
          <div className="mt-4 sm:w-[400px] shadow-2xl">
            {projects.hasVideo ? (
              <VideoBanner
                videoPath={projects.videoUrl}
                className={`shadow-2xl border border-pink-500 p-2 rounded-lg `}
              />
            ) : (
              <img
                src={projects.imageUrl}
                className="rounded-lg"
                alt={projects.applicationName}
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
