@tutorial @lesson-3
Feature: Lesson 3 - Clicking and Interacting
    As a beginner learning web automation
    I want to understand how to click on things and interact with a webpage
    So that I can simulate user actions

    Background:
        Given I open a new browser window

    @clicking @easy
    Scenario: Clicking on links
        # Learning to click on links like a user would
        When I navigate to "https://example.com"
        And I click on the link "More information..."
        Then I should be redirected to a new page
        And the URL should contain "iana.org"

    @clicking @medium
    Scenario: Working with forms - typing in input fields
        # Learning to fill out forms
        When I navigate to "https://httpbin.org/forms/post"
        And I type "John Doe" in the field "custname"
        And I type "john@example.com" in the field "custemail"
        Then the field "custname" should contain "John Doe"
        And the field "custemail" should contain "john@example.com"

    @clicking @medium
    Scenario: Selecting options from dropdowns
        When I navigate to "https://httpbin.org/forms/post"
        And I select "large" from the dropdown "size"
        Then the dropdown "size" should have "large" selected

    @clicking @medium
    Scenario: Submitting a form
        When I navigate to "https://httpbin.org/forms/post"
        And I type "Jane Smith" in the field "custname"
        And I type "jane@example.com" in the field "custemail"
        And I select "medium" from the dropdown "size"
        And I click the submit button
        Then I should see the form was submitted successfully