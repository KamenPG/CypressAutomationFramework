const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "nxtfec",
  defaultCommandTimeout: 6000,
  env: {
    url: "https://rahulshettyacademy.com/angularpractice"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/tests/*.cy.js'
  },
});
