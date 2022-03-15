///<reference types="cypress"/>
import HomePage from "../support/magentoPage/HomePage";
import APIPage from "../support/magentoPage/APIPage";
import EboProductImportPage from "../support/magentoPage/EboProductImportPage"
import { getAProductRequest } from "../fixtures/magentoPayload";
import ProductsPage from "../support/magentoPage/ProductsPage";

let SKU;

const productsPage = new ProductsPage();
const homePage = new HomePage();
const eboProductImportPage = new EboProductImportPage();
const apiPage = new APIPage();

after(() => {
    cy.wait(2000);
    productsPage.deleteCreatedSku();
})
describe('UserJourney for Importing a File and Validate in Magento API Test Scenario', () => {
    before(function () {
        cy.fixture('credential').then((credential) => {
            this.credential = credential;
        })
    })
    before(function () {
        cy.clearCookie('admin')
        cy.login(this.credential.userName, this.credential.password);
    })
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('admin', 'Value')
        cy.fixture('path').then((filePath) => {
            this.filePath = filePath;
        })
    })
    it('validating import file in ebo product import page', function () {
        homePage.settingButton();
        homePage.clickOnEboProduct();
        eboProductImportPage.writeInCsv(this.filePath.demoCsv);
        const file = 'product.csv';
        eboProductImportPage.chooseFileButton(file);
//         cy.wait(6000)
        eboProductImportPage.readCsvFile(this.filePath.productCsv);
        eboProductImportPage.clickOnImportButton();
//         cy.wait(5000);
        eboProductImportPage.validateSuccessfulImportFile();
    });
    it('validate the SKU in product page', function () {
        productsPage.catalogButton();
        productsPage.clickOnProducts();
        cy.wait(36000);
        cy.fixture('product').then((productData) => {
            this.productData = productData;
            productsPage.searchUniqueGroupId(this.productData[0].unique_group_id);
        })
        cy.wait(5000);
        productsPage.fetchSKU();
        productsPage.enableSimpleProduct();
        productsPage.magentoSystem();
        cy.wait(25000);
        cy.fixture('product').then((productData) => {
            this.productData = productData;
            productsPage.validateStatus(this.productData[0].unique_group_id);
        })
//         cy.wait(5000);
//         productsPage.validateStatus();
    })
    it('Get A Product PDP API', function () {
        cy.fixture('SKU').then((SKU) => {
            this.SKU = SKU;
            cy.log(this.SKU.configurableProductSKU);
            let configurableProductSKU = this.SKU.configurableProductSKU;
            let simpleProductSKU = this.SKU.simpleProductSKU;
            apiPage.getAProductApi(getAProductRequest(configurableProductSKU), simpleProductSKU, configurableProductSKU);
        })
//         cy.wait(2000);
    })
})


