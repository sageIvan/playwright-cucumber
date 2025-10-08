import { test, expect } from '../test-base';

test.describe("Advanced Hook Examples", () => {
  let testData: any;
  
  // 🌟 beforeAll - Perfect for expensive setup operations
  test.beforeAll(async ({ browser }) => {
    console.log('🔧 Setting up test data and environment');
    
    // Example: Database setup, API authentication, etc.
    testData = {
      users: [
        { email: 'user1@test.com', password: 'password123' },
        { email: 'user2@test.com', password: 'password456' }
      ],
      baseUrl: 'https://example.com'
    };
    
    // Example: Start a test API server or prepare test database
    console.log('✅ Test environment prepared');
  });

  // 🔄 beforeEach - Setup for each individual test
  test.beforeEach(async ({ managedPage }, testInfo) => {
    console.log(`🎯 Preparing test: ${testInfo.title}`);
    
    // Common navigation and setup
    await managedPage.goto(testData.baseUrl);
    await managedPage.waitForLoadState('networkidle');
    
    // Example: Login if needed, set cookies, local storage, etc.
    console.log('🔓 Common setup completed');
  });

  // 🧹 afterEach - Cleanup after each test
  test.afterEach(async ({ managedPage }, testInfo) => {
    console.log(`🧹 Cleaning up after: ${testInfo.title}`);
    
    // Example: Clear cookies, logout, reset state
    await managedPage.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    
    // Screenshot is automatically taken by our fixture on failure
    if (testInfo.status === 'passed') {
      console.log(`✅ Test passed: ${testInfo.title}`);
    } else if (testInfo.status === 'failed') {
      console.log(`❌ Test failed: ${testInfo.title}`);
    }
  });

  // 🎯 afterAll - Final cleanup
  test.afterAll(async () => {
    console.log('🎉 All tests completed, running final cleanup');
    
    // Example: Close database connections, stop test servers
    // Generate test reports, send notifications, etc.
    console.log('📊 Test suite cleanup completed');
  });

  test("Example test with full hook lifecycle", async ({ managedPage }) => {
    // This test will go through all the hooks:
    // beforeAll → beforeEach → test → afterEach → afterAll (after last test)
    
    await expect(managedPage.getByText('Example Domain')).toBeVisible();
    
    // Simulate some test actions
    console.log('🔍 Running main test logic');
  });

  test("Another test showing hook reuse", async ({ managedPage }) => {
    // This test reuses the same beforeEach/afterEach setup
    
    await expect(managedPage).toHaveTitle('Example Domain');
    
    console.log('🔍 Running second test with shared setup');
  });
});