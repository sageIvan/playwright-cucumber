import { test, expect } from '@playwright/test';

test.describe('Lesson 2 - Finding Things on a Webpage', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test('Finding text on a page', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.getByText('Example Domain')).toBeVisible();
    await expect(page.getByText('This domain is for use in illustrative examples')).toBeVisible();
  });

  test('Finding buttons and links', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('a', { hasText: 'More information...' })).toBeVisible();
  });

  test('Finding elements by their HTML properties', async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('Checking if elements exist or not', async ({ page }) => {
    await page.goto('https://example.com');
  });
});
