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
            if (text.includes('odoo_62208a89df98e.csv')) {
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
            const failureBoxText = $el.next().next().text();
            cy.log(failureBoxText)
            if (text.includes('success') && !failureBoxText.includes("failure")) {
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

    validateSuccessfulImportFile(){
        cy.get('.messages > div',{ timeout: 10000 }).each(($el, index, $list) => {
            let text = $el.text();
            if(text.includes('Success records. Click') || text.includes('Odoo records. Click')){
                cy.log("File has been added")
            }else if(text.includes('Failed records. Click')) throw "File has not been uploaded";
        })
    }

    unzipFile(path){
        cy.task('unzipping', { path });
    }

    writeInCsv(path){
        cy.task('writeInCsv', { path });
    }

    readCsvFile(path){
            cy.task('readCsv', { path });
    }
}

export default EboProductImportPage;