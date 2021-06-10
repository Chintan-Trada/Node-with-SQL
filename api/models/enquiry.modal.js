const dbConn = require('../helper/db.config');

const Enquiry = function(enquiry){
    this.firstname = enquiry.firstname;
    this.lastname = enquiry.lastname;
    this.email = enquiry.email;
    this.mobileNo = enquiry.mobileNo;
    this.comment = enquiry.comment;
};

Enquiry.findAll = (callback) => {
    let sql = `SELECT * FROM enquiry`;
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

Enquiry.findById = (id, callback) => {
    let sql = `SELECT * FROM enquiry WHERE id = ?`;
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

Enquiry.create = (enquiry,callback) =>{
    let sql = `INSERT INTO enquiry set ?`
    dbConn.query(sql, enquiry, (err,res) => {
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res.insertId);
        }
    });
};

Enquiry.update = (id, enquiry,callback) => {
    let sql = `UPDATE enquiry SET firstname = ?, lastname = ?, email = ?, mobileNo = ?, comment = ? WHERE id= ?`;
    dbConn.query(sql, [enquiry.firstname, enquiry.lastname, enquiry.email, enquiry.mobileNo, enquiry.comment, id], (err, res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

Enquiry.delete = (id, callback) => {
    let sql = `DELETE FROM enquiry WHERE id = ?`;
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

Enquiry.multipleDelete = (id, callback) => {
    let sql = `DELETE FROM enquiry WHERE id IN (?)`
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

module.exports = Enquiry;