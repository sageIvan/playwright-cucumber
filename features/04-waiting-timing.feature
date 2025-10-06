@tutorial @lesson-4
Feature: Lesson 4 - Waiting and Timing
    As a beginner learning web automation
    I want to understand how to wait for things to happen on a webpage
    So that I can handle slow-loading websites and dynamic content

    Background:
        Given I open a new browser window

    @waiting @medium
    Scenario: Waiting for elements to appear
        # Sometimes web pages take time to load completely
        When I navigate to "https://httpbin.org/delay/2"
        Then I should wait for the page to load completely
        And I should see the response after the delay

    @waiting @medium
    Scenario: Waiting for text to change
        # Some websites update their content dynamically
        When I navigate to "https://httpbin.org/delay/1"
        Then I should wait for text to appear
        And the content should be loaded

    @waiting @hard
    Scenario: Understanding timeouts
        # Learning what happens when things take too long
        When I navigate to "https://httpbin.org"
        Then I should be able to wait up to 5 seconds for elements
        And if something takes longer than expected, I should get a clear error

    @waiting @medium
    Scenario: Waiting for user interactions to complete
        When I navigate to "https://example.com"
        And I click on the link "More information..."
        Then I should wait for the new page to load
        And the navigation should be complete