const {getFromATS} = require("../../clients/atsClient");
const {mapCandidates} = require("../../mappers/inbound/candidateMapper");
const {saveCandidate} = require("../../services/candidateService");

async function syncCandidates(req, res) {
try {
  const atsData = await getFromATS(); 
  const mappedData = mapCandidates(atsData);

  // Save each Candidate
  for (const candidate of mappedData) {
  await saveCandidate(candidate);
}

  return res.json(mappedData);
  } catch (error) {
  return res.status(500).json({message: 'Failed to sync candidates' })
  };
}

module.exports = {
  syncCandidates,
}

