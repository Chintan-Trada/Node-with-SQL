var dbConn = require('../dbconnection/db.config');

var User = function(user){
    this.username = user.username,
    this.password = user.password,
    this.firstname = user.firstname,
    this.lastname = user.lastname,
    this.contact = user.contact,
    this.email = user.email
};

User.findAll = (callback) =>{
    let sql = `SELECT * FROM user`
    dbConn.query(sql, (err,res) =>{
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

User.update = (id, data, callback) => {    
    let sql = `UPDATE user SET username=?,password=?,firstname=?,lastname=?,contact=?,email=? WHERE id = ?`;
    dbConn.query(sql, [data.username, data.password, data.firstname, data.lastname, data.contact, data.email,id], (err, res) => {
        if (err) {
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        } else {
            callback(null, res);
            console.log(data)
        }
    });
}

User.changePassword =(id, data, callback) => {
    let sql = `UPDATE user SET password=? WHERE id = ?`;
    dbConn.query(sql,[data.password, id], (err, res) => {
        if(err) {
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res)
        }
    })
}

User.findUser = (id, callback) => {
    let sql = `SELECT password FROM user WHERE id = ?`;
    dbConn.query(sql, id, (err, res) => {
        if(err) {
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res)
        }
    })
}

User.profile = (id, callback) => {
    let sql = `SELECT * FROM user WHERE id = ?`;
    dbConn.query(sql, id, (err,res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res)
        }
    })
}

module.exports = User;