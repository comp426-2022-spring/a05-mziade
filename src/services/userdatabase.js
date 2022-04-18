let db = require('/src/config/userconfig.js')

async function login(){
    //post login
}

async function newUser(user){
    const result = await db.query(
        `INSERT INTO userlog 
        (username, pass) VALUES (?, ?)`, 
        [
          user.username, user.pass
        ]
      );
    
      let message = 'Error in creating user';
    
      if (result.affectedRows) {
        message = 'User created successfully';
      }
    
      return {message};
}

async function update(id, user){
    const result = await db.query(
        `UPDATE userlog 
        SET username=?, pass=?
        WHERE id=?`, 
        [
          user.username, user.pass
        ]
      );
    
      let message = 'Error in updating user';
    
      if (result.affectedRows) {
        message = 'User updated successfully';
      }
    
      return {message};
}

async function delUser(id){
    const result = await db.query(
        `DELETE FROM userlog 
        SET username=?, pass=?
        WHERE id=?`, 
        [
          id
        ]
      );
    
      let message = 'Error in deleting user';
    
      if (result.affectedRows) {
        message = 'User deleted successfully';
      }
    
      return {message};
}

// Export all of the above as a module so that we can use it elsewhere.
module.exports = {login, newUser, update, delUser}