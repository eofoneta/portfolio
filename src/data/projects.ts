import type { ProjectsDescriptionProps } from "../App";
import ProjectItems from "./projectItems.json";

export type ProjectCategory = "Professional" | "Personal";

export const projects = ProjectItems as ProjectsDescriptionProps[];

export const projectCategories: ProjectCategory[] = ["Professional", "Personal"];

// projectType is formatted as "<Category> Work · <Organization or descriptor>"
export const getProjectMeta = (project: ProjectsDescriptionProps) => {
  const [kind = "", organization = ""] = project.projectType
    .split("·")
    .map((part) => part.trim());

  const category: ProjectCategory = kind.toLowerCase().startsWith("personal")
    ? "Personal"
    : "Professional";

  return { category, organization };
};
