
"use strict";

const database = require('better-sqlite3');
// const config = require('../configs/general.config.js');
// Connect to a database or create one if it doesn't exist yet.
const fs = require('fs');
const datadir = './data/';

if (!fs.existsSync(datadir)){
    fs.mkdirSync(datadir);
}

const db = new database(datadir+'user.db')
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
async function newUser(user, pass){
        `INSERT INTO userlog 
        (username, pass) VALUES (?, ?)`, 
        [
          user, pass
        ]
}

async function update(id, username, pass){
        `UPDATE userlog 
        SET username=?, pass=?
        WHERE id=?`, 
        [
          username, pass
        ]
}

async function delUser(id){
        `DELETE FROM userlog 
        SET username=?, pass=?
        WHERE id=?`, 
        [
          id
        ]
}

// Export all of the above as a module so that we can use it elsewhere.
module.exports = { newUser, update, delUser}