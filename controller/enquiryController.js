const Enquiry = require('../models/enquiry.modal');

exports.findAll = (req,res) => {
    Enquiry.findAll((err,enquiry) => {
        if(err){
            res.statusCode = 401;
            res.json({errpr: true, message: err})
        }
        else if(enquiry.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`No data are insertet`});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message: 'Data Found', data:enquiry})
        }
    })
};

exports.findById = (req,res) => {
    const id = req.params.id;
    Enquiry.findById(id, (err,enquiry) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err});
        }
        else if(enquiry.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`The data on id ${id} is doesn't exist`});
        }
        else{
            res.statusCode = 200;
            res.json({error: false, message:'Data found', data: enquiry})
        }
    })
};

exports.create = (req,res) => {
    const new_enquiry = new Enquiry(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please enter all fields'});
    }
    else{
        Enquiry.create(new_enquiry,(err,enquiry) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message:err});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Data Add', data: enquiry})
            }
        })
    }
};

exports.update = (req,res) => {
    const update_enquiry = new Enquiry(req.body);
    const id  = req.params.id;

    if(req.body.constructor === Object && Object.keys(req.body).length === 0 ){
        res.statusCode = 400;
        res.json({error: true, message: 'Please fill all field'});
    }
    else{
        Enquiry.update(id, update_enquiry, (err,enquiry) => {
            if(err){
                res.statusCode = 400;
                res.json({error: true, message: err});
            }
            else{
                res.statusCode = 200;
                res.json({error: true, message:'Data update successfully', data: enquiry});
            }
        })
    }
};

exports.delete = (req,res) => {
    const id = req.params.id;

    Enquiry.delete(id, (err,enquiry) => {
        if(err){
            res.statusCode = 400;
            res.json({error: true, message: err});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message:'Data delete successfully', data: enquiry});
        }
    })
};