///<reference types="cypress"/>
class ApiPage{
    getAProductApi(getAProductRequest){
        cy.request({
            method: 'POST',
            url: 'https://mcstaging.ebo.com/graphql',
            failOnStatusCode: false,
            body: {
                query:getAProductRequest 
            },
        }).then((response) => {
            const body = response.body;
            //token="Bearer "+body.token;
            cy.log(body);
        });
    }
}

export default ApiPage;