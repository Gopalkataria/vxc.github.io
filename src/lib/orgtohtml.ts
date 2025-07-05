import { parse } from "orga";
import { readFile } from "fs/promises";

export async function orgtohtml(orgfilepath: string) {
  try {
    const orgContent = await readFile(orgfilepath, "utf-8");
    const ast = parse(orgContent);
    const htmlContent = astToHtml(ast);
    return htmlContent;
  } catch (error) {
    throw new Error(`Failed to convert org file: ${error.message}`);
  }
}

export const renderOrgToHtml = orgtohtml;

function astToHtml(node: any): string {
  if (!node) return "";

  switch (node.type) {
    case "root":
      return `<div class="bg-background text-foreground dark:bg-background dark:text-foreground">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</div>`;

    case "section":
      return `<section class="mb-8">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</section>`;

    case "headline":
      const level = Math.min(node.level || 1, 6);
      const headingClasses = {
        1: "not-prose pt-8 text-5xl font-display -zag-text font-bold mb-8 tracking-tight leading-tight",
        2: "not-prose pt-6 text-4xl font-display -zag-text font-semibold mb-6 tracking-tight leading-snug",
        3: "not-prose pt-5 text-3xl font-display -zag-text font-semibold mb-4 tracking-normal",
        4: "not-prose pt-4 text-2xl font-display -zag-text font-semibold mb-3",
        5: "not-prose pt-3 text-xl font-display -zag-text font-medium mb-2",
        6: "not-prose pt-2 text-lg font-display -zag-text font-medium mb-2 text-opacity-90",
      };
      const headingContent =
        node.children?.map((child: any) => astToHtml(child)).join("") ||
        escapeHtml(node.title || "") ||
        escapeHtml(node.value || "");
      return `<h${level} class="${headingClasses[level]}">${headingContent}</h${level}>`;

    case "paragraph":
      return `<p class="mb-4 zag-text leading-relaxed">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</p>`;

    case "text":
      return escapeHtml(node.value || "");

    case "bold":
      return `<strong class="font-semibold zag-text">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</strong>`;

    case "italic":
      return `<em class="italic zag-text">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</em>`;

    case "underline":
      return `<u class="underline zag-text">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</u>`;

    case "code":
      return `<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">${escapeHtml(
        node.value || "",
      )}</code>`;

    case "verbatim":
      return `<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">${escapeHtml(
        node.value || "",
      )}</code>`;

    case "link":
      const url = node.uri || "#";
      const linkText =
        node.children?.map((child: any) => astToHtml(child)).join("") ||
        node.description ||
        url;
      return `<a href="${escapeHtml(url)}" class="text-primary hover:text-underline underline">${linkText}</a>`;

    case "list":
      const listType = node.ordered ? "ol" : "ul";
      const listClass = node.ordered
        ? "zag-list not-prose list-decimal list-outside pl-5 mb-4 space-y-2 zag-text"
        : "zag-list not-prose list-disc list-outside pl-5 mb-4 space-y-2 zag-text";
      return `<${listType} class="${listClass}" style="list-style-type: ${node.ordered ? "decimal" : "disc"}">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</${listType}>`;

    case "listItem":
      return `<li class="pl-2 zag-text zag-list" style="display: list-item"> ${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</li>`;

    case "block":
      return handleBlock(node);

    case "table":
      return `<div class="overflow-x-auto mb-4"><table class="min-w-full border-collapse border border-border">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</table></div>`;

    case "tableRow":
      return `<tr class="border-b border-border">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</tr>`;

    case "tableCell":
      return `<td class="px-4 py-2 border border-border zag-text">${
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      }</td>`;

    case "horizontalRule":
      return '<hr class="my-8 border-t border-border">';

    case "newline":
      return "<br>";

    case "keyword":
    case "planning":
    case "drawer":
      return "";

    default:
      if (node.children) {
        return node.children.map((child: any) => astToHtml(child)).join("");
      }
      return node.value ? escapeHtml(node.value) : "";
  }
}

function handleBlock(node: any): string {
  const blockType = node.name?.toLowerCase();
  const content =
    node.children?.map((child: any) => astToHtml(child)).join("") ||
    node.value ||
    "";

  switch (blockType) {
    case "src":
      const language = node.params?.[0] || "text";
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm font-mono text-foreground" data-language="${escapeHtml(language)}">${escapeHtml(content)}</code></pre>`;

    case "example":
      return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono text-foreground">${escapeHtml(content)}</pre>`;

    case "quote":
      return `<blockquote class="border-l-4 border-primary pl-4 py-2 mb-4 italic bg-muted zag-text">${content}</blockquote>`;

    case "verse":
      return `<div class="whitespace-pre-line italic zag-text mb-4 pl-4 border-l-2 border-border">${escapeHtml(content)}</div>`;

    case "center":
      return `<div class="text-center mb-4 zag-text">${content}</div>`;

    default:
      return `<div class="mb-4 zag-text">${content}</div>`;
  }
}

function escapeHtml(text: string): string {
  if (typeof text !== "string") return "";

  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
