import { test, expect } from '@playwright/test';

test.describe("Lesson 4 - Waiting and Timing", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("Waiting for elements to appear", async ({ page }) => {
    await page.goto('https://httpbin.org/delay/2');
  });

  test("Waiting for text to change", async ({ page }) => {
    await page.goto('https://httpbin.org/delay/1');
  });

  test("Understanding timeouts", async ({ page }) => {
    await page.goto('https://httpbin.org');
  });

  test("Waiting for user interactions to complete", async ({ page }) => {
    await page.goto('https://example.com');
    await page.click('text=More information...');
  });

});
