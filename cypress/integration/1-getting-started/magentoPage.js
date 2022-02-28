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
    })  
    it.only('Login In Magento Page', function(){
        // cy.login(this.user.userName)
        cy.login(this.user.userName,this.user.password);
        //const homePage = new HomePage();
        // const eboProductImportPage = new EboProductImportPage();
        // const file = 'success_6214c9838276a.csv'
        const productsPage = new ProductsPage();
        // homePage.settingButton();
        // homePage.clickOnEboProduct();
        // eboProductImportPage.chooseFileButton(file);
        // cy.wait(3000)
        // eboProductImportPage.validateTable();
        productsPage.catalogButton();
                productsPage.clickOnProducts();
                cy.wait(36000);
                productsPage.clearSKU();
                cy.wait(15000);
                productsPage.searchSKU();

    })
})


describe('Magento API Describe Block', ()=>{
    it('Get A Product',()=>{
        const apiPage = new APIPage();
        apiPage.getAProductApi(getAProductRequest);
    })
})