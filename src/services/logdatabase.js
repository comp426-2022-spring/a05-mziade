const myFunc = require('../middleware/mymiddleware');
let db = require('../config/logconfig')

async function getAll(){
    const stmt = db.prepare('SELECT * FROM accesslog').all()
    return stmt;
}

async function error(){
    throw new Error("Error test successful.")
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = {db, getAll, error}