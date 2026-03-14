import Contact from "../Components/Contact";
import Hero from "../Home-components/Hero";
import Projects from "../Home-components/Projects";
import WorkExperience from "../Home-components/WorkExperience";
import ProjectItems from "../data/projectItems.json";

const Home = () => {
  return (
    <div className="w-full py-24">
      <div className="w-[400px] h-[400px] absolute -top-20 -left-10 rounded-full bg-[#dcd2cd20] blur-3xl"></div>
      <Hero />
      <WorkExperience />
      <Projects projects={ProjectItems} />
      <Contact />
    </div>
  );
};

export default Home;
