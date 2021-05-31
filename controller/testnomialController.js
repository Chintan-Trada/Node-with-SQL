const Testnomial = require('../models/testnomial.modal');

exports.findAll = (req,res) => {
    Testnomial.findAll((err,testnomial) => {
        if(err){
            res.statusCode = 401;
            res.json({errpr: true, message: err})
        }
        else if(testnomial.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`No data are insertet`});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message: 'Data Found', data:testnomial})
        }
    })
};

exports.findById = (req,res) => {
    const id = req.params.id;
    Testnomial.findById(id, (err,testnomial) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err});
        }
        else if(testnomial.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`The data on id ${id} is doesn't exist`});
        }
        else{
            res.statusCode = 200;
            res.json({error: false, message:'Data found', data: testnomial})
        }
    })
};

exports.create = (req,res) => {
    const new_testnomial = new Testnomial(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please enter all fields'});
    }
    else{
        Testnomial.create(new_testnomial,(err,testnomial) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message:err});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Data Add', data: testnomial})
            }
        })
    }
};

exports.update = (req,res) => {
    const update_testnomial = new Testnomial(req.body);
    const id  = req.params.id;

    if(req.body.constructor === Object && Object.keys(req.body).length === 0 ){
        res.statusCode = 400;
        res.json({error: true, message: 'Please fill all field'});
    }
    else{
        Testnomial.update(id, update_testnomial, (err,testnomial) => {
            if(err){
                res.statusCode = 400;
                res.json({error: true, message: err});
            }
            else{
                res.statusCode = 200;
                res.json({error: true, message:'Data update successfully', data: testnomial});
            }
        })
    }
};

exports.delete = (req,res) => {
    const id = req.params.id;

    Testnomial.delete(id, (err,testnomial) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message:'Data delete successfully', data: testnomial});
        }
    })
};