const db = require("../config/db");

function saveCandidate(candidate) {
  const query = `INSERT OR REPLACE INTO candidates (id, name, email, phone, source, createdAt) Values (?, ?, ?, ?, ?, ?)`;

  db.run(query, [
    candidate.id,
    candidate.name,
    candidate.email,
    candidate.phone,
    candidate.source,
    candidate.createdAt,
  ]);
}

module.exports = {saveCandidate};