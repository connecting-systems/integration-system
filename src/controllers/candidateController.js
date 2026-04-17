const {getCandidates} = require("../clients/atsClient");

async function fetchCandidates(req, res) {
try {
  const data = await getCandidates();
  return res.json(data);
  } catch (error) {
  return res.status(500).json({message: 'Failed to fetch candidates' })
  };
}

module.exports = {
  fetchCandidates,
}

