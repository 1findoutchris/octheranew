import { test, expect } from "@playwright/test";

const journeys = [
  { route: "View casino aggregator", product: "/products/casino-aggregator", h1: /Casino game aggregator/, interest: "Casino Aggregator" },
  { route: "View sportsbook", product: "/products/sportsbook", h1: /B2B sportsbook platform/, interest: "Sportsbook" },
];

for (const j of journeys) {
  test(`buyer route "${j.route}" reaches the product and contextual contact`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: j.route }).click();
    await expect(page).toHaveURL(new RegExp(`${j.product}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(j.h1);
    await page.getByRole("link", { name: "Request a walkthrough" }).first().click();
    await expect(page).toHaveURL(/\/contact\?request=walkthrough&product=/);
    await expect(page.getByText(`Request a walkthrough · ${j.interest}`)).toBeVisible();
    const mail = page.getByRole("link", { name: "Email sales" });
    await expect(mail).toHaveAttribute(
      "href",
      `mailto:sales@octhera.org?subject=${encodeURIComponent(`Octhera enquiry: Request a walkthrough - ${j.interest}`)}`
    );
  });
}

test("launch-a-brand route reaches the package comparison", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Compare white label and turnkey" }).click();
  await expect(page).toHaveURL(/\/products#packages$/);
  await expect(page.getByRole("heading", { name: "White Label or Turnkey?" })).toBeInViewport();
});

test("pricing and provider CTAs carry allowlisted context", async ({ page }) => {
  await page.goto("/pricing");
  await page.locator("#turnkey").getByRole("link", { name: "Request a quote" }).click();
  await expect(page.getByText("Request a quote · Turnkey plan")).toBeVisible();

  await page.goto("/providers/evolution");
  await page.getByRole("link", { name: "Ask about Evolution" }).click();
  await expect(page.getByText("Ask about provider access · Evolution (provider directory)")).toBeVisible();
});

test("unknown context values are dropped", async ({ page }) => {
  await page.goto("/contact?request=<script>&product=evil&plan=../../x&provider=nope");
  await expect(page.getByText("Your enquiry")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Email sales" })).toHaveAttribute(
    "href",
    `mailto:sales@octhera.org?subject=${encodeURIComponent("Octhera enquiry: Talk to sales")}`
  );
});

test("Telegram and email remain available on contact", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: "Message our team on Telegram" }).first()).toHaveAttribute(
    "href",
    "https://t.me/Noah_Octhera"
  );
  await expect(page.getByRole("link", { name: "sales@octhera.org" }).first()).toHaveAttribute("href", "mailto:sales@octhera.org");
});

test("illustrations are labelled and no live or performance claims remain", async ({ page }) => {
  for (const path of ["/", "/platform"]) {
    await page.goto(path);
    await expect(page.getByText(/^Illustration/).first()).toBeVisible();
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/Live network|Uptime|Latency|Coverage/);
    expect(text).not.toMatch(/^Live$/m);
  }
});

test("inquiry form and API are off unless fully configured", async ({ page, request }) => {
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: "Send request" })).toHaveCount(0);
  const res = await request.post("/api/inquiries", { data: {}, headers: { Origin: "https://octhera.org" } });
  expect(res.status()).toBe(404);
});
