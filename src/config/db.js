const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (error) => {
  if (error) {
    console.error("Error Connecting to DB", error.message);
  } else {
    console.log("Connected to Sqlite Database");

    db.run(
      "ALTER TABLE candidates ADD COLUMN isDirty INTEGER DEFAULT 0",
      (err) => {
        if (err) {
          if (!err.message.includes("duplicate column name")) {
            console.error("Error adding isDirty column:", err.message);
          }
        } else {
          console.log("isDirty column added");
        }
      }
    );
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
  )
`);

module.exports = db;