///<reference types="cypress"/>
import HomePage from "../../support/magentoPage/HomePage";
import APIPage from "../../support/magentoPage/APIPage";
import EboProductImportPage from "../../support/magentoPage/EboProductImportPage"
import {getAProductRequest} from "../../fixtures/magentoPayload";
import ProductsPage from "../../support/magentoPage/ProductsPage";
let SKU;
describe('Product Page Test Scenario', () => {
    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('credential').then((credential) => {
            // "this" is still the test context object
            this.credential = credential;
        })
        cy.fixture('product').then((productData) => {
             // "this" is still the test context object
             this.productData = productData;
        })
        cy.fixture('path').then((filePath) => {
             // "this" is still the test context object
             this.filePath = filePath;
        })
    })  
    it('validate the SKU in product page', function(){
        //cy.login(this.user.userName)
        //cy.log("User id to be used is "+this.user.userName)
        //cy.log("Password to be used is "+this.user.password)
        cy.login(this.credential.userName,this.credential.password);
        const productsPage = new ProductsPage();
         productsPage.catalogButton();
                productsPage.clickOnProducts();
                cy.wait(36000);
                productsPage.searchUniqueGroupId(this.productData[0].unique_group_id);
//                cy.wait(10000);
//                productsPage.validateUGid();
                cy.wait(10000);
                SKU=productsPage.fetchSKU();
                cy.log("sku inside describe block: "+SKU)
//                cy.log(SKU);
                productsPage.enableSimpleProduct();
                productsPage. magentoSystem();
                cy.wait(20000);
                productsPage.validateStatus();
               // cy.wait(36000);
               // productsPage.searchUniqueGroupId(this.productData[0].unique_group_id)
    })
})