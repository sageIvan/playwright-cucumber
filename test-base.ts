import { test as base, expect } from '@playwright/test';
import { Browser, BrowserContext, Page } from '@playwright/test';

// Extend the base test to include custom fixtures
export const test = base.extend<{
  // Custom browser management similar to your Cucumber world
  managedPage: Page;
  managedContext: BrowserContext;
}>({
  // Custom page fixture with screenshot on failure
  managedPage: async ({ browser }, use, testInfo) => {
    console.log(`🎬 Starting test: ${testInfo.title}`);
    
    // Create a new context for each test
    const context = await browser.newContext({
      // Configure browser options here
      viewport: { width: 1280, height: 720 },
      // Add any other browser configuration
    });
    
    const page = await context.newPage();
    
    // Use the page in the test
    await use(page);
    
    // After test cleanup and screenshot on failure
    if (testInfo.status === 'failed') {
      console.log(`📸 Test failed, taking screenshot: ${testInfo.title}`);
      
      const screenshot = await page.screenshot({
        path: `test-results/screenshots/${testInfo.title.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.png`,
        fullPage: true,
      });
      
      await testInfo.attach('screenshot', {
        body: screenshot,
        contentType: 'image/png',
      });
    }
    
    await context.close();
    console.log(`✅ Test completed: ${testInfo.title}`);
  },

  // Custom context fixture if you need it separately
  managedContext: async ({ browser }, use, testInfo) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },
});

export { expect };