import { test, expect } from '@playwright/test';

test.describe("Quick Start Example", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("My first automated test", async ({ page }) => {
    // Browser window opened automatically by Playwright
    await page.goto('https://example.com');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle('Example Domain');
    await expect(page.getByText('Example Domain')).toBeVisible();
    await page.click('text=More information...');
    expect(page.url()).toContain('iana.org');
  });

  test("Understanding what we can do", async ({ page }) => {
    // Browser window opened automatically by Playwright
    await page.goto('https://example.com');
    await expect(page.getByText('Example Domain')).toBeVisible();
    await expect(page.locator('a', { hasText: 'More information...' })).toBeVisible();
  });

});
