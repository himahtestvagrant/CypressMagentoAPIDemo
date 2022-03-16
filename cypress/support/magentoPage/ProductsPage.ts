///<reference types="cypress"/>
class ProductsPage{
    catalogButton(){
        //cy.contains('CATALOG')
        cy.get('#menu-magento-catalog-catalog > [onclick="return false;"]').click();
    }
    clickOnProducts(){
        cy.get('.item-catalog-products > a > span').click({force: true});  
        
    }

    searchUniqueGroupId(uniqueGroupId:string){
        try{
            cy.get('body').then((body) => {
                if (body.find('._show> .admin__current-filters-actions-wrap > .action-clear',{ timeout: 10000 }).length > 0) {
//                     cy.wait(5000)
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
//         cy.wait(30000);
        cy.scrollTo('top');
         cy.get('.data-grid-filters-action-wrap >.action-default',{ timeout: 40000 }).eq(0).click({force: true});
//          cy.wait(1000);
        cy.get('.admin__control-text[name="unique_group_id"]',{ timeout: 10000 }).clear().type(uniqueGroupId)
//         cy.wait(1000);
        cy.get('.action-secondary',{ timeout: 10000 }).click({force:true})
    
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
         var simpleProductSKU = "";
         var configurableProductSKU = "";
         cy.get('tr td:nth-child(5)', { timeout: 10000 }).each(($el, index, $list) => {
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

                   configurableProductSKU = $el.next().next().text().trim();
                   cy.log("configurableProductSKU inside each block: "+configurableProductSKU);
            }
            else if(text.includes('Simple Product')){
                 simpleProductSKU = $el.next().next().text().trim();
                 cy.log("simpleProductSKU inside each block: "+simpleProductSKU);
            }
        });
       cy.wait(1000).then(()=>{
            cy.task('createJson', { simpleProductSKU, configurableProductSKU });
       })
         cy.log("SKU outside of each block :- "+configurableProductSKU);
                             return configurableProductSKU;
       

    }
    enableSimpleProduct(){
            cy.get('tr td:nth-child(8)', { timeout: 1000 }).each(($el, index, $list) => {
            const text = $el.text();
            if(text.includes("Disabled")){
                // cy.get('tr td').scrollTo('right');
                cy.get(`[data-bind="css: {'_odd-row': $index % 2}"][data-repeat-index="${index}"] > .data-grid-actions-cell > .action-menu-item`, { timeout: 1000 }).click({force: true});
            }
        });
        }

        magentoSystem(){
            //cy.scrollIntoView('Magento-System');
            cy.get('[data-index="magento-system"] > .fieldset-wrapper-title > .admin__collapsible-title', { timeout: 5000 }).click({force: true});
//             cy.wait(5000);
            cy.get('.admin__actions-switch-label', { timeout: 5000 }).click();
            cy.get('.admin__control-text[name="product[quantity_and_stock_status][qty]"]').clear().type('4');
            cy.get('.admin__control-select[name="product[quantity_and_stock_status][is_in_stock]"]').select('1');
            cy.get('#save-button').click();
            cy.wait(10000);
            //cy.get('#back').click();
            cy.go("back");
            cy.go("back");
        }

        validateStatus(uniqueGroupId){
        let cnt = 0;
        cy.get('tr td:nth-child(5)', { timeout: 10000 }).each(($el, index, $list) => {
            let text = $el.text();
            if(text.includes('Simple Product')){
                cnt+=1;
            }
        })
        cy.wait(1000).then(()=>{
            if(cnt!=1){
                 this.searchUniqueGroupId(uniqueGroupId);
                 cy.wait(10000);
            }
        })
        let count =0;
        cy.get('tr td:nth-child(8)', { timeout: 1000 }).each(($el, index, $list) => {
                    const text = $el.text();
                    if(text.includes("Enabled")){
                        // cy.get('tr td').scrollTo('right');
                        count+=1;
                    }
                });
                 cy.wait(1000).then(()=>{
                            if(count<=0) throw "File Not Found";
                        })

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