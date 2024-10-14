const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hunterricks';
const REPO_NAME = 'happyhouse';
const BRANCH = 'main';

const SENSITIVE_FILES = ['.env', 'push.js', 'simple-push.js', 'git-push.js'];

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function pushAllFiles() {
  try {
    console.log('Starting to push all files to GitHub...');
    const files = await getFiles('.');
    console.log(`Found ${files.length} files to process`);
    
    for (const file of files) {
      const fileName = path.basename(file);
      if (file !== 'push-all.js' && !file.includes('node_modules') && !file.includes('.git') && !SENSITIVE_FILES.includes(fileName)) {
        console.log(`Processing file: ${file}`);
        try {
          const stats = await fs.stat(file);
          if (stats.size > 1000000) { // If file is larger than 1MB
            console.log(`Skipping large file: ${file} (${stats.size} bytes)`);
            continue;
          }
          const content = await fs.readFile(file);
          const contentEncoded = content.toString('base64');
          await updateOrCreateFile(file, contentEncoded);
          console.log(`Successfully pushed ${file} to GitHub`);
        } catch (error) {
          console.error(`Error processing ${file}:`, error.message);
          if (error.response) {
            console.error('Error details:', error.response.data);
          }
        }
      } else {
        console.log(`Skipping file: ${file}`);
      }
    }
    console.log('Finished pushing files to GitHub');
  } catch (error) {
    console.error('Error in pushAllFiles:', error.message);
  }
}

// ... rest of the script remains the same ...

pushAllFiles();
