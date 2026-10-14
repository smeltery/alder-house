import { next } from "@vercel/functions";

export const config = {
  matcher: "/((?!_astro/|_vercel/|agent-content/|studio/|.*\\.).*)",
};

export default async function middleware(request: Request) {
  const acceptsMarkdown = (request.headers.get("accept") || "")
    .split(",")
    .some((entry) => {
      const [type, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((value) => value.trim().startsWith("q="));
      return (
        type === "text/markdown" &&
        (!quality || Number(quality.trim().slice(2)) > 0)
      );
    });
  if (!["GET", "HEAD"].includes(request.method) || !acceptsMarkdown)
    return next({ headers: { Vary: "Accept" } });
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "") || "/index";
  let response: Response;
  try {
    response = await fetch(new URL(`/agent-content${path}.md`, url.origin));
  } catch {
    response = new Response(null, { status: 503 });
  }
  const headers = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
  };
  if (response.ok)
    return new Response(request.method === "HEAD" ? null : response.body, {
      headers,
    });
  const missing = response.status === 404;
  return new Response(
    request.method === "HEAD"
      ? null
      : missing
        ? "# Page not found\n\nThis page does not exist. Browse the [site guide](/llms.txt), [sitemap](/sitemap.xml), or [portfolio](/work/).\n"
        : "# Content temporarily unavailable\n\nPlease try again or read the [site guide](/llms.txt).\n",
    {
      status: missing ? 404 : 503,
      headers,
    },
  );
}
