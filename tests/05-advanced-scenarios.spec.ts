import { test, expect } from '@playwright/test';

test.describe("Lesson 5 - Advanced Interactions and Real Websites", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
  });

  test("Working with a real e-commerce website", async ({ page }) => {
    await page.goto('https://demo.opencart.com');
  });

  test("Testing a login form (with demo credentials)", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
  });

  test("Handling JavaScript alerts and popups", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.click('text=Click for JS Alert');
  });

  test("Working with dynamic content", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
  });

  test("File upload functionality", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
  });

});
