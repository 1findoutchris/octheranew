import { defineConfig, devices } from "@playwright/test";

/**
 * Inquiry form end-to-end suite. Builds an isolated copy of the site with the
 * form enabled, backed by a local PostgreSQL database (TEST_DATABASE_URL) and
 * a local SMTP sink. Nothing is sent to real mailboxes.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
const port = 3300;
const env = {
  NEXT_DIST_DIR: ".next-form-test",
  INQUIRY_FORM_ENABLED: "true",
  DATABASE_URL: process.env.TEST_DATABASE_URL ?? "",
  INQUIRY_MAIL_FROM: "Octhera Website <website@notify.test>",
  INQUIRY_PRIVACY_URL: "/privacy-review-draft",
  INQUIRY_RATE_LIMIT_SALT: "e2e",
  INQUIRY_ALLOWED_ORIGINS: `http://localhost:${port}`,
  SMTP_HOST: "127.0.0.1",
  SMTP_PORT: "2526",
  SMTP_SECURE: "false",
  SMTP_USER: "test",
  SMTP_PASS: "test",
};

export default defineConfig({
  testDir: "tests/e2e-form",
  timeout: 30_000,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${port}`, launchOptions: executablePath ? { executablePath } : undefined },
  webServer: [
    { command: "node tests/e2e-form/smtp-sink.mjs", port: 2526, reuseExistingServer: false },
    {
      command: `npx tsx scripts/inquiries.ts migrate && npx next build && npx next start -p ${port}`,
      port,
      timeout: 240_000,
      reuseExistingServer: false,
      env,
    },
  ],
  projects: [{ name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } }],
});
