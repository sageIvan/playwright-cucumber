@tutorial @lesson-1
Feature: Lesson 1 - Basic Web Navigation
    As a beginner learning web automation
    I want to understand how to navigate to websites
    So that I can start my automation journey

    Background:
        # This runs before each scenario in this feature
        Given I open a new browser window

    @navigation @easy
    Scenario: Opening a website for the first time
        # This is like typing a website address in your browser
        When I navigate to "https://example.com"
        Then I should see the page is loaded
        And the page title should be "Example Domain"

    @navigation @easy
    Scenario: Understanding what we can see on a webpage
        When I navigate to "https://example.com"
        Then I should see the main heading "Example Domain"
        And I should see some text about "This domain is for use in illustrative examples"
        And I should see a link to "More information..."

    @navigation @easy
    Scenario: Checking if we're on the right page
        When I navigate to "https://example.com"
        Then the current URL should contain "example.com"
        And the page should be fully loaded