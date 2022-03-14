///<reference types="cypress"/>
class ApiPage{
    getAProductApi(getAProductRequest,simpleProductSKU,configurableProductSKU){
        cy.request({
            method: 'POST',
            url: 'https://mcstaging.ebo.com/graphql',
            failOnStatusCode: false,
            body: {
                query:getAProductRequest 
            },
        }).then((response) => {
            const body = response.body;
            expect(response.status).to.eq(200);
            expect(response.body.data.products.items[0]).to.have.property('sku', configurableProductSKU);
            expect(response.body.data.products.items[0].variants[0].product).to.have.property('sku', simpleProductSKU);
            //token="Bearer "+body.token;
            cy.log(body);
        });
    }
}

export default ApiPage;