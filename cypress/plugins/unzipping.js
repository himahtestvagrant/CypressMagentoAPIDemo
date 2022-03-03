const unzipper = require('unzipper');
const fs = require('fs');

// const unzip = ({ path, file }) => decompress(path + file, path + 'unzip/' + file.replace('.zip', '')).then(file => {
//     map: file => {
//                     file.path = `unicorn-${file.path}`;
//                     return file;
//                 }
// });

const unzip = ({ path }) => fs.createReadStream(path).pipe(unzipper.Extract({ path: 'cypress/downloads' }));

module.exports = {
    unzip,
}