const dbConn = require('../helper/db.config');

const Category = function(category){
    this.categoryName = category.categoryName;
    this.discription = category.discription;
};

Category.findAll = (callback) => {
    let sql = `SELECT * FROM category`;
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

Category.finById = (id, callback) => {
    let sql = `SELECT * FROM category WHERE id = ?`;
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

Category.create = (category,callback) =>{
    let sql = `INSERT INTO category set ?`
    dbConn.query(sql, category, (err,res) => {
        if(err){
            console.log('Error', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null,res.insertId);
        }
    });
};

Category.update = (id, category,callback) => {
    let sql = `UPDATE category SET categoryName = ?, discription = ? WHERE id= ?`;
    dbConn.query(sql, [category.categoryName, category.discription, id], (err, res) => {
        if(err){
            console.log('Error:', err.sqlMessage);
            callback(err.sqlMessage, null);
        }
        else{
            callback(null, res);
        }
    })
}

Category.delete = (id, callback) => {
    let sql = `DELETE FROM category WHERE id = ?`;
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

Category.multipleDelete = (id, callback) => {
    let sql = `DELETE FROM category WHERE id IN (?)`
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

module.exports = Category;