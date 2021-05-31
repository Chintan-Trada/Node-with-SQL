const Category = require('../models/category.modal');

exports.findAll = (req,res) => {
    Category.findAll((err,category) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err})
        }
        else if(category.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`No data are insertet`});
        }
        else{
            console.log(category)
            res.statusCode = 200;
            res.json({err: false, message: 'Data Found', data: category})
        }
    }) 
}

exports.findById = (req,res) => {
    const id  = req.params.id;

    Category.finById(id, (err, category) => {
        if(err){
            res.statusCode = 401;
            res.json({error: true, message: err});
        }
        else if(category.length === 0){
            res.statusCode = 401;
            res.json({error: true, message: 'Data not found'});
        }
        else{
            console.log(category.length)
            res.statusCode = 200;
            res.json({error: false, message: 'Data Found', data: category})
        }
    })
}

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

exports.update = (req,res) => {
    const new_category = new Category(req.body);
    const id  = req.params.id;

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({err: true, message:'Please enter all field'});
    }
    else{
        Category.update(id, new_category, (err, category) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message: err});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Data Update Successfully', data: category});
            }
        })
    }
}

exports.delete = (req,res) => {
    const id = req.params.id;
    Category.delete(id, (err, category) => {
        if(err){
            res.statusCode = 401;
            res.json({error: true, message: err});
        }
        else{
            res.statusCode = 200;
            res.json({error: false, message: 'Data delete successfully', data: category})
        }
    })
}
