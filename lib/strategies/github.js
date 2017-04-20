const Promise = require('bluebird');
const GitHubApi = require('github');

const github = new GitHubApi({});

function convertBase64ContentToUtf8(content) {
  return Buffer.from(content, 'base64').toString('utf8');
};

module.exports = (options) =>
  new Promise((resolve, reject) => {
    const accessToken = options.githubAccessToken;
    if (!accessToken) {
      return reject({
        status: 403,
        err: 'GitHub authorization token required',
      });
    }

    if (!options.owner || !options.repo || !options.path) {
      return reject({
        status: 422,
        err: 'owner, repo and path required to fulfill the request',
      });
    }

    github.authenticate({
      type: 'oauth',
      token: accessToken,
    });

    
    github.repos.getContent({
      owner: options.owner,
      repo: options.repo,
      path: options.path,
    })
    .then((result) => {
      const data = result.data;
      data.content = convertBase64ContentToUtf8(data.content);

      resolve(data);
    })
    .catch(reject);
  })
