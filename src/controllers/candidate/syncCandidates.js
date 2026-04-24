const {getFromATS} = require("../../clients/atsClient");
const {mapCandidates} = require("../../mappers/candidateMapper");
const {saveCandidate} = require("../../services/candidateService");

async function syncCandidates(req, res) {
try {
  const atsData = await getFromATS(); 
  const mappedData = mapCandidates(atsData);

  // Save each Candidate
  mappedData.forEach(saveCandidate)

  return res.json(mappedData);
  } catch (error) {
  return res.status(500).json({message: 'Failed to sync candidates' })
  };
}

module.exports = {
  syncCandidates,
}

