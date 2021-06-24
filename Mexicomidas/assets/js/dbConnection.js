const sqlite3 = require('sqlite3').verbose();

const connect = new Promise((resolve, reject) => {
  const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
      reject(err);
    }
    resolve();
    console.debug("\nConnection to DB done successfully =)" + "\n");
  });
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT UNIQUE, password TEXT)");
  });
});

module.exports = { connect };