@tutorial @lesson-2
Feature: Lesson 2 - Finding Things on a Webpage
    As a beginner learning web automation
    I want to understand how to find elements on a webpage
    So that I can interact with different parts of a website

    Background:
        Given I open a new browser window

    @finding-elements @easy
    Scenario: Finding text on a page
        # Learning to look for specific words or sentences
        When I navigate to "https://example.com"
        Then I should see text "Example Domain"
        And I should see text "This domain is for use in illustrative examples"

    @finding-elements @easy
    Scenario: Finding buttons and links
        # Understanding how to locate clickable elements
        When I navigate to "https://example.com"
        Then I should see a link with text "More information..."
        And the link should be clickable

    @finding-elements @medium
    Scenario: Finding elements by their HTML properties
        # More technical way to find elements (like developers do)
        When I navigate to "https://example.com"
        Then I should find an element with tag "h1"
        And I should find an element with tag "p"
        And I should find an element with tag "a"

    @finding-elements @medium
    Scenario: Checking if elements exist or not
        When I navigate to "https://example.com"
        Then the "h1" heading should exist
        And the "h2" heading should not exist
        And there should be exactly 1 link on the page