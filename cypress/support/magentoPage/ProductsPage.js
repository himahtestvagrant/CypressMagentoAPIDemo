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
        //cy.scrollTo(500,0) 
        cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-filters-actions-wrap > .data-grid-filters-action-wrap > .action-default').scrollIntoView()

        cy.get('#fulltext').type('1000676294')
        cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > .action-submit').click();

        try{ 
        if(cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary',{ timeout: 10000 } ).should('be.visible')){
           cy.wait(15000)
            cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary').click({force:true});
        }
    }
    catch{
        let message;
    if (error instanceof Error) message = error.message
    else message = String(error)
    // we'll proceed, but let's report it
    console.log("Error is " +message);
    }
       
    }
    searchSKU(){
        //cy.scrollTo(500,0)
        cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-filters-actions-wrap > .data-grid-filters-action-wrap > .action-default').scrollIntoView()
         cy.get('#fulltext').type('1000676294')
         //cy.get(('.admin__control-text data-grid-search-control').should('be.visible').type('1000676294'))
         cy.wait(15000)
         //cy.scrollTo(500,0)
         cy.get('[data-bind="afterRender: $data.setToolbarNode"] > :nth-child(1) > .data-grid-search-control-wrap > .action-submit').click();
    
    }
    validateSKUname(){
        
    }
    

}
export default ProductsPage;