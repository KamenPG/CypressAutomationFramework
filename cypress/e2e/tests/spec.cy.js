import HomePage from "../pageObjects/HomePage";
import ProductPage from "../pageObjects/ProductPage";
describe("template spec", function () {
  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
  });

  it("My first test", function () {
    const homePage = new HomePage();
    const productPage = new ProductPage();
    cy.visit(Cypress.env("url"));

    homePage.getEditBox().type(this.data.name);
    homePage.getGender().select(this.data.gender);
    homePage.getTwoWayDataBinding().should("have.value", this.data.name);
    homePage.getEditBox().should("have.attr", "minlength", "2");
    homePage.getEntrepreneaur().should("be.disabled");

    homePage.getShopTab().click();

    this.data.productName.forEach(function (element) {
      cy.addProduct(element);
    });

    Cypress.config("defaultCommandTimeout", 10000);

    productPage.checkOutButton().click();
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

    cy.contains("Checkout").click();
    cy.get("#country").type("Germany");
    cy.get(".suggestions > ul > li > a").trigger("mouseover").click();
    cy.get('label[for="checkbox2"]').click();
    cy.get('input[type="submit"]').click();
    cy.get(".alert").then(function (element) {
      const actualText = element.text();
      expect(actualText.includes("Success")).to.be.true;
    });
  });
});
