require('dotenv').config();

const config = {
  API_URL: process.env.API_URL || 'http://localhost:8001/api'
};

export default config;
