let db = require('../config/userconfig')

async function login(){
    //post login
}

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
module.exports = {login, newUser, update, delUser}