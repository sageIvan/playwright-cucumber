import { test, expect } from '../test-base';

test.describe("Quick Start Example", () => {
  // 🔄 beforeAll - Runs once before all tests in this describe block
  test.beforeAll(async () => {
    console.log('🚀 Starting Quick Start test suite');
    // Any setup that needs to happen once for the entire test suite
    // Example: Database setup, start test server, etc.
  });

  // 🔄 beforeEach - Runs before each individual test (like Cucumber Before hook)
  test.beforeEach(async ({ managedPage }) => {
    console.log('🎯 Setting up individual test');
    // Navigate to base URL or common setup
    await managedPage.goto('https://example.com');
    await managedPage.waitForLoadState('networkidle');
  });

  // 🔄 afterEach - Runs after each individual test (like Cucumber After hook)
  test.afterEach(async ({ managedPage }, testInfo) => {
    console.log(`🏁 Cleaning up after test: ${testInfo.title}`);
    // Any cleanup after each test
    // Screenshots are automatically handled by our managedPage fixture
  });

  // 🔄 afterAll - Runs once after all tests in this describe block
  test.afterAll(async () => {
    console.log('🎉 Quick Start test suite completed');
    // Any cleanup that needs to happen once for the entire test suite
  });

  test("My first automated test", async ({ managedPage }) => {
    // Browser window opened automatically by our managedPage fixture
    // No need to navigate again since beforeEach already did it
    await expect(managedPage).toHaveTitle('Example Domain');
    await expect(managedPage.getByText('Example Domain')).toBeVisible();
    await managedPage.click('text=More information...');
    expect(managedPage.url()).toContain('iana.org');
  });

  test("Understanding what we can do", async ({ managedPage }) => {
    // Browser window opened automatically by our managedPage fixture
    // No need to navigate again since beforeEach already did it
    await expect(managedPage.getByText('Example Domain')).toBeVisible();
    await expect(managedPage.locator('a', { hasText: 'More information...' })).toBeVisible();
  });

});
