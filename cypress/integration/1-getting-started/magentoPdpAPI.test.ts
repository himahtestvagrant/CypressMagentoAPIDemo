///<reference types="cypress"/>
import HomePage from "../../support/magentoPage/HomePage";
import APIPage from "../../support/magentoPage/APIPage";
import EboProductImportPage from "../../support/magentoPage/EboProductImportPage"
import {getAProductRequest} from "../../fixtures/magentoPayload";
import ProductsPage from "../../support/magentoPage/ProductsPage";
let SKU;
describe('Magento API Test Scenario', () => {
    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('SKU').then((SKU) => {
            // "this" is still the test context object
            this.SKU = SKU;
        })
    })  
    it('Get A Product PDP API',function (){
            const apiPage = new APIPage();
            cy.log(this.SKU.configurableProductSKU);
            let configurableProductSKU = this.SKU.configurableProductSKU;
            let simpleProductSKU = this.SKU.simpleProductSKU;
            apiPage.getAProductApi(getAProductRequest(configurableProductSKU),simpleProductSKU,configurableProductSKU);
            cy.wait(15000);
        })
})