describe('Automation Exercise E-commerce Suite', () => {

  
  Cypress.on('uncaught:exception', () => {
    return false;
  });

 
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
    cy.get('body', { timeout: 15000 }).should('be.visible');
    
    
    cy.get('body').then(($body) => {
      if ($body.find('.modal-content').length > 0) {
        cy.get('.modal-content').invoke('remove');
      }
    });
  });

  
  it('Test Case 1: Verify Homepage Loads', () => {
    cy.get('.logo img').should('be.visible');
    cy.get('.shop-menu').should('be.visible');
    cy.get('a[href="/login"]').should('be.visible');
  });

  
  it('Test Case 2: Register a New User', () => {
    
    const email = `student${Date.now()}@test.com`;
    
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type('Test Student');
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    
    
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('StudentPassword123');
    cy.get('[data-qa="days"]').select('10');
    cy.get('[data-qa="months"]').select('June');
    cy.get('[data-qa="years"]').select('2000');
    
   
    cy.get('[data-qa="first_name"]').type('Test');
    cy.get('[data-qa="last_name"]').type('Student');
    cy.get('[data-qa="address"]').type('123 School Lane');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    
    cy.get('[data-qa="create-account"]').click();
    cy.contains('Account Created!').should('be.visible');
    
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logged in as').should('be.visible');
    
   
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible');
  });

   it('Test Case 3: Login With Valid Credentials', () => {
    const loginEmail = `login_student${Date.now()}@test.com`;
    
    
    cy.get('a[href="/login"]').click();
    cy.get('[data-qa="signup-name"]').type('Test Student');
    cy.get('[data-qa="signup-email"]').type(loginEmail);
    cy.get('[data-qa="signup-button"]').click();
    
    cy.get('#id_gender1').check();
    cy.get('[data-qa="password"]').type('StudentPassword123');
    cy.get('[data-qa="first_name"]').type('Test');
    cy.get('[data-qa="last_name"]').type('Student');
    cy.get('[data-qa="address"]').type('123 School Lane');
    cy.get('[data-qa="country"]').select('United States');
    cy.get('[data-qa="state"]').type('California');
    cy.get('[data-qa="city"]').type('Los Angeles');
    cy.get('[data-qa="zipcode"]').type('90001');
    cy.get('[data-qa="mobile_number"]').type('1234567890');
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="continue-button"]').click();
    
    
    cy.get('a[href="/logout"]').click();
    
   
    cy.login(loginEmail, 'StudentPassword123');
    cy.contains('Logged in as').should('be.visible');
    
    
    cy.get('a[href="/logout"]').click();
    cy.url().should('include', '/login');
  });


  it('Test Case 4: Login With Invalid Credentials', () => {
    cy.login('invalid_student_user@wrong.com', 'BadPassword999');
    cy.get('.login-form form').should('contain', 'incorrect');
  });

  
  it('Test Case 5: Search for a Product', () => {
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click();
    cy.get('.title').should('contain', 'Searched Products');
    cy.get('.productinfo').first().should('contain', 'Dress');
  });

 
  it('Test Case 6: View Product Details', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.choose a').first().click();
    cy.get('.product-information h2').should('be.visible'); 
    cy.get('.product-information p').should('contain', 'Category'); 
    cy.get('.product-information span span').should('be.visible'); 
    cy.get('.product-information').should('contain', 'Availability'); 
    cy.get('.product-information').should('contain', 'Condition'); 
    cy.get('.product-information').should('contain', 'Brand'); 
  });

 
  it('Test Case 7: Add Product to Cart', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.add-to-cart').first().click();
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.get('#cart_info_table').should('be.visible');
    cy.get('.cart_quantity').should('be.visible');
    cy.get('.cart_price').should('be.visible');
  });

  it('Test Case 8: Remove Product From Cart', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.add-to-cart').first().click();
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.get('.cart_quantity_delete').click();
    cy.get('#empty_cart').should('be.visible');

  });

  
  it('Test Case 9: Submit Contact Us Form', () => {
    cy.get('a[href="/contact_us"]').click();
    cy.get('[data-qa="name"]').type('Test Student');
    cy.get('[data-qa="email"]').type('student@test.com');
    cy.get('[data-qa="subject"]').type('Homework Assignment');
    cy.get('[data-qa="message"]').type('Automated testing script executed successfully.');
    
    
    cy.on('window:confirm', (text) => {
      expect(text).to.contains('Press OK to proceed');
      return true;
    });
    
    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status').should('contain', 'Success');
  });

 
  it('Challenge 1: Add Multiple Products', () => {
    cy.get('a[href="/products"]').click();
    cy.get('.add-to-cart').eq(0).click();
    cy.get('.close-modal').click();
    cy.get('.add-to-cart').eq(2).click();
    cy.get('.modal-body a[href="/view_cart"]').click();
    cy.get('#cart_info_table tbody tr').should('have.length.at.least', 2);
  });

  it('Challenge 3: Subscribe to Newsletter', () => {
    cy.get('#footer').scrollIntoView();
    cy.get('#susbscribe_email').type('newsletter_student@test.com');
    cy.get('#subscribe').click();
    cy.get('.alert-success').should('be.visible');
  });
});
