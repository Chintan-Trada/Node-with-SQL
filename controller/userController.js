const User = require('../models/user.modal');

exports.find = (req,res) => {
    User.findAll((err,user) => {
        if(err){
            res.statusCode = 401;
            res.json({error: true, message:'Data Not Found'});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message:'Data  Found', data: user});
        }
    })
}

exports.signUp = (req,res) =>{

    const new_user = new User(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please Enter All Field'});
    }
    else{
        User.create(new_user, (err,user) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message: err});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Data Add Successfully;'})
            }
        });
    }
};

exports.LogIn = (req,res) =>{
    console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please Enter All Field'});
    }
    else{
        User.find(username,password, (err, user) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message:'Data Not Found'});
            }
            else if(user.length === 0){
                res.statusCode = 401;
                res.json({error: true, message:'Data Not Found'});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Login Successful', data: user});
            }
        });
    }
}