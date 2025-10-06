import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

Given('I am on the Google homepage', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }
  await this.page.goto('https://www.google.com');
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const searchInput = this.page.locator('input[name="q"]');
  await searchInput.fill(searchTerm);
  await searchInput.press('Enter');
});

When('I click on the search input', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const searchInput = this.page.locator('input[name="q"]');
  await searchInput.click();
});

Then('I should see search results', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  // Wait for search results to load
  await this.page.waitForSelector('#search', { timeout: 10000 });
  const results = this.page.locator('#search');
  await expect(results).toBeVisible();
});

Then(
  'the page title should contain {string}',
  async function (this: CustomWorld, expectedTitle: string) {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }

    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
  }
);

Then('I should see the search input field', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const searchInput = this.page.locator('input[name="q"]');
  await expect(searchInput).toBeVisible();
});

Then('I should see the Google logo', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const logo = this.page.locator('img[alt="Google"]');
  await expect(logo).toBeVisible();
});

Then('I should see the search button', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const searchButton = this.page.locator('input[value="Google Search"]');
  await expect(searchButton).toBeVisible();
});

Then('the search input should be focused', async function (this: CustomWorld) {
  if (!this.page) {
    throw new Error('Page is not initialized');
  }

  const searchInput = this.page.locator('input[name="q"]');
  await expect(searchInput).toBeFocused();
});
