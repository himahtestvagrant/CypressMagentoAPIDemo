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
            if (text.includes('odoo_621da86a18ec3.csv')) {
                cy.log('File has been added');
                count+=1;
                cy.log(text);
            }
        })
        cy.wait(1000).then(()=>{
            if(count<=0) throw "File Not Found";
        })
        
    }
    downloadFile(){
        cy.get('tr td:nth-child(5)', { timeout: 1000 }).each(($el, index, $list) => {
            const text = $el.text();
            if (text.includes('success')) {
                // cy.get('tr td').scrollTo('right');
                cy.get(`[data-repeat-index="${index}"] > .data-grid-actions-cell > .action-menu-item`, { timeout: 1000 }).should('have.attr', 'href')
                .then((href) => {
                    cy.downloadFile(`${href}`,'cypress/downloads','demo.zip')
                    cy.log(href)
                  })
                  return false;   
            }
        });
    }

    unzipFile(path,file){
        cy.task('unzipping', { path, file });
    }

    writeInCsv(path,file){
        cy.task('writeInCsv', { path, file });
    }
}

export default EboProductImportPage;