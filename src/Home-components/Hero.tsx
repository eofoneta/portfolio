import gsap from "gsap";
import { useEffect } from "react";
import { IoIosMail } from "react-icons/io";
import SplitType from "split-type";

const Hero = () => {
  useEffect(() => {
    new SplitType("#target-1", {
      types: "chars",
      charClass: "hero-char1",
    });

    new SplitType("#target-3", {
      types: "chars",
      charClass: "hero-char3",
    });

    gsap.set(".hero-char1", {
      y: 100,
    });

    gsap.to(".hero-char1", {
      y: 0,
      duration: 1,
      delay: 0.3,
      stagger: 0.01,
    });

    gsap.to("#target-4", {
      opacity: 1,
      y: "+=40",
      duration: 0.3,
      stagger: 0.1,
      delay: 0.5,
    });
  }, []);

  return (
    <div className="text-white">
      <div className="px-5 md:py-14 sm:px-8 md:px-12">
        <div className="text-right pt-10 sm:p-0">
          <div>
            <h3 className="md:hidden oswald-font text-[#a19b98] text-left my-1">
              Emmanuel ofoneta - Fullstack developer
            </h3>
            <h1 className="text-left text-xl sm:text-2xl oswald-font md:hidden">
              I craft web apps, build secure severs, and design interface
            </h1>
            <h1
              className="hidden md:block oswald-font uppercase text-2xl md:text-3xl lg:text-5xl"
              id="target-1"
            >
              I craft web apps, build secure severs,
            </h1>
          </div>
          <div className="hidden md:flex flex-row justify-between items-center">
            <p className="text-sm font-bold sm:w-[400px] text-left items-center p-5">
              With years of experience in web development, I have built projects
              that address real-world digital challenges. Welcome to my world
            </p>
            <p
              className="oswald-font uppercase bg-[#fff] sm:px-2 sm:py-4 text-[#000] text-lg sm:text-xl md:text-2xl lg:text-5xl font-semibold"
              id="target-3"
            >
              and design interface
            </p>
          </div>
          <div className="overflow-hidden">
            <p
              className="hidden md:block quicksand-font text-lg sm:text-xl md:text-2xl"
              id="target-4"
            >
              Software Developer
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mt-20 md:mt-[7rem]">
          <div className="italic md:text-base text-sm font-semibold sm:w[20%] opacity-60">
            Software developer based in Lagos, Nigeria.
          </div>
          <a href="#contact">
            <button className="sm:px-4 lg:px-0 hidden sm:flex flex-row flex-nowrap justify-center transition-all rounded-lg font-bold items-center gap-2 bg-[#fff] text-[#000] sm:w-full md:w-full lg:w-[250px] py-2 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#979492] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              <IoIosMail size={20} />
              <span>Send a message</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
