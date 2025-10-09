import { test, expect } from '../test-base';

// 🎲 Dynamic value generators (called fresh in each test)
const random = () => Math.random().toString(36).substring(2, 8);
const randomEmail = () => `test_${random()}@example.com`;
const randomPhone = () =>
  `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
const uuid = () => crypto.randomUUID();
const empty = () => ''; // 🎯 Function that returns empty string for template literals

// 🏆 **DATA TABLES WITH DYNAMIC VALUES**
test.describe('🥒 Cucumber-Style Data Tables', () => {
  // 🚀 Template literal parser for pipe-delimited tables with function calls
  function table(strings: TemplateStringsArray, ...values: any[]) {
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
      result += String(values[i]) + strings[i + 1];
    }
    return result
      .trim()
      .split('\n')
      .map((line) => {
        // Split by | and trim, preserving empty cells for column alignment
        const cells = line.split('|').map((cell) => cell.trim());
        // Remove only table border cells (first/last empty), keep internal empty cells
        if (cells.length > 0 && cells[0] === '') cells.shift();
        if (cells.length > 0 && cells[cells.length - 1] === '') cells.pop();
        return cells;
      })
      .filter((row) => row.length > 0);
  }

  // 🎯 Perfect Cucumber table with real function calls!
  const testDataWithHeaders = table`
    | firstName    | lastName | email            | phone            | scenario       | expected |
    | John         | Doe      | ${randomEmail()} | ${randomPhone()} | Valid user     | success  |
    | ${empty()}   | Smith    | ${randomEmail()} | ${randomPhone()} | Missing name   | failure  |
    | Alice        | Brown    | invalid-email    | ${randomPhone()} | Invalid email  | failure  |
    | Bob          | Wilson   | ${randomEmail()} | invalid-phone    | Invalid phone  | failure  |
    | Charlie      | Davis    | ${randomEmail()} | ${randomPhone()} | Valid user     | success  |
  `;

  const [headers, ...testData] = testDataWithHeaders;

  testData.forEach(([firstName, lastName, email, phone, scenario, expected], index) => {
    test(`Data Table ${index + 1}: ${scenario}`, async ({ managedPage }) => {
      // � Functions already executed! No need to evaluate - values are ready to use!
      const testId = uuid().slice(0, 6);
      const sessionId = random();

      console.log(`🥒 Testing: ${scenario} [${testId}] Session: ${sessionId}`);
      console.log(`📊 Data: ${firstName}|${lastName}|${email}|${phone}`);
      console.log(`🎯 Dynamic values: ${email}, ${phone}`);

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
🥒 ULTIMATE CUCUMBER DATA TABLES REPLACEMENT

✅ Authentic pipe-delimited Cucumber syntax: | column | data |
✅ Real function calls in tables: ${randomEmail()}, ${randomPhone()}, ${empty()}
✅ Fresh dynamic values every test execution (no caching)
✅ Perfect empty value handling with ${empty()} function
✅ Template literal parsing preserves column alignment
✅ Full TypeScript support with IntelliSense
✅ Clean, maintainable, and visually identical to Gherkin Examples

🎯 This is the perfect Cucumber Examples table replacement!
*/
