# 🥒 Data Tables Guide: Cucumber-Style Tables in Playwright

This guide covers the **data tables functionality** that provides a perfect replacement for Cucumber's `Examples` tables directly in Playwright test files. You get all the visual benefits of pipe-delimited tables with the power of JavaScript functions and fresh dynamic values.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Basic Syntax](#basic-syntax)
3. [Dynamic Functions](#dynamic-functions)
4. [Advanced Features](#advanced-features)
5. [Best Practices](#best-practices)
6. [Real-World Examples](#real-world-examples)
7. [Migration from Cucumber](#migration-from-cucumber)

---

## Overview

The data tables system allows you to write **Cucumber-style pipe-delimited tables** directly in your Playwright test files with:

✅ **Authentic Cucumber syntax**: `| column | data |`  
✅ **Real function calls**: `${randomEmail()}`, `${randomPhone()}`  
✅ **Fresh dynamic values**: No caching, new values every test run  
✅ **Template literal parsing**: Full TypeScript support with IntelliSense  
✅ **Empty value handling**: `${empty()}` for missing data scenarios  

### Why Use Data Tables?

- **Visual Clarity**: Tables are easier to read than arrays or objects
- **Dynamic Data**: Generate fresh test data every execution
- **Maintainability**: Add/modify test cases without touching test logic
- **Cucumber Migration**: Perfect replacement when moving from Cucumber to pure Playwright

---

## Basic Syntax

### 1. Simple Static Table

```typescript
const testData = table`
  | name     | age | city      |
  | Alice    | 25  | New York  |
  | Bob      | 30  | London    |
  | Charlie  | 35  | Tokyo     |
`;

const [headers, ...rows] = testData;
```

### 2. Table with Dynamic Values

```typescript
const testData = table`
  | firstName | lastName | email            | phone            |
  | John      | Doe      | ${randomEmail()} | ${randomPhone()} |
  | Alice     | Smith    | ${randomEmail()} | ${randomPhone()} |
`;
```

### 3. Table with Headers and Test Loop

```typescript
const testDataWithHeaders = table`
  | firstName    | lastName | email            | phone            | scenario      | expected |
  | John         | Doe      | ${randomEmail()} | ${randomPhone()} | Valid user    | success  |
  | ${empty()}   | Smith    | ${randomEmail()} | ${randomPhone()} | Missing name  | failure  |
`;

const [headers, ...testData] = testDataWithHeaders;

testData.forEach(([firstName, lastName, email, phone, scenario, expected], index) => {
  test(`Data Table ${index + 1}: ${scenario}`, async ({ managedPage }) => {
    // Test implementation here
    console.log(`Testing: ${firstName}, ${lastName}, ${email}, ${phone}`);
  });
});
```

---

## Dynamic Functions

### Built-in Helper Functions

The system includes several helper functions for generating dynamic test data:

#### String Generators
```typescript
const random = () => Math.random().toString(36).substring(2, 8);
// Example output: "x7k9m2"

const uuid = () => crypto.randomUUID();
// Example output: "550e8400-e29b-41d4-a716-446655440000"
```

#### Contact Information
```typescript
const randomEmail = () => `test_${random()}@example.com`;
// Example output: "test_x7k9m2@example.com"

const randomPhone = () => 
  `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
// Example output: "627-797-7842"
```

#### Date/Time Functions
```typescript
const today = () => new Date().toISOString().split('T')[0];
// Example output: "2025-10-09"

const timestamp = () => Date.now().toString();
// Example output: "1728456789123"
```

#### Special Functions
```typescript
const empty = () => ''; 
// Returns empty string for template literals - perfect for missing data scenarios
```

### Custom Functions

You can create your own dynamic functions:

```typescript
// Custom generators
const randomAge = () => Math.floor(Math.random() * 80) + 18; // 18-98
const randomCity = () => ['New York', 'London', 'Tokyo', 'Paris'][Math.floor(Math.random() * 4)];
const randomStatus = () => Math.random() > 0.5 ? 'active' : 'inactive';

// Use in tables
const userData = table`
  | name     | age          | city           | status           |
  | Alice    | ${randomAge()} | ${randomCity()} | ${randomStatus()} |
  | Bob      | ${randomAge()} | ${randomCity()} | ${randomStatus()} |
`;
```

---

## Advanced Features

### 1. Empty Value Handling

Use the `${empty()}` function for test cases that require missing data:

```typescript
const loginTests = table`
  | username     | password     | scenario           | expected |
  | validuser    | validpass    | Valid credentials  | success  |
  | ${empty()}   | validpass    | Missing username   | failure  |
  | validuser    | ${empty()}   | Missing password   | failure  |
  | ${empty()}   | ${empty()}   | Missing both       | failure  |
`;
```

### 2. Complex Data Scenarios

```typescript
const apiTests = table`
  | method | endpoint      | payload                    | expectedStatus | expectedField |
  | GET    | /users        | ${empty()}                 | 200           | users        |
  | POST   | /users        | {"name":"${random()}"}     | 201           | id           |
  | PUT    | /users/1      | {"email":"${randomEmail()}"} | 200           | email        |
  | DELETE | /users/1      | ${empty()}                 | 204           | ${empty()}   |
`;
```

### 3. Multi-Step Test Scenarios

```typescript
const workflowTests = table`
  | step1Action | step1Data        | step2Action | step2Data        | step3Action | expected     |
  | login       | ${randomEmail()} | navigate    | /dashboard       | verify      | success      |
  | login       | invalid@test     | navigate    | /dashboard       | verify      | failure      |
  | register    | ${randomEmail()} | verify      | ${empty()}       | login       | success      |
`;
```

---

## Best Practices

### 1. Use Descriptive Headers
```typescript
// ✅ Good - Clear column names
const testData = table`
  | firstName | lastName | email            | expectedResult |
  | John      | Doe      | ${randomEmail()} | success       |
`;

// ❌ Avoid - Unclear column names  
const testData = table`
  | data1 | data2 | data3        | result |
  | John  | Doe   | ${randomEmail()} | success |
`;
```

### 2. Group Related Test Cases
```typescript
// ✅ Good - Logical grouping
const validationTests = table`
  | scenario           | firstName    | lastName | email            | expected |
  | Valid data        | John         | Doe      | ${randomEmail()} | success  |
  | Missing first     | ${empty()}   | Doe      | ${randomEmail()} | failure  |
  | Missing last      | John         | ${empty()} | ${randomEmail()} | failure  |
  | Invalid email     | John         | Doe      | invalid-email    | failure  |
`;
```

### 3. Keep Tables Readable
```typescript
// ✅ Good - Aligned columns for readability
const testData = table`
  | firstName    | lastName | email            | phone            | scenario      |
  | John         | Doe      | ${randomEmail()} | ${randomPhone()} | Valid user    |
  | ${empty()}   | Smith    | ${randomEmail()} | ${randomPhone()} | Missing name  |
`;

// ⚠️ Still works but harder to read
const testData = table`
  | firstName|lastName|email|phone|scenario|
  | John|Doe|${randomEmail()}|${randomPhone()}|Valid user|
`;
```

### 4. Use Meaningful Test Names
```typescript
testData.forEach(([firstName, lastName, email, phone, scenario, expected], index) => {
  test(`${scenario} - Test ${index + 1}`, async ({ managedPage }) => {
    // Use scenario name in test description for better reporting
  });
});
```

---

## Real-World Examples

### 1. Form Validation Testing

```typescript
const formTests = table`
  | firstName    | lastName    | email            | phone            | scenario           | expected |
  | John         | Doe         | ${randomEmail()} | ${randomPhone()} | Valid form         | success  |
  | ${empty()}   | Doe         | ${randomEmail()} | ${randomPhone()} | Missing first name | failure  |
  | John         | ${empty()}  | ${randomEmail()} | ${randomPhone()} | Missing last name  | failure  |
  | John         | Doe         | invalid-email    | ${randomPhone()} | Invalid email      | failure  |
  | John         | Doe         | ${randomEmail()} | invalid-phone    | Invalid phone      | failure  |
`;

const [headers, ...testData] = formTests;

testData.forEach(([firstName, lastName, email, phone, scenario, expected], index) => {
  test(`Form Validation ${index + 1}: ${scenario}`, async ({ managedPage }) => {
    await managedPage.goto('https://example.com/form');
    
    if (firstName) await managedPage.fill('#firstName', firstName);
    if (lastName) await managedPage.fill('#lastName', lastName);  
    if (email) await managedPage.fill('#email', email);
    if (phone) await managedPage.fill('#phone', phone);
    
    await managedPage.click('#submit');
    
    const isValid = firstName && lastName && email.includes('@') && phone.match(/^\d{3}-\d{3}-\d{4}$/);
    const result = isValid ? 'success' : 'failure';
    
    expect(result).toBe(expected);
  });
});
```

### 2. API Testing with Data Tables

```typescript
const apiTests = table`
  | method | endpoint      | payload                         | expectedStatus | description        |
  | GET    | /users        | ${empty()}                      | 200           | Get all users      |
  | POST   | /users        | {"name":"${random()}"}          | 201           | Create user        |
  | GET    | /users/1      | ${empty()}                      | 200           | Get specific user  |
  | PUT    | /users/1      | {"email":"${randomEmail()}"}    | 200           | Update user        |
  | DELETE | /users/1      | ${empty()}                      | 204           | Delete user        |
`;

const [headers, ...testData] = apiTests;

testData.forEach(([method, endpoint, payload, expectedStatus, description], index) => {
  test(`API ${index + 1}: ${description}`, async ({ request }) => {
    const options: any = { data: payload || undefined };
    
    let response;
    switch (method) {
      case 'GET': response = await request.get(`https://jsonplaceholder.typicode.com${endpoint}`); break;
      case 'POST': response = await request.post(`https://jsonplaceholder.typicode.com${endpoint}`, options); break;  
      case 'PUT': response = await request.put(`https://jsonplaceholder.typicode.com${endpoint}`, options); break;
      case 'DELETE': response = await request.delete(`https://jsonplaceholder.typicode.com${endpoint}`); break;
    }
    
    expect(response.status()).toBe(parseInt(expectedStatus));
    console.log(`✅ ${method} ${endpoint}: ${response.status()}`);
  });
});
```

### 3. E-commerce Testing Scenarios

```typescript
const ecommerceTests = table`
  | product      | quantity | coupon       | expectedTotal | scenario              |
  | Laptop       | 1        | ${empty()}   | 999.99       | Single item           |
  | Mouse        | 2        | SAVE10       | 45.00        | Multiple with coupon  |
  | Keyboard     | 1        | INVALID      | 79.99        | Invalid coupon        |
  | Monitor      | 3        | BULK20       | 720.00       | Bulk discount         |
`;
```

---

## Migration from Cucumber

### Before (Cucumber Examples)
```gherkin
Scenario Outline: User registration validation
  Given I am on the registration page
  When I fill in the form with "<firstName>", "<lastName>", "<email>", "<phone>"
  Then I should see "<expected>" result

  Examples:
    | firstName | lastName | email            | phone        | expected |
    | John      | Doe      | john@example.com | 123-456-7890 | success  |
    |           | Doe      | doe@example.com  | 123-456-7890 | failure  |
    | John      |          | john@example.com | 123-456-7890 | failure  |
```

### After (Playwright Data Tables)
```typescript
const registrationTests = table`
  | firstName    | lastName | email            | phone            | expected |
  | John         | Doe      | ${randomEmail()} | ${randomPhone()} | success  |
  | ${empty()}   | Doe      | ${randomEmail()} | ${randomPhone()} | failure  |
  | John         | ${empty()} | ${randomEmail()} | ${randomPhone()} | failure  |
`;

const [headers, ...testData] = registrationTests;

testData.forEach(([firstName, lastName, email, phone, expected], index) => {
  test(`Registration ${index + 1}: ${firstName || 'Missing'} ${lastName || 'Missing'}`, async ({ managedPage }) => {
    await managedPage.goto('/registration');
    
    if (firstName) await managedPage.fill('#firstName', firstName);
    if (lastName) await managedPage.fill('#lastName', lastName);
    if (email) await managedPage.fill('#email', email);
    if (phone) await managedPage.fill('#phone', phone);
    
    await managedPage.click('#submit');
    
    const result = (firstName && lastName) ? 'success' : 'failure';
    expect(result).toBe(expected);
  });
});
```

### Key Migration Benefits

1. **Dynamic Data**: `${randomEmail()}` generates fresh data every run
2. **Better IDE Support**: Full TypeScript IntelliSense and debugging
3. **No Step Definitions**: Direct test implementation in the same file
4. **Flexible Logic**: Complex validations without Cucumber constraints
5. **Better Performance**: No Gherkin parsing overhead
6. **Rich Assertions**: Full Playwright assertion library

---

## Template Literal Parser Implementation

The `table` function uses tagged template literals to parse pipe-delimited tables:

```typescript
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
```

This parser:
- ✅ Handles template literal interpolation (`${function()}`)
- ✅ Preserves column alignment and empty cells
- ✅ Removes table borders but keeps internal empty values
- ✅ Supports multi-line tables with proper formatting

---

## Troubleshooting

### Common Issues

1. **Empty cells not handled**: Use `${empty()}` instead of leaving cells blank
2. **Functions cached**: Make sure functions are called inside the `forEach` loop, not at module level
3. **Column misalignment**: Ensure pipe characters `|` are properly aligned
4. **Template literal errors**: Check that all `${}` expressions are valid JavaScript

### Debugging Tips

```typescript
// Add console.log to see parsed table structure
const testData = table`...`;
console.log('Parsed table:', testData);

// Log individual values during test execution
testData.forEach(([col1, col2, col3]) => {
  console.log(`Values: ${col1}, ${col2}, ${col3}`);
  // Test code here
});
```

---

## Summary

Data tables provide the perfect bridge between Cucumber's visual table syntax and Playwright's powerful testing capabilities. You get:

- 🎯 **Visual clarity** of Cucumber Examples tables
- ⚡ **Dynamic data generation** with fresh values every run  
- 🔧 **Full TypeScript support** with IntelliSense and type safety
- 🚀 **Better performance** without Gherkin parsing overhead
- 💪 **More flexibility** for complex test logic and assertions

This system makes your tests more maintainable, readable, and powerful while preserving the familiar table-driven testing approach from Cucumber.