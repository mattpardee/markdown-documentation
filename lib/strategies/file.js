const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);

module.exports = (options) =>
  new Promise((resolve, reject) => {
    readFile(options.path, 'utf-8')
    .then((content) => {
      resolve({ content })
    })
    .catch(reject)
  })


