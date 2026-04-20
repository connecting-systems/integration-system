const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (error) => {
if (error) {
console.error("Error Connecting to DB", error.message);
} else {
console.log("Connected to Sqlite Database");
}
});

db.run(`
  CREATE TABLE IF NOT EXISTS candidates (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  source TEXT,
  createdAt TEXT
  )`);

module.exports = db;