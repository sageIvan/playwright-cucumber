# 🎭 Playwright + Cucumber Tutorial Project

A **step-by-step tutorial** for learning web automation with Playwright and Cucumber, designed specifically for **non-technical people** who want to learn testing.

## Features

- 🎭 **Playwright** - Modern browser automation
- 🥒 **Cucumber** - BDD framework with Gherkin syntax
- 📘 **TypeScript** - Type safety and better IDE support
- 🔄 **Parallel Execution** - Run tests in parallel for faster execution
- 📊 **HTML & JSON Reports** - Comprehensive test reporting
- 📷 **Screenshots on Failure** - Automatic screenshot capture for failed tests
- 🎯 **Cross-browser Testing** - Support for Chrome, Firefox, and Safari
- 🏷️ **Tagging** - Organize and filter tests with tags

## 📖 Quick Documentation Links

- **[📚 Tutorial Guide](./TUTORIAL.md)** - Step-by-step learning path from beginner to advanced
- **[⚙️ Playwright Methods Reference](./PLAYWRIGHT-METHODS.md)** - Complete API documentation with examples
- **[🌐 Official Playwright Docs](https://playwright.dev/docs/intro)** - Comprehensive framework documentation

## Project Structure

```
├── features/                 # Feature files with scenarios
│   └── sample.feature       # Example feature file
├── support/                 # Support files
│   ├── step-definitions/    # Step definition files
│   │   └── sample-steps.ts # Example step definitions
│   ├── hooks.ts            # Before/After hooks
│   └── world.ts            # World object with browser setup
├── reports/                # Test reports and screenshots
├── cucumber.js             # Cucumber configuration
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

- **Run all tests:**
  ```bash
  npm test
  ```

- **Run tests in headed mode:**
  ```bash
  npm run test:headed
  ```

- **Run specific tags:**
  ```bash
  npm run test:smoke      # Run smoke tests
  npm run test:regression # Run regression tests
  npm run test:debug      # Run debug tests
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

1. **Create feature files** in the `features/` directory using Gherkin syntax
2. **Implement step definitions** in `support/step-definitions/`
3. **Use the CustomWorld** object to access browser, context, and page instances

Example feature:
```gherkin
Feature: Login functionality
  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be logged in
```

Example step definitions:
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

Given('I am on the login page', async function (this: CustomWorld) {
  await this.page.goto('/login');
});
```

## Configuration

### Cucumber Configuration (`cucumber.js`)
- Test file patterns
- Step definition paths
- Report formats
- Parallel execution settings

### TypeScript Configuration (`tsconfig.json`)
- Compilation options
- Include/exclude patterns
- Type definitions

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
- **[Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)** - BDD framework documentation

## Reports

After running tests, reports are generated in the `reports/` directory:
- HTML report: `reports/cucumber-report.html`
- JSON report: `reports/cucumber-report.json`
- Screenshots: `reports/screenshots/` (for failed tests)

## Browser Support

- **Chromium** (Chrome/Edge)
- **Firefox**
- **WebKit** (Safari)

Set the browser using the `BROWSER` environment variable or in your `.env` file.

## Tags

Use tags to organize and filter your tests:

- `@smoke` - Critical functionality tests
- `@regression` - Full regression test suite
- `@debug` - Tests for debugging purposes

Run specific tags:
```bash
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@smoke and @regression"
npx cucumber-js --tags "not @debug"
```

## Best Practices

1. **Page Object Model** - Create page objects for better maintainability
2. **Descriptive Scenarios** - Write clear and descriptive Gherkin scenarios
3. **Independent Tests** - Ensure tests can run independently
4. **Clean Up** - Use hooks for setup and cleanup
5. **Error Handling** - Implement proper error handling and reporting

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
HEADLESS=false npm run test:debug
```

This will:
- Run in headed mode
- Execute only tests tagged with `@debug`
- Show browser interactions in real-time

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