const dbConn = require('../dbconnection/db.config');

const Testnomial = function(testnomial){
    this.clientName = testnomial.clientName;
    this.feedback = testnomial.feedback;
};

Testnomial.findAll = (callback) => {
    let sql = `SELECT * FROM testnomial`;
    dbConn.query(sql, (err,res) => {
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res);
        }
    })
}

Testnomial.findById = (id, callback) => {
    let sql = `SELECT * FROM testnomial WHERE id = ?`;
    dbConn.query(sql, id, (err,res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

Testnomial.create = (testnomial,callback) =>{
    let sql = `INSERT INTO testnomial set ?`
    dbConn.query(sql, testnomial, (err,res) => {
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res.insertId);
        }
    });
};

Testnomial.update = (id, testnomial,callback) => {
    let sql = `UPDATE testnomial SET clientName = ?, feedback = ? WHERE id= ?`;
    dbConn.query(sql, [testnomial.clientName, testnomial.feedback, id], (err, res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

Testnomial.delete = (id, callback) => {
    let sql = `DELETE FROM testnomial WHERE id = ?`;
    dbConn.query(sql, id, (err, res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res)
        }
    })
}

Testnomial.multipleDelete = (id, callback) => {
    let sql = `DELETE FROM testnomial WHERE id IN (?)`
    dbConn.query(sql,[id], (err,res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res)
        }
    })
}

module.exports = Testnomial;