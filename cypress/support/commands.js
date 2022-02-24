// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (userName, password) => {
    cy.visit("https://commerce-staging.ibo.com/admin")
    cy.url().should('include','commerce-staging.ibo.com')
    cy.get('#username').clear().type(userName);
    // cy.get('[type=password]', { timeout: 10000 }).should('be.visible');
    // cy.get('#login').click();
    cy.get('#login').clear().type(password).type('{enter}');

})

import 'cypress-file-upload';