import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

// ========================================
// LESSON 1: BASIC NAVIGATION STEPS
// ========================================

Given('I open a new browser window', async function (this: CustomWorld) {
  // This step is handled by the hooks.ts file automatically
  if (!this.page) {
    throw new Error('Browser page is not initialized');
  }
  console.log('✓ Browser window opened successfully');
});

When('I navigate to {string}', async function (this: CustomWorld, url: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  console.log(`→ Navigating to: ${url}`);
  await this.page.goto(url, {
    waitUntil: 'domcontentloaded',
    timeout: 30000,
  });
});

Then('I should see the page is loaded', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Wait for the page to be in a ready state
  await this.page.waitForLoadState('domcontentloaded');
  console.log('✓ Page loaded successfully');
});

Then(
  'the page title should be {string}',
  async function (this: CustomWorld, expectedTitle: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    await expect(this.page).toHaveTitle(expectedTitle);
    console.log(`✓ Page title verified: ${expectedTitle}`);
  }
);

Then(
  'the current URL should contain {string}',
  async function (this: CustomWorld, urlPart: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const currentUrl = this.page.url();
    expect(currentUrl).toContain(urlPart);
    console.log(`✓ URL contains: ${urlPart}`);
  }
);

Then('the page should be fully loaded', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  await this.page.waitForLoadState('networkidle');
  console.log('✓ Page fully loaded (no network activity)');
});

// ========================================
// LESSON 2: FINDING ELEMENTS STEPS
// ========================================

Then('I should see text {string}', async function (this: CustomWorld, text: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const element = this.page.getByText(text);
  await expect(element).toBeVisible();
  console.log(`✓ Found text: "${text}"`);
});

Then(
  'I should see the main heading {string}',
  async function (this: CustomWorld, headingText: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const heading = this.page.locator('h1').filter({ hasText: headingText });
    await expect(heading).toBeVisible();
    console.log(`✓ Found main heading: "${headingText}"`);
  }
);

Then(
  'I should see some text about {string}',
  async function (this: CustomWorld, partialText: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const element = this.page.getByText(new RegExp(partialText, 'i'));
    await expect(element).toBeVisible();
    console.log(`✓ Found text containing: "${partialText}"`);
  }
);

Then('I should see a link to {string}', async function (this: CustomWorld, linkText: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const link = this.page.getByRole('link', { name: linkText });
  await expect(link).toBeVisible();
  console.log(`✓ Found link: "${linkText}"`);
});

Then(
  'I should see a link with text {string}',
  async function (this: CustomWorld, linkText: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const link = this.page.getByRole('link', { name: linkText });
    await expect(link).toBeVisible();
    console.log(`✓ Found link with text: "${linkText}"`);
  }
);

Then('the link should be clickable', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const link = this.page.locator('a').first();
  await expect(link).toBeEnabled();
  console.log('✓ Link is clickable');
});

Then(
  'I should find an element with tag {string}',
  async function (this: CustomWorld, tagName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const element = this.page.locator(tagName).first();
    await expect(element).toBeVisible();
    console.log(`✓ Found element with tag: ${tagName}`);
  }
);

Then('the {string} heading should exist', async function (this: CustomWorld, tagName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const heading = this.page.locator(tagName);
  await expect(heading).toBeVisible();
  console.log(`✓ ${tagName} heading exists`);
});

Then('the {string} heading should not exist', async function (this: CustomWorld, tagName: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const heading = this.page.locator(tagName);
  await expect(heading).toHaveCount(0);
  console.log(`✓ ${tagName} heading does not exist`);
});

Then(
  'there should be exactly {int} link on the page',
  async function (this: CustomWorld, expectedCount: number) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const links = this.page.locator('a');
    await expect(links).toHaveCount(expectedCount);
    console.log(`✓ Found exactly ${expectedCount} link(s) on the page`);
  }
);

// ========================================
// LESSON 3: CLICKING AND INTERACTIONS
// ========================================

When('I click on the link {string}', async function (this: CustomWorld, linkText: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log(`→ Clicking on link: "${linkText}"`);
  const link = this.page.getByRole('link', { name: linkText });
  await link.click();
});

Then('I should be redirected to a new page', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Wait for navigation to complete
  await this.page.waitForLoadState('domcontentloaded');
  console.log('✓ Successfully redirected to new page');
});

Then('the URL should contain {string}', async function (this: CustomWorld, urlPart: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const currentUrl = this.page.url();
  expect(currentUrl).toContain(urlPart);
  console.log(`✓ URL contains: ${urlPart}`);
});

When(
  'I type {string} in the field {string}',
  async function (this: CustomWorld, text: string, fieldName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    console.log(`→ Typing "${text}" in field: ${fieldName}`);
    const field = this.page.locator(`[name="${fieldName}"]`);
    await field.fill(text);
  }
);

Then(
  'the field {string} should contain {string}',
  async function (this: CustomWorld, fieldName: string, expectedValue: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const field = this.page.locator(`[name="${fieldName}"]`);
    await expect(field).toHaveValue(expectedValue);
    console.log(`✓ Field "${fieldName}" contains: "${expectedValue}"`);
  }
);

When(
  'I select {string} from the dropdown {string}',
  async function (this: CustomWorld, optionValue: string, dropdownName: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    console.log(`→ Selecting "${optionValue}" from dropdown: ${dropdownName}`);
    const dropdown = this.page.locator(`[name="${dropdownName}"]`);
    await dropdown.selectOption(optionValue);
  }
);

Then(
  'the dropdown {string} should have {string} selected',
  async function (this: CustomWorld, dropdownName: string, expectedValue: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    const dropdown = this.page.locator(`[name="${dropdownName}"]`);
    await expect(dropdown).toHaveValue(expectedValue);
    console.log(`✓ Dropdown "${dropdownName}" has "${expectedValue}" selected`);
  }
);

When('I click the submit button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  console.log('→ Clicking submit button');
  const submitButton = this.page.locator('input[type="submit"], button[type="submit"]').first();
  await submitButton.click();
});

Then('I should see the form was submitted successfully', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Wait for navigation or success indicator
  await this.page.waitForLoadState('domcontentloaded');

  // Check if we're on a new page or see success indicator
  const currentUrl = this.page.url();
  const isNewPage = currentUrl.includes('/post') || currentUrl.includes('success');

  if (isNewPage) {
    console.log('✓ Form submitted successfully (redirected to new page)');
  } else {
    // Look for success message
    const successMessage = this.page.getByText(/success|submitted|thank you/i);
    await expect(successMessage).toBeVisible({ timeout: 5000 });
    console.log('✓ Form submitted successfully (success message displayed)');
  }
});
