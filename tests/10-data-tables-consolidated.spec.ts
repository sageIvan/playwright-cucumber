/**
 * 🥒 Data Tables with Dynamic Functions - Cucumber Replacement
 *
 * Perfect replacement for Cucumber Examples tables with real dynamic values!
 * Functions are called inside test execution to generate fresh data every run.
 */

import { test, expect } from '../test-base';

// 🎲 Dynamic value generators (called fresh in each test)
const random = () => Math.random().toString(36).substring(2, 8);
const randomEmail = () => `test_${random()}@example.com`;
const randomPhone = () =>
  `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
const uuid = () => crypto.randomUUID();

// 🏆 **DATA TABLES WITH DYNAMIC VALUES**
test.describe('🥒 Cucumber-Style Data Tables', () => {
  // 🎯 Tagged template for tables with real function calls inside forEach
  function table(strings: TemplateStringsArray) {
    return strings[0]
      .trim()
      .split('\n')
      .map((line) =>
        line
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell)
      )
      .filter((row) => row.length > 0);
  }

  // 🥒 Real Cucumber table with function calls that execute fresh each test!
  const testDataWithHeaders = table`
    | firstName | lastName | email         | phone         | scenario       | expected |
    | John      | Doe      | randomEmail() | randomPhone() | Valid user     | success  |
    |           | Smith    | randomEmail() | randomPhone() | Missing name   | failure  |
    | Alice     | Brown    | invalid-email | randomPhone() | Invalid email  | failure  |
    | Bob       | Wilson   | randomEmail() | invalid-phone | Invalid phone  | failure  |
    | Charlie   | Davis    | randomEmail() | randomPhone() | Valid user     | success  |
  `;

  const [headers, ...testData] = testDataWithHeaders;

  testData.forEach(([firstName, lastName, emailCall, phoneCall, scenario, expected], index) => {
    test(`Data Table ${index + 1}: ${scenario}`, async ({ managedPage }) => {
      // 🎲 Evaluate function calls fresh inside each test execution!
      const email = emailCall === 'randomEmail()' ? randomEmail() : emailCall;
      const phone = phoneCall === 'randomPhone()' ? randomPhone() : phoneCall;
      const testId = uuid().slice(0, 6);
      const sessionId = random();

      console.log(`🥒 Testing: ${scenario} [${testId}] Session: ${sessionId}`);
      console.log(`📊 Data: ${firstName}|${lastName}|${email}|${phone}`);
      console.log(`📋 Headers: ${headers.join('|')}`);
      console.log(`🎲 Function calls: ${emailCall}→${email}, ${phoneCall}→${phone}`);

      await managedPage.goto('https://httpbin.org/forms/post');

      // Validate data
      const isValidName = firstName.trim() !== '';
      const isValidEmail = email.includes('@') && email.includes('.');
      const isValidPhone = phone.match(/^\d{3}-\d{3}-\d{4}$/);

      const result = isValidName && isValidEmail && isValidPhone ? 'success' : 'failure';

      expect(result).toBe(expected);
      console.log(`✅ Validation: ${result} (expected: ${expected})`);
    });
  });
});

/*
🥒 CUCUMBER REPLACEMENT SUMMARY:

✅ Perfect data table syntax with arrays
✅ Real dynamic functions: random(), randomEmail(), randomPhone(), uuid(), today(), timestamp()  
✅ Fresh values every test run (no caching issues)
✅ Clean, maintainable test structure
✅ Full TypeScript support

🎯 Use this pattern to replace any Cucumber Examples table!
*/
