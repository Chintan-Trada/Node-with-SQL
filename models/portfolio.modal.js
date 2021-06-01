const dbConn = require('../dbconnection/db.config');

const Portfolio = function(portfolio){
    this.projectName = portfolio.projectName,
    this.projectCategory = portfolio.projectCategory,
    this.discription = portfolio.discription
};

Portfolio.findAll = (callback) => {
    let sql = `SELECT * FROM portfolio`;
    dbConn.query(sql,(err,res) => {
        if(err) {
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage,null);
        }
        else{
            callback(null,res);
        }
    })
};

Portfolio.findById = (id,callback) => {
    let sql = `SELECT * FROM portfolio WHERE id = ?`;
    dbConn.query(sql, id, (err,res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
};

Portfolio.create = (portfolio,callback) => {
    let sql = `INSERT INTO portfolio set  ? `
    dbConn.query(sql, portfolio, (err,res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res.insertId);
        }
    })
};

Portfolio.update = (id, portfolio, callback) => {
    let sql = `UPDATE portfolio SET projectName= ?, projectCategory=?, discription=? WHERE id =?`;
    // let sql = `UPDATE category SET categoryName = ?, discription = ? WHERE id= ?`;

    dbConn.query(sql,[portfolio.projectName, portfolio.projectCategory, portfolio.discription, id], (err,res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

Portfolio.delete = (id, callback) => {
    let sql = `DELETE FROM portfolio WHERE id = ?`;
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

Portfolio.multipleDelete = (id, callback) => {
    let sql = `DELETE FROM portfolio WHERE id IN (?)`
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

module.exports = Portfolio;