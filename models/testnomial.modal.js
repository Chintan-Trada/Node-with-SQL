const dbConn = require('../dbconnection/db.config');

const Testnomial = function(testnomial){
    this.clientName = testnomial.clientName;
    this.feedback = testnomial.feedback;
    this.image = testnomial.image

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

Testnomial.create = (testnomial,image,callback) =>{
    console.log(testnomial)
    console.log("image", JSON.stringify(image))

    let sql = `INSERT INTO testnomial (clientName,feedback,image) VALUES (?,?,?)`
    dbConn.query(sql, [testnomial.clientName,testnomial.feedback,JSON.stringify(image)], (err,res) => {
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res.insertId);
        }
    });
};

Testnomial.update = (id, testnomial,image,callback) => {
    let sql = `UPDATE testnomial SET clientName = ?, feedback = ? image =? WHERE id= ?`;
    dbConn.query(sql, [testnomial.clientName, testnomial.feedback, JSON.stringify(image), id], (err, res) => {
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