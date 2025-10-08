import { test, expect } from '@playwright/test';

test.describe("Lesson 3 - Clicking and Interacting", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("Clicking on links", async ({ page }) => {
    await page.goto('https://example.com');
    await page.click('text=More information...');
    expect(page.url()).toContain('iana.org');
  });

  test("Working with forms - typing in input fields", async ({ page }) => {
    await page.goto('https://httpbin.org/forms/post');
  });

  test("Selecting options from dropdowns", async ({ page }) => {
    await page.goto('https://httpbin.org/forms/post');
  });

  test("Submitting a form", async ({ page }) => {
    await page.goto('https://httpbin.org/forms/post');
  });

});
