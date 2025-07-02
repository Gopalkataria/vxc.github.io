import { clsx, type ClassValue } from "clsx";
import fs from "node:fs/promises";
import { twMerge } from "tailwind-merge";
import { GLOBAL } from "./variables";
import { parse } from "orga";
import { html } from "orga-html";

type MarkdownData<T extends object> = {
  frontmatter: T;
  file: string;
  url: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function renderOrgToHtml(orgPath) {
  const orgText = await fs.readFile(path.resolve(orgPath), "utf8");
  const tree = parse(orgText);
  const htmlOutput = html(tree);
  return htmlOutput;
}

/**
 * Parses Org file content and extracts frontmatter-like data from Org properties and keywords
 * @param content the raw org file content
 * @param filename the filename without extension
 * @returns parsed data with frontmatter, file, and url properties
 */
const parseOrgFile = <T extends object>(
  content: string,
  filename: string,
): MarkdownData<T> => {
  const lines = content.split("\n");
  const frontmatter: any = {};
  let contentStart = 0;

  // Parse #+KEYWORD: value lines at the top of the file
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Stop parsing keywords when we hit the first headline or non-keyword line
    if (line.startsWith("*") || (line && !line.startsWith("#+"))) {
      contentStart = i;
      break;
    }

    // Parse #+KEYWORD: value format
    const keywordMatch = line.match(/^#\+([A-Z_]+):\s*(.*)$/);
    if (keywordMatch) {
      const [, key, value] = keywordMatch;
      const lowercaseKey = key.toLowerCase();

      // Handle special cases and convert common Org keywords to frontmatter equivalents
      switch (lowercaseKey) {
        case "title":
          frontmatter.title = value;
          break;
        case "author":
          frontmatter.author = value;
          break;
        case "date":
          frontmatter.date = value;
          break;
        case "tags":
          frontmatter.tags = value.split(/\s+/).filter((tag) => tag.length > 0);
          break;
        case "category":
        case "categories":
          frontmatter.category = value;
          break;
        case "description":
        case "summary":
          frontmatter.description = value;
          break;
        case "draft":
          frontmatter.draft = value.toLowerCase() === "true" || value === "t";
          break;
        case "filetags":
          frontmatter.tags = value.split(":").filter((tag) => tag.length > 0);
          break;
        default:
          frontmatter[lowercaseKey] = value;
      }
    }
  }

  // Look for PROPERTIES drawer in the first headline if no top-level metadata found
  if (Object.keys(frontmatter).length === 0) {
    let inProperties = false;

    for (let i = contentStart; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === ":PROPERTIES:") {
        inProperties = true;
        continue;
      }

      if (line === ":END:") {
        inProperties = false;
        break;
      }

      if (inProperties && line.startsWith(":")) {
        const propMatch = line.match(/^:([^:]+):\s*(.*)$/);
        if (propMatch) {
          const [, key, value] = propMatch;
          const lowercaseKey = key.toLowerCase();
          frontmatter[lowercaseKey] = value;
        }
      }
    }
  }

  // Extract title from first headline if not found in keywords
  if (!frontmatter.title) {
    const firstHeadline = lines.find((line) => line.trim().startsWith("*"));
    if (firstHeadline) {
      const headlineMatch = firstHeadline.match(/^\*+\s*(.+)$/);
      if (headlineMatch) {
        frontmatter.title = headlineMatch[1].trim();
      }
    }
  }

  // Set default values if not found
  if (!frontmatter.title) {
    frontmatter.title = filename
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return {
    frontmatter: frontmatter as T,
    file: content,
    url: filename,
  };
};

/**
 * This function processes the content of a directory and returns an array of processed content.
 * It takes a content type, a function to process the content, and an optional directory.
 * If no directory is provided, it defaults to the current working directory.
 *
 * @param contentType the type of content to process
 * @param processFn the function to process the content
 * @param dir the directory to process the content from
 * @returns a promise that resolves to an array of processed content
 */
export const processContentInDir = async <T extends object, K>(
  contentType: "projects" | "blog" | "research",
  processFn: (data: MarkdownData<T>) => K,
  dir: string = process.cwd(),
) => {
  const files = await fs.readdir(dir + `/src/orgfiles/${contentType}`);
  const orgFiles = files
    .filter((file: string) => file.endsWith(".org"))
    .map((file) => file.split(".")[0]);

  const readOrgFileContent = async (file: string) => {
    try {
      // Try to use Vite's import.meta.glob first (for build-time processing)
      if (typeof import.meta !== "undefined" && import.meta.glob) {
        let modules: Record<string, () => Promise<string>> = {};

        // Use static glob patterns for each content type
        if (contentType === "projects") {
          modules = import.meta.glob(`/src/orgfiles/projects/*.org`, {
            as: "raw",
          });
        } else if (contentType === "research") {
          modules = import.meta.glob(`/src/orgfiles/research/*.org`, {
            as: "raw",
          });
        } else if (contentType === "blog") {
          modules = import.meta.glob(`/src/orgfiles/blog/*.org`, { as: "raw" });
        }

        const modulePath = `/src/orgfiles/${contentType}/${file}.org`;

        if (modules[modulePath]) {
          const content = await modules[modulePath]();
          const data = parseOrgFile<T>(content as string, file);
          return processFn(data);
        }
      }

      // Fallback to filesystem reading (for runtime processing)
      const filePath = `${dir}/src/orgfiles/${contentType}/${file}.org`;
      const content = await fs.readFile(filePath, "utf-8");
      const data = parseOrgFile<T>(content, file);
      return processFn(data);
    } catch (error) {
      console.error(`Error processing org file ${file}.org:`, error);

      // Return a minimal data structure to prevent breaking the process
      const fallbackData: MarkdownData<T> = {
        frontmatter: { title: file } as T,
        file: "",
        url: file,
      };
      return processFn(fallbackData);
    }
  };

  return await Promise.all(orgFiles.map(readOrgFileContent));
};

/**
 * Shortens a string by removing words at the end until it fits within a certain length.
 * @param content the content to shorten
 * @param maxLength the maximum length of the shortened content (default is 20)
 * @returns a shortened version of the content
 */
export const getShortDescription = (content: string, maxLength = 20) => {
  const splitByWord = content?.split(" ");
  const length = splitByWord ? splitByWord.length : 0;
  return length > maxLength
    ? splitByWord.slice(0, maxLength).join(" ") + "..."
    : content;
};

/**
 * Processes the date of an article and returns a string representing the processed date.
 * @param timestamp the timestamp to process
 * @returns a string representing the processed timestamp
 */
export const processArticleDate = (timestamp: string) => {
  // Handle Org-mode date formats like <2025-07-02 Tue> or [2025-07-02 Tue]
  const orgDateMatch = timestamp.match(/[<\[]?(\d{4}-\d{2}-\d{2})/);
  const dateString = orgDateMatch ? orgDateMatch[1] : timestamp;

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return timestamp; // Return original if can't parse
  }

  const monthSmall = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthSmall} ${day}, ${year}`;
};

/**
 * Generates a source URL for a content item. The URL is used in meta tags and social media cards.
 * @param sourceUrl the source URL of the content
 * @param contentType the type of content (either "projects" or "blog")
 * @returns a string representing the source URL with the appropriate domain
 */
export const generateSourceUrl = (
  sourceUrl: string,
  contentType: "projects" | "blog" | "research",
) => {
  return `${GLOBAL.rootUrl}/${contentType}/${sourceUrl}`;
};
