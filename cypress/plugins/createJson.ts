///<reference types="cypress"/>
const fs = require('fs');
const csv = require("csvtojson");
//const syncDelay=(milliseconds)=>{
// var start = new Date().getTime();
// var end=0;
// while( (end-start) < milliseconds){
//     end = new Date().getTime();
// }
//}
const createJsonFile= async ({ SKU }) => {
    let data = {
                  "SKU" : SKU
                  }
//     fs.writeFileSync('./cypress/fixtures/SKU.json', data);
         fs.writeFileSync('./cypress/fixtures/SKU.json', JSON.stringify(data), "utf-8", (err) =>{
            if(err) console.log(err);
        });
    return "";
}

//module.exports.writeCsv = writeCsv;
module.exports = {
    createJsonFile,
}
