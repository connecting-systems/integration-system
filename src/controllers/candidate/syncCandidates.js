const {getFromATS} = require("../../clients/atsClient");
const {mapCandidates} = require("../../mappers/inbound/candidateMapper");
const {saveCandidate} = require("../../services/candidateService");

const { runQuery } = require("../../services/candidateService");

async function syncCandidates(req, res) {
try {
  const atsData = await getFromATS(); 
  const mappedData = mapCandidates(atsData);

  for (const candidate of mappedData) {
  const existing = await runQuery(
    "SELECT * FROM candidates WHERE id = ?",
    [candidate.id]
  );

  if (existing.length > 0 && existing[0].isDirty === 1) {
    console.log("Skipping overwrite (dirty):", candidate.id);
    continue;
  }

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

