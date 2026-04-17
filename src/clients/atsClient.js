const axios = require("axios");

const BASE_URL = process.env.FAKE_ATS_API_URL;

async function getCandidates() {
  try {
  const response = await axios.get(`${BASE_URL}/candidates`);
  return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error.message);
    throw error;
  }
}

module.exports = {
  getCandidates,
}