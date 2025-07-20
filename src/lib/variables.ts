import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Absolute path to the Markdown config file
const configPath = path.resolve(process.cwd(), "src/pages/config.md");

// Read and parse frontmatter
const fileContent = fs.readFileSync(configPath, "utf-8");
const { data } = matter(fileContent);

// Exported objects, matching your original variable names
export const GLOBAL = {
  username: data.username,
  rootUrl: data.rootUrl,
  email: data.email,
  longDescription: data.longDescription,
  shortDescription: data.shortDescription,
  administrativeEmail: data.administrativeEmail,
  executiveAssistantEmail: data.executiveAssistantEmail,
  githubProfile: data.githubProfile,
  twitterProfile: data.twitterProfile,
  publicationsName: data.publicationsName,
  articlesName: data.articlesName,
  projectsName: data.projectsName,
  viewAll: data.viewAll,
  noArticles: data.noArticles,
  noProjects: data.noProjects,
  blogTitle: data.blogTitle,
  blogShortDescription: data.blogShortDescription,
  blogLongDescription: data.blogLongDescription,
  projectTitle: data.projectTitle,
  projectShortDescription: data.projectShortDescription,
  projectLongDescription: data.projectLongDescription,
  profileImage: data.profileImage,
  officeHours: data.officeHours,
  poemName: data.poemName,
  poemDescription: data.poemDescription,
  menu: data.menu,
};

export const bibSections = data.bibSections;
