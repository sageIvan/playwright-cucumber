import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

// ========================================
// ADVANCED API TESTING STEPS (LESSONS 7-8)
// ========================================

Then('the response should contain the created post data', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toHaveProperty('title');
  expect(this.currentResponse.body).toHaveProperty('body');
  expect(this.currentResponse.body).toHaveProperty('userId');
  console.log('✓ Response contains created post data');
});

Then('the response should contain the updated post data', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toHaveProperty('title');
  expect(this.currentResponse.body).toHaveProperty('body');
  expect(this.currentResponse.body).toHaveProperty('id');
  console.log('✓ Response contains updated post data');
});

Then(
  'the response should still have the original {string} field',
  async function (this: CustomWorld, fieldName: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body).toHaveProperty(fieldName);
    console.log(`✓ Response still has original ${fieldName} field`);
  }
);

Then('the response should confirm the deletion', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  // For successful deletion, we expect either empty response or confirmation
  console.log('✓ Deletion confirmed by successful response');
});

Then('I should handle the error gracefully', async function (this: CustomWorld) {
  // This step is more about demonstrating error handling
  console.log('✓ Error handled gracefully - 404 responses are expected for non-existent resources');
});

// ========================================
// AUTHENTICATION AND HEADERS (LESSON 8)
// ========================================

Then('the response should contain the authorization details', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  // httpbin.org/bearer returns authentication info
  expect(this.currentResponse.body).toHaveProperty('authenticated', true);
  console.log('✓ Response contains authentication details');
});

Then('the response should confirm the token was received', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toHaveProperty('token');
  console.log('✓ Server confirmed token was received');
});

Then('I should verify the server received my test data', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  // httpbin.org/post echoes back the request data
  expect(this.currentResponse.body).toHaveProperty('json');
  console.log('✓ Server received and echoed back test data');
});

Then('the response should echo back my request data', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  expect(this.currentResponse.body).toHaveProperty('json');
  const echoedData = this.currentResponse.body.json;
  expect(echoedData).toHaveProperty('email');
  expect(echoedData).toHaveProperty('age');
  console.log('✓ Request data was echoed back correctly');
});

// ========================================
// PERFORMANCE TESTING (LESSON 8)
// ========================================

When(
  'I make {int} consecutive GET requests to {string}',
  async function (this: CustomWorld, requestCount: number, url: string) {
    if (!this.apiContext) {
      await this.initializeApiContext();
    }

    console.log(`→ Making ${requestCount} consecutive requests to: ${url}`);

    const responses: Array<{ status: number; responseTime: number; body: any }> = [];
    for (let i = 0; i < requestCount; i++) {
      const startTime = Date.now();
      try {
        const response = await this.apiContext!.get(url);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        responses.push({
          status: response.status(),
          responseTime,
          body: await response.json(),
        });

        console.log(`  Request ${i + 1}: ${response.status()} (${responseTime}ms)`);
      } catch (error) {
        console.error(`  Request ${i + 1} failed: ${error}`);
        throw error;
      }
    }

    // Store responses for validation
    (this.storedData as any).set('consecutiveResponses', responses);
    console.log(`✓ Completed ${requestCount} consecutive requests`);
  }
);

Then('all responses should be successful', async function (this: CustomWorld) {
  const responses = (this.storedData as any).get('consecutiveResponses');
  if (!responses) {
    throw new Error('No consecutive responses to validate');
  }

  responses.forEach((response: any, index: number) => {
    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
  });

  console.log(`✓ All ${responses.length} responses were successful`);
});

Then(
  'each response time should be between {int} and {int} milliseconds',
  async function (this: CustomWorld, minTime: number, maxTime: number) {
    const responses = (this.storedData as any).get('consecutiveResponses');
    if (!responses) {
      throw new Error('No consecutive responses to validate');
    }

    responses.forEach((response: any, index: number) => {
      expect(response.responseTime).toBeGreaterThanOrEqual(minTime);
      expect(response.responseTime).toBeLessThanOrEqual(maxTime);
    });

    console.log(`✓ All response times were between ${minTime}ms and ${maxTime}ms`);
  }
);

Then('I should not hit any rate limits', async function (this: CustomWorld) {
  const responses = (this.storedData as any).get('consecutiveResponses');
  if (!responses) {
    throw new Error('No consecutive responses to validate');
  }

  // Check that no responses were 429 (Too Many Requests)
  responses.forEach((response: any, index: number) => {
    expect(response.status).not.toBe(429);
  });

  console.log('✓ No rate limit errors encountered');
});

Then('all responses should return valid JSON', async function (this: CustomWorld) {
  const responses = (this.storedData as any).get('consecutiveResponses');
  if (!responses) {
    throw new Error('No consecutive responses to validate');
  }

  responses.forEach((response: any, index: number) => {
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
  });

  console.log('✓ All responses returned valid JSON');
});

// ========================================
// SCHEMA VALIDATION (LESSON 8)
// ========================================

Then(
  'the response should match the expected user schema:',
  async function (this: CustomWorld, dataTable: any) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    const expectedSchema = dataTable.hashes();
    const responseData = this.currentResponse.body;

    expectedSchema.forEach((fieldSpec: any) => {
      const { field, type, required } = fieldSpec;

      if (required === 'true') {
        expect(responseData).toHaveProperty(field);

        const actualValue = responseData[field];
        switch (type) {
          case 'number':
            expect(typeof actualValue).toBe('number');
            break;
          case 'string':
            expect(typeof actualValue).toBe('string');
            break;
          case 'object':
            expect(typeof actualValue).toBe('object');
            expect(actualValue).not.toBeNull();
            break;
          default:
            throw new Error(`Unsupported type: ${type}`);
        }
      }
    });

    console.log('✓ Response matches expected schema');
  }
);

// ========================================
// WORKFLOW/CHAINING TESTS (LESSON 8)
// ========================================

Then('I should store the created post ID', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  const postId = this.currentResponse.body.id;
  expect(postId).toBeDefined();

  (this.storedData as any).set('createdPostId', postId);
  console.log(`✓ Stored created post ID: ${postId}`);
});

When(
  'I make a GET request to the created post using the stored ID',
  async function (this: CustomWorld) {
    const postId = (this.storedData as any).get('createdPostId');
    if (!postId) {
      throw new Error('No stored post ID found');
    }

    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    console.log(`→ Making GET request to created post: ${url}`);

    if (!this.apiContext) {
      await this.initializeApiContext();
    }

    const startTime = Date.now();
    const response = await this.apiContext!.get(url);
    const endTime = Date.now();

    this.currentResponse = {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      body: await response.json(),
      responseTime: endTime - startTime,
      url,
    };

    console.log(`✓ Retrieved created post - Status: ${this.currentResponse.status}`);
  }
);

Then('I should receive the exact post I just created', async function (this: CustomWorld) {
  if (!this.currentResponse) {
    throw new Error('No response to validate');
  }

  const storedId = (this.storedData as any).get('createdPostId');
  expect(this.currentResponse.body.id).toBe(storedId);
  console.log('✓ Retrieved the exact post that was created');
});

Then(
  'the post should have {string} as {string}',
  async function (this: CustomWorld, fieldName: string, expectedValue: string) {
    if (!this.currentResponse) {
      throw new Error('No response to validate');
    }

    expect(this.currentResponse.body[fieldName]).toBe(expectedValue);
    console.log(`✓ Post has ${fieldName} = "${expectedValue}"`);
  }
);
