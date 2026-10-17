import { test, expect, type APIRequestContext } from "@playwright/test";

test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "route checks run once");

const origin = "https://octhera.org";
const toPath = (loc: string) => loc.replace(origin, "") || "/";

async function html(request: APIRequestContext, path: string) {
  const res = await request.get(path, { maxRedirects: 0 });
  return { status: res.status(), body: await res.text() };
}

const meta = (body: string, re: RegExp) => body.match(re)?.[1];

test("robots.txt points at the octhera.org sitemap", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://octhera.org/sitemap.xml");
  expect(robots).toMatch(/Allow: \//);
});

test("every sitemap URL is 200, self-canonical, indexable, with one H1 and unique metadata", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  expect(locs).toHaveLength(18);
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const loc of locs) {
    expect(loc.startsWith(origin)).toBe(true);
    const { status, body } = await html(request, toPath(loc));
    expect(status, loc).toBe(200);
    expect(meta(body, /<link rel="canonical" href="([^"]+)"/), loc).toBe(loc);
    expect(meta(body, /<meta name="robots" content="([^"]+)"/) ?? "", loc).not.toContain("noindex");
    expect(body.match(/<h1[\s>]/g)?.length, `${loc} h1 count`).toBe(1);
    const title = meta(body, /<title>(.*?)<\/title>/)!;
    const description = meta(body, /<meta name="description" content="([^"]*)"/)!;
    expect(titles.has(title), `duplicate title ${title}`).toBe(false);
    expect(descriptions.has(description), `duplicate description on ${loc}`).toBe(false);
    titles.add(title);
    descriptions.add(description);
  }
});

test("provider detail pages stay noindex,follow and out of the sitemap", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).not.toContain("/providers/");
  for (const slug of ["evolution", "pragmatic-play", "spribe"]) {
    const { status, body } = await html(request, `/providers/${slug}`);
    expect(status).toBe(200);
    expect(meta(body, /<meta name="robots" content="([^"]+)"/)).toBe("noindex, follow");
  }
});

test("missing routes return 404 with noindex; no login or legal pages are faked", async ({ request }) => {
  for (const path of ["/login", "/privacy", "/terms", "/api/v1/games/launch", "/products/nope", "/providers/nope"]) {
    const { status, body } = await html(request, path);
    expect(status, path).toBe(404);
    expect(body).toContain('<meta name="robots" content="noindex"/>');
  }
});

test("www redirects permanently to the apex, preserving path and query", async ({ request }) => {
  const res = await request.get("/pricing?utm_source=x", { headers: { host: "www.octhera.org" }, maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toBe("https://octhera.org/pricing?utm_source=x");
});

test("internal links and in-page anchors resolve on every sitemap page", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const pages = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => toPath(m[1]));
  const cache = new Map<string, { status: number; body: string }>();
  const load = async (p: string) => {
    if (!cache.has(p)) cache.set(p, await html(request, p));
    return cache.get(p)!;
  };
  for (const page of pages) {
    const { body } = await load(page);
    const hrefs = [...body.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));
    for (const href of hrefs) {
      if (/^(https?:|mailto:)/.test(href) || href.startsWith("/_next") || href.startsWith("/icon") || href.startsWith("/apple-icon")) continue;
      const url = new URL(href, `http://x${page}`);
      const target = await load(url.pathname);
      expect(target.status, `${page} -> ${href}`).toBe(200);
      if (url.hash) {
        const id = decodeURIComponent(url.hash.slice(1));
        expect(target.body.includes(`id="${id}"`), `${page} -> ${href} anchor`).toBe(true);
      }
    }
  }
});

test("no unknown game count dash and no unsupported quasi-metrics in server HTML", async ({ request }) => {
  for (const path of ["/", "/platform", "/providers", "/providers/evolution"]) {
    const { body } = await html(request, path);
    expect(body, path).not.toMatch(/Live network|>Uptime<|>Latency<|>Coverage<|200\+|15,000\+/);
  }
});

test("documentation examples labelled JSON are valid JSON in the rendered page", async ({ page }) => {
  await page.goto("/docs");
  const blocks = page.locator("figure", { has: page.locator("figcaption", { hasText: "(JSON)" }) }).locator("code");
  const count = await blocks.count();
  expect(count).toBeGreaterThanOrEqual(4);
  for (let i = 0; i < count; i++) {
    const text = await blocks.nth(i).innerText();
    expect(() => JSON.parse(text)).not.toThrow();
  }
});
