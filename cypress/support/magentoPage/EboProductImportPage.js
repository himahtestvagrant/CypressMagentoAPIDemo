///<reference types="cypress"/>
class EboProductImportPage{
    chooseFileButton(file){
        cy.get('#productimport_file').attachFile(file);
    }
}

export default EboProductImportPage;