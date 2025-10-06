Feature: Sample Web Application Test
    As a user
    I want to navigate to web pages
    So that I can verify the application works correctly

    @smoke
    Scenario: Navigate to Google homepage
        Given I am on the Google homepage
        When I search for "Playwright Cucumber TypeScript"
        Then I should see search results
        And the page title should contain "Playwright Cucumber TypeScript"

    @regression
    Scenario: Verify page elements
        Given I am on the Google homepage
        Then I should see the search input field
        And I should see the Google logo
        And I should see the search button

    @debug
    Scenario: Sample scenario for debugging
        Given I am on the Google homepage
        When I click on the search input
        Then the search input should be focused