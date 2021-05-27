const dbConn = require('../middleware/db.config');

const Category = function(category){
    this.categoryName = category.categoryName;
    this.discription = category.discription;
};



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

module.exports = Category;