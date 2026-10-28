import Home from "./Page/Home";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Info from "./Page/Info";
import ProjectDescription from "./Page/project/[id]/ProjectDescription";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import { useEffect, useState } from "react";
import Loading from "./Conveniences/Loading";
import { getRouteMeta, SITE_URL } from "./seo";

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

// prerender skips the loader so the build-time HTML contains the page content
const App = ({ prerender = false }: { prerender?: boolean }) => {
  const location = useLocation();
  const isProjectDescription = location.pathname.startsWith("/project");
  const [loading, setLoading] = useState(!prerender);

  // Scroll to top page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Keep title, description and canonical in sync on client-side navigation
  useEffect(() => {
    const meta = getRouteMeta(location.pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `${SITE_URL}${meta.path}`);
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
