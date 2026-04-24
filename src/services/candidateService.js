const db = require("../config/db");

function runQuery(query, params = []){
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    })
  })
}

function runCommand(query, params = []){
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    })
  })
}

async function saveCandidate(candidate) {
  const query = `INSERT OR REPLACE INTO candidates (id, name, email, phone, source, createdAt) Values (?, ?, ?, ?, ?, ?)`;

  await runCommand(query, [
    candidate.id,
    candidate.name,
    candidate.email,
    candidate.phone,
    candidate.source,
    candidate.createdAt,
  ]);
}

async function getAllCandidates() {
  const rows = await runQuery("SELECT * FROM candidates");
  return rows;
}

async function updateCandidate(id, updates) {
  const fields = [];
  const values = [];

  for (const key in updates) {
    fields.push(`${key} = ?`);
    values.push(updates[key]);
  }

  if(fields.length === 0){
    throw new Error("No fields to update");
  }

  const query = `
  UPDATE candidates
  SET ${fields.join(", ")}
  WHERE id = ?
  `;

  const result = await runCommand(query, [...values, id]);

  return {changes: result.changes};

}

module.exports = {
  saveCandidate,
  getAllCandidates,
  updateCandidate
};