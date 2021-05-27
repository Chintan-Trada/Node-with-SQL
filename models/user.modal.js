var dbConn = require('../middleware/db.config');

var User = function(user){
    this.username = user.username,
    this.password = user.password,
    this.firstname = user.firstname,
    this.lastname = user.lastname,
    this.contact = user.contact,
    this.email = user.email
};

User.findAll = (callback) =>{
    dbConn.query('SELECT * FROM user', (err,res) =>{
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

User.create = (user,callback) =>{
    let sql = `INSERT INTO user set ?`
    dbConn.query(sql, user, (err,res) => {
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res.insertId);
        }
    });
};

User.find = (username,password,callback) =>{
    let sql =`SELECT * FROM user WHERE (username = ? AND password = ?)`
    dbConn.query(sql,[username,password], (err,res) =>{
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

module.exports = User;