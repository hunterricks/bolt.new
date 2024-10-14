const axios = require('axios');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = 'hunterricks';
const REPO_NAME = 'bolt.new';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function testConnection() {
  try {
    const response = await api.get(`/repos/${REPO_OWNER}/${REPO_NAME}`);
    console.log('Connection successful!');
    console.log('Repository details:');
    console.log(`Name: ${response.data.name}`);
    console.log(`Description: ${response.data.description}`);
    console.log(`URL: ${response.data.html_url}`);
  } catch (error) {
    console.error('Connection failed:', error.response ? error.response.data.message : error.message);
  }
}

testConnection();
