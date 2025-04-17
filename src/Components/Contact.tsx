import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const scrollContactRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      "#contact-header",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        scrollTrigger: {
          trigger: scrollContactRef.current,
          start: "bottom bottom",
          once: true,
          onEnter: () => ScrollTrigger.refresh(),
        },
      }
    );
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("eofoneta@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide notification after 2s
  };

  return (
    <div
      id="contact"
      className="gap-x-2 w-full flex flex-row md:flex-nowrap justify-center items-center pt-20 px-5"
    >
      <div className="w-[500px]">
        <h1
          id="contact-header"
          ref={scrollContactRef}
          className="text-xl lg:text-6xl md:text-4xl sm:text-2xl oswald-font pb-2"
        >
          Contact
        </h1>
        <p className="font-bold pb-4">eofoneta@gmail.com</p>
      </div>
      <div className="w-[500px] flex flex-row gap-x-4 justify-around">
        <div className="relative inline-block">
          <button
            onClick={handleCopy}
            className="hover:text-blue-400 transition-colors"
          >
            <IoMail size={30} />
          </button>
          {copied && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded">
              Copied!
            </div>
          )}
        </div>
        <a href="https://x.com/lord_maryo" target="_blank">
          <FaXTwitter size={30} />
        </a>
        <a
          href="https://www.linkedin.com/in/eofoneta"
          className="hover:text-blue-400 transition-colors"
          target="_blank"
        >
          <FaLinkedin size={30} />
        </a>
      </div>
    </div>
  );
};

export default Contact;
