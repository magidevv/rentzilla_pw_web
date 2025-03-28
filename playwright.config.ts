import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/.env` });

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/specs",
  /* Run tests in files in parallel */
  fullyParallel: true,
  globalTimeout: process.env.CI ? 15 * 60 * 1000 : undefined,
  timeout: 5 * 60 * 1000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `${process.env.BASE_URL}`,

    ignoreHTTPSErrors: true,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    actionTimeout: 5000,

    navigationTimeout: 5000,

    screenshot: "only-on-failure",

    video: "on-first-retry",

    // viewport: { width: 1280, height: 720 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testMatch: ["**/*.spec.ts", "!**/*.mobile.spec.ts"],
    },

    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
      testMatch: ["**/*.mobile.spec.ts"],
    },
  ],
});
