import { test, expect } from '@playwright/test';

test.describe("Lesson 1 - Basic Web Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("Opening a website for the first time", async ({ page }) => {
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Example Domain');
  });

  test("Understanding what we can see on a webpage", async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.getByText('Example Domain')).toBeVisible();
    await expect(page.locator('a', { hasText: 'More information...' })).toBeVisible();
  });

  test("Checking if we're on the right page", async ({ page }) => {
    await page.goto('https://example.com');
    expect(page.url()).toContain('example.com');
    await page.waitForLoadState('networkidle');
  });

});
