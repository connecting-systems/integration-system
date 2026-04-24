const axios = require("axios");

const BASE_URL = process.env.FAKE_ATS_API_URL;
const API_KEY = process.env.FAKE_ATS_API_KEY;

// Inbound (ATS → system)
async function getFromATS() {
  try {
  const response = await axios.get(`${BASE_URL}/api/v1/candidates`, {
    headers: {
      Authorization: `Api-Key ${API_KEY}`
    }
  });
  return response.data;
  } catch (error) {
    console.error('Error fetching candidates:', error.message);
    throw error;
  }
}

// Outbound (system → ATS)
async function updateToATS(candidate) {
  try {
    const response = await axios.patch(`${BASE_URL}/api/v1/candidates/${candidate.id}`, candidate, {
      headers :{
        Authorization: `Api-Key ${API_KEY}`,
      },
    })

    return response.data;
  } catch (error) {
    console.error("Error updating candidate in ATS", error.message);
    throw error;
  }
}

module.exports = {
  getFromATS,
  updateToATS,
}