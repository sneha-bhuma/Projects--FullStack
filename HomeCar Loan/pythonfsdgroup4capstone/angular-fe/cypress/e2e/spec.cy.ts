describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/')
  })

  it('passes Welcome page', () => {
    cy.visit('http://localhost:4200/login');
    cy.contains('Login');
    cy.url().should('include', '/login');
    cy.get(':button').should('be.disabled');
    cy.get('#userid').type('Bhanu@gmail.com');
    cy.get('#passwd').type('Bhanu1234');
    cy.get(':button').should('be.enabled');
    cy.get('#btnLogin').click();
    cy.url().should('include', 'welcome');
    cy.contains('Logout');

    cy.contains('a', 'Logout').click();
    cy.contains('Are you sure you want to log out?');

    cy.get('#b1').click();
    cy.contains('Logout').should('not.exist');
  });

})