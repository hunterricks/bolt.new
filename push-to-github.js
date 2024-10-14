require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hunterricks';
const REPO_NAME = 'bolt.new';

if (!GITHUB_TOKEN) {
  console.error('Please set the GITHUB_TOKEN environment variable in the .env file');
  process.exit(1);
}

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function pushToGitHub() {
  try {
    const files = fs.readdirSync('.');
    for (const file of files) {
      if (fs.statSync(file).isFile() && file !== '.env') {
        const content = fs.readFileSync(file, 'utf8');
        const contentEncoded = Buffer.from(content).toString('base64');

        try {
          const response = await api.put(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file}`, {
            message: `Update ${file}`,
            content: contentEncoded,
            sha: await getFileSHA(file),
          });
          console.log(`Successfully pushed ${file} to GitHub`);
        } catch (error) {
          console.error(`Error pushing ${file}:`);
          console.error('Status:', error.response.status);
          console.error('Status Text:', error.response.statusText);
          console.error('Error Message:', error.response.data.message);
          if (error.response.data.errors) {
            console.error('Detailed Errors:', JSON.stringify(error.response.data.errors, null, 2));
          }
        }
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function getFileSHA(file) {
  try {
    const response = await api.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file}`);
    return response.data.sha;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // File doesn't exist yet
    }
    throw error;
  }
}

pushToGitHub();
