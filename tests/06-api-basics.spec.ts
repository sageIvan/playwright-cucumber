import { test, expect } from '@playwright/test';

test.describe("Lesson 6 - Introduction to API Testing", () => {
  let baseUrl: string;
  let authToken: string;

  // 🔧 API Setup - beforeAll for expensive operations
  test.beforeAll(async ({ request }) => {
    console.log('🌐 Setting up API testing environment');
    
    baseUrl = 'https://jsonplaceholder.typicode.com';
    
    // Example: Get authentication token (if your API needs it)
    // const authResponse = await request.post(`${baseUrl}/auth/login`, {
    //   data: { username: 'testuser', password: 'testpass' }
    // });
    // authToken = (await authResponse.json()).token;
    
    console.log('✅ API environment ready');
  });

  // 🔄 Setup before each API test
  test.beforeEach(async ({ request }) => {
    console.log('🎯 Preparing API test context');
    
    // Example: Verify API is healthy before each test
    const healthCheck = await request.get(`${baseUrl}/posts/1`);
    expect(healthCheck.ok()).toBeTruthy();
  });

  // 🧹 Cleanup after each API test  
  test.afterEach(async ({ request }, testInfo) => {
    console.log(`🧹 API test cleanup for: ${testInfo.title}`);
    
    // Example: Clean up any test data created during the test
    // if (testInfo.annotations.some(a => a.type === 'cleanup-needed')) {
    //   // Delete test resources
    // }
  });

  test("Understanding what an API is", async ({ request }) => {
    console.log('📡 Testing basic API understanding');
    
    // Simple GET request to understand API response structure
    const response = await request.get(`${baseUrl}/posts/1`);
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('title');
    expect(data).toHaveProperty('body');
    
    console.log('✅ API structure validated');
  });

  test("Getting a list of data from an API", async ({ request }) => {
    console.log('📋 Testing API list retrieval');
    
    const response = await request.get(`${baseUrl}/posts`);
    
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    
    // Validate first item structure
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('userId');
    
    console.log(`✅ Retrieved ${posts.length} posts successfully`);
  });

  test("Checking response times and performance", async ({ request }) => {
    console.log('⏱️ Testing API performance');
    
    const startTime = Date.now();
    const response = await request.get(`${baseUrl}/posts`);
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    
    expect(response.ok()).toBeTruthy();
    expect(responseTime).toBeLessThan(2000); // Should respond within 2 seconds
    
    console.log(`✅ API responded in ${responseTime}ms`);
  });

  test("Testing different types of data", async ({ request }) => {
    console.log('🔍 Testing different API data types');
    
    // Test posts data
    const postsResponse = await request.get(`${baseUrl}/posts/1`);
    const post = await postsResponse.json();
    
    expect(typeof post.id).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.userId).toBe('number');
    
    // Test users data  
    const usersResponse = await request.get(`${baseUrl}/users/1`);
    const user = await usersResponse.json();
    
    expect(typeof user.id).toBe('number');
    expect(typeof user.name).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(user.address).toHaveProperty('geo');
    
    console.log('✅ Data type validation completed');
  });

});
