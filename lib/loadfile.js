const Promise = require('bluebird');
const Markdown = require('./markdown');

const strategies = {
  file: require('./strategies/file'),
  github: require('./strategies/github'),
};

module.exports = (options) =>
  new Promise((resolve, reject) => {
    strategies[options.strategy](options)
    .then((result) => {
      const markdown = new Markdown();
      result.htmlContent = markdown.marked(
        result.content,
        { renderer: markdown.renderer }
      );

      result.toc = markdown.toc;
      resolve(result);
    })
    .catch(reject);
  })
