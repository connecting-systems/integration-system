const db = require("../config/db");
const { mapCandidate: mapOutbound } = require("../mappers/outbound/candidateMapper");
const { updateToATS } = require("../clients/atsClient");

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

async function retryDirtyCandidates() {
  const dirtyCandidates = await runQuery(
    "SELECT * FROM candidates WHERE isDirty = 1"
  );

  let successCount = 0;

  for( const candidate of dirtyCandidates) {
    const atsPayload = mapOutbound(candidate)

    try {
      await updateToATS(atsPayload);

      await runCommand(
        "UPDATE candidates SET isDirty = 0 WHERE id = ?", [candidate.id]
      );

      successCount++;
    } catch (error) {
      console.error("Retry failed for: ", candidate.id);
    }
  }

  return {
    total: dirtyCandidates.length,
    synced: successCount,
  };
}

async function updateCandidateAndSync(id, updates){
  // Update DB
  const result = await updateCandidate(id, updates);

  if(result.changes === 0) {
    return {changes: 0};
  }

  // fetch updated candidate
  const rows = await runQuery("SELECT * FROM CANDIDATES WHERE id = ?", [id]);

  const candidate = rows[0];

  if (!candidate) {
  throw new Error("Candidate not found after update");
}

  // Map tp ATS format
  const atsPayload = mapOutbound(candidate);

  let synced = false;
try {
  await updateToATS(atsPayload);

  await runCommand(
    "UPDATE candidates SET isDirty = 0 WHERE id = ?",
    [id]
  );

  synced = true;

} catch (error) {
  console.error("ATS sync failed:", error.response?.data || error.message);
}

  return {changes: 1, synced};
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
  updates.isDirty = 1;

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
  updateCandidate,
  updateCandidateAndSync,
  runQuery, 
  retryDirtyCandidates,
};