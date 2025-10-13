# 🎭 Playwright Tutorial Project

A **step-by-step tutorial** for learning web automation with Playwright, designed specifically for **non-technical people** who want to learn testing.

## Features

- 🎭 **Playwright** - Modern browser automation framework
- 📊 **Data Tables** - Pipe-delimited tables with dynamic values for comprehensive test scenarios
- 📘 **TypeScript** - Type safety and better IDE support
- 🔄 **Parallel Execution** - Run tests in parallel for faster execution
- 📊 **HTML Reports** - Comprehensive test reporting with built-in Playwright reporting
- 📷 **Screenshots on Failure** - Automatic screenshot capture for failed tests
- 🎯 **Cross-browser Testing** - Support for Chrome, Firefox, and Safari
- 🏷️ **Test Organization** - Organized test structure with progressive learning approach
- 🎪 **Custom Fixtures** - Advanced Playwright fixtures for enhanced testing capabilities

## 📖 Quick Documentation Links

- **[📚 Tutorial Guide](./TUTORIAL.md)** - Step-by-step learning path from beginner to advanced
- **[⚙️ Playwright Methods Reference](./PLAYWRIGHT-METHODS.md)** - Complete API documentation with examples
- **[📊 Data Tables Guide](./DATA-TABLES.md)** - Pipe-delimited data tables with dynamic values in Playwright
- **[🎪 Playwright Hooks Guide](./PLAYWRIGHT-HOOKS-GUIDE.md)** - Advanced hooks and fixtures documentation
- **[🌐 Official Playwright Docs](https://playwright.dev/docs/intro)** - Comprehensive framework documentation

## Project Structure

```
├── tests/                   # Playwright test files organized by learning progression
│   ├── 00-quick-start.spec.ts         # Basic Playwright introduction
│   ├── 01-basic-navigation.spec.ts    # Web navigation fundamentals
│   ├── 02-finding-elements.spec.ts    # Element location strategies
│   ├── 03-clicking-interactions.spec.ts # User interactions and forms
│   ├── 04-waiting-timing.spec.ts      # Timing and waiting strategies
│   ├── 05-advanced-scenarios.spec.ts  # Real-world testing scenarios
│   ├── 06-api-basics.spec.ts          # API testing introduction
│   ├── 07-api-methods.spec.ts         # HTTP methods and CRUD operations
│   ├── 08-api-advanced.spec.ts        # Advanced API testing patterns
│   ├── 09-advanced-hooks.spec.ts      # Custom fixtures and hooks
│   └── 10-data-tables-consolidated.spec.ts # Data tables with dynamic values
├── reports/                # Test reports and screenshots
│   ├── cucumber-report.html   # Legacy report (can be removed)
│   └── screenshots/           # Failure screenshots
├── test-results/           # Playwright test results
├── playwright-report/      # Built-in Playwright HTML reports
├── allure-report/         # Allure reporting (optional)
├── DATA-TABLES.md         # Data tables documentation
├── TUTORIAL.md            # Complete tutorial guide
├── PLAYWRIGHT-METHODS.md  # API reference documentation
├── PLAYWRIGHT-HOOKS-GUIDE.md # Hooks and fixtures guide
├── test-base.ts           # Custom Playwright fixtures
├── global-setup.ts        # Global test setup
├── global-teardown.ts     # Global test cleanup
├── playwright.config.ts   # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Getting Started

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

### Running Tests

#### All Playwright Tests
- **Run all tests:**
  ```bash
  npx playwright test
  ```

- **Run tests with UI mode (recommended for learning):**
  ```bash
  npx playwright test --ui
  ```

- **Run tests in headed mode (see browser):**
  ```bash
  npx playwright test --headed
  ```

#### Specific Test Files
- **Run tutorial progression:**
  ```bash
  npx playwright test tests/00-quick-start.spec.ts      # Start here
  npx playwright test tests/01-basic-navigation.spec.ts  # Web basics
  npx playwright test tests/02-finding-elements.spec.ts  # Element finding
  # ... continue through the numbered sequence
  ```

- **Run data tables examples:**
  ```bash
  npx playwright test tests/10-data-tables-consolidated.spec.ts
  ```

- **Run API tests:**
  ```bash
  npx playwright test tests/0*-api-*.spec.ts
  ```

#### Test Reports
- **Generate and view HTML report:**
  ```bash
  npx playwright show-report
  ```

- **Run tests with tracing:**
  ```bash
  npx playwright test --trace on
  ```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Available environment variables:
- `BROWSER` - Browser to use (chromium, firefox, webkit) - default: chromium
- `HEADLESS` - Run in headless mode (true/false) - default: true
- `BASE_URL` - Base URL for tests - default: https://www.google.com
- `TIMEOUT` - Test timeout in milliseconds - default: 30000

### Writing Tests

1. **Create test files** in the `tests/` directory using Playwright syntax
2. **Use custom fixtures** from `test-base.ts` for enhanced functionality
3. **Follow the numbered progression** for learning (00-quick-start.spec.ts through 10-data-tables.spec.ts)

Example test file:
```typescript
import { test, expect } from '../test-base';

test.describe('Login functionality', () => {
  test('should login successfully', async ({ managedPage }) => {
    await managedPage.goto('/login');
    await managedPage.fill('#username', 'testuser');
    await managedPage.fill('#password', 'password123');
    await managedPage.click('#login-button');
    
    await expect(managedPage.locator('.welcome')).toBeVisible();
  });
});
```

Example with data tables:
```typescript
// Pipe-delimited data table with dynamic values
const testDataWithHeaders = `
| username        | password  | expected    |
| ${randomEmail()} | pass123   | success     |
| invalid@test    | ${empty()} | error      |
| ${randomEmail()} | wrongpass | error      |
`.trim();
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)
- Browser settings and test execution options
- Custom fixtures and global setup/teardown
- Report generation and screenshot settings
- Parallel execution and timeout configurations

### TypeScript Configuration (`tsconfig.json`)
- Compilation options optimized for Playwright
- Include/exclude patterns for test files
- Type definitions for enhanced IDE support

## Documentation

This project includes comprehensive documentation to help you learn and reference Playwright testing:

### 📚 **Learning Resources**

- **[TUTORIAL.md](./TUTORIAL.md)** - Complete step-by-step tutorial guide
  - Progressive lessons from basic navigation to advanced API testing
  - Learning objectives and practical examples for each lesson
  - Beginner-friendly explanations of testing concepts
  - Real-world scenarios and best practices

- **[PLAYWRIGHT-METHODS.md](./PLAYWRIGHT-METHODS.md)** - Comprehensive API reference
  - Detailed documentation of 50+ Playwright methods
  - Complete parameter explanations and available options
  - Practical code examples and usage patterns
  - Cross-references to tutorial lessons for integrated learning

### 🌐 **External Resources**

- **[Official Playwright Documentation](https://playwright.dev/docs/intro)** - Complete API reference and guides
- **[Playwright GitHub Repository](https://github.com/microsoft/playwright)** - Source code and issue tracking
- **[Playwright Community](https://playwright.dev/community/welcome)** - Community resources and support

## Reports

Playwright generates comprehensive reports automatically:
- **Built-in HTML report**: `playwright-report/index.html`
- **Test results**: `test-results/` directory with detailed logs
- **Screenshots**: Automatically captured on test failures
- **Legacy reports**: `reports/` directory (can be cleaned up)

## Browser Support

- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

Set the browser using the `BROWSER` environment variable or in your `.env` file.

## Test Organization

Organize and filter your tests using Playwright's built-in capabilities:

### By File Pattern:
```bash
npx playwright test tests/0*-api-*.spec.ts    # API tests only
npx playwright test tests/0[1-5]-*.spec.ts    # Web UI tests (lessons 1-5)
```

### By Test Name:
```bash
npx playwright test --grep "navigation"        # Tests with "navigation" in the name
npx playwright test --grep "login|auth"       # Tests related to login or auth
```

### By Project (if configured):
```bash
npx playwright test --project=chromium         # Chrome browser only
npx playwright test --project=firefox         # Firefox browser only
```
## Best Practices

1. **Custom Fixtures** - Use the custom fixtures from `test-base.ts` for enhanced functionality
2. **Descriptive Test Names** - Write clear and descriptive test descriptions
3. **Independent Tests** - Ensure tests can run independently without dependencies
4. **Progressive Learning** - Follow the numbered sequence for optimal learning
5. **Data Tables** - Use the data table functionality for comprehensive test scenarios
6. **Error Handling** - Leverage automatic screenshot capture and detailed reporting

## Allure Reporting

This project includes comprehensive Allure reporting for beautiful, interactive test reports.

### Generating Reports

```bash
# Run tests and generate report
npm run test:with-report
npm run api:with-report

# Generate report from existing results
npm run report:generate

# Open report in browser
npm run report:open

# Serve report with auto-refresh
npm run report:serve
```

### Report Features

- **Test Results Overview** - Summary of passed, failed, and skipped tests
- **Test Execution Details** - Step-by-step breakdown of each scenario
- **Screenshots** - Automatic screenshots on test failures
- **API Request/Response Data** - Full API interaction logs
- **Historical Trends** - Track test results over time
- **Categories & Tags** - Organized by lesson, difficulty, and test type

### Report Structure

- **allure-results/** - Raw test execution data
- **allure-report/** - Generated HTML report
- Screenshots saved in **reports/screenshots/**

## Troubleshooting

### Common Issues

1. **Browser not found**: Run `npx playwright install`
2. **Port conflicts**: Check if any services are running on test ports
3. **Timeout errors**: Increase timeout values in environment variables

### Debug Mode

Run tests with debugging enabled:
```bash
npx playwright test --headed --debug
```

This will:
- Run in headed mode with browser visible
- Pause execution for step-by-step debugging
- Show browser interactions in real-time
- Allow interactive debugging with the Playwright Inspector

---

## 🔗 Additional Resources

### Official Documentation
- **[Playwright Official Website](https://playwright.dev/)** - Main Playwright site with getting started guides
- **[Playwright API Reference](https://playwright.dev/docs/api/class-playwright)** - Complete API documentation
- **[Playwright Test Runner](https://playwright.dev/docs/test-intro)** - Built-in test runner documentation
- **[Cucumber.js Official Docs](https://cucumber.io/docs/cucumber/)** - BDD framework documentation

### Community Resources  
- **[Playwright GitHub](https://github.com/microsoft/playwright)** - Source code and issue tracking
- **[Playwright Discord](https://aka.ms/playwright/discord)** - Community chat and support
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)** - Q&A with playwright tag

### Learning Materials
- **[Playwright University](https://playwright.dev/docs/intro#learning-path)** - Official learning path
- **[Test Automation University](https://testautomationu.applitools.com/playwright-tutorial/)** - Free courses

---

*Happy Testing! 🎭🚀*