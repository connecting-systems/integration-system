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

function runQuery(query, params = []){
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}

async function getAllCandidates() {
  const rows = await runQuery("SELECT * FROM candidates");
  return rows;
}

module.exports = {
  saveCandidate,
  getAllCandidates,
};