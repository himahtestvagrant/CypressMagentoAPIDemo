///<reference types="cypress"/>
class ProductsPage{
    catalogButton(){
        //cy.contains('CATALOG')
        cy.get('#menu-magento-catalog-catalog > [onclick="return false;"]').click();
    }
    clickOnProducts(){
        cy.get('.item-catalog-products > a > span').click({force: true});  
        
    }

    searchSKU(){
         cy.get('.data-grid-filters-action-wrap >.action-default:visible').click();
         cy.wait(1000);
        cy.get('.admin__control-text[name="unique_group_id"]').type("04032022-fan-2")
        cy.wait(1000);
        cy.get('.action-secondary').click()
    
    }

    

}
export default ProductsPage;