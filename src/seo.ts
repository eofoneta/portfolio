import type { ProjectsDescriptionProps } from "./App";
import { getProjectMeta, projects } from "./data/projects";
import workExperience from "./data/workExperience.json";

export const SITE_URL = "https://eofoneta.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PERSON = {
  name: "Emmanuel Ofoneta",
  jobTitle: "Software Engineer",
  email: "emmanuel@eofoneta.com",
  locality: "Lagos",
  country: "NG",
  image: `${SITE_URL}/me-1.webp`,
  summary:
    "Emmanuel Ofoneta is a software engineer based in Lagos, Nigeria, specialising in backend systems, APIs, third-party integrations, AI tooling and microservice architecture. He works remotely with teams in the United States, New Zealand and the United Kingdom, using Go, Node.js, TypeScript, PostgreSQL, MySQL and ClickHouse.",
  sameAs: [
    "https://www.linkedin.com/in/eofoneta",
    "https://github.com/eofoneta",
    "https://x.com/hustware",
  ],
  skills: [
    "Software Engineering",
    "Backend Development",
    "Full-stack Development",
    "API Design",
    "Third-party API Integration",
    "AI Integration",
    "Microservices",
    "System Design",
    "Go",
    "Node.js",
    "TypeScript",
    "React",
    "Next.js",
    "PostgreSQL",
    "MySQL",
    "ClickHouse",
    "Redis",
    "Docker",
    "Kubernetes",
    "Temporal",
    "tRPC",
    "WebSockets",
  ],
};

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  image: string;
  type: "profile" | "article" | "website";
  jsonLd: Record<string, unknown>[];
};

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: PERSON.name,
  givenName: "Emmanuel",
  familyName: "Ofoneta",
  jobTitle: PERSON.jobTitle,
  description: PERSON.summary,
  url: SITE_URL,
  image: PERSON.image,
  email: `mailto:${PERSON.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: PERSON.locality,
    addressCountry: PERSON.country,
  },
  worksFor: [
    { "@type": "Organization", name: "TorahAnytime", url: "https://www.torahanytime.com" },
    { "@type": "Organization", name: "MyCelebrantApp" },
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationLocation: { "@type": "City", name: "Lagos, Nigeria" },
    skills: PERSON.skills.join(", "),
  },
  knowsAbout: PERSON.skills,
  sameAs: PERSON.sameAs,
};

const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE_URL,
  name: "Emmanuel Ofoneta — Software Engineer",
  inLanguage: "en",
  author: { "@id": personId },
  publisher: { "@id": personId },
};

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

const truncate = (text: string, max = 158) =>
  text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`;

const projectMeta = (project: ProjectsDescriptionProps): RouteMeta => {
  const path = `/project/${project.id}`;
  const { category, organization } = getProjectMeta(project);
  const image = project.imageUrl ? `${SITE_URL}${project.imageUrl}` : OG_IMAGE;

  return {
    path,
    title: `${project.applicationName} — ${organization} Case Study | Emmanuel Ofoneta`,
    description: truncate(project.overview),
    // social cards use the JPG; some networks still don't render WebP previews
    image: OG_IMAGE,
    type: "article",
    jsonLd: [
      {
        "@type": "CreativeWork",
        "@id": `${SITE_URL}${path}#work`,
        name: project.applicationName,
        headline: `${project.applicationName} — ${category} work by Emmanuel Ofoneta`,
        description: project.overview,
        url: `${SITE_URL}${path}`,
        image,
        author: { "@id": personId },
        creator: { "@id": personId },
        keywords: project.techStacks.join(", "),
        about: project.techStacks.map((tech) => ({ "@type": "Thing", name: tech })),
        ...(project.link && { sameAs: project.link }),
        isPartOf: { "@id": websiteId },
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: project.applicationName, path },
      ]),
    ],
  };
};

const staticMeta: RouteMeta[] = [
  {
    path: "/",
    title: "Emmanuel Ofoneta — Software Engineer | Backend & Full-stack Developer",
    description:
      "Emmanuel Ofoneta is a Lagos-based software engineer building backend systems, APIs and AI integrations with Go, Node.js and TypeScript. Open to remote roles.",
    image: OG_IMAGE,
    type: "profile",
    jsonLd: [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: "Emmanuel Ofoneta — Software Engineer",
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
      {
        "@type": "ItemList",
        name: "Selected works by Emmanuel Ofoneta",
        itemListElement: projects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/project/${project.id}`,
          name: project.applicationName,
        })),
      },
    ],
  },
  {
    path: "/info",
    title: "About Emmanuel Ofoneta — Software Engineer in Lagos, Nigeria",
    description:
      "The story, background and tech stack of Emmanuel Ofoneta, a backend-focused software engineer from Lagos, Nigeria working with Go, Node.js and TypeScript.",
    image: OG_IMAGE,
    type: "profile",
    jsonLd: [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/info#aboutpage`,
        url: `${SITE_URL}/info`,
        name: "About Emmanuel Ofoneta",
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Info", path: "/info" },
      ]),
    ],
  },
];

export const routeMetas: RouteMeta[] = [...staticMeta, ...projects.map(projectMeta)];

export const getRouteMeta = (pathname: string): RouteMeta => {
  const path = pathname.replace(/\/+$/, "") || "/";
  return routeMetas.find((meta) => meta.path === path) ?? staticMeta[0];
};

// Person and WebSite are on every page so any URL can be understood on its own
export const getJsonLd = (meta: RouteMeta) => ({
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema, ...meta.jsonLd],
});

/** Concise site guide for LLMs — https://llmstxt.org */
export const buildLlmsTxt = () =>
  [
    `# ${PERSON.name}`,
    "",
    `> ${PERSON.summary}`,
    "",
    "Emmanuel is open to full-time and freelance software engineering roles, working remotely across time zones. Relevant roles: backend engineer, full-stack engineer, Go developer, Node.js / TypeScript engineer, API and integrations engineer, AI integration engineer.",
    "",
    `- Website: ${SITE_URL}`,
    `- Email: ${PERSON.email}`,
    ...PERSON.sameAs.map((url) => `- ${url}`),
    `- Resume (PDF): ${SITE_URL}/Eofoneta-resume.pdf`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): Overview, work experience and selected projects`,
    `- [About](${SITE_URL}/info): Background, story and tech stack`,
    `- [Full profile for LLMs](${SITE_URL}/llms-full.txt): Complete experience and project write-ups in plain text`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (p) => `- [${p.applicationName}](${SITE_URL}/project/${p.id}): ${truncate(p.overview, 200)}`
    ),
    "",
    "## Experience",
    "",
    ...workExperience.map((job) => `- ${job.role}, ${job.company} (${job.duration}, ${job.location})`),
    "",
  ].join("\n");

/** Everything on the site as plain text, so assistants can answer questions without rendering JS */
export const buildLlmsFullTxt = () =>
  [
    `# ${PERSON.name} — ${PERSON.jobTitle}`,
    "",
    `> ${PERSON.summary}`,
    "",
    `Website: ${SITE_URL} · Email: ${PERSON.email} · Location: Lagos, Nigeria (remote)`,
    `Profiles: ${PERSON.sameAs.join(" · ")}`,
    "Availability: Open to full-time and freelance opportunities.",
    "",
    "## Skills",
    "",
    PERSON.skills.join(", "),
    "",
    "## Work experience",
    "",
    ...workExperience.flatMap((job) => [
      `### ${job.role} — ${job.company}`,
      `${job.duration} · ${job.location}`,
      `Technologies: ${job.technologies.join(", ")}`,
      "",
      ...job.highlights.map((h) => `- ${h}`),
      "",
    ]),
    "## Projects",
    "",
    ...projects.flatMap((p) => [
      `### ${p.applicationName}`,
      `${p.projectType} · ${SITE_URL}/project/${p.id}${p.link ? ` · Live: ${p.link}` : ""}`,
      `Tech: ${p.techStacks.join(", ")}`,
      "",
      p.overview,
      "",
      ...[p.development, p.interactions, p.complexities, p.security, p.learning]
        .filter((section) => section?.docs)
        .map((section) => `${section!.docs}\n`),
    ]),
  ].join("\n");
