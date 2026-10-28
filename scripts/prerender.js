// Renders every route to static HTML after `vite build`, so search engines and
// AI crawlers that don't execute JavaScript still see the full content.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, routeMetas, getJsonLd, buildLlmsTxt, buildLlmsFullTxt, SITE_URL } = await import(
  pathToFileURL(ssrEntry).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escapeAttr = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const headFor = (meta) => {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="Emmanuel Ofoneta" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(meta.title)}" />`,
    meta.type === "profile" ? `<meta property="profile:first_name" content="Emmanuel" />` : "",
    meta.type === "profile" ? `<meta property="profile:last_name" content="Ofoneta" />` : "",
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@hustware" />`,
    `<meta name="twitter:creator" content="@hustware" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
    `<script type="application/ld+json">${JSON.stringify(getJsonLd(meta)).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
};

for (const meta of routeMetas) {
  const html = template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, headFor(meta))
    .replace("<!--app-html-->", render(meta.path));

  // /info -> info.html, /project/01 -> project/01.html (served via cleanUrls on Vercel)
  const file = meta.path === "/" ? "index.html" : `${meta.path.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  fs.writeFileSync(path.join(dist, file), html);
  console.log(`prerendered ${meta.path} -> dist/${file}`);
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routeMetas
  .map(
    (meta) => `  <url>
    <loc>${SITE_URL}${meta.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${meta.path === "/" ? "1.0" : meta.path === "/info" ? "0.8" : "0.7"}</priority>
    <image:image><image:loc>${meta.image}</image:loc></image:image>
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "llms.txt"), buildLlmsTxt());
fs.writeFileSync(path.join(dist, "llms-full.txt"), buildLlmsFullTxt());

// 404 page is the app shell, marked noindex, so unknown URLs return a real 404 status
fs.writeFileSync(
  path.join(dist, "404.html"),
  template
    .replace(
      /<!--seo:start-->[\s\S]*?<!--seo:end-->/,
      `<title>Page not found | Emmanuel Ofoneta</title>\n    <meta name="robots" content="noindex" />`
    )
    .replace(/<meta name="robots"[^>]*index, follow[^>]*\/>\n\s*/, "")
    .replace(" data-prerendered", "")
);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("wrote sitemap.xml, llms.txt, llms-full.txt, 404.html");
