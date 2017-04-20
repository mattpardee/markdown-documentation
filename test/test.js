const assert = require('assert');
const subject = require('../index');
const _ = require('lodash');

describe('FileStrategy', () => {
  it('Returns generated HTML for the file content', () =>
    subject({
      strategy: 'file',
      path: 'README.md',
    })
    .then(result => {
      assert(_.includes(result.htmlContent, '<a id="markdown-documentation" name="markdown-documentation"'));
    })
  );
});
