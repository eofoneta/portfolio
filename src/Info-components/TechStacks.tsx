import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// ordered to lead with backend and data work; frontend is listed last as secondary
const stackGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Go", "TypeScript / JavaScript", "Java"] },
  { label: "Backend", items: ["Node.js / Express", "Go Fiber", "Prisma / GORM", "Spring Boot"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "ClickHouse", "Redis"] },
  { label: "Infrastructure", items: ["Docker", "Kubernetes", "Temporal"] },
  { label: "Frontend", items: ["React / Next.js", "Tailwind CSS"] },
];

const TechStacks = () => {
  useGSAP(() => {
    gsap.utils.toArray<Element>(".stack-group").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div className="pt-20 md:my-[200px] flex flex-col sm:flex-row sm:justify-between gap-5 sm:gap-x-20">
      {/* SIDEBAR */}
      <div className="flex flex-row gap-4 sm:h-[80px] md:h-[130px] sm:sticky top-[20%]">
        <div className="h-full bg-[#dcd2cd] w-[2px] sm:block hidden" />
        <div className="overflow-y-hidden max-w-[500px] oswald-font text-xl lg:text-6xl md:text-4xl sm:text-2xl">
          <span id="techStack-span-1">Current</span>
          <br className="sm:block hidden" />
          <span id="techStack-span-2" className="overflow-clip">
            Tech Stacks
          </span>
        </div>
      </div>

      {/* STACKS */}
      <dl className="sm:w-[50%] border-t border-[#ffffff0f]">
        {stackGroups.map((group) => (
          <div
            key={group.label}
            className="stack-group grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-4 py-5 border-b border-[#ffffff0f]"
          >
            <dt className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] pt-0.5">
              {group.label}
            </dt>
            <dd className="oswald-font uppercase text-sm md:text-base tracking-wide text-fg leading-relaxed">
              {group.items.join(" · ")}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default TechStacks;
