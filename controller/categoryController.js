const Category = require('../models/category.modal');

exports.create = (req,res) => {
    const new_category = new Category(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please fill all field..!'});
    }
    else{
        Category.create(new_category, (err, category) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message: err});
            }
            else{
                res.statusCode = 200;
                res.json({err: true, message:'Data add successfully', data: category})
            }
        })
    }
}

exports.findAll = (req,res) => {

}

exports.update = (req,res) => {

}

exports.delete = (req,res) => {

}
