const { pushToGitHub } = require('./push-to-github');

console.log('Starting GitHub push process...');
pushToGitHub()
  .then(() => console.log('GitHub push completed successfully.'))
  .catch(error => console.error('Error during GitHub push:', error));
