const express = require("express");
const router = express.Router();
const {syncCandidates} = require("../controllers/candidate/syncCandidates");
const {getCandidates} = require("../controllers/candidate/getCandidates");

router.get("/external/candidates", syncCandidates);   // ATS -> DB
router.get("/candidates", getCandidates);  // From DB

module.exports = router;

