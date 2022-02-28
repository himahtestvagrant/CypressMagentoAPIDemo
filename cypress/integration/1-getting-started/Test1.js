/// <reference types="Cypress" />
const { includes } = require("lodash")

 
describe('My First Test', function()
{
    it('Positive test case', function()
    {
        cy.visit("https://commerce-staging.ibo.com/admin")
        //cy.contains('type').click()
        cy.url().should('include','commerce-staging.ibo.com')
        cy.get('#username').type("eboadmin");
        cy.get('[type=password]', { timeout: 10000 }).should('be.visible');
        cy.get('#login').click();
        cy.get('#login').type("EboMagento@12345");
        cy.wait(3000);
        cy.get('[class="action-login action-primary"]', { timeout: 10000 }).should('be.visible');
        cy.get('.action-login').click()
        cy.url().should('include','dashboard')
        cy.get('[class="dashboard-advanced-reports-title"]', { timeout: 10000 }).should('be.visible');
        cy.get('.dashboard-advanced-reports-title');

        
        cy.get('[class="admin__menu"]', { timeout: 10000 }).should('be.visible');
        cy.get('[class="class="item-system _current parent  level-0 _active""]', { timeout: 10000 }).should('be.visible');
       // cy.get('[class="_active"]', { timeout: 10000 }).should('be.visible');
        cy.get('#menu-magento-backend-system > [onclick="return false;"]').click()
        cy.wait(3000);
        cy.get('[data-ui-id="menu-embitel-productimport-import"] > a > span').click()
        cy.wait(3000);
        cy.get('#productimport_file').find('id_5MdNgNMMlrdQbUrWoXRmy4SLe1fXXGhe').click()
        
    })
})
