@tutorial @example @easy
Feature: Quick Start Example
    As someone new to web automation
    I want to see a simple working example
    So that I can understand what this tool can do

    @demo
    Scenario: My first automated test
        # This is like opening a web browser and going to a website
        Given I open a new browser window
        When I navigate to "https://example.com"

        # Now let's check that we're on the right page
        Then I should see the page is loaded
        And the page title should be "Example Domain"
        And I should see text "Example Domain"

        # Let's find and click on a link
        When I click on the link "More information..."
        Then I should be redirected to a new page
        And the URL should contain "iana.org"

    @simple
    Scenario: Understanding what we can do
        # This scenario shows different types of checks we can do
        Given I open a new browser window
        When I navigate to "https://example.com"

        # We can verify different elements exist
        Then I should see the main heading "Example Domain"
        And I should see a link to "More information..."
        And I should find an element with tag "h1"
        And I should find an element with tag "p"

        # We can count elements
        And there should be exactly 1 link on the page