# 🪝 Playwright Test Hooks Guide

This comprehensive guide explains how to use Playwright's powerful test hooks and lifecycle management for robust testing.

## 📋 **Hook Types Available**

### 🌍 **Global Hooks** (Project-wide)
- `globalSetup` - Runs once before ALL tests across all files
- `globalTeardown` - Runs once after ALL tests across all files

### 📁 **File/Describe-level Hooks**
- `test.beforeAll()` - Runs once before all tests in a describe block
- `test.afterAll()` - Runs once after all tests in a describe block

### 🧪 **Test-level Hooks**
- `test.beforeEach()` - Runs before each individual test for setup and initialization
- `test.afterEach()` - Runs after each individual test for cleanup and teardown

---

## 🔧 **Implementation Examples**

### **Global Setup/Teardown** (`global-setup.ts` & `global-teardown.ts`)
```typescript
// global-setup.ts - Runs once for entire test suite
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting test suite execution');
  
  // Examples of what to put here:
  // - Start test database
  // - Start API server
  // - Set up test environment
  // - Global authentication
  
  return Promise.resolve();
}

export default globalSetup;
```

### **File-level Hooks** (In your .spec.ts files)
```typescript
import { test, expect } from '../test-base';

test.describe("Your Test Suite", () => {
  // 🌟 beforeAll - Expensive setup operations
  test.beforeAll(async ({ browser }) => {
    // Runs ONCE before all tests in this describe block
    console.log('🔧 Setting up test suite');
    
    // Examples:
    // - Create test data
    // - Set up authentication tokens  
    // - Initialize shared resources
  });

  // 🔄 beforeEach - Setup for each test
  test.beforeEach(async ({ managedPage }) => {
    // Runs before EACH test for individual test setup
    console.log('🎯 Setting up individual test');
    
    // Examples:
    // - Navigate to starting page
    // - Login user
    // - Clear browser state
    await managedPage.goto('https://your-app.com');
  });

  // 🧹 afterEach - Cleanup after each test
  test.afterEach(async ({ managedPage }, testInfo) => {
    // Runs after EACH test for individual test cleanup
    console.log('🧹 Cleaning up test');
    
    // Examples:
    // - Take screenshot on failure (automatic in our fixture)
    // - Clear cookies/localStorage
    // - Logout user
    // - Reset application state
    
    if (testInfo.status === 'failed') {
      // Additional failure handling
      console.log('❌ Test failed, performing extra cleanup');
    }
  });

  // 🎉 afterAll - Final cleanup
  test.afterAll(async () => {
    // Runs ONCE after all tests in this describe block
    console.log('🎉 Test suite completed');
    
    // Examples:
    // - Delete test data
    // - Close database connections
    // - Generate reports
  });

  test("Your test", async ({ managedPage }) => {
    // Your test logic here
  });
});
```

---

## � **Playwright Hook Hierarchy and Execution Order**

| **Hook Type** | **Scope** | **When It Runs** | **Use Case** |
|---------------|-----------|-------------------|--------------|
| `globalSetup` | Entire test suite | Once before ALL tests | Environment setup, database initialization |
| `test.beforeAll()` | Per describe block | Once before tests in block | Expensive setup, authentication tokens |
| `test.beforeEach()` | Per individual test | Before each test | Navigation, state reset, user login |
| `test.afterEach()` | Per individual test | After each test | Cleanup, screenshots, logout |
| `test.afterAll()` | Per describe block | Once after tests in block | Resource cleanup, data cleanup |
| `globalTeardown` | Entire test suite | Once after ALL tests | Final cleanup, report generation |

---

## 🎯 **Practical Usage Patterns**

### **Pattern 1: Web UI Testing with Screenshots**
```typescript
test.describe("Login Tests", () => {
  test.beforeEach(async ({ managedPage }) => {
    await managedPage.goto('/login');
    await managedPage.waitForLoadState('networkidle');
  });

  test.afterEach(async ({ managedPage }, testInfo) => {
    // Screenshot automatically handled by managedPage fixture
    await managedPage.evaluate(() => localStorage.clear());
  });

  test("Valid login", async ({ managedPage }) => {
    // Test implementation
  });
});
```

### **Pattern 2: API Testing with Setup/Teardown**
```typescript
test.describe("API Tests", () => {
  let apiToken: string;

  test.beforeAll(async ({ request }) => {
    // Get auth token once for all tests
    const response = await request.post('/api/auth/login', {
      data: { username: 'test', password: 'test' }
    });
    apiToken = (await response.json()).token;
  });

  test.beforeEach(async ({ request }) => {
    // Verify API health before each test
    const health = await request.get('/api/health');
    expect(health.ok()).toBeTruthy();
  });

  test("Create user", async ({ request }) => {
    const response = await request.post('/api/users', {
      headers: { 'Authorization': `Bearer ${apiToken}` },
      data: { name: 'Test User' }
    });
    expect(response.ok()).toBeTruthy();
  });
});
```

### **Pattern 3: Mixed UI + API Testing**
```typescript
test.describe("E2E User Journey", () => {
  test.beforeAll(async ({ request }) => {
    // Set up test data via API
    await request.post('/api/test-data/setup');
  });

  test.beforeEach(async ({ managedPage }) => {
    // Start each test at homepage
    await managedPage.goto('/');
  });

  test.afterEach(async ({ managedPage, request }) => {
    // Clean up both UI and API state
    await managedPage.evaluate(() => localStorage.clear());
    await request.delete('/api/test-data/cleanup');
  });

  test("Complete user flow", async ({ managedPage, request }) => {
    // Test implementation mixing UI and API calls
  });
});
```

---

## 🚀 **Getting Started**

1. **Use our custom `test-base.ts`** for automatic screenshot capture and browser management
2. **Import from `../test-base`** instead of `@playwright/test`
3. **Use `managedPage` fixture** for automatic cleanup and screenshots
4. **Add hooks as needed** for your specific test requirements

## 📝 **Best Practices**

- ✅ Use `beforeAll/afterAll` for expensive operations (database setup, authentication)
- ✅ Use `beforeEach/afterEach` for test-specific setup (navigation, state reset)
- ✅ Keep hooks focused and predictable
- ✅ Use our `managedPage` fixture for automatic screenshot capture
- ✅ Log hook activity for debugging
- ❌ Don't put test logic in hooks
- ❌ Don't make hooks dependent on test execution order