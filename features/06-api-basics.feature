@tutorial @lesson-6 @api
Feature: Lesson 6 - Introduction to API Testing
    As a beginner learning API automation
    I want to understand what APIs are and how to test them
    So that I can test both websites and their backend services

    Background:
        # APIs are like the "behind the scenes" parts of websites
        # Think of them as invisible waiters that fetch and deliver data
        Given I have access to API testing capabilities

    @api @easy @rest
    Scenario: Understanding what an API is
        # An API (Application Programming Interface) is like a menu at a restaurant
        # You ask for something, and it gives you back what you requested
        When I make a GET request to "https://jsonplaceholder.typicode.com/posts/1"
        Then I should receive a successful response
        And the response should contain JSON data
        And the response should have a "title" field
        And the response should have "id" field with value 1

    @api @easy @rest
    Scenario: Getting a list of data from an API
        # Sometimes we want to get a list of many things, like all menu items
        When I make a GET request to "https://jsonplaceholder.typicode.com/posts"
        Then I should receive a successful response
        And the response should be a JSON array
        And the response should contain at least 10 items
        And each item should have "id", "title", and "body" fields

    @api @medium @rest
    Scenario: Checking response times and performance
        # We want to make sure APIs respond quickly, like fast food service
        When I make a GET request to "https://jsonplaceholder.typicode.com/users"
        Then I should receive a successful response
        And the response time should be less than 2000 milliseconds
        And the response should contain exactly 10 users
        And each user should have "name", "email", and "address" fields

    @api @medium @rest
    Scenario: Testing different types of data
        # APIs can return different types of information
        When I make a GET request to "https://jsonplaceholder.typicode.com/users/1"
        Then I should receive a successful response
        And the response should contain a user with id 1
        And the user should have a valid email format
        And the user should have address information
        And the user should have company information