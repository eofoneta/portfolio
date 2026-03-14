import Home from "./Page/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Info from "./Page/Info";
import ProjectDescription from "./Page/project/[id]/ProjectDescription";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import Loading from "./Conveniences/Loading";

interface Section {
  docs: string;
  image: string;
}

export interface ProjectsDescriptionProps {
  id: string;
  applicationName: string;
  imageUrl: string;
  videoUrl: string;
  hasVideo: boolean;
  techStacks: string[];
  projectType: string;
  color: string;
  link?: string;
  githubProject: string;
  isPrivateRepo: boolean;
  overview: string;
  development: Section;
  interactions: Section;
  complexities?: Section;
  security: Section;
  learning?: Section;
}

/**
 * TODO - change design for landing page
 */

const App = () => {
  const location = useLocation();
  const isProjectDescription = location.pathname.startsWith("/project");
  const [loading, setLoading] = useState(true);

  // Scroll to top page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Dismiss loader only when the page is fully loaded (images, fonts, assets)
  useEffect(() => {
    setLoading(true);

    const handleLoaded = () => setLoading(false);

    if (document.readyState === "complete") {
      // Already loaded (e.g. cached page or fast navigation)
      handleLoaded();
    } else {
      window.addEventListener("load", handleLoaded);
    }

    return () => window.removeEventListener("load", handleLoaded);
  }, [location.pathname]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!isProjectDescription && <NavBar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/project/:id" element={<ProjectDescription />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
