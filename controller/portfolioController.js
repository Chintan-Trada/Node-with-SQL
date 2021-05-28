const Portfolio = require('../models/portfolio.modal');

exports.findAll = (req,res) => {
    Portfolio.findAll((err,portfolio) => {
        if(err){
            res.statusCode = 401;
            res.json({errpr: true, message: err})
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message: 'Data Found', data:portfolio})
        }
    })
};

exports.findById = (req,res) => {
    const id = req.params.id;
    Portfolio.findById(id, (err,portfolio) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err});
        }
        else if(portfolio.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`The data on id ${id} is doesn't exist`});
        }
        else{
            res.statusCode = 200;
            res.json({error: false, message:'Data found', data: portfolio})
        }
    })
};

exports.create = (req,res) => {
    const new_portfolio = new Portfolio(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please enter all fields'});
    }
    else{
        Portfolio.create(new_portfolio,(err,portfolio) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message:err});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Data Add', data: portfolio})
            }
        })
    }
};

exports.update = (req,res) => {
    const update_portfolio = new Portfolio(req.body);
    const id  = req.params.id;

    if(req.body.constructor === Object && Object.keys(req.body).length === 0 ){
        res.statusCode = 400;
        res.json({error: true, message: 'Please fill all field'});
    }
    else{
        Portfolio.update(id, update_portfolio, (err,portfolio) => {
            if(err){
                res.statusCode = 400;
                res.json({error: true, message: err});
            }
            else{
                res.statusCode = 200;
                res.json({error: true, message:'Data update successfully', data: portfolio});
            }
        })
    }
};

exports.delete = (req,res) => {
    const id = req.params.id;

    Portfolio.delete(id, (err,portfolio) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message:'Data delete successfully', data: portfolio});
        }
    })
};