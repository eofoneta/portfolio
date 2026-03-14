import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectItems from "../../../data/projectItems.json";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { ProjectsDescriptionProps } from "../../../App";
import { FaGithub } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import VideoBanner from "../../../Components/VideoBanner";

gsap.registerPlugin(ScrollTrigger);

const Section = ({
  id,
  index,
  label,
  heading,
  children,
}: {
  id: string;
  index: string;
  label: string;
  heading: string;
  children: React.ReactNode;
}) => (
  <div id={id} className="section-block pt-16 border-t border-[#ffffff08]">
    <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] mb-1">
      {index} — {label}
    </p>
    <h2 className="oswald-font uppercase text-xl lg:text-2xl text-white mb-4 leading-tight">
      {heading}
    </h2>
    <div className="quicksand-text text-sm text-[#a19b98] leading-relaxed">
      {children}
    </div>
  </div>
);

const ProjectDescription = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIndex = ProjectItems.findIndex((project) => project.id === id);
  const nextIndex = (currentIndex + 1) % ProjectItems.length;
  const nextProject = ProjectItems[nextIndex];

  const project = ProjectItems.find(
    (project) => project.id === id
  ) as ProjectsDescriptionProps;

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ["#desc-meta", "#desc-title", "#desc-media"],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, delay: 0.2, ease: "power3.out" }
      );

      gsap.utils.toArray<Element>(".section-block").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.55, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen w-full relative">

      {/* project-colour ambient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{ background: project.color }}
      />

      {/* ── STICKY NAV BAR ── */}
      <div className="sticky top-0 z-30 backdrop-blur-sm border-b border-[#ffffff08] px-5 sm:px-10 md:px-20 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 oswald-light uppercase text-xs tracking-widest text-[#a19b98] hover:text-[#c9566a] transition-colors duration-300 group"
        >
          <FaArrowLeftLong size={11} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
          <span>Home</span>
        </button>

        <p className="oswald-font uppercase text-sm hidden sm:block tracking-wide">
          {project.applicationName}
        </p>

        <button
          onClick={() => navigate(`/project/${nextProject.id}`)}
          className="flex items-center gap-2 oswald-light uppercase text-xs tracking-widest text-[#a19b98] hover:text-[#c9566a] transition-colors duration-300 group"
        >
          <span>Next project</span>
          <FaArrowRightLong size={11} className="-rotate-45 group-hover:translate-x-0.5 transition-transform duration-300" />
        </button>
      </div>

      <div className="px-5 sm:px-10 md:px-20 pb-32 relative">

        {/* ── HERO HEADER ── */}
        <div className="max-w-[760px] mx-auto pt-16 pb-10">

          {/* meta row */}
          <div id="desc-meta" className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="oswald-light uppercase text-[10px] tracking-widest text-[#7a1c2e] border border-[#7a1c2e40] px-2 py-1">
              {project.projectType}
            </span>
            {project.techStacks.slice(0, 3).map((t, i) => (
              <span key={i} className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] border border-[#ffffff10] px-2 py-1">
                {t}
              </span>
            ))}
          </div>

          {/* title */}
          <h1
            id="desc-title"
            className="oswald-font uppercase text-4xl md:text-6xl lg:text-7xl text-white leading-[1.0] mb-8"
          >
            {project.applicationName}
          </h1>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.link && (
              <Link
                to={project.link}
                target="_blank"
                className="flex items-center gap-2 oswald-light uppercase text-xs tracking-widest px-4 py-2.5 border border-[#dcd2cd40] hover:border-[#7a1c2e] hover:text-[#c9566a] transition-all duration-300"
              >
                <span>View live</span>
                <FaArrowRightLong size={10} className="-rotate-45" />
              </Link>
            )}
            {!project.isPrivateRepo ? (
              <Link
                to={project.githubProject}
                target="_blank"
                className="flex items-center gap-2 oswald-light uppercase text-xs tracking-widest px-4 py-2.5 bg-[#dcd2cd] text-black hover:bg-[#c9566a] hover:text-white transition-all duration-300"
              >
                <span>Source code</span>
                <FaGithub size={13} />
              </Link>
            ) : (
              <button
                disabled
                className="flex items-center gap-2 oswald-light uppercase text-xs tracking-widest px-4 py-2.5 bg-[#dcd2cd20] text-[#a19b98] cursor-not-allowed"
              >
                <span>Private repo</span>
                <FaGithub size={13} />
              </button>
            )}
          </div>

          {/* media */}
          <div id="desc-media" className="relative">
            <div
              className="absolute -inset-4 blur-3xl opacity-30 rounded-full"
              style={{ background: project.color }}
            />
            {project.hasVideo ? (
              <VideoBanner
                videoPath={project.videoUrl}
                className="relative z-10 w-full border border-[#ffffff08]"
              />
            ) : (
              <img
                src={project.imageUrl}
                alt={project.applicationName}
                className="relative z-10 w-full border border-[#ffffff08]"
                style={{ background: project.color }}
              />
            )}
          </div>
        </div>

        {/* ── CONTENT + SIDEBAR ── */}
        <div className="max-w-[760px] mx-auto flex gap-16 relative">

          {/* sticky sidebar TOC */}
          <aside className="hidden lg:block w-36 shrink-0">
            <div className="sticky top-24">
              <p className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] mb-4">
                Contents
              </p>
              <nav className="flex flex-col gap-2.5">
                {[
                  { href: "#overview", label: "Overview" },
                  { href: "#development", label: "Development" },
                  { href: "#interaction", label: "Interactions" },
                  ...(project.complexities ? [{ href: "#complexities", label: "Complexities" }] : []),
                  { href: "#security", label: "Security" },
                  ...(project.learning ? [{ href: "#learnings", label: "Learnings" }] : []),
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] hover:text-[#c9566a] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* main content */}
          <div className="flex-1 min-w-0 space-y-0">

            {/* overview + tech */}
            <div id="overview" className="section-block pt-16 border-t border-[#ffffff08]">
              <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] mb-1">
                01 — Overview
              </p>
              <h2 className="oswald-font uppercase text-xl lg:text-2xl text-white mb-6 leading-tight">
                What is {project.applicationName}?
              </h2>
              <p className="quicksand-text text-sm text-[#a19b98] leading-relaxed mb-8">
                {project.overview}
              </p>

              {/* tech stack inline */}
              <div>
                <p className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] mb-3">
                  Technology used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStacks.map((tech, i) => (
                    <span
                      key={i}
                      className="oswald-light uppercase text-[10px] tracking-widest px-2 py-1 border border-[#ffffff10] text-[#a19b98]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Section id="development" index="02" label="Development" heading="The building stage and process">
              <p>{project.development.docs}</p>
            </Section>

            <Section id="interaction" index="03" label="Interactions" heading="Seamless user interactions and experiences">
              <p>{project.interactions.docs}</p>
            </Section>

            {project.complexities && (
              <Section id="complexities" index="04" label="Complexities" heading="Bugs, roadblocks and pile of constraints">
                <p>{project.complexities.docs}</p>
              </Section>
            )}

            <Section
              id="security"
              index={project.complexities ? "05" : "04"}
              label="Security"
              heading="Ensuring the application is secure from vulnerabilities"
            >
              <p>{project.security.docs}</p>
            </Section>

            {project.learning && (
              <Section
                id="learnings"
                index={project.complexities ? "06" : "05"}
                label="Key Learnings"
                heading="Insights and knowledge gained from building the project"
              >
                <p>{project.learning.docs}</p>
              </Section>
            )}

            {/* next project footer */}
            <div className="pt-20 border-t border-[#ffffff08] mt-16">
              <p className="oswald-light uppercase text-[10px] tracking-widest text-[#a19b98] mb-2">
                Next project
              </p>
              <button
                onClick={() => navigate(`/project/${nextProject.id}`)}
                className="group flex items-center gap-3 oswald-font uppercase text-2xl lg:text-3xl text-white hover:text-[#c9566a] transition-colors duration-300"
              >
                {nextProject.applicationName}
                <FaArrowRightLong
                  size={16}
                  className="-rotate-45 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDescription;
