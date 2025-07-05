import { parse } from "orga";
import { readFile } from "fs/promises";
import { resolve, join } from "path";

export async function orgtohtml(orgfilepath: string) {
  try {
    const orgContent = await readFile(orgfilepath, "utf-8");

    // Parse the org content
    const ast = parse(orgContent);

    // Debug: log the AST structure (remove this in production)
    console.log("AST:", JSON.stringify(ast, null, 2));

    // Convert AST to HTML
    const htmlContent = astToHtml(ast);

    return htmlContent;
  } catch (error) {
    throw new Error(`Failed to convert org file: ${error.message}`);
  }
}

// Export with the name you were using
export const renderOrgToHtml = orgtohtml;

function astToHtml(node: any): string {
  if (!node) return "";

  // Handle different node types
  switch (node.type) {
    case "root":
      return (
        node.children?.map((child: any) => astToHtml(child)).join("") || ""
      );

    case "section":
      return `<section class="mb-8">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</section>`;

    case "headline":
      const level = Math.min(node.level || 1, 6);
      const headingClasses = {
        1: "text-4xl font-bold mb-6 text-gray-900",
        2: "text-3xl font-semibold mb-5 text-gray-800",
        3: "text-2xl font-medium mb-4 text-gray-700",
        4: "text-xl font-medium mb-3 text-gray-700",
        5: "text-lg font-medium mb-2 text-gray-600",
        6: "text-base font-medium mb-2 text-gray-600",
      };

      // Get heading content from children or title property
      const headingContent =
        node.children?.map((child: any) => astToHtml(child)).join("") ||
        escapeHtml(node.title || "") ||
        escapeHtml(node.value || "");

      return `<h${level} class="${headingClasses[level]}">${headingContent}</h${level}>`;

    case "paragraph":
      return `<p class="mb-4 text-gray-700 leading-relaxed">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</p>`;

    case "text":
      return escapeHtml(node.value || "");

    case "bold":
      return `<strong class="font-semibold text-gray-900">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</strong>`;

    case "italic":
      return `<em class="italic text-gray-800">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</em>`;

    case "underline":
      return `<u class="underline">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</u>`;

    case "code":
      return `<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">${escapeHtml(node.value || "")}</code>`;

    case "verbatim":
      return `<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">${escapeHtml(node.value || "")}</code>`;

    case "link":
      const url = node.uri || "#";
      const linkText =
        node.children?.map((child: any) => astToHtml(child)).join("") ||
        node.description ||
        url;
      return `<a href="${escapeHtml(url)}" class="text-blue-600 hover:text-blue-800 underline">${linkText}</a>`;

    case "list":
      const listType = node.ordered ? "ol" : "ul";
      const listClass = node.ordered
        ? "list-decimal list-inside mb-4 space-y-2"
        : "list-disc list-inside mb-4 space-y-2";
      return `<${listType} class="${listClass}"> ${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</${listType}>`;

    case "listItem":
      return `<li class="text-gray-700">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</li>`;

    case "block":
      return handleBlock(node);

    case "table":
      return `<div class="overflow-x-auto mb-4"><table class="min-w-full border-collapse border border-gray-300">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</table></div>`;

    case "tableRow":
      return `<tr class="border-b border-gray-200">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</tr>`;

    case "tableCell":
      const cellClass = "px-4 py-2 border border-gray-300 text-gray-700";
      return `<td class="${cellClass}">${node.children?.map((child: any) => astToHtml(child)).join("") || ""}</td>`;

    case "horizontalRule":
      return '<hr class="my-8 border-t border-gray-300">';

    case "newline":
      return "<br>";

    case "keyword":
      // Skip org-mode metadata keywords like #+TITLE:, #+DESCRIPTION:, etc.
      return "";

    case "planning":
      // Skip org-mode planning elements
      return "";

    case "drawer":
      // Skip org-mode drawers
      return "";

    default:
      // Handle unknown nodes by processing their children
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
      return `<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4"><code class="text-sm font-mono text-gray-800" data-language="${escapeHtml(language)}">${escapeHtml(content)}</code></pre>`;

    case "example":
      return `<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4 text-sm font-mono text-gray-800">${escapeHtml(content)}</pre>`;

    case "quote":
      return `<blockquote class="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-700 bg-blue-50">${content}</blockquote>`;

    case "verse":
      return `<div class="whitespace-pre-line italic text-gray-700 mb-4 pl-4 border-l-2 border-gray-300">${escapeHtml(content)}</div>`;

    case "center":
      return `<div class="text-center mb-4">${content}</div>`;

    default:
      return `<div class="mb-4">${content}</div>`;
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
