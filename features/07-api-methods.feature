@tutorial @lesson-7 @api
Feature: Lesson 7 - API Testing with Different HTTP Methods
    As a beginner learning API automation
    I want to understand different ways to interact with APIs
    So that I can test creating, updating, and deleting data

    Background:
        Given I have access to API testing capabilities

    @api @medium @post
    Scenario: Creating new data with POST requests
        # POST is like placing an order - you're asking to create something new
        When I create a POST request to "https://jsonplaceholder.typicode.com/posts"
        And I set the request body to:
            """
            {
                "title": "My Test Post",
                "body": "This is a test post created by automation",
                "userId": 1
            }
            """
        And I set the "Content-Type" header to "application/json"
        Then I should receive a successful creation response
        And the response should contain the created post data
        And the response should have "id" field
        And the response should have "title" as "My Test Post"

    @api @medium @put
    Scenario: Updating data with PUT requests
        # PUT is like asking to change an existing order
        When I create a PUT request to "https://jsonplaceholder.typicode.com/posts/1"
        And I set the request body to:
            """
            {
                "id": 1,
                "title": "Updated Test Post",
                "body": "This post has been updated by automation",
                "userId": 1
            }
            """
        And I set the "Content-Type" header to "application/json"
        Then I should receive a successful response
        And the response should contain the updated post data
        And the response should have "title" as "Updated Test Post"

    @api @medium @patch
    Scenario: Partially updating data with PATCH requests
        # PATCH is like asking to change just one part of an existing order
        When I create a PATCH request to "https://jsonplaceholder.typicode.com/posts/1"
        And I set the request body to:
            """
            {
                "title": "Partially Updated Post"
            }
            """
        And I set the "Content-Type" header to "application/json"
        Then I should receive a successful response
        And the response should have "title" as "Partially Updated Post"
        And the response should still have the original "body" field

    @api @hard @delete
    Scenario: Deleting data with DELETE requests
        # DELETE is like canceling an order - asking to remove something
        When I make a DELETE request to "https://jsonplaceholder.typicode.com/posts/1"
        Then I should receive a successful deletion response
        And the response should confirm the deletion

    @api @hard @error-handling
    Scenario: Testing error responses and edge cases
        # Sometimes things go wrong - we need to test that too!
        When I make a GET request to "https://jsonplaceholder.typicode.com/posts/999999"
        Then I should receive a not found response
        And the response status should be 404
        And I should handle the error gracefully