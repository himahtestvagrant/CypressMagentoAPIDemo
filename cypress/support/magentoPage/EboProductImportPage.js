///<reference types="cypress"/>
class EboProductImportPage{
    chooseFileButton(file){
        cy.get('#productimport_file').attachFile(file);
    }
    clickOnImportButton(){
        cy.get('.action-default.scalable.import-submit').click();
    }
    validateTable(){
        cy.get('tr td:nth-child(6)').each(($el,index,$list)=>{
                    const text=$el.text();
                    if (text.includes('odoo_62177537e4c00.csv')) {
                        // cy.get('fieldset > #product > tbody > tr > td:nth-child(2)').eq(index).next().then((price)=>{
                        //     const priceText=price.text();
                        //     expect(priceText).to.equal('25');
                        // })
        
                        cy.log('File has been added');
                        cy.log(text);
                        // cy.wrap($el).next().then((price)=>{
                        //     const priceText=price.text();
                        //     expect(priceText).to.equal('25');
                        // })
                    }
                })
    }
}

export default EboProductImportPage;