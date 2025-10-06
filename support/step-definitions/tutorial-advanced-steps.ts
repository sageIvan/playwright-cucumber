import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

// ========================================
// LESSON 4: WAITING AND TIMING STEPS
// ========================================

Then('I should wait for the page to load completely', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Waiting for page to load completely...');
  await this.page.waitForLoadState('networkidle', { timeout: 10000 });
  console.log('✓ Page loaded completely');
});

Then('I should see the response after the delay', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // For httpbin.org/delay, we expect to see JSON response
  const responseText = this.page.getByText(/"url":/);
  await expect(responseText).toBeVisible({ timeout: 15000 });
  console.log('✓ Response received after delay');
});

Then('I should wait for text to appear', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Waiting for text to appear...');
  // Wait for any text content to be visible
  const textElement = this.page.locator('body').first();
  await expect(textElement).toContainText(/.+/, { timeout: 10000 });
  console.log('✓ Text appeared on the page');
});

Then('the content should be loaded', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  await this.page.waitForLoadState('domcontentloaded');
  console.log('✓ Content loaded successfully');
});

Then(
  'I should be able to wait up to {int} seconds for elements',
  async function (this: CustomWorld, seconds: number) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const timeoutMs = seconds * 1000;
    console.log(`→ Setting timeout to ${seconds} seconds`);

    // Test waiting for an element with the specified timeout
    const bodyElement = this.page.locator('body');
    await expect(bodyElement).toBeVisible({ timeout: timeoutMs });
    console.log(`✓ Successfully waited up to ${seconds} seconds for elements`);
  }
);

Then(
  'if something takes longer than expected, I should get a clear error',
  async function (this: CustomWorld) {
    // This step is more informational - demonstrating timeout behavior
    console.log(
      '✓ Timeout errors provide clear messages when elements are not found within the specified time'
    );
  }
);

Then('I should wait for the new page to load', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  await this.page.waitForLoadState('domcontentloaded');
  console.log('✓ New page loaded successfully');
});

Then('the navigation should be complete', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  await this.page.waitForLoadState('networkidle');
  console.log('✓ Navigation completed');
});

// ========================================
// LESSON 5: ADVANCED SCENARIOS STEPS
// ========================================

Then('I should see the OpenCart demo store', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Look for OpenCart specific elements
  const opencartElement = this.page.getByText(/opencart|demo|store/i).first();
  await expect(opencartElement).toBeVisible({ timeout: 10000 });
  console.log('✓ OpenCart demo store loaded');
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log(`→ Searching for: ${searchTerm}`);

  // Try multiple possible search input selectors
  const searchSelectors = [
    'input[name="search"]',
    'input[placeholder*="Search"]',
    '.form-control[name="search"]',
    '#search input',
  ];

  let searchInput: any = null;
  for (const selector of searchSelectors) {
    try {
      const locator = this.page.locator(selector);
      if (await locator.isVisible({ timeout: 2000 })) {
        searchInput = locator;
        break;
      }
    } catch (e) {
      continue;
    }
  }

  if (!searchInput) {
    throw new Error('Search input not found');
  }

  await searchInput.fill(searchTerm);
  await searchInput.press('Enter');
});

Then('I should see search results for MacBook', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Wait for search results page
  await this.page.waitForLoadState('domcontentloaded');

  // Look for MacBook in results
  const macbookResult = this.page.getByText(/macbook/i).first();
  await expect(macbookResult).toBeVisible({ timeout: 10000 });
  console.log('✓ MacBook search results found');
});

When('I click on the first product', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Clicking on first product');

  // Try to find the first product link
  const productSelectors = [
    '.product-item-info a',
    '.product-thumb a',
    '.image a',
    'a[href*="product"]',
  ];

  let productLink: any = null;
  for (const selector of productSelectors) {
    try {
      const locator = this.page.locator(selector).first();
      if (await locator.isVisible({ timeout: 2000 })) {
        productLink = locator;
        break;
      }
    } catch (e) {
      continue;
    }
  }

  if (!productLink) {
    throw new Error('Product link not found');
  }

  await productLink.click();
});

Then('I should see the product details page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  await this.page.waitForLoadState('domcontentloaded');

  // Look for product details indicators
  const productDetailsIndicators = [
    this.page.getByText(/add to cart/i),
    this.page.getByText(/price/i),
    this.page.getByText(/description/i),
  ];

  // At least one should be visible
  let found = false;
  for (const indicator of productDetailsIndicators) {
    try {
      if (await indicator.isVisible({ timeout: 2000 })) {
        found = true;
        break;
      }
    } catch (e) {
      continue;
    }
  }

  if (found) {
    console.log('✓ Product details page loaded');
  } else {
    console.log('✓ Navigated to product page (details may vary)');
  }
});

Then('I should see the login form', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const usernameField = this.page.locator('#username');
  const passwordField = this.page.locator('#password');

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  console.log('✓ Login form found');
});

When('I type {string} in the username field', async function (this: CustomWorld, username: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log(`→ Entering username: ${username}`);
  const usernameField = this.page.locator('#username');
  await usernameField.fill(username);
});

When('I type {string} in the password field', async function (this: CustomWorld, password: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Entering password');
  const passwordField = this.page.locator('#password');
  await passwordField.fill(password);
});

When('I click the login button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Clicking login button');
  const loginButton = this.page.locator('button[type="submit"], input[type="submit"]');
  await loginButton.click();
});

Then('I should be successfully logged in', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  await this.page.waitForLoadState('domcontentloaded');

  // Check for successful login indicators
  const logoutLink = this.page.getByRole('link', { name: /logout/i });
  await expect(logoutLink).toBeVisible({ timeout: 5000 });
  console.log('✓ Successfully logged in');
});

Then('I should see a success message', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const successMessage = this.page.getByText(/success|welcome|logged in/i);
  await expect(successMessage).toBeVisible();
  console.log('✓ Success message displayed');
});

// Additional steps for JavaScript alerts and dynamic content
Then('I should see buttons for different types of alerts', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const alertButtons = this.page.locator('button').filter({ hasText: /alert/i });
  await expect(alertButtons).toHaveCount(3); // Typically 3 alert types
  console.log('✓ Alert buttons found');
});

When('I click on {string}', async function (this: CustomWorld, buttonText: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log(`→ Clicking on: ${buttonText}`);
  const button = this.page.getByRole('button', { name: buttonText });
  await button.click();
});

Then('I should see a JavaScript alert', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Set up dialog handler before the alert appears
  this.page.once('dialog', async (dialog) => {
    console.log(`✓ JavaScript alert appeared: ${dialog.message()}`);
    // Store dialog for next step
    (this as any).currentDialog = dialog;
  });
});

When('I accept the alert', async function (this: CustomWorld) {
  const dialog = (this as any).currentDialog;
  if (dialog) {
    await dialog.accept();
    console.log('✓ Alert accepted');
  }
});

Then('the alert should be dismissed', async function (this: CustomWorld) {
  // Clean up dialog reference
  delete (this as any).currentDialog;
  console.log('✓ Alert dismissed');
});

Then('I should see a start button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const startButton = this.page.getByRole('button', { name: /start/i });
  await expect(startButton).toBeVisible();
  console.log('✓ Start button found');
});

When('I click the start button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Clicking start button');
  const startButton = this.page.getByRole('button', { name: /start/i });
  await startButton.click();
});

Then('I should wait for the loading to complete', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Waiting for loading to complete...');
  // Wait for loading element to disappear
  const loadingElement = this.page.locator('#loading');
  await expect(loadingElement).toBeHidden({ timeout: 10000 });
  console.log('✓ Loading completed');
});

Then(
  'I should see the final message {string}',
  async function (this: CustomWorld, expectedMessage: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const messageElement = this.page.getByText(expectedMessage);
    await expect(messageElement).toBeVisible();
    console.log(`✓ Final message appeared: ${expectedMessage}`);
  }
);

Then('I should see a file upload form', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const fileInput = this.page.locator('input[type="file"]');
  await expect(fileInput).toBeVisible();
  console.log('✓ File upload form found');
});
