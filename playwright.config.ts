import { defineConfig, devices } from "@playwright/test";

/**
 * E2E and accessibility checks against a production build
 * (`npm run build` first). Set PLAYWRIGHT_CHROMIUM_PATH to use a
 * preinstalled Chromium instead of a Playwright-downloaded one.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
const port = Number(process.env.E2E_PORT || 3200);

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${port}`,
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: {
    command: `npx next start -p ${port}`,
    port,
    reuseExistingServer: false,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
  ],
});
