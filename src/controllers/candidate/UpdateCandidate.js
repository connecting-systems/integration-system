const{updateCandidateAndSync, retryDirtyCandidates} = require("../../services/candidateService");

async function updateCandidateHandler(req, res){
try {
const {id} = req.params;
const updates = req.body;

const result =  await updateCandidateAndSync(id, updates);

if(result.changes === 0){
  return res.status(404).json({message: "Candidate not found"});
}

if (result.synced) {
  return res.json({
    message: "Candidate updated and synced with ATS"
  });
} else {
  return res.json({
    message: "Candidate updated but NOT synced with ATS",
    isDirty: true
  });
}
} catch(error) {
   if (error.message === "No fields to update") {
    return res.status(400).json({message: error.message});
   }

   console.error("FULL ERROR:", error); 
   return res.status(500).json({message: error.message || "Failed to update candidate"})

}
}

async function retrySyncHandler(req, res) {
  try {
   const result = await retryDirtyCandidates();
   
   return res.json({message: "Retry completed",  ...result})
  } catch (error) {
    return res.status(500).json({message: error.message || "Retry failed"})
  }
}

module.exports = {
  updateCandidateHandler,
  retrySyncHandler,
};