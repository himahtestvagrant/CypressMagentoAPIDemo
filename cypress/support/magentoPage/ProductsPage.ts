///<reference types="cypress"/>
class ProductsPage{
    catalogButton(){
        //cy.contains('CATALOG')
        cy.get('#menu-magento-catalog-catalog > [onclick="return false;"]').click();
    }
    clickOnProducts(){
        cy.get('.item-catalog-products > a > span').click({force: true});  
        
    }

    searchUniqueGroupId(uniqueGroupId){
        try{
            cy.get('body').then((body) => {
                if (body.find('._show> .admin__current-filters-actions-wrap > .action-clear',{ timeout: 10000 }).length > 0) {
                    cy.wait(15000)
                    cy.log("inside if condition")
                    cy.log("the length of result is"+ body.find(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary',{ timeout: 10000 }).length)
                    cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary',{ timeout: 10000 }).click({force:true});
                }
                else{
                    cy.log("inside else condition")
                    cy.scrollTo('top')
            }
            });


    //     if(cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary',{ timeout: 10000 } ).should('be.visible')){
    //        cy.wait(15000)
    //        cy.log("inside if condition")
    //     cy.get(':nth-child(1) > .admin__data-grid-filters-current > .admin__current-filters-actions-wrap > .action-tertiary').click({force:true});
        
    //     } 
    //     else{
    //         cy.log("inside else condition")
    //         cy.scrollTo('top')
    // }
}
        catch{
            let message;
        if (error instanceof Error) message = error.message
        else message = String(error)
        // we'll proceed, but let's report it
        console.log("Error is " +message);
        }
        cy.wait(30000);
        cy.scrollTo('top');
         cy.get('.data-grid-filters-action-wrap >.action-default').eq(0).click({force: true});
         cy.wait(1000);
        cy.get('.admin__control-text[name="unique_group_id"]').type(uniqueGroupId)
        cy.wait(1000);
        cy.get('.action-secondary').click()
    
    }


    validateUGid(){
        let count = 0;
        cy.get('tr td:nth-child(3)', { timeout: 1000 }).each(($el, index, $list) => {
            const text = $el.text();
            if (text.includes("04032022-fan-3")) {
                cy.log('Unique group id has been added');
                count+=1;
                cy.log(text);
            }
        })
        cy.wait(1000).then(()=>{
            if(count<=0) throw "Unique group id Not Found";
        })
        
    }
    fetchSKU(){
         var SKU="";
         cy.get('tr td:nth-child(5)', { timeout: 1000 }).each(($el, index, $list) => {
            const text = $el.text();
            if(text.includes('Configurable Product')){
                // cy.wrap($el).next().next().invoke("text").then((text)=>{
                //                     return text;
                // });
//
//                const SKU=$el.next().next().text();
//                cy.log("SKU",SKU).then(()=>{
//                    return SKU;
//                })

//                return $el.next().next().text();

                   SKU = $el.next().next().text();
                   cy.log("sku inside each block: "+SKU);
                    cy.task('createJson', { SKU });


            }
        });
//        cy.wait(1000).then(()=>{
//            cy.log("SKU outside of each block :- "+SKU);
//                    return SKU;
//        })
         cy.log("SKU outside of each block :- "+SKU);
                             return SKU;
       

    }

    

    deleteCreatedSku(){
        cy.get("[data-bind=\"css: {'_odd-row': $index % 2}\"] > .data-grid-checkbox-cell").each(($el, index, $list) => {
            cy.wrap($el).click();
        });
        cy.get('.col-xs-2 > .action-select-wrap > .action-select').click({force: true});
        cy.get('.col-xs-2 > .action-select-wrap > .action-menu-items > .action-menu > :nth-child(1) > .action-menu-item').click({force: true});
        cy.get('.action-primary').click();
    }



}
export default ProductsPage;