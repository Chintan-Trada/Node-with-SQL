const User = require('../models/user.modal');

exports.find = async (req,res) => {
    await User.findAll((err,user) => {
        if(err){
            res.statusCode = 401;
            res.json({error: true, message:err});
        }
        else{
            res.statusCode = 200;
            res.json({error: true, message:'Data  Found', data: user});
        }
    })
}

exports.signUp = async (req,res) =>{

    const new_user = new User(req.body);

    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: err});
    }
    else{
        await User.create(new_user, (err,user) => {
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

exports.logIn = async (req,res) =>{
    console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.statusCode = 400;
        res.json({error: true, message: 'Please Enter All Field'});
    }
    else{
        await User.find(username,password, (err, user) => {
            if(err){
                res.statusCode = 401;
                res.json({error: true, message:err});
            }
            else if(user.length === 0){
                res.statusCode = 401;
                res.json({error: true, message:'Your credantial doesn\'t match'});
            }
            else{
                res.statusCode = 200;
                res.json({error: false, message:'Login Successful', data: user});
            }
        });
    }
}

exports.editUser = async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    await User.update(id, data, (err, user) => {
        if (err) {
            res.statusCode = 400;
            res.json({ error: true, message: err  });
        } else {
            res.statusCode = 200;
            console.log('user', user);
            res.json(user);
        }
    });

}