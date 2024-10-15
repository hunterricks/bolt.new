const axios = require('axios');

const GITHUB_TOKEN = 'your_token_here'; // Replace with your actual token

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function testGitHubToken() {
  try {
    const response = await api.get('/user');
    console.log('Authentication successful!');
    console.log('Logged in as:', response.data.login);
  } catch (error) {
    console.error('Authentication failed:', error.response ? error.response.data : error.message);
  }
}

testGitHubToken();
