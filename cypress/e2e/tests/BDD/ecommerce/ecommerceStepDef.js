import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../../pageObjects/HomePage";
import ProductPage from "../../../pageObjects/ProductPage";
const homePage = new HomePage();
const productPage = new ProductPage();
let name;
let gender;

Given("I open Ecommerce Page", () => {
  cy.visit(Cypress.env("url"));
});

When("I add items to Cart", function () {
  homePage.getShopTab().click();

  this.data.productName.forEach(function (element) {
    cy.addProduct(element);
  });

  Cypress.config("defaultCommandTimeout", 10000);

  productPage.checkOutButton().click();
});

Then("Validate the total prices", () => {
  var sum = 0;
  cy.get("tr td:nth-child(4) strong").each(($el, index, $list) => {
    const amount = $el.text();
    var res = amount.split(" ");
    res = res[1].trim();
    sum = Number(sum) + Number(res);
  });

  cy.get("h3 > strong").then(function ($element) {
    const totalAmount = $element.text();
    var resTotalAmount = totalAmount.split(" ");
    resTotalAmount = Number(resTotalAmount[1].trim());
    expect(sum).to.equal(resTotalAmount);
  });
});

Then("I validate the order success", () => {
  cy.contains("Checkout").click();
  cy.get("#country").type("Germany");
  cy.get(".suggestions > ul > li > a").trigger("mouseover").click();
  cy.get('label[for="checkbox2"]').click({ force: true });
  cy.get('input[type="submit"]').click();
  cy.get(".alert").then(function (element) {
    const actualText = element.text();
    expect(actualText.includes("Success")).to.be.true;
  });
});

When("I fill the form details", function (dataTable) {
  name = dataTable.rawTable[1][0];
  gender = dataTable.rawTable[1][1];
  homePage.getEditBox().type(dataTable.rawTable[1][0]);
  homePage.getGender().select(dataTable.rawTable[1][1]);
});

Then("I validate the form behaviour", function () {
  homePage.getTwoWayDataBinding().should("have.value", name);
  homePage.getEditBox().should("have.attr", "minlength", "2");
  homePage.getEntrepreneaur().should("be.disabled");
});

Then("I select the Shop Page", () => {
  homePage.getShopTab().click();
});
