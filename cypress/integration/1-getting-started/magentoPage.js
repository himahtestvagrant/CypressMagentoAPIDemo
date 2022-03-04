///<reference types="cypress"/>
import HomePage from "../../support/magentoPage/HomePage";
import APIPage from "../../support/magentoPage/APIPage";
import EboProductImportPage from "../../support/magentoPage/EboProductImportPage"
import {getAProductRequest} from "../../fixtures/magentoPayload";
import ProductsPage from "../../support/magentoPage/ProductsPage";

describe('Page Object Model', () => {
    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('credential').then((user) => {
            // "this" is still the test context object
            this.user = user;
        })
        cy.fixture('successSku').then((productData) => {
             // "this" is still the test context object
             this.productData = productData;
        })
        cy.fixture('path').then((filePath) => {
             // "this" is still the test context object
             this.filePath = filePath;
        })
    })  
    it.only('Login In Magento Page', function(){
        cy.login(this.user.userName)
        cy.login(this.user.userName,this.user.password);
        const homePage = new HomePage();
         const eboProductImportPage = new EboProductImportPage();
        const productsPage = new ProductsPage();
         homePage.settingButton();
         homePage.clickOnEboProduct();
         eboProductImportPage.writeInCsv(this.filePath.demoCsv,this.user.uniqueGroupId);
         const file = 'product.csv';
         eboProductImportPage.chooseFileButton(file);
         cy.wait(6000)
         eboProductImportPage.validateTable();
         eboProductImportPage.downloadFile();
         eboProductImportPage.unzipFile(this.filePath.zipFile);
         eboProductImportPage.readCsvFile(this.filePath.successCsv);
         productsPage.catalogButton();
                productsPage.clickOnProducts();
                cy.wait(36000);
                productsPage.searchSKU();
                cy.wait(10000);
                productsPage.validateUGid();
                    
    })
})


describe('Magento API Describe Block', ()=>{
    it('Get A Product',()=>{
        const apiPage = new APIPage();
        apiPage.getAProductApi(getAProductRequest);
    })
})