Feature: E2E Ecommerce Validation

    Application Regression

    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce Page
    When I add items to Cart
    Then Validate the total prices
    Then I validate the order success

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce Page
    When I fill the form details
    | name | gender |
    | bob  | Female |
    Then I validate the form behaviour
    Then I select the Shop Page
