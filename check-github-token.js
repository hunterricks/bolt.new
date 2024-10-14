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
    
    console.log('Token scopes:', response.headers['x-oauth-scopes']);
    console.log('Rate limit remaining:', response.headers['x-ratelimit-remaining']);
    console.log('Rate limit reset:', new Date(response.headers['x-ratelimit-reset'] * 1000).toLocaleString());
  } catch (error) {
    console.error('Error checking token:', error.response ? error.response.data.message : error.message);
  }
}

checkToken();
