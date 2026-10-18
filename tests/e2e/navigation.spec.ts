import { test, expect } from "@playwright/test";

test.describe("mobile menu", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) >= 1024, "mobile only");

  test("closed menu links are not focusable", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.focus();
    await page.keyboard.press("Tab");
    // The next focus target must be visible page content, never a hidden nav link.
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
    expect(await focused.evaluate((el) => !!el.closest("header nav"))).toBe(false);
  });

  test("Escape closes the menu and restores focus to the toggle", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Menu" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    const menu = page.locator("header nav[aria-label='Main']:visible");
    await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    const closedToggle = page.getByRole("button", { name: "Menu" });
    await expect(closedToggle).toHaveAttribute("aria-expanded", "false");
    await expect(closedToggle).toBeFocused();
    await expect(page.locator("header nav[aria-label='Main']:visible")).toHaveCount(0);
  });

  test("background content is inert while the menu is open", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator("#main-content")).toHaveAttribute("inert", "");
    // Tab through every menu item; focus never leaves the header.
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press("Tab");
      const inHeaderOrBody = await page.evaluate(
        () => !document.activeElement || document.activeElement === document.body || !!document.activeElement.closest("header")
      );
      expect(inHeaderOrBody).toBe(true);
    }
  });

  test("selecting a link navigates and closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    await page.locator("header nav[aria-label='Main']:visible").getByRole("link", { name: "Pricing" }).click();
    await expect(page).toHaveURL(/\/pricing$/);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#main-content")).not.toHaveAttribute("inert", "");
  });

  test("open menu stays reachable at a short viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 420 });
    await page.goto("/");
    await page.getByRole("button", { name: "Menu" }).click();
    const lastLink = page.locator("header nav[aria-label='Main']:visible").getByRole("link", { name: "Talk to sales" });
    await lastLink.scrollIntoViewIfNeeded();
    await expect(lastLink).toBeInViewport();
  });
});

test.describe("desktop dropdowns", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 1024, "desktop only");

  test("keyboard opens a group, Escape closes it and returns focus", async ({ page }) => {
    await page.goto("/");
    const products = page.getByRole("button", { name: "Products" });
    await products.focus();
    await page.keyboard.press("Enter");
    await expect(products).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await products.getAttribute("aria-controls")}`.replace(/:/g, "\\:"));
    await expect(panel.getByRole("link", { name: /Sportsbook/ })).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(panel.getByRole("link").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(products).toHaveAttribute("aria-expanded", "false");
    await expect(products).toBeFocused();
  });

  test("closed dropdown links are not focusable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Products" }).focus();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Solutions" })).toBeFocused();
  });

  test("current route is marked", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("header nav[aria-label='Main']").getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });
});

test("no document-wide horizontal overflow at 390, 768 and 1440", async ({ browser, request, viewport }) => {
  test.skip((viewport?.width ?? 0) < 1024, "runs once; creates its own contexts");
  const xml = await (await request.get("/sitemap.xml")).text();
  const paths = [...xml.matchAll(/<loc>https:\/\/octhera\.org(.*?)<\/loc>/g)].map((m) => m[1] || "/");
  paths.push("/providers/evolution", "/contact?request=walkthrough&product=sportsbook");
  for (const width of [390, 768, 1440]) {
    // A plain (non-mobile-emulated) context: mobile emulation can widen the
    // layout viewport and hide overflow.
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    for (const path of paths) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${width}px ${path}`).toBeLessThanOrEqual(0);
    }
    await context.close();
  }
});
