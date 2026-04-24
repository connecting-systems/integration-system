const express = require("express");
const router = express.Router();
const {syncCandidates} = require("../controllers/candidate/syncCandidates");
const {getCandidates} = require("../controllers/candidate/getCandidates");
const { updateCandidateHandler } = require("../controllers/candidate/updateCandidate");

router.get("/external/candidates", syncCandidates);   // ATS -> DB
router.get("/candidates", getCandidates);  // From DB
router.patch("/candidates/:id", updateCandidateHandler)

module.exports = router;

