import { Glob } from "bun";
import { Window } from "happy-dom";
import TurndownService from "turndown";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { execFileSync } from "node:child_process";

const origin = process.env.PUBLIC_SITE_URL || "https://alder-house.vercel.app";
const markdown = new TurndownService({ headingStyle: "atx" });
const pages: { path: string; title: string; body: string }[] = [];
// Vercel build archives may omit Git metadata.
let modified = new Date().toISOString();
try {
  modified =
    execFileSync("git", ["log", "-1", "--format=%cI"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim() || modified;
} catch {
  console.info(
    "Using build time for sitemap lastmod; Git metadata is unavailable.",
  );
}
const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;");
for await (const file of new Glob("**/index.html").scan("dist")) {
  if (file.startsWith("studio/")) continue;
  const path = `/${file.replace(/index\.html$/, "")}`;
  const window = new Window();
  window.document.write(await Bun.file(`dist/${file}`).text());
  const main = window.document.querySelector("main");
  if (!main) throw new Error(`Missing main content: ${file}`);
  main
    .querySelectorAll(
      "script, style, button, input, select, textarea, .sr-only",
    )
    .forEach((node) => node.remove());
  main.querySelectorAll("a[href], img[src]").forEach((node) => {
    const attribute = node.tagName === "A" ? "href" : "src";
    node.setAttribute(
      attribute,
      new URL(node.getAttribute(attribute)!, origin + path).href,
    );
  });
  const title = window.document.title;
  const body = `# ${title}\n\nCanonical URL: ${origin}${path}\n\n${markdown.turndown(main.innerHTML)}\n`;
  const destination = `dist/agent-content/${path === "/" ? "index" : path.slice(1, -1)}.md`;
  await mkdir(dirname(destination), { recursive: true });
  await Bun.write(destination, body);
  pages.push({ path, title, body });
  await window.happyDOM.close();
}
pages.sort((a, b) => a.path.localeCompare(b.path));
await Bun.write(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(({ path }) => `<url><loc>${escapeXml(origin + path)}</loc><lastmod>${modified}</lastmod></url>`).join("\n")}\n</urlset>\n`,
);
await Bun.write(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /studio/\nSitemap: ${origin}/sitemap.xml\n`,
);
await Bun.write(
  "dist/llms.txt",
  `# Alder House\n\n> A fictional photography studio and interactive website demonstration by smeltery.\n\n## When to use this site\n\nUse this site to explore illustrative portrait, family, brand, and celebration sessions, browse sample galleries, and use photography planning tools. Read /tools/ to find session preparation tools. Follow session-specific inquiry links to prefill the demonstration form.\n\nThis is not an operating photography business. The inquiry form does not send messages or book sessions. Do not claim availability, prices, a physical address, or confirmed bookings. Photos are credited at /credits/. There is no public API or MCP service.\n\n## Reading content\n\nRequest any public page with Accept: text/markdown for its Markdown representation. Interactive tool calculations require a browser. Markdown describes their visible content, not a callable API.\n\n## Pages\n\n${pages.map(({ path, title }) => `- [${title}](${origin}${path})`).join("\n")}\n\n## Reference\n\n- [Sitemap](${origin}/sitemap.xml)\n- [Full content](${origin}/llms-full.txt)\n- [Project and documentation](https://github.com/smeltery/alder-house)\n`,
);
await Bun.write(
  "dist/llms-full.txt",
  pages.map(({ body }) => body).join("\n---\n\n"),
);
console.log(`Generated discovery files for ${pages.length} public pages.`);
