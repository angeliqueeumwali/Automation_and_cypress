describe("Test Automation Practice Suite", { testIsolation: false }, () => {
before(() => {
//visit the website
cy.visit("https://testautomationpractice.blogspot.com/");
});

it("Fill out the form", () => {
cy.get("#name").type("John Doe");
cy.get("#email").type("john.doe@example.com");
cy.get("#phone").type("1234567890");
cy.get("#textarea").type("123 QA Test Automation Street");
});

it("Select values from a dropdown", () => {
cy.get("#country").select("Canada");

cy.get("#country").should("have.value", "canada");
});

it("Selects a radio buttons", () => {
cy.get("#male").check();

cy.get("#male").should("be.checked");
});

it("Checks and Unchecks checkboxes", () => {
cy.get("#sunday").check();

cy.get("#sunday").should("be.checked");

cy.get("#sunday").uncheck();

cy.get("#sunday").should("not.be.checked");
});

it("Uploads a file", () => {
cy.get("#singleFileInput").selectFile({
contents: Cypress.Buffer.from("Automation Test Context Output Log"),
fileName: "upload-manifest.txt",
mimeType: "text/plain",
});
cy.get('input[type="file"]').first().should("exist");
});

it("Scroll to a hidden element", () => {
cy.contains("h2", "Footer Links").scrollIntoView();

cy.contains("h2", "Footer Links").should("be.visible");
});

it("Clicks the submit button and verifies a success message", () => {
cy.get("button.submit-btn").scrollIntoView().click();

cy.get("button.submit-btn").should("exist");
});
});