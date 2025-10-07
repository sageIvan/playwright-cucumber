# Playwright Methods Reference Guide

This guide covers the most commonly used Playwright methods that you'll encounter throughout the tutorial lessons. Each method includes practical examples from our test scenarios.

## Table of Contents

1. [Page Navigation](#page-navigation)
2. [Element Location](#element-location)
3. [Element Interactions](#element-interactions)
4. [Assertions and Waiting](#assertions-and-waiting)
5. [Form Handling](#form-handling)
6. [Browser Management](#browser-management)
7. [API Testing](#api-testing)
8. [Advanced Features](#advanced-features)

---

## Page Navigation

### `page.goto(url, options?)`
Navigate to a specific URL.

```typescript
// Basic navigation
await page.goto('https://example.com');

// With comprehensive options
await page.goto('https://example.com', {
  waitUntil: 'domcontentloaded',    // Wait condition
  timeout: 30000,                   // Max wait time (30 seconds)
  referer: 'https://google.com',    // HTTP referer header
});

// From our tutorials
await page.goto('https://httpbin.org/delay/2');
```

**All Available Options:**
- `waitUntil`: `'load'` | `'domcontentloaded'` | `'networkidle'` | `'commit'`
  - `'load'`: Wait for `load` event to be fired
  - `'domcontentloaded'`: Wait for `DOMContentLoaded` event (default)
  - `'networkidle'`: Wait for no network requests for 500ms
  - `'commit'`: Wait for network response to be received
- `timeout`: number - Maximum navigation time in milliseconds (default: 30000)
- `referer`: string - Referer header value for the navigation request

### `page.url()`
Get the current page URL.

```typescript
const currentUrl = page.url();
expect(currentUrl).toContain('example.com');
```

### `page.waitForLoadState(state?)`
Wait for specific load state.

```typescript
// Wait for DOM to be loaded
await page.waitForLoadState('domcontentloaded');

// Wait for no network activity
await page.waitForLoadState('networkidle');

// Wait for all resources to load
await page.waitForLoadState('load');
```

---

## Element Location

### `page.locator(selector, options?)`
Create a locator for elements. This is the primary way to find elements.

```typescript
// By CSS selector
const heading = page.locator('h1');
const button = page.locator('.btn-primary');
const input = page.locator('#username');

// By attribute
const searchField = page.locator('[name="search"]');
const submitBtn = page.locator('[type="submit"]');

// Advanced CSS selectors
const firstItem = page.locator('li:first-child');
const lastItem = page.locator('li:last-child'); 
const evenItems = page.locator('li:nth-child(even)');
const thirdItem = page.locator('li:nth-child(3)');
const containsText = page.locator('div:has-text("error")');
const notHidden = page.locator('input:not([hidden])');

// With options
const strictLocator = page.locator('.item', {
  hasText: 'Active',           // Must contain this text
  has: page.locator('img'),    // Must contain this element
  hasNot: page.locator('.disabled')  // Must NOT contain this element
});
```

**Locator Options:**
- `hasText`: string | RegExp - Element must contain this text
- `has`: Locator - Element must contain this child locator  
- `hasNot`: Locator - Element must NOT contain this child locator

**Locator Chaining and Filtering:**
```typescript
// Chain locators for nested elements
const productPrice = page.locator('.product').locator('.price');
const firstProductTitle = page.locator('.products').locator('.product').first().locator('.title');

// Filter locators
const activeButtons = page.locator('button').filter({ hasText: 'Active' });
const buttonsWithIcons = page.locator('button').filter({ has: page.locator('svg') });
const enabledInputs = page.locator('input').filter({ hasNot: page.locator('[disabled]') });

// Combine filters
const specificButton = page.locator('button')
  .filter({ hasText: /submit/i })
  .filter({ has: page.locator('.icon') })
  .filter({ hasNot: page.locator('[disabled]') });
```

### `page.getByRole(role, options?)`
Locate elements by ARIA role (recommended for accessibility).

```typescript
// Basic role-based selection
const link = page.getByRole('link');
const button = page.getByRole('button');
const textbox = page.getByRole('textbox');

// With name option (accessible name)
const submitBtn = page.getByRole('button', { name: 'Submit' });
const searchBox = page.getByRole('textbox', { name: 'Search' });
const homeLink = page.getByRole('link', { name: 'Home' });

// With name as regex
const closeBtn = page.getByRole('button', { name: /close|×|dismiss/i });

// Additional options
const heading = page.getByRole('heading', { 
  name: 'Welcome',
  level: 1,                    // H1 specifically
  exact: true                  // Exact name match
});

const checkbox = page.getByRole('checkbox', {
  name: 'Accept terms',
  checked: true,               // Must be checked
  disabled: false              // Must be enabled
});

const listItem = page.getByRole('listitem', {
  name: /product/i,
  expanded: true               // For collapsible items
});
```

**Common Roles:**
- **Interactive**: `'button'`, `'link'`, `'textbox'`, `'checkbox'`, `'radio'`, `'combobox'`, `'slider'`
- **Structure**: `'heading'`, `'list'`, `'listitem'`, `'table'`, `'row'`, `'cell'`, `'banner'`, `'main'`, `'navigation'`
- **Media**: `'img'`, `'figure'`, `'audio'`, `'video'`
- **Form**: `'form'`, `'group'`, `'radiogroup'`, `'searchbox'`, `'spinbutton'`

**Available Options:**
- `name`: string | RegExp - Accessible name (label, aria-label, title, etc.)
- `exact`: boolean - Exact name match (default: false)
- `checked`: boolean - For checkboxes/radio buttons
- `disabled`: boolean - Element disabled state
- `expanded`: boolean - For collapsible elements (aria-expanded)
- `level`: number - Heading level (1-6)
- `pressed`: boolean - Button pressed state (aria-pressed)
- `selected`: boolean - Option selected state (aria-selected)

### `page.getByText(text)`
Locate elements by visible text.

```typescript
// Exact text
const element = page.getByText('Example Domain');

// Partial text with regex
const element = page.getByText(/This domain is for use/);

// Case insensitive
const element = page.getByText('EXAMPLE', { ignoreCase: true });
```

### `page.getByLabel(text)`
Locate form controls by associated label.

```typescript
const input = page.getByLabel('Email address');
const checkbox = page.getByLabel('Remember me');
```

### `page.getByPlaceholder(text)`
Locate inputs by placeholder text.

```typescript
const searchInput = page.getByPlaceholder('Search...');
```

---

## Element Interactions

### `locator.click(options?)`
Click on an element.

```typescript
// Simple click
await page.getByRole('button', { name: 'Submit' }).click();

// With comprehensive options
await page.locator('.menu-item').click({
  button: 'left',           // Mouse button to click
  clickCount: 1,           // Number of clicks
  delay: 100,              // Delay between mousedown and mouseup
  force: true,             // Click even if element is not actionable
  modifiers: ['Shift'],    // Modifier keys to hold
  noWaitAfter: false,      // Don't wait for navigation after click
  position: { x: 10, y: 20 }, // Click position relative to element
  timeout: 5000,           // Custom timeout
  trial: false             // Don't actually click, just check if possible
});

// Different mouse buttons
await element.click({ button: 'right' });   // Right click (context menu)
await element.click({ button: 'middle' });  // Middle click (wheel)

// Multiple clicks
await element.click({ clickCount: 2 });     // Double click
await element.click({ clickCount: 3 });     // Triple click

// With modifier keys
await element.click({ modifiers: ['Control', 'Shift'] });
```

**All Available Options:**
- `button`: `'left'` | `'right'` | `'middle'` - Mouse button (default: `'left'`)
- `clickCount`: number - Number of mouse clicks (default: 1)
- `delay`: number - Milliseconds between mousedown and mouseup (default: 0)
- `force`: boolean - Skip actionability checks (default: false)
- `modifiers`: Array<`'Alt'` | `'Control'` | `'Meta'` | `'Shift'`> - Modifier keys
- `noWaitAfter`: boolean - Don't wait for navigation (default: false)
- `position`: `{ x: number, y: number }` - Click position relative to top-left corner
- `timeout`: number - Maximum time to wait in milliseconds
- `trial`: boolean - Just check if click is possible without performing it

### `locator.fill(value, options?)`
Fill input fields (clears existing content first).

```typescript
// Basic fill
await page.locator('#username').fill('john@example.com');

// With options
await page.getByLabel('Password').fill('secret123', {
  force: true,           // Fill even if element is not editable
  noWaitAfter: false,    // Wait for navigation after fill
  timeout: 5000          // Custom timeout
});

// Fill with empty string (clears field)
await page.locator('#search').fill('');
```

**All Available Options:**
- `force`: boolean - Skip actionability checks (default: false)
- `noWaitAfter`: boolean - Don't wait for navigation after fill (default: false)  
- `timeout`: number - Maximum time to wait in milliseconds

### `locator.type(text, options?)`
Type text character by character (doesn't clear existing content).

```typescript
// Basic typing
await page.locator('#search').type('playwright');

// Slow typing with delay
await page.locator('#search').type('playwright', { 
  delay: 100,          // 100ms delay between characters
  noWaitAfter: false,  // Wait for navigation after typing
  timeout: 30000       // Custom timeout
});

// Typing with existing content
await page.locator('#search').fill('hello');
await page.locator('#search').type(' world'); // Results in 'hello world'
```

**All Available Options:**
- `delay`: number - Delay in milliseconds between key presses (default: 0)
- `noWaitAfter`: boolean - Don't wait for navigation after typing (default: false)
- `timeout`: number - Maximum time to wait in milliseconds

**Difference between `fill()` and `type()`:**
- `fill()`: Clears field first, then sets value instantly
- `type()`: Types character by character without clearing, simulates real typing

### `locator.clear()`
Clear input field content.

```typescript
await page.locator('#search').clear();
```

### `locator.press(key, options?)`
Press keyboard keys and key combinations.

```typescript
// Single keys
await page.locator('#search').press('Enter');
await page.locator('#search').press('Escape');
await page.locator('#search').press('Tab');
await page.locator('#search').press('Backspace');
await page.locator('#search').press('Delete');
await page.locator('#search').press('ArrowUp');
await page.locator('#search').press('F1');

// Key combinations with modifiers
await page.locator('#search').press('Control+A');      // Select all
await page.locator('#search').press('Control+C');      // Copy
await page.locator('#search').press('Control+V');      // Paste
await page.locator('#search').press('Control+Z');      // Undo
await page.locator('#search').press('Shift+Tab');      // Reverse tab
await page.locator('#search').press('Alt+F4');         // Close window

// Mac-specific combinations
await page.locator('#search').press('Meta+A');         // Cmd+A
await page.locator('#search').press('Meta+V');         // Cmd+V

// With options
await page.locator('#search').press('Enter', {
  delay: 100,          // Delay between keydown and keyup
  noWaitAfter: false,  // Wait for navigation after press
  timeout: 5000        // Custom timeout
});
```

**Common Key Names:**
- **Letters**: `'a'`, `'b'`, ..., `'z'`, `'A'`, `'B'`, ..., `'Z'`
- **Numbers**: `'0'`, `'1'`, ..., `'9'`
- **Special keys**: `'Enter'`, `'Escape'`, `'Tab'`, `'Backspace'`, `'Delete'`, `'Space'`
- **Arrow keys**: `'ArrowUp'`, `'ArrowDown'`, `'ArrowLeft'`, `'ArrowRight'`
- **Function keys**: `'F1'`, `'F2'`, ..., `'F12'`
- **Modifiers**: `'Control'`, `'Alt'`, `'Shift'`, `'Meta'` (Cmd on Mac)
- **Other**: `'Home'`, `'End'`, `'PageUp'`, `'PageDown'`, `'Insert'`

**All Available Options:**
- `delay`: number - Delay between keydown and keyup in milliseconds (default: 0)
- `noWaitAfter`: boolean - Don't wait for navigation after press (default: false)
- `timeout`: number - Maximum time to wait in milliseconds

---

## Assertions and Waiting

### `expect(locator).toBeVisible(options?)`
Assert element is visible on screen.

```typescript
const heading = page.locator('h1');

// Basic visibility check
await expect(heading).toBeVisible();

// With custom timeout
await expect(heading).toBeVisible({ timeout: 10000 });

// Negative assertion
await expect(heading).not.toBeVisible();

// Multiple visibility checks
await expect(page.locator('.loading')).toBeVisible();
await expect(page.locator('.content')).toBeVisible();
await expect(page.locator('.error')).not.toBeVisible();
```

**Available Options:**
- `timeout`: number - Maximum time to wait in milliseconds (default: 5000)

**Related Visibility Assertions:**
```typescript
// Element exists in DOM but may not be visible
await expect(locator).toBeAttached();

// Element is removed from DOM
await expect(locator).toBeDetached();

// Element is visible and not covered by other elements
await expect(locator).toBeInViewport();

// Element is hidden (display: none, visibility: hidden, etc.)
await expect(locator).toBeHidden();
```

### Text and Content Assertions

#### `expect(locator).toHaveText(expected, options?)`
Assert element contains specific text content.

```typescript
// Exact text match
await expect(page.locator('h1')).toHaveText('Example Domain');

// Regex match
await expect(page.locator('.error')).toHaveText(/error|failed/i);

// Array of texts for multiple elements
await expect(page.locator('.items')).toHaveText(['Item 1', 'Item 2', 'Item 3']);

// With options
await expect(page.locator('h1')).toHaveText('Example Domain', {
  timeout: 10000,              // Custom timeout
  ignoreCase: true,            // Case-insensitive match
  useInnerText: true           // Use innerText instead of textContent
});
```

#### `expect(locator).toContainText(expected, options?)`
Assert element contains text (partial match).

```typescript
// Partial text match
await expect(page.locator('.description')).toContainText('domain');
await expect(page.locator('.error')).toContainText(/error/i);

// Multiple partial matches
await expect(page.locator('.items')).toContainText(['Item', 'Product']);
```

#### `expect(locator).toHaveValue(expected, options?)`
Assert input/select element value.

```typescript
// Input field value
await expect(page.locator('#username')).toHaveValue('john@example.com');

// Select dropdown value
await expect(page.locator('#country')).toHaveValue('US');

// Regex match
await expect(page.locator('#phone')).toHaveValue(/^\+\d{1,3}-\d{3,4}-\d{6,8}$/);
```

### Page-Level Assertions

#### `expect(page).toHaveTitle(expected, options?)`
Assert page title.

```typescript
// Exact title
await expect(page).toHaveTitle('Example Domain');

// Regex match
await expect(page).toHaveTitle(/Example|Demo/i);

// With timeout
await expect(page).toHaveTitle('Dashboard', { timeout: 15000 });
```

#### `expect(page).toHaveURL(expected, options?)`
Assert current page URL.

```typescript
// Exact URL
await expect(page).toHaveURL('https://example.com/');

// Regex match
await expect(page).toHaveURL(/example\.com\/dashboard/);

// Partial match
await expect(page).toHaveURL('example.com', { ignoreCase: true });
```

### Attribute and Property Assertions

#### `expect(locator).toHaveAttribute(name, value?, options?)`
Assert element has specific attribute.

```typescript
// Check attribute exists
await expect(page.locator('#submit')).toHaveAttribute('type');

// Check attribute value
await expect(page.locator('#submit')).toHaveAttribute('type', 'submit');
await expect(page.locator('img')).toHaveAttribute('src', /\.jpg$/);

// Check multiple attributes
await expect(page.locator('input')).toHaveAttribute('required');
await expect(page.locator('input')).toHaveAttribute('maxlength', '50');
```

#### `expect(locator).toHaveClass(expected, options?)`
Assert element has CSS classes.

```typescript
// Single class
await expect(page.locator('.btn')).toHaveClass('btn-primary');

// Multiple classes (array)
await expect(page.locator('.btn')).toHaveClass(['btn', 'btn-large', 'active']);

// Regex match
await expect(page.locator('.btn')).toHaveClass(/btn-(primary|secondary)/);
```

#### `expect(locator).toHaveCSS(name, value, options?)`
Assert element has specific CSS property.

```typescript
// CSS property value
await expect(page.locator('.btn')).toHaveCSS('background-color', 'rgb(0, 123, 255)');
await expect(page.locator('.hidden')).toHaveCSS('display', 'none');

// Font properties
await expect(page.locator('h1')).toHaveCSS('font-size', '32px');
await expect(page.locator('h1')).toHaveCSS('font-weight', '700');
```

### State Assertions

#### `expect(locator).toBeEnabled()` / `toBeDisabled()`
Assert element enabled/disabled state.

```typescript
// Element is enabled (can be interacted with)
await expect(page.locator('#submit')).toBeEnabled();

// Element is disabled
await expect(page.locator('#loading-btn')).toBeDisabled();

// With timeout
await expect(page.locator('#submit')).toBeEnabled({ timeout: 10000 });
```

#### `expect(locator).toBeChecked()` / `toBeUnchecked()`
Assert checkbox/radio button state.

```typescript
// Checkbox is checked
await expect(page.locator('#agree-terms')).toBeChecked();

// Checkbox is unchecked  
await expect(page.locator('#newsletter')).not.toBeChecked();
// or
await expect(page.locator('#newsletter')).toBeUnchecked();
```

#### `expect(locator).toBeFocused()`
Assert element has keyboard focus.

```typescript
// Element is focused
await expect(page.locator('#username')).toBeFocused();

// After clicking input
await page.locator('#username').click();
await expect(page.locator('#username')).toBeFocused();
```

#### `expect(locator).toBeEditable()`
Assert element can be edited.

```typescript
// Input field is editable
await expect(page.locator('#comment')).toBeEditable();

// Readonly field is not editable
await expect(page.locator('#readonly')).not.toBeEditable();
```

### Count Assertions

#### `expect(locator).toHaveCount(count, options?)`
Assert number of matching elements.

```typescript
// Exact count
await expect(page.locator('.item')).toHaveCount(5);

// Zero elements
await expect(page.locator('.error')).toHaveCount(0);

// With timeout for dynamic content
await expect(page.locator('.search-result')).toHaveCount(10, { timeout: 15000 });
```

**Common Assertion Options:**
- `timeout`: number - Maximum time to wait for condition (default: 5000ms)
- `ignoreCase`: boolean - Case-insensitive comparison
- `useInnerText`: boolean - Use innerText instead of textContent

### `locator.waitFor(options?)`
Wait for element to meet certain conditions.

```typescript
// Wait for different element states
await page.locator('#loading').waitFor({ state: 'visible' });     // Element appears
await page.locator('#loading').waitFor({ state: 'hidden' });      // Element disappears  
await page.locator('.new-content').waitFor({ state: 'attached' }); // Added to DOM
await page.locator('.old-content').waitFor({ state: 'detached' }); // Removed from DOM

// With custom timeout
await page.locator('#slow-element').waitFor({ 
  state: 'visible',
  timeout: 30000  // Wait up to 30 seconds
});

// Wait for element to be actionable (visible, enabled, stable)
await page.locator('button').waitFor();  // Default state is 'visible'
```

**Available States:**
- `'attached'`: Element is present in DOM (default if not specified)
- `'detached'`: Element is not present in DOM
- `'visible'`: Element is visible (not hidden, has size, in viewport)
- `'hidden'`: Element is not visible (hidden, no size, out of viewport)

**Available Options:**
- `state`: `'attached'` | `'detached'` | `'visible'` | `'hidden'` (default: `'visible'`)
- `timeout`: number - Maximum time to wait in milliseconds (default: 30000)

**Advanced Waiting Patterns:**
```typescript
// Wait for multiple conditions
await Promise.all([
  page.locator('#loading').waitFor({ state: 'hidden' }),
  page.locator('#content').waitFor({ state: 'visible' })
]);

// Wait with error handling
try {
  await page.locator('#optional').waitFor({ timeout: 5000 });
} catch (error) {
  console.log('Optional element not found, continuing...');
}
```

---

## Form Handling

### `locator.selectOption(values, options?)`
Select options from dropdown (`<select>` elements).

```typescript
// By value attribute
await page.locator('#country').selectOption('US');
await page.locator('#country').selectOption(['US', 'CA']); // Multiple values

// By visible text/label
await page.locator('#country').selectOption({ label: 'United States' });
await page.locator('#country').selectOption({ label: ['USA', 'Canada'] });

// By index (0-based)
await page.locator('#country').selectOption({ index: 0 });
await page.locator('#country').selectOption({ index: [0, 2] });

// Mixed selection methods
await page.locator('#country').selectOption([
  'US',                           // By value
  { label: 'Canada' },           // By label  
  { index: 2 }                   // By index
]);

// With options
await page.locator('#country').selectOption('US', {
  force: true,          // Select even if disabled
  noWaitAfter: false,   // Wait for navigation after selection
  timeout: 5000         // Custom timeout
});

// Clear selection (for multiple selects)
await page.locator('#countries').selectOption([]);
```

**Selection Methods:**
- **By value**: `'value'` or `['value1', 'value2']`
- **By label**: `{ label: 'text' }` or `{ label: ['text1', 'text2'] }`
- **By index**: `{ index: 0 }` or `{ index: [0, 2] }`

**All Available Options:**
- `force`: boolean - Select even if element is disabled (default: false)
- `noWaitAfter`: boolean - Don't wait for navigation (default: false)
- `timeout`: number - Maximum time to wait in milliseconds

### `locator.check()` / `locator.uncheck()`
Handle checkboxes and radio buttons.

```typescript
// Check checkbox
await page.locator('#agree-terms').check();

// Uncheck
await page.locator('#newsletter').uncheck();

// Radio button
await page.locator('[name="payment"][value="credit"]').check();
```

### `locator.setInputFiles(files)`
Upload files.

```typescript
// Single file
await page.locator('#file-upload').setInputFiles('path/to/file.pdf');

// Multiple files
await page.locator('#multiple-files').setInputFiles([
  'file1.jpg',
  'file2.png'
]);
```

---

## Browser Management

### Browser Launch
```typescript
import { chromium, firefox, webkit } from '@playwright/test';

// Launch browsers
const browser = await chromium.launch({ headless: false });
const browser = await firefox.launch();
const browser = await webkit.launch();
```

### Context and Pages
```typescript
// Create browser context (isolated session)
const context = await browser.newContext();

// Create new page
const page = await context.newPage();

// Get all pages
const pages = context.pages();

// Close
await page.close();
await context.close();
await browser.close();
```

### Screenshots
```typescript
// Full page screenshot with all options
await page.screenshot({ 
  path: 'screenshot.png',           // File path to save
  fullPage: true,                   // Capture entire page (including scrolled content)
  clip: { x: 0, y: 0, width: 800, height: 600 },  // Capture specific area
  omitBackground: false,            // Capture transparent background
  quality: 90,                      // JPEG quality 0-100 (only for JPEG)
  type: 'png',                      // 'png' or 'jpeg'
  animations: 'disabled',           // 'disabled' or 'allow'
  caret: 'hide',                    // 'hide' or 'initial'
  mask: [page.locator('.sensitive')], // Hide sensitive elements
  timeout: 30000                    // Screenshot timeout
});

// Element screenshot  
await page.locator('.chart').screenshot({ 
  path: 'chart.png',
  animations: 'disabled',           // Stop animations for consistent screenshots
  mask: [page.locator('.tooltip')]  // Hide dynamic tooltips
});

// To buffer (for test attachments in Allure)
const buffer = await page.screenshot({
  fullPage: true,
  type: 'png'
});
await this.attach(buffer, 'image/png');  // Attach to test report

// Mobile device screenshots
await page.setViewportSize({ width: 375, height: 812 });  // iPhone X size
await page.screenshot({ path: 'mobile-screenshot.png' });
```

**Screenshot Options:**
- `path`: string - File path to save screenshot
- `fullPage`: boolean - Capture full scrollable page (default: false)
- `clip`: `{ x, y, width, height }` - Capture specific rectangular area
- `omitBackground`: boolean - Capture transparent background (default: false)
- `quality`: number - JPEG quality 0-100 (only applies to JPEG format)
- `type`: `'png'` | `'jpeg'` - Image format (default: 'png')
- `animations`: `'disabled'` | `'allow'` - Handle CSS animations (default: 'allow')
- `caret`: `'hide'` | `'initial'` - Hide text input caret (default: 'hide')
- `mask`: Locator[] - Elements to hide/mask in screenshot
- `timeout`: number - Maximum time to wait in milliseconds

---

## API Testing

### `request.get(url, options?)`
Make GET requests.

```typescript
// Basic GET request
const response = await request.get('https://api.example.com/users');

// GET with comprehensive options
const response = await request.get('https://api.example.com/users', {
  headers: {
    'Authorization': 'Bearer token123',
    'Accept': 'application/json',
    'User-Agent': 'My Test App'
  },
  params: {                    // Query parameters  
    page: '1',
    limit: '10',
    filter: 'active'
  },
  timeout: 30000,             // Request timeout
  ignoreHTTPSErrors: true,    // Accept invalid certificates
  maxRedirects: 5             // Follow up to 5 redirects
});

const data = await response.json();
console.log('Status:', response.status());
console.log('Data:', data);
```

### `request.post(url, options?)`
Make POST requests with data.

```typescript
// POST with JSON data
const response = await request.post('https://api.example.com/users', {
  data: {                     // Request body (auto-serialized to JSON)
    name: 'John Doe',
    email: 'john@example.com'
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
});

// POST with form data
const response = await request.post('https://api.example.com/upload', {
  form: {                     // URL-encoded form data
    username: 'john',
    password: 'secret'
  }
});

// POST with multipart form data
const response = await request.post('https://api.example.com/upload', {
  multipart: {
    field1: 'value1',
    field2: 'value2',
    file: {
      name: 'file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('file content')
    }
  }
});

// POST with raw body
const response = await request.post('https://api.example.com/webhook', {
  data: JSON.stringify({ event: 'test' }),    // Raw string data
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### HTTP Methods: `PUT`, `PATCH`, `DELETE`
All HTTP methods support the same options as POST:

```typescript
// PUT request (full resource update)
const response = await request.put('https://api.example.com/users/1', {
  data: { name: 'Updated Name', email: 'new@email.com' }
});

// PATCH request (partial resource update)
const response = await request.patch('https://api.example.com/users/1', {
  data: { name: 'New Name Only' }
});

// DELETE request
const response = await request.delete('https://api.example.com/users/1', {
  headers: { 'Authorization': 'Bearer token123' }
});

// HEAD request (headers only, no body)
const response = await request.head('https://api.example.com/users/1');
```

**All Available Request Options:**
- `data`: any - Request body data (JSON object, string, or Buffer)
- `form`: Record<string, string> - URL-encoded form data
- `multipart`: Record<string, string | FilePayload> - Multipart form data  
- `params`: Record<string, string> - URL query parameters
- `headers`: Record<string, string> - HTTP headers
- `timeout`: number - Request timeout in milliseconds (default: 30000)
- `ignoreHTTPSErrors`: boolean - Accept invalid SSL certificates (default: false)
- `maxRedirects`: number - Maximum redirects to follow (default: 20)
- `failOnStatusCode`: boolean - Throw on 4xx/5xx status codes (default: true)

### Response Methods
```typescript
const response = await request.get('/api/data');

// Get response data
const status = response.status();           // 200
const statusText = response.statusText();   // 'OK'
const headers = response.headers();         // Object
const json = await response.json();        // Parse JSON
const text = await response.text();        // Get as text
const buffer = await response.body();      // Get as buffer

// Check response
expect(response.ok()).toBeTruthy();        // Status 200-299
```

---

## Advanced Features

### Handle Dialogs (Alerts)
```typescript
// Set up dialog handler before triggering action
page.on('dialog', async dialog => {
  console.log('Dialog type:', dialog.type());        // 'alert', 'confirm', 'prompt', 'beforeunload'
  console.log('Dialog message:', dialog.message());  // Dialog text content
  console.log('Default value:', dialog.defaultValue()); // Default input value (for prompts)
  
  // Handle different dialog types
  if (dialog.type() === 'alert') {
    await dialog.accept();                           // Click OK
  } else if (dialog.type() === 'confirm') {
    await dialog.accept();                           // Click OK
    // await dialog.dismiss();                       // Click Cancel
  } else if (dialog.type() === 'prompt') {
    await dialog.accept('My input text');            // Enter text and click OK
    // await dialog.dismiss();                       // Click Cancel
  }
});

// Trigger the dialog
await page.click('#trigger-alert');

// One-time dialog handler (auto-removes after first dialog)
page.once('dialog', async dialog => {
  await dialog.accept();
});

// Remove all dialog listeners
page.removeAllListeners('dialog');
```

**Dialog Methods:**
- `dialog.type()`: Returns `'alert'` | `'confirm'` | `'prompt'` | `'beforeunload'`
- `dialog.message()`: Returns the dialog message text
- `dialog.defaultValue()`: Returns default value for prompt dialogs
- `dialog.accept(promptText?)`: Click OK/Yes (optionally with text for prompts)
- `dialog.dismiss()`: Click Cancel/No

**Dialog Types:**
- **Alert**: Simple message with OK button - `alert('Message')`
- **Confirm**: Question with OK/Cancel buttons - `confirm('Continue?')`  
- **Prompt**: Input field with OK/Cancel buttons - `prompt('Enter name:', 'default')`
- **Beforeunload**: Browser's "leave page" confirmation

### Multiple Tabs/Windows
```typescript
// Wait for new page
const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.click('a[target="_blank"]')
]);

// Work with new page
await newPage.waitForLoadState();
console.log(await newPage.title());
```

### Network Interception
```typescript
// Listen to all network requests
page.on('request', request => {
  console.log('Request:', request.url());
});

// Listen to responses
page.on('response', response => {
  console.log('Response:', response.status(), response.url());
});
```

### Emulation
```typescript
// Mobile device
await page.setViewportSize({ width: 375, height: 667 });

// Geolocation
await context.setGeolocation({ latitude: 37.7749, longitude: -122.4194 });

// Permissions
await context.grantPermissions(['geolocation']);
```

### Custom Locator Methods
```typescript
// Chain locators
const firstProduct = page.locator('.products').locator('.product').first();
const lastProduct = page.locator('.products .product').last();

// Filter locators
const activeButtons = page.locator('button').filter({ hasText: 'Active' });
const visibleItems = page.locator('.item').filter({ has: page.locator('.visible') });

// Get count
const itemCount = await page.locator('.item').count();

// Loop through elements
for (let i = 0; i < await page.locator('.item').count(); i++) {
  const item = page.locator('.item').nth(i);
  console.log(await item.textContent());
}
```

---

## Performance and Debugging

### Performance Timing
```typescript
// Measure response time
const startTime = Date.now();
await page.goto('https://example.com');
const loadTime = Date.now() - startTime;
console.log(`Page loaded in ${loadTime}ms`);
```

### Debugging
```typescript
// Pause execution for debugging
await page.pause();

// Slow down actions
await page.click('button', { timeout: 1000 });

// Debug mode
await page.screenshot({ path: 'debug.png' });
console.log('Current URL:', page.url());
```

---

## Best Practices

### 1. Use Descriptive Locators
```typescript
// ✅ Good - semantic and readable
const loginButton = page.getByRole('button', { name: 'Log in' });
const emailInput = page.getByLabel('Email address');

// ❌ Avoid - fragile and unclear
const button = page.locator('div > button:nth-child(3)');
```

### 2. Wait for Elements Properly
```typescript
// ✅ Good - explicit waiting
await expect(page.locator('#results')).toBeVisible();
await page.locator('#load-more').click();

// ❌ Avoid - arbitrary delays
await page.waitForTimeout(5000); // Unreliable
```

### 3. Use Page Object Pattern
```typescript
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Log in' }).click();
  }
}
```

### 4. Handle Errors Gracefully
```typescript
try {
  await page.locator('#optional-element').click({ timeout: 5000 });
} catch (error) {
  console.log('Optional element not found, continuing...');
}
```

---

## Quick Reference Cheatsheet

| Action | Method | Example |
|--------|--------|---------|
| Navigate | `page.goto()` | `await page.goto('https://example.com')` |
| Click | `locator.click()` | `await page.getByText('Click me').click()` |
| Type | `locator.fill()` | `await page.locator('#input').fill('text')` |
| Assert visible | `expect().toBeVisible()` | `await expect(page.locator('h1')).toBeVisible()` |
| Assert text | `expect().toHaveText()` | `await expect(page.locator('h1')).toHaveText('Title')` |
| Wait | `locator.waitFor()` | `await page.locator('#loading').waitFor({ state: 'hidden' })` |
| Screenshot | `page.screenshot()` | `await page.screenshot({ path: 'screenshot.png' })` |
| API GET | `request.get()` | `await request.get('/api/users')` |
| API POST | `request.post()` | `await request.post('/api/users', { data: {...} })` |

---

## Tutorial Integration

This methods guide directly supports our tutorial lessons:

- **Lessons 1-2**: Navigation and element location methods
- **Lessons 3-4**: Interactions and waiting strategies  
- **Lesson 5**: Advanced features like alerts and dynamic content
- **Lessons 6-8**: API testing methods and assertions

Each method shown here is used in practical scenarios throughout the tutorial, giving you hands-on experience with real-world testing patterns.

---

*For more detailed information, visit the [official Playwright documentation](https://playwright.dev/docs/intro).*