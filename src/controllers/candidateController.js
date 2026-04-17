const {getCandidates} = require("../clients/atsClient");
const {mapCandidates} = require("../mappers/candidateMapper");

async function fetchCandidates(req, res) {
try {
  const atsData = await getCandidates(); 
  const mappedData = mapCandidates(atsData);

  return res.json(mappedData);
  } catch (error) {
  return res.status(500).json({message: 'Failed to fetch candidates' })
  };
}

module.exports = {
  fetchCandidates,
}

