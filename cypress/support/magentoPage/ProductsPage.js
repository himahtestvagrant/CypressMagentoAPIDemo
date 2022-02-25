///<reference types="cypress"/>
class ProductsPage{
    catalogButton(){
        //cy.contains('CATALOG')
        cy.get('#menu-magento-catalog-catalog > [onclick="return false;"]').click();
    }
    clickOnProducts(){
        cy.get('.item-catalog-products > a > span').click({force: true});  
        
    }
    clearSKU(){
        cy.scrollTo(500,0) 
        if(cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary',{ timeout: 10000 } ).should('be.visible')){
           cy.wait(15000)
            cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary').scrollIntoView().click({force:true});
        }
        else{
            cy.log('hello world')
        }
       
    }
    searchSKU(){
        cy.scrollTo(500,0)
         cy.get('#fulltext').scrollIntoView().type('1000676294')
         //cy.get(('.admin__control-text data-grid-search-control').should('be.visible').type('1000676294'))
         cy.wait(15000)
         cy.scrollTo(500,0)
         cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > .action-submit').scrollIntoView().click();
    
    }
    

}
export default ProductsPage;