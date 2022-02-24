///<reference types="cypress"/>
class HomePage{
    settingButton(){
        cy.get('#menu-magento-reports-report > [onclick="return false;"]').scrollIntoView();
        cy.get('#menu-magento-backend-system > [onclick="return false;"]').click();
    }
    clickOnEboProduct(){
        // cy.get('.item-import.level-2[data-ui-id="menu-embitel-productimport-import"]').click({force:true});
        cy.get('[data-ui-id="menu-embitel-productimport-import"] > a').click({force:true});
    }
}

export default HomePage;