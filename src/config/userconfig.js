// Configuration goes here

//For example, if the app connects to a database, the configuration for the database (like database name and username) can be put in a file like db.config.js
"use strict";

const Database = require('better-sqlite3');
// const config = require('../configs/general.config.js');
// Connect to a database or create one if it doesn't exist yet.
const db = new Database('/Users/miaziade/Documents/comp426/a05-mziade/data/db/user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='userlog';`
    );
// Define row using `get()` from better-sqlite3
let row = stmt.get();
// Check if there is a table. If row is undefined then no table exists.
if (row === undefined) {
// Echo information about what you are doing to the console.
    console.log('Your database appears to be empty. I will initialize it now.');
// Set a const that will contain your SQL commands to initialize the database.
    const sqlInit = `
        CREATE TABLE userlog (id INTEGER PRIMARY KEY, username TEXT, pass TEXT);
        `;
// Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
// Echo information about what we just did to the console.
    console.log('Your database has been initialized with a new table and two entries containing a username and password.');
} else {
// Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
module.exports = db;