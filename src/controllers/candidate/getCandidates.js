const {getAllCandidates} = require("../../services/candidateService");

async function getCandidates(req, res) {
  try {
     const candidates = await getAllCandidates();
     return res.json(candidates);
  } catch {
    return res.status(500).json({message: "Failed to fetch candidates"});
  }
}

module.exports = {getCandidates};