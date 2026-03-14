import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FramedImage from "../Components/FramedImage";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(["#about-div-1", "#about-div-2"], {
        y: 60,
        opacity: 0,
        duration: 0.7,
        delay: 0.3,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(["#about-span-1", "#about-span-2"], {
        y: 80,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.fromTo(
        "#intro-img",
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.1,
          ease: "power4.inOut",
          scrollTrigger: { trigger: "#intro-img", start: "top 85%" },
        },
      );

      gsap.fromTo(
        "#wanted-img",
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: "#wanted-img", start: "top 85%" },
        },
      );

      gsap.utils.toArray<Element>(".about-section").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <div className="overflow-hidden max-w-[800px] mb-10 md:mb-20 sm:text-lg md:text-xl lg:text-2xl">
        <h2 id="about-div-1" className="oswald-font mb-4">
          Info
        </h2>
        <p id="about-div-2" className="font-semibold oswald-light">
          I'm passionate about developing seamless and impressive web
          applications with secure web servers and great <b>User experience.</b>
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-row sm:gap-5 sm:justify-between">
        {/* SIDEBAR */}
        <div className="flex flex-row gap-4 sm:h-[80px] md:h-[130px] sticky top-[20%]">
          <div className="h-full bg-[#dcd2cd] w-[2px] hidden sm:block" />
          <div className="overflow-y-hidden max-w-[500px] oswald-font hidden lg:text-6xl md:text-4xl sm:text-2xl sm:block">
            <span id="about-span-1">About</span> <br />
            <span id="about-span-2" className="overflow-clip">
              me
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-[500px] space-y-16">
          {/* QUICK INTRODUCTION */}
          <div className="about-section">
            <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] mb-2">
              01 — Quick Introduction
            </p>
            <h2 className="oswald-font text-xl md:text-2xl lg:text-3xl mb-4 leading-tight">
              The person behind the code.
            </h2>
            <p className="text-[#a19b98] leading-relaxed mb-8">
              My name is Emmanuel Ofoneta, and I'm based in Lagos, Nigeria. I'm
              a software engineer with a passion for building both frontend and
              backend technologies. My journey in tech has been shaped by a love
              for learning and solving complex problems.
            </p>

            <FramedImage
              id="wanted-img"
              src="/me-2.png"
              alt="Portrait"
              height="220px"
              objectPosition="center"
            />
          </div>

          {/* BACKGROUND */}
          <div className="about-section">
            <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] mb-2">
              02 — Background
            </p>
            <h2 className="oswald-font text-xl md:text-2xl lg:text-3xl mb-4 leading-tight">
              How it all started.
            </h2>
            <p className="text-[#a19b98] leading-relaxed">
              I stumbled upon coding during the lockdown, which turned out to be
              a life changing decision. At first, I began by creating simple
              frontend websites, which quickly turned into a passion — this
              realization fueled me to go deeper into programming, and I decided
              to make it a profession. From those early days of building small
              personal projects, I transitioned into professional work, learning
              about the vast potential of technology.
            </p>
          </div>

          {/* BUT I WANTED MORE */}
          <div className="about-section">
            <p className="oswald-light uppercase text-xs tracking-widest text-[#7a1c2e] mb-2">
              03 — But I Wanted More
            </p>
            <h2 className="oswald-font text-xl md:text-2xl lg:text-3xl mb-4 leading-tight">
              Going deeper under the hood.
            </h2>

            <div className="relative mb-8">
              <FramedImage
                id="intro-img"
                src="/me-3.png"
                alt="Portrait"
                height="380px"
                objectPosition="top"
                imgClassName="grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
              <p className="absolute bottom-3 left-4 oswald-light uppercase text-xs tracking-widest text-white/60">
                Lagos, Nigeria — 2026
              </p>
            </div>

            <p className="text-[#a19b98] leading-relaxed">
              As I grew in my development journey, I realized I wanted to
              understand more about how software truly works — especially on the
              backend. I wasn't just satisfied with creating websites; I wanted
              to know how they function under the hood. This led me into backend
              development, server-side technologies, databases, and APIs, and
              how they all tie into creating seamless digital experiences. This
              deeper understanding has allowed me to work on complex systems and
              build scalable applications that power modern platforms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
