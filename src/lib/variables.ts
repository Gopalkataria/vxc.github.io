// Parse org file properties from content string
function parseOrgProperties(content: string): Record<string, string> {
  const properties: Record<string, string> = {};
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^#\+(\w+):\s*(.*)$/);
    if (match) {
      const [, key, value] = match;
      properties[key] = value.trim();
    }
  }

  return properties;
}

// Import org file content as raw text (Astro/Vite will handle this at build time)
import orgContent from "../orgfiles/main.org?raw";

// Parse the org file content
const props = parseOrgProperties(orgContent);

// Helper function to get property or return undefined for null values
const getProp = (key: string, defaultValue: any = undefined) => {
  const value = props[key];
  return value === "null" ? null : value || defaultValue;
};

// Export configuration in original format
export const GLOBAL = {
  // Site metadata
  username: getProp("USERNAME"),
  rootUrl: getProp("ROOT_URL"),
  email: getProp("EMAIL"),
  longDescription: [
    getProp("LONG_DESCRIPTION_1"),
    getProp("LONG_DESCRIPTION_2"),
  ].filter(Boolean),
  shortDescription: getProp("SHORT_DESCRIPTION"),

  // Assistive staff E-mail ids
  administrativeEmail: getProp("ADMINISTRATIVE_EMAIL"),
  executiveAssistantEmail: getProp("EXECUTIVE_ASSISTANT_EMAIL"),

  // Social media links
  githubProfile: getProp("GITHUB_PROFILE"),
  twitterProfile: getProp("TWITTER_PROFILE"),

  // Publications related details
  publicationsName: getProp("PUBLICATIONS_NAME"),

  // Common text names used throughout the site
  articlesName: getProp("ARTICLES_NAME"),
  projectsName: getProp("PROJECTS_NAME"),
  viewAll: getProp("VIEW_ALL"),

  // Common descriptions used throughout the site
  noArticles: getProp("NO_ARTICLES"),
  noProjects: getProp("NO_PROJECTS"),

  // Blog metadata
  blogTitle: getProp("BLOG_TITLE"),
  blogShortDescription: getProp("BLOG_SHORT_DESCRIPTION"),
  blogLongDescription: getProp("BLOG_LONG_DESCRIPTION"),

  // Project metadata
  projectTitle: getProp("PROJECT_TITLE"),
  projectShortDescription: getProp("PROJECT_SHORT_DESCRIPTION"),
  projectLongDescription: getProp("PROJECT_LONG_DESCRIPTION"),

  // Profile
  profileImage: getProp("PROFILE_IMAGE"),
  officeHours: getProp("OFFICE_HOURS"),

  // Poem Controls
  poemName: getProp("POEM_NAME"),
  poemDescription: getProp("POEM_DESCRIPTION"),

  // Menu items
  menu: {
    home: getProp("MENU_HOME"),
    projects: getProp("MENU_PROJECTS"),
    research: getProp("MENU_RESEARCH"),
    teaching: getProp("MENU_TEACHING"),
    biography: getProp("MENU_BIOGRAPHY"),
    bibliography: getProp("MENU_BIBLIOGRAPHY"),
  },
};

export const bibSections = [
  {
    title: getProp("BIB_JOURNAL_TITLE"),
    file: getProp("BIB_JOURNAL_FILE"),
    description: getProp("BIB_JOURNAL_DESC"),
  },
  {
    title: getProp("BIB_CONF_TITLE"),
    file: getProp("BIB_CONF_FILE"),
    description: getProp("BIB_CONF_DESC"),
  },
  {
    title: getProp("BIB_TR_TITLE"),
    file: getProp("BIB_TR_FILE"),
    description: getProp("BIB_TR_DESC"),
  },
  {
    title: getProp("BIB_SUPERVISION_TITLE"),
    file: getProp("BIB_SUPERVISION_FILE"),
    description: getProp("BIB_SUPERVISION_DESC"),
  },
  {
    title: getProp("BIB_TALKS_TITLE"),
    file: getProp("BIB_TALKS_FILE"),
    description: getProp("BIB_TALKS_DESC"),
  },
  {
    title: getProp("BIB_POSTERS_TITLE"),
    file: getProp("BIB_POSTERS_FILE"),
    description: getProp("BIB_POSTERS_DESC"),
  },
  {
    title: getProp("BIB_PATENTS_TITLE"),
    file: getProp("BIB_PATENTS_FILE"),
    description: getProp("BIB_PATENTS_DESC"),
  },
  {
    title: getProp("BIB_WIP_TITLE"),
    file: getProp("BIB_WIP_FILE"),
    description: getProp("BIB_WIP_DESC"),
  },
];
