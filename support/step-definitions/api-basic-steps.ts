import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld, APIResponse } from '../world';

// Helper function to parse response body
async function parseResponseBody(response: any): Promise<any> {
  const contentType = response.headers()['content-type'] || '';

  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return await response.text();
    }
  }

  return await response.text();
}

// ========================================
// API SETUP AND INITIALIZATION
// ========================================

Given('I have access to API testing capabilities', async function (this: CustomWorld) {
  await this.initializeApiContext();
  console.log('✓ API testing context initialized');
});

// ========================================
// BASIC API REQUEST STEPS (LESSON 6)
// ========================================

When('I make a GET request to {string}', async function (this: CustomWorld, url: string) {
  if (!this.apiContext) {
    await this.initializeApiContext();
  }

  console.log(`→ Making GET request to: ${url}`);
  const startTime = Date.now();

  try {
    const response = await this.apiContext!.get(url);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    this.currentResponse = {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: await parseResponseBody(response),
      responseTime,
      url,
    };

    console.log(`✓ GET request completed - Status: ${this.currentResponse.status}`);
  } catch (error) {
    console.error(`✗ Failed to make GET request: ${error}`);
    throw error;
  }
});

When('I make a DELETE request to {string}', async function (this: CustomWorld, url: string) {
  if (!this.apiContext) {
    await this.initializeApiContext();
  }

  console.log(`→ Making DELETE request to: ${url}`);
  const startTime = Date.now();

  try {
    const response = await this.apiContext!.delete(url);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    this.currentResponse = {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: await parseResponseBody(response),
      responseTime,
      url,
    };

    console.log(`✓ DELETE request completed - Status: ${this.currentResponse.status}`);
  } catch (error) {
    console.error(`✗ Failed to make DELETE request: ${error}`);
    throw error;
  }
});

// ========================================
// REQUEST BUILDING STEPS (LESSON 7)
// ========================================

When(
  'I create a {word} request to {string}',
  async function (this: CustomWorld, method: string, url: string) {
    if (!this.apiContext) {
      await this.initializeApiContext();
    }

    console.log(`→ Preparing ${method.toUpperCase()} request to: ${url}`);

    this.currentRequest = {
      url,
      method: method.toUpperCase(),
      headers: {},
    };
  }
);

When(
  'I set the {string} header to {string}',
  async function (this: CustomWorld, headerName: string, headerValue: string) {
    if (!this.currentRequest) {
      throw new Error('No active request to set headers on');
    }

    this.currentRequest.headers[headerName] = headerValue;
    console.log(`→ Set header ${headerName}: ${headerValue}`);
  }
);

When('I set the request body to:', async function (this: CustomWorld, bodyContent: string) {
  if (!this.currentRequest) {
    throw new Error('No active request to set body on');
  }

  try {
    this.currentRequest.body = JSON.parse(bodyContent);
    console.log('→ JSON request body set');
  } catch (error) {
    // If it's not JSON, treat as plain text
    this.currentRequest.body = bodyContent;
    console.log('→ Plain text request body set');
  }
});

// ========================================
// RESPONSE VALIDATION STEPS
// ========================================

Then('I should receive a successful response', async function (this: CustomWorld) {
  // Execute pending request if needed
  if (!this.currentResponse && this.currentRequest) {
    await executeRequest.call(this);
  }

  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.status).toBeGreaterThanOrEqual(200);
  expect(this.currentResponse.status).toBeLessThan(300);
  console.log(`✓ Received successful response (${this.currentResponse.status})`);
});

Then('I should receive a successful creation response', async function (this: CustomWorld) {
  // Execute pending request if needed
  if (!this.currentResponse && this.currentRequest) {
    await executeRequest.call(this);
  }

  expect(this.currentResponse!.status).toBe(201);
  console.log('✓ Resource created successfully (201)');
});

Then('I should receive a successful deletion response', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect([200, 204]).toContain(this.currentResponse.status);
  console.log(`✓ Resource deleted successfully (${this.currentResponse.status})`);
});

Then('I should receive a not found response', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.status).toBe(404);
  console.log('✓ Received expected 404 Not Found response');
});

Then(
  'the response status should be {int}',
  async function (this: CustomWorld, expectedStatus: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.status).toBe(expectedStatus);
    console.log(`✓ Response status is ${expectedStatus}`);
  }
);

Then('the response should contain JSON data', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toBeDefined();
  expect(typeof this.currentResponse.body).toBe('object');
  console.log('✓ Response contains valid JSON data');
});

Then('the response should be a JSON array', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(Array.isArray(this.currentResponse.body)).toBe(true);
  console.log(`✓ Response is a JSON array with ${this.currentResponse.body.length} items`);
});

Then(
  'the response should have a {string} field',
  async function (this: CustomWorld, fieldName: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body).toHaveProperty(fieldName);
    console.log(`✓ Response has field: ${fieldName}`);
  }
);

Then(
  'the response should have {string} field',
  async function (this: CustomWorld, fieldName: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body).toHaveProperty(fieldName);
    console.log(`✓ Response has field: ${fieldName}`);
  }
);

Then(
  'the response should have {string} field with value {int}',
  async function (this: CustomWorld, fieldName: string, expectedValue: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body).toHaveProperty(fieldName, expectedValue);
    console.log(`✓ Response has ${fieldName} = ${expectedValue}`);
  }
);

Then(
  'the response should have an {string} field with value {int}',
  async function (this: CustomWorld, fieldName: string, expectedValue: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body).toHaveProperty(fieldName, expectedValue);
    console.log(`✓ Response has ${fieldName} = ${expectedValue}`);
  }
);

Then(
  'the response should have {string} as {string}',
  async function (this: CustomWorld, fieldName: string, expectedValue: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body[fieldName]).toBe(expectedValue);
    console.log(`✓ Response has ${fieldName} = "${expectedValue}"`);
  }
);

Then(
  'the response should contain at least {int} items',
  async function (this: CustomWorld, minItems: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(Array.isArray(this.currentResponse.body)).toBe(true);
    expect(this.currentResponse.body.length).toBeGreaterThanOrEqual(minItems);
    console.log(`✓ Response contains ${this.currentResponse.body.length} items (>= ${minItems})`);
  }
);

Then(
  'the response should contain exactly {int} users',
  async function (this: CustomWorld, expectedCount: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(Array.isArray(this.currentResponse.body)).toBe(true);
    expect(this.currentResponse.body.length).toBe(expectedCount);
    console.log(`✓ Response contains exactly ${expectedCount} users`);
  }
);

Then(
  'the response time should be less than {int} milliseconds',
  async function (this: CustomWorld, maxTime: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.responseTime).toBeLessThan(maxTime);
    console.log(`✓ Response time: ${this.currentResponse.responseTime}ms (< ${maxTime}ms)`);
  }
);

Then(
  'each item should have {string}, {string}, and {string} fields',
  async function (this: CustomWorld, field1: string, field2: string, field3: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(Array.isArray(this.currentResponse.body)).toBe(true);

    const fields = [field1, field2, field3];
    this.currentResponse.body.forEach((item: any, index: number) => {
      fields.forEach((field) => {
        expect(item).toHaveProperty(field);
      });
    });

    console.log(`✓ All items have required fields: ${fields.join(', ')}`);
  }
);

Then(
  'each user should have {string}, {string}, and {string} fields',
  async function (this: CustomWorld, field1: string, field2: string, field3: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(Array.isArray(this.currentResponse.body)).toBe(true);

    const fields = [field1, field2, field3];
    this.currentResponse.body.forEach((user: any) => {
      fields.forEach((field) => {
        expect(user).toHaveProperty(field);
      });
    });

    console.log(`✓ All users have required fields: ${fields.join(', ')}`);
  }
);

Then(
  'the response should contain a user with id {int}',
  async function (this: CustomWorld, expectedId: number) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body).toHaveProperty('id', expectedId);
    console.log(`✓ Response contains user with id ${expectedId}`);
  }
);

Then('the user should have a valid email format', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  const email = this.currentResponse.body.email;
  expect(email).toBeDefined();
  expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  console.log(`✓ User has valid email format: ${email}`);
});

Then('the user should have address information', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toHaveProperty('address');
  expect(typeof this.currentResponse.body.address).toBe('object');
  console.log('✓ User has address information');
});

Then('the user should have company information', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toHaveProperty('company');
  expect(typeof this.currentResponse.body.company).toBe('object');
  console.log('✓ User has company information');
});

// ========================================
// HELPER FUNCTIONS
// ========================================

async function executeRequest(this: CustomWorld) {
  if (!this.currentRequest) {
    throw new Error('No request prepared to execute');
  }

  const startTime = Date.now();
  const { url, method, headers, body } = this.currentRequest;

  try {
    let response;
    const options: any = {
      headers,
      data: body,
    };

    switch (method) {
      case 'POST':
        response = await this.apiContext!.post(url, options);
        break;
      case 'PUT':
        response = await this.apiContext!.put(url, options);
        break;
      case 'PATCH':
        response = await this.apiContext!.patch(url, options);
        break;
      case 'DELETE':
        response = await this.apiContext!.delete(url, { headers });
        break;
      case 'GET':
        response = await this.apiContext!.get(url, { headers });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    this.currentResponse = {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: await parseResponseBody(response),
      responseTime,
      url,
    };

    console.log(`✓ ${method} request completed - Status: ${this.currentResponse.status}`);
  } catch (error) {
    console.error(`✗ Failed to execute ${method} request: ${error}`);
    throw error;
  }
}
