const {getCandidates} = require("../clients/atsClient");
const {mapCandidates} = require("../mappers/candidateMapper");
const {saveCandidate} = require("../services/candidateService");

async function fetchCandidates(req, res) {
try {
  const atsData = await getCandidates(); 
  const mappedData = mapCandidates(atsData);

  // Save each Candidate
  mappedData.forEach(saveCandidate)

  return res.json(mappedData);
  } catch (error) {
  return res.status(500).json({message: 'Failed to fetch candidates' })
  };
}

module.exports = {
  fetchCandidates,
}

