import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="border-t border-[#dcd2cd5e] text-[#dcd2cd] w-full flex sm:justify-between flex-wrap py-10 sm:py-20 px-5 sm:px-20 lg:pl-60 items-center gap-4">
      <div>
        <div className="font-bold space-x-4">
          <Link className="hover:text-shadow-glow" to={"/"}>
            Home
          </Link>
          <Link className="hover:text-shadow-glow" to={"info"}>
            Info
          </Link>
        </div>
        <div className="my-8 space-x-4">
          <a
            href="https://www.x.com/scr1ptLord"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-shadow-glow"
          >
            Twitter
          </a>
          <a
            href="https://www.github.com/lordmaryo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-shadow-glow"
          >
            GitHub
          </a>
        </div>
        <p className="w-full font-bold">
          © 2025 Emmanuel ofoneta. All Rights Reserved.
        </p>
      </div>
      <div className="w-[500px]">
        <h1 className="lg:text-5xl md:text-4xl sm:text-2xl oswald-font">
          Emmanuel <br className="hidden lg:block" /> ofoneta
        </h1>
      </div>
    </div>
  );
};

export default Footer;
