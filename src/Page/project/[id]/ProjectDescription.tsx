import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectItems from "../../../data/projectItems.json";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ProjectsDescriptionProps } from "../../../App";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VideoBanner from "../../../Components/VideoBanner";

const ProjectDescription = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIndex = ProjectItems.findIndex((project) => project.id === id);
  const nextIndex = (currentIndex + 1) % ProjectItems.length;
  const nextProjectId = ProjectItems[nextIndex].id;

  const project = ProjectItems.find(
    (project) => project.id === id
  ) as ProjectsDescriptionProps;

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from(["#description-header", "#description-img"], {
        y: 100,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        stagger: 0.1,
      }).to(["#description-header", "#description-img"], {
        y: 0,
        opacity: 1,
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="py-20 px-5 sm:px-10 md:px-20 w-full relative">
      <div
        style={{
          background: project.color,
        }}
        className="opacity-60 md:opacity-50 w-full h-[600px] md:w-[700px] lg:w-[1000px] md:h-[700px] lg:h-[1000px] absolute top-[10%] md:top-[10%] lg:top-[16%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      ></div>
      <div>
        <div className="flex flex-row justify-between sticky top-0 z-30 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center hover:text-shadow-glow font-bold"
          >
            <FaArrowLeftLong className="mr-2" />
            <span>Home</span>
          </button>
          <button
            onClick={() => navigate(`/project/${nextProjectId}`)}
            className="flex items-center hover:text-shadow-glow font-bold"
          >
            <span>Next</span>
            <FaArrowRightLong className="ml-2" />
          </button>
        </div>
        <div className="max-w-[800px] mx-auto relative mt-20 mb-10">
          <h1
            id="description-header"
            className="sigmar-one-regular text-center absolute -top-10 md:-top-[4.5rem] left-1/2 transform -translate-x-1/2 uppercase text-xl md:text-3xl lg:text-5xl z-10 bg-opacity-50"
          >
            {project.applicationName}
          </h1>
          {project.hasVideo ? (
            <VideoBanner
              videoPath={project.videoUrl}
              className="max-w-[700px] mx-auto z-20 relative opacity-90"
            />
          ) : (
            <img
              className="w-[700px] mx-auto z-20 relative opacity-90"
              id="description-img"
              src={project.imageUrl}
              alt={project.applicationName}
            />
          )}
        </div>
        <div className="flex flex-row justify-between relative">
          <aside className="hidden lg:block w-40 fixed top-[40%]">
            <h2 className="lg:text-xl md:text-lg font-bold mb-4 opacity-50">
              Contents
            </h2>
            <div className="flex flex-col gap-2 font-semibold text-sm">
              <a
                href="#overview"
                className="opacity-50 hover:opacity-100 hover:text-shadow-glow transition-all"
              >
                Overview
              </a>
              <a
                href="#development"
                className="opacity-50 hover:opacity-100 hover:text-shadow-glow transition-all"
              >
                Development
              </a>
              <a
                href="#interaction"
                className="opacity-50 hover:opacity-100 hover:text-shadow-glow transition-all"
              >
                Interactions
              </a>
              {project.complexities && (
                <a
                  href="#complexities"
                  className="opacity-50 hover:opacity-100 hover:text-shadow-glow transition-all"
                >
                  complexities
                </a>
              )}
              <a
                href="#security"
                className="opacity-50 hover:opacity-100 hover:text-shadow-glow transition-all"
              >
                Security
              </a>
              {project.learning && (
                <a
                  href="#learnings"
                  className="opacity-50 hover:opacity-100 hover:text-shadow-glow transition-all"
                >
                  learnings
                </a>
              )}
            </div>
          </aside>
          <div className="w-[700px] mx-auto">
            <div className="flex-wrap sm:flex-nowrap w-full flex items-center justify-center gap-5">
              {project.link && (
                <Link
                  className="flex items-center justify-center font-bold border w-[100%] py-2 hover:bg-[#dcd2cd] hover:text-black transition-all duration-300"
                  target="_blank"
                  to={project.link}
                >
                  <span className="mr-2">View project</span>
                </Link>
              )}
              {!project.isPrivateRepo && (
                <Link
                  to={project.githubProject}
                  target="_blank"
                  className="flex items-center justify-center font-bold border w-full py-2 text-black bg-[#dcd2cd] hover:bg-[#dcd2cdb2] transition-all"
                >
                  <span className="mr-2">Source code</span>
                  <FaGithub />
                </Link>
              )}
              {project.isPrivateRepo && (
                <button
                  disabled
                  className="disabled:opacity-50 flex items-center justify-center font-bold border w-full py-2 text-black bg-[#dcd2cd]"
                >
                  <span className="mr-2">Private Repo</span>
                  <FaGithub />
                </button>
              )}
            </div>
            <div
              id="overview"
              className="flex-wrap sm:flex-nowrap w-full flex gap-5 justify-between mt-5 lg:pt-5"
            >
              <div className="md:w-1/2 w-full">
                <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                  Technology used
                </h2>
                <ul>
                  {project.techStacks.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className=" md:w-1/2 w-full">
                <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                  Overview
                </h2>
                <p>{project.overview}</p>
              </div>
            </div>
            <div className="pt-5 lg:pt-10" id="development">
              <h2 className="text-2xl font-light hidden lg:block">
                Development
              </h2>
              <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                The building stage and process
              </h2>
              <p className="mb-4">{project.development.docs}</p>
            </div>
            <div className="pt-5 lg:pt-10" id="interaction">
              <h2 className="text-2xl font-light hidden lg:block">
                Interactions
              </h2>
              <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                Seamless user interactions and experiences
              </h2>
              <p className="mb-4">{project.interactions.docs}</p>
            </div>

            {project.complexities && (
              <div className="pt-5 lg:pt-10" id="complexities">
                <h2 className="text-2xl font-light hidden lg:block">
                  Solving complexities
                </h2>
                <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                  Bugs, roadblocks and pile of constraints
                </h2>
                <p className="mb-4">{project.complexities.docs}</p>
              </div>
            )}

            <div className="pt-5 lg:pt-10" id="security">
              <h2 className="text-2xl font-light hidden lg:block">
                Security measures
              </h2>
              <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                Ensuring the application is secure from vulnerabilities
              </h2>
              <p className="mb-4">{project.security.docs}</p>
            </div>

            {project.learning && (
              <div className="pt-5 lg:pt-10" id="learnings">
                <h2 className="text-2xl font-light hidden lg:block">
                  Key learnings
                </h2>
                <h2 className="mb-2 text-lg md:text-xl lg:text2xl font-bold">
                  Insights and knowledge gained from building the project
                </h2>
                <p className="mb-4">{project.learning.docs}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
