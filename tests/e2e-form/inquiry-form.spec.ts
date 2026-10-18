import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Pool } from "pg";
import { simpleParser } from "mailparser";

const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL });
test.afterAll(() => pool.end());
test.beforeEach(async () => {
  await pool.query("TRUNCATE inquiry_outbox, inquiries, inquiry_rate_limits RESTART IDENTITY CASCADE");
});

const sink = () =>
  readFileSync(join(tmpdir(), "octhera-smtp-sink.jsonl"), "utf8")
    .split("\n")
    .filter(Boolean)
    .map((l) => JSON.parse(l) as { from: string; to: string[]; raw: string });

async function fillValid(page: import("@playwright/test").Page) {
  await page.getByLabel("Your name").fill("Ada Operator");
  await page.getByLabel("Work email").fill("ada@example.com");
  await page.getByLabel("Company", { exact: true }).fill("Example Gaming");
  await page.getByLabel("What do you need?").fill("We want to add live betting.");
}

test("validation errors are summarised, focused and linked to fields; input is preserved", async ({ page }) => {
  await page.goto("/contact?request=walkthrough&product=sportsbook");
  await expect(page.getByLabel("What you're interested in")).toHaveValue("sportsbook");
  await page.getByLabel("Your name").fill("Ada");
  await page.getByRole("button", { name: "Send request" }).click();
  const summary = page.locator("form").getByRole("alert");
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("Enter your work email.");
  await expect(page.getByLabel("Work email")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Work email")).toHaveAttribute("aria-describedby", "email-error");
  await expect(page.getByLabel("Your name")).toHaveValue("Ada");
  expect(Number((await pool.query("SELECT count(*) FROM inquiries")).rows[0].count)).toBe(0);
});

test("valid request is stored, reference shown, and sales notified via the local sink", async ({ page }) => {
  await page.goto("/contact?request=walkthrough&product=sportsbook");
  await fillValid(page);
  await page.getByRole("button", { name: "Send request" }).dblclick();
  const status = page.getByRole("status").filter({ hasText: "Your request has been recorded" });
  await expect(status).toBeFocused();
  const reference = (await status.locator("strong").innerText()).trim();
  expect(reference).toMatch(/^OCT-\d{8}-[A-Z2-9]{4}$/);

  // Double click created exactly one inquiry and one job.
  const rows = (await pool.query("SELECT reference, request_type, product_interest FROM inquiries")).rows;
  expect(rows).toEqual([{ reference, request_type: "walkthrough", product_interest: "sportsbook" }]);

  await expect.poll(() => sink().length, { timeout: 10_000 }).toBe(1);
  const mail = sink()[0];
  expect(mail.to).toEqual(["sales@octhera.org"]);
  expect(mail.from).toBe("website@notify.test");
  const parsed = await simpleParser(mail.raw);
  expect(parsed.subject).toBe(`[Octhera enquiry ${reference}] Sportsbook — Example Gaming`);
  expect(parsed.replyTo?.text).toBe("ada@example.com");
  expect(parsed.from?.text).toBe('"Octhera Website" <website@notify.test>');
  expect(parsed.text).toContain("Request: Request a walkthrough");
  const job = (await pool.query("SELECT status FROM inquiry_outbox")).rows[0];
  expect(job.status).toBe("accepted");
});

test("server-side rejection is shown without losing input", async ({ page }) => {
  await page.goto("/contact");
  await fillValid(page);
  await page.getByLabel("What you're interested in").selectOption("casino-api");
  await page.getByLabel("Company website").fill("not a url");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Enter a website address");
  await expect(page.getByLabel("What do you need?")).toHaveValue("We want to add live betting.");
});

test("storage failure keeps the form filled and offers email instead of a fake success", async ({ page }) => {
  await page.route("/api/inquiries", (route) => route.fulfill({ status: 503, json: { error: "storage_unavailable" } }));
  await page.goto("/contact");
  await page.getByLabel("What you're interested in").selectOption("not-sure");
  await fillValid(page);
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("We couldn't record your request");
  await expect(page.locator("form").getByRole("alert")).toContainText("sales@octhera.org");
  await expect(page.getByText("Your request has been recorded")).toHaveCount(0);
  await expect(page.getByLabel("Your name")).toHaveValue("Ada Operator");
});

test("the API rejects other methods and cross-origin posts", async ({ request }) => {
  expect((await request.get("/api/inquiries")).status()).toBe(405);
  const cross = await request.post("/api/inquiries", {
    headers: { Origin: "https://evil.example", "Content-Type": "application/json" },
    data: {},
  });
  expect(cross.status()).toBe(403);
});
