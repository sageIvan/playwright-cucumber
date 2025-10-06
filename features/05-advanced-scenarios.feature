@tutorial @lesson-5
Feature: Lesson 5 - Advanced Interactions and Real Websites
    As a beginner who has learned the basics
    I want to practice with real websites and advanced scenarios
    So that I can apply my knowledge to practical situations

    Background:
        Given I open a new browser window

    @advanced @medium
    Scenario: Working with a real e-commerce website
        # Practicing on a demo shopping website
        When I navigate to "https://demo.opencart.com"
        Then I should see the OpenCart demo store
        When I search for "MacBook"
        Then I should see search results for MacBook
        When I click on the first product
        Then I should see the product details page

    @advanced @medium
    Scenario: Testing a login form (with demo credentials)
        When I navigate to "https://the-internet.herokuapp.com/login"
        Then I should see the login form
        When I type "tomsmith" in the username field
        And I type "SuperSecretPassword!" in the password field
        And I click the login button
        Then I should be successfully logged in
        And I should see a success message

    @advanced @hard
    Scenario: Handling JavaScript alerts and popups
        When I navigate to "https://the-internet.herokuapp.com/javascript_alerts"
        Then I should see buttons for different types of alerts
        When I click on "Click for JS Alert"
        Then I should see a JavaScript alert
        When I accept the alert
        Then the alert should be dismissed

    @advanced @hard
    Scenario: Working with dynamic content
        When I navigate to "https://the-internet.herokuapp.com/dynamic_loading/1"
        Then I should see a start button
        When I click the start button
        Then I should wait for the loading to complete
        And I should see the final message "Hello World!"

    @advanced @expert
    Scenario: File upload functionality
        When I navigate to "https://the-internet.herokuapp.com/upload"
        Then I should see a file upload form
# Note: This would require a test file to be available
# When I upload a test file
# Then the file should be uploaded successfully