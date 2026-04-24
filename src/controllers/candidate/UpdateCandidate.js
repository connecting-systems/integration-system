const{updateCandidateAndSync} = require("../../services/candidateService");

async function updateCandidateHandler(req, res){
try {
const {id} = req.params;
const updates = req.body;

const result =  await updateCandidateAndSync(id, updates);

if(result.changes === 0){
  return res.status(404).json({message: "Candidate not found"});
}

return res.json({message: "Candidates updated and synced with ATS"})
} catch(error) {
   if (error.message === "No fields to update") {
    return res.status(400).json({message: error.message});
   }

   return res.status(500).json({message: "Failed to update candidate"})

}
}

module.exports = {updateCandidateHandler};