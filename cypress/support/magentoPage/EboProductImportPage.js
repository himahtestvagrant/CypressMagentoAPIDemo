///<reference types="cypress"/>
class EboProductImportPage {
    chooseFileButton(file) {
        cy.get('#productimport_file').attachFile(file);
    }
    clickOnImportButton() {
        cy.get('.action-default.scalable.import-submit').click();
    }
    validateTable() {
        let count = 0;
        cy.get('tr td:nth-child(6)', { timeout: 1000 }).each(($el, index, $list) => {
            const text = $el.text();
            if (text.includes('odoo_62177537e4c00.csv')) {
                cy.log('File has been added');
                count+=1;
                cy.log(text);
            }
        })
        cy.wait(1000).then(()=>{
            if(count<=0) throw "File Not Found";
        })
        
    }
}

export default EboProductImportPage;