import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export { buildLlmsFullTxt, buildLlmsTxt, getJsonLd, routeMetas, SITE_URL } from "./seo";

// Used at build time by scripts/prerender.js to produce crawlable HTML for every route
export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App prerender />
    </StaticRouter>
  );
