require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hunterricks';
const REPO_NAME = 'happyhouse';
const BRANCH = 'main';

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN is not set in the .env file');
  process.exit(1);
}

console.log('GitHub Token:', GITHUB_TOKEN.substring(0, 4) + '...' + GITHUB_TOKEN.substring(GITHUB_TOKEN.length - 4));

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function getFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map((entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
  } catch (error) {
    console.error('Error in getFiles:', error.message);
    return [];
  }
}

async function pushAllFiles() {
  try {
    console.log('Starting to push files to GitHub...');
    const files = await getFiles('.');
    console.log(`Found ${files.length} files to process`);
    
    for (const file of files) {
      if (file !== 'push-all.js' && !file.includes('node_modules') && !file.includes('.git') && file !== '.env') {
        console.log(`Processing file: ${file}`);
        try {
          const content = await fs.readFile(file, 'utf8');
          const contentEncoded = Buffer.from(content).toString('base64');
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
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
  }
}

async function updateOrCreateFile(filePath, content) {
  const filePathInRepo = filePath.replace(/^\.\//, '').replace(/^\//, '');
  console.log(`Attempting to update/create file: ${filePathInRepo}`);
  try {
    const { data: existingFile } = await api.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePathInRepo}`);
    console.log(`File ${filePathInRepo} exists, updating...`);
    await api.put(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePathInRepo}`, {
      message: `Update ${filePathInRepo}`,
      content: content,
      sha: existingFile.sha,
      branch: BRANCH,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`File ${filePathInRepo} doesn't exist, creating...`);
      await api.put(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePathInRepo}`, {
        message: `Create ${filePathInRepo}`,
        content: content,
        branch: BRANCH,
      });
    } else {
      console.error(`Error updating/creating ${filePathInRepo}:`, error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      throw error;
    }
  }
}

pushAllFiles();
