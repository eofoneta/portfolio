import gsap from "gsap";
import { useEffect, useRef } from "react";
import { IoIosMail } from "react-icons/io";
import SplitType from "split-type";
import FramedImage from "../Components/FramedImage";

const MARQUEE_ITEMS = [
  "Backend Engineering",
  "API Integration",
  "Spring Boot",
  "Microservice Architecture",
  "AI Integration",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "System Design",
  "Third-party APIs",
];

const Hero = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- text animations ---
    new SplitType("#target-1", { types: "chars", charClass: "hero-char1" });
    new SplitType("#target-3", { types: "chars", charClass: "hero-char3" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.set(".hero-char1", { y: 110, opacity: 0 })
      .set("#hero-img-inner", { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 })
      .set("#hero-badge", { opacity: 0, scale: 0.8 })
      .set("#target-4", { opacity: 0, y: -40 })
      .set("#hero-bottom", { opacity: 0, y: 20 })
      .to(".hero-char1", {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay: 0.2,
        stagger: 0.012,
      })
      .to(
        "#hero-img-inner",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1,
          ease: "power4.inOut",
        },
        "-=0.5"
      )
      .to(
        "#target-4",
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .to(
        "#hero-badge",
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .to("#hero-bottom", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

    // --- marquee ---
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 18,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <div className="text-strong relative isolate">
      {/* ── BACKGROUND: blueprint grid fading out from the headline + wine glow behind the photo ── */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10 overflow-hidden">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute top-[20%] right-[8%] w-[280px] h-[280px] md:w-[480px] md:h-[400px] rounded-full bg-[#7a1c2e] opacity-[0.18] blur-[110px]" />
      </div>

      <div className="px-5 md:py-10 sm:px-8 md:px-12">

        {/* ── MOBILE HERO ── */}
        <div className="md:hidden pt-10">
          <p className="oswald-light text-muted text-sm tracking-widest uppercase mb-3">
            Emmanuel Ofoneta — Backend Engineer
          </p>
          <h1 className="oswald-font uppercase text-2xl sm:text-3xl leading-tight">
            I build the systems that power products. APIs, integrations & microservices
          </h1>

          {/* mobile avatar row */}
          <div className="mt-6 flex gap-3 items-center">
            <img
              src="/me-1.webp"
              alt="Emmanuel Ofoneta"
              className="w-16 h-16 object-cover object-top rounded-full transition-all duration-700 hover:grayscale border border-[#7a1c2e60]"
            />
            <div>
              <p className="text-xs text-muted">Lagos, Nigeria</p>
              <p className="text-xs text-muted mt-0.5">
                Available for work
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 ml-1.5 align-middle animate-pulse" />
              </p>
            </div>
          </div>
        </div>

        {/* ── DESKTOP HERO ── */}
        <div className="hidden md:block pt-0">

          {/* Two headline lines left, photo right */}
          <div className="flex items-center gap-8">

            {/* LEFT: stacked headlines */}
            <div className="flex-1 min-w-0">
              {/* LINE 1 — the visually hidden name gives search engines and screen readers context */}
              <h1 className="oswald-font uppercase hero-headline leading-[1.05]">
                <span className="sr-only">Emmanuel Ofoneta, Software Engineer — </span>
                <span id="target-1" className="block">
                  I build systems that power products,
                </span>
              </h1>

              {/* LINE 2: inverted bar flush below line 1 */}
              <p
                className="oswald-font uppercase bg-[#7a1c2e] px-3 py-1 text-white hero-headline leading-[1.05] font-bold block w-fit mt-4"
                id="target-3"
              >
                AI integrations & microservices
              </p>

              {/* description + role sit below both lines */}
              <p className="text-sm text-muted max-w-[420px] leading-relaxed mt-4">
                Software engineer focused on third-party API integration, AI
                tooling, and maintaining scalable microservice architectures
                that keep businesses running smoothly.{" "}
                <span className="text-strong font-semibold">
                  Welcome to my world.
                </span>
              </p>

              <div className="overflow-hidden mt-3">
                <p
                  className="quicksand-font text-lg lg:text-xl text-fg"
                  id="target-4"
                >
                  Software Engineer
                </p>
              </div>
            </div>

            {/* RIGHT: photo */}
            <div className="relative shrink-0 w-[220px] lg:w-[280px]">
              <FramedImage
                id="hero-img-inner"
                src="/me-1.webp"
                alt="Emmanuel Ofoneta, software engineer, coding at his desk in Lagos"
                height="340px"
                objectPosition="top"
                hoverGreyscale={true}
              />
              {/* badge below image */}
              <div
                id="hero-badge"
                className="mt-2 inline-block bg-[#7a1c2e] text-white px-3 py-2 text-xs font-bold oswald-font uppercase tracking-wide"
              >
                Based in Lagos, NG
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          id="hero-bottom"
          className="flex flex-row justify-between items-center mt-12 md:mt-16"
        >
          <div className="italic md:text-base text-sm font-semibold opacity-60">
            Open to fulltime & freelance opportunities.
          </div>
          <a href="#contact">
            <button className="hidden sm:flex flex-row flex-nowrap justify-center transition-all rounded-lg font-bold items-center gap-2 bg-black text-white dark:bg-white dark:text-black lg:w-[250px] px-5 py-2 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#7a1c2e] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              <IoIosMail size={20} />
              <span>Send a message</span>
            </button>
          </a>
        </div>

        {/* ── MARQUEE STRIP ── */}
        <div className="mt-12 md:mt-16 overflow-hidden border-t border-b border-[#ffffff15] py-3 select-none">
          <div ref={marqueeRef} className="flex gap-10 w-max">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className="oswald-light uppercase text-sm tracking-widest text-muted whitespace-nowrap"
              >
                {item}
                <span className="ml-10 text-[#ffffff20]">✦</span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
