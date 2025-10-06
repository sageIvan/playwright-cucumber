@tutorial @lesson-8 @api
Feature: Lesson 8 - Advanced API Testing and Authentication
    As an advanced learner of API automation
    I want to test APIs with authentication and complex scenarios
    So that I can test real-world API applications

    Background:
        Given I have access to API testing capabilities

    @api @hard @authentication
    Scenario: Testing APIs with authentication headers
        # Many real APIs require you to prove who you are (like showing ID)
        When I create a GET request to "https://httpbin.org/bearer"
        And I set the "Authorization" header to "Bearer my-secret-token"
        Then I should receive a successful response
        And the response should contain the authorization details
        And the response should confirm the token was received

    @api @hard @validation
    Scenario: Testing input validation and error handling
        # Testing what happens when we send bad data (like ordering non-existent food)
        When I create a POST request to "https://httpbin.org/post"
        And I set the request body to:
            """
            {
                "email": "invalid-email",
                "age": "not-a-number",
                "required_field": null
            }
            """
        And I set the "Content-Type" header to "application/json"
        Then I should receive a successful response
        And I should verify the server received my test data
        And the response should echo back my request data

    @api @expert @performance
    Scenario: Testing API performance and rate limits
        # Making sure the API can handle multiple requests quickly
        When I make 5 consecutive GET requests to "https://httpbin.org/delay/1"
        Then all responses should be successful
        And each response time should be between 1000 and 3000 milliseconds
        And I should not hit any rate limits
        And all responses should return valid JSON

    @api @expert @data-validation
    Scenario: Complex data validation and schema testing
        # Making sure the API returns data in the exact format we expect
        When I make a GET request to "https://jsonplaceholder.typicode.com/users/1"
        Then I should receive a successful response
        And the response should match the expected user schema:
            | field    | type   | required |
            | id       | number | true     |
            | name     | string | true     |
            | username | string | true     |
            | email    | string | true     |
            | address  | object | true     |
            | phone    | string | true     |
            | website  | string | true     |
            | company  | object | true     |

    @api @expert @chaining
    Scenario: Testing API workflows (chaining requests)
        # Testing a complete workflow: create something, then use it, then clean up
        When I create a POST request to "https://jsonplaceholder.typicode.com/posts"
        And I set the request body to:
            """
            {
                "title": "Workflow Test Post",
                "body": "Testing API chaining",
                "userId": 1
            }
            """
        And I set the "Content-Type" header to "application/json"
        Then I should receive a successful creation response
        And I should store the created post ID
        When I make a GET request to the created post using the stored ID
        Then I should receive the exact post I just created
        And the post should have "title" as "Workflow Test Post"