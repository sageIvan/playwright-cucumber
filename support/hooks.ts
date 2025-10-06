import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';

// Set step timeout to 30 seconds
setDefaultTimeout(30 * 1000);

BeforeAll(async function () {
  console.log('Starting test suite...');
});

AfterAll(async function () {
  console.log('Test suite completed.');
});

Before(async function (this: CustomWorld, scenario) {
  console.log(`Starting scenario: ${scenario.pickle.name}`);

  // Initialize browser for each scenario
  const headless = process.env.HEADLESS !== 'false';
  const browserName = process.env.BROWSER || 'chromium';

  await this.openBrowser(browserName, headless);
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    // Take screenshot on failure
    if (this.page) {
      const screenshot = await this.page.screenshot({
        path: `reports/screenshots/${scenario.pickle.name}-${Date.now()}.png`,
        fullPage: true,
      });
      await this.attach(screenshot, 'image/png');
    }
  }

  // Close browser after each scenario
  await this.closeBrowser();

  console.log(`Finished scenario: ${scenario.pickle.name} - Status: ${scenario.result?.status}`);
});
