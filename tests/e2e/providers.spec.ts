import { test, expect } from "@playwright/test";

test("category filters expose pressed state and announce results", async ({ page }) => {
  await page.goto("/providers");
  const status = page.getByRole("status");
  await expect(status).toHaveText(/^50 entries$/);

  const live = page.getByRole("button", { name: "Live Casino" });
  await live.click();
  await expect(live).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "All", exact: true })).toHaveAttribute("aria-pressed", "false");
  await expect(status).toHaveText("11 entries in Live Casino");

  await page.getByLabel("Search the directory").fill("zzzz-no-match");
  await expect(status).toHaveText(/^0 entries/);
  await expect(page.getByText("No directory entries match these filters.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(status).toHaveText(/^50 entries$/);
  await expect(page.getByLabel("Search the directory")).toHaveValue("");
});

test("search matches names", async ({ page }) => {
  await page.goto("/providers");
  await page.getByLabel("Search the directory").fill("Evolution");
  await expect(page.getByRole("status")).toHaveText("2 entries matching “Evolution”");
});

test("unknown game counts are not rendered", async ({ page }) => {
  await page.goto("/providers");
  await expect(page.getByText("—", { exact: true })).toHaveCount(0);
  await page.goto("/providers/evolution");
  await expect(page.getByText("—", { exact: true })).toHaveCount(0);
});
