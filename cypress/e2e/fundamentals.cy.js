describe("Automation Practice Mini Project Suite", () => {
  
  Cypress.on('uncaught:exception', () => {
    return false;
  });

  beforeEach(() => {
    cy.visit("https://practice.expandtesting.com/");
  });

  it("Executes form operations, dropdowns, checkboxes, radio buttons, file uploads, and scrolling", () => {
    
    // 1. Radio Buttons Journey
    cy.visit("https://practice.expandtesting.com");

    cy.get("#blue", { timeout: 15000 }).should('be.visible').check().should("be.checked");

    cy.get("#blue").check().should("be.checked");

    // 2. Dropdown List Journey
    cy.visit("https://practice.expandtesting.com");
    cy.get("#dropdown").select("Option 1").should("have.value", "1");

    // 3. Checkboxes Journey
    cy.visit("https://practice.expandtesting.com");
    cy.get("#checkbox1").check().should("be.checked");
    cy.get("#checkbox2").uncheck().should("not.be.checked");

    // 4. File Upload Journey (Safe In-Memory Mock)
    cy.visit("https://practice.expandtesting.com");
    cy.get('#fileInput').selectFile({
      contents: Cypress.Buffer.from('Assignment Complete Asset Stream'),
      fileName: 'sample.jpg',
      mimeType: 'image/jpeg'
    });
    cy.get('#fileSubmit').click();
    cy.get("h1", { timeout: 12000 }).should("contain", "Uploaded");

    // 5. Full Form Validation Entry
    cy.visit("https://practice.expandtesting.com");
    cy.get('#validationCustom01').clear().type("Umwali");
    cy.get('#validationCustom02').clear().type("Angelique");
    cy.get('input[name="username"]').type("UmwaliAngelique_student");
    cy.get('select[name="payment"]').select("card");
    cy.get('input[type="password"]').type("SecurePassword123!");
    
    // Check missing mandatory boxes to clear Bootstrap blockers
    cy.get('#inlineRadio2').check();
    cy.get('#invalidCheck').check();

    // Scroll to action view and hit submit
    cy.get('button[type="submit"]').scrollIntoView().should("be.visible").click();

    // Final success text verification
    cy.get(".alert-success", { timeout: 12000 })
      .should("be.visible")
      .and("contain", "Form submitted successfully");
  });
});
