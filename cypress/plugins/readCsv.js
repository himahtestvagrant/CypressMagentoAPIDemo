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
const readCsvFile= async ({ path }) => {
    const csvFile =await csv().fromFile(path)
    .then((jsonObj) => {
         fs.writeFileSync("./cypress/fixtures/successSku.json", JSON.stringify(jsonObj), "utf-8", (err) =>{
            if(err) console.log(err);
        });
    });
    return "";
}

//module.exports.writeCsv = writeCsv;
module.exports = {
    readCsvFile,
}
