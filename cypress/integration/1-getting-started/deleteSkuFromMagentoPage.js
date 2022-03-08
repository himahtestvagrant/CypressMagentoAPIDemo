///<reference types="cypress"/>
import HomePage from "../../support/magentoPage/HomePage";
import APIPage from "../../support/magentoPage/APIPage";
import EboProductImportPage from "../../support/magentoPage/EboProductImportPage"
import {getAProductRequest} from "../../fixtures/magentoPayload";
import ProductsPage from "../../support/magentoPage/ProductsPage";
let SKU;
describe("Delete SKU from Magento", ()=>{
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
     it("delete sku which has been recently added", function () {
         cy.login(this.credential.userName,this.credential.password);
         const productsPage = new ProductsPage();
         productsPage.catalogButton();
         productsPage.clickOnProducts();
         cy.wait(36000);
         productsPage.searchUniqueGroupId(this.productData[0].unique_group_id);
         cy.wait(10000);
         productsPage.deleteCreatedSku();
     })
})