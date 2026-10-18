import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Automated WCAG 2.x A/AA checks. They complement, not replace, manual
// keyboard and screen-reader review.
const pages = [
  "/",
  "/products",
  "/products/sportsbook",
  "/products/casino-aggregator",
  "/products/casino-api",
  "/products/white-label",
  "/products/turnkey-casino",
  "/products/back-office",
  "/pricing",
  "/providers",
  "/providers/evolution",
  "/docs",
  "/about",
  "/contact?request=walkthrough&product=sportsbook",
  "/platform",
  "/solutions",
  "/game-aggregation",
];

for (const path of pages) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} × ${v.nodes[0]?.target.join(" ")}`);
    expect(summary, summary.join("\n")).toEqual([]);
  });
}

test("axe: mobile menu open", async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) >= 1024, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  const results = await new AxeBuilder({ page }).include("header").withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});

test("axe: desktop dropdown open", async ({ page, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, "desktop only");
  await page.goto("/");
  await page.getByRole("button", { name: "Products" }).click();
  const results = await new AxeBuilder({ page }).include("header").withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
