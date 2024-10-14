require('dotenv').config();
const axios = require('axios');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

async function checkToken() {
  try {
    const response = await api.get('/user');
    console.log('Token is valid. User:', response.data.login);
    
    const scopesResponse = await api.get('/user/repos');
    console.log('Token scopes:', scopesResponse.headers['x-oauth-scopes']);
  } catch (error) {
    console.error('Error checking token:', error.response ? error.response.data.message : error.message);
  }
}

checkToken();
