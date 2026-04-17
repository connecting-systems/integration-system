const express = require("express");
const router = express.Router();
const {fetchCandidates} = require("../controllers/candidateController");

router.get("/candidates", fetchCandidates);

module.exports = router;

