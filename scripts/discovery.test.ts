import { afterEach, expect, test } from "bun:test";
import middleware from "../middleware";

const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
});
const request = (accept: string, path = "/", method = "GET") =>
  new Request(`https://alder-house.vercel.app${path}`, {
    headers: { accept },
    method,
  });

test("HTML and zero-quality Markdown retain the HTML route", async () => {
  for (const accept of ["text/html", "text/markdown;q=0, text/html"]) {
    const response = await middleware(request(accept));
    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(response.headers.get("vary")).toBe("Accept");
  }
});
test("Markdown serves the matching generated page", async () => {
  globalThis.fetch = (async (url: URL) => {
    expect(url.pathname).toBe("/agent-content/work/coastal.md");
    return new Response("# Coastal story\n\nA family session.");
  }) as unknown as typeof fetch;
  const response = await middleware(request("text/markdown", "/work/coastal/"));
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("text/markdown");
  expect(response.headers.get("vary")).toBe("Accept");
  expect(await response.text()).toContain("Coastal story");
});
test("missing Markdown pages have a useful 404 and HEAD has no body", async () => {
  globalThis.fetch = (async () =>
    new Response(null, { status: 404 })) as unknown as typeof fetch;
  const response = await middleware(request("text/markdown", "/missing/"));
  expect(response.status).toBe(404);
  expect(await response.text()).toContain("/sitemap.xml");
  expect(
    await (
      await middleware(request("text/markdown", "/missing/", "HEAD"))
    ).text(),
  ).toBe("");
});
test("upstream errors are not reported as missing pages", async () => {
  globalThis.fetch = (async () =>
    new Response(null, { status: 500 })) as unknown as typeof fetch;
  expect((await middleware(request("text/markdown"))).status).toBe(503);
});
test("every sitemap page has generated readable Markdown", async () => {
  const sitemap = await Bun.file("dist/sitemap.xml").text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]),
  );
  expect(urls.length).toBeGreaterThan(20);
  for (const url of urls) {
    const path = url.pathname === "/" ? "index" : url.pathname.slice(1, -1);
    const body = await Bun.file(`dist/agent-content/${path}.md`).text();
    expect(body).toContain(`Canonical URL: ${url.href}`);
    expect(body.length).toBeGreaterThan(100);
  }
});
