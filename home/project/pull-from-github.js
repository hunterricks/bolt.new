require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hunterricks';
const REPO_NAME = 'bolt.new';
const BRANCH = 'main'; // or whichever branch you want to pull from

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

async function pullFromGitHub() {
  try {
    const response = await api.get(`/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`);
    const files = response.data.tree.filter(item => item.type === 'blob');

    for (const file of files) {
      const filePath = file.path;
      const content = await fetchFileContent(file.url);
      await writeFile(filePath, content);
      console.log(`Successfully pulled: ${filePath}`);
    }

    console.log('All files have been pulled successfully!');
  } catch (error) {
    console.error('Error pulling from GitHub:', error.message);
  }
}

async function fetchFileContent(url) {
  const response = await api.get(url);
  return Buffer.from(response.data.content, 'base64').toString('utf-8');
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}

pullFromGitHub();
