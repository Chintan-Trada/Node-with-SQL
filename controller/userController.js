const User = require('../models/user.modal');
const Authentication = require('../middleware/authentication');

exports.find = async (req,res) => {
    await User.findAll((err,user) => {
        if(err){
            res.statusCode = 401;
            res.json({error: true, message:err});
        }
        else if(user.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`No data are insertet`});
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
                const token = Authentication.getToken({id: user[0].id})
                console.log(token);
                res.json({error: false, message:'Login Successful',token: token});
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
        } 
        else {
            res.statusCode = 200;
            console.log('user', user);
            res.json(user);
        }
    });

}


exports.changePassword = (req,res) => {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    const password = req.body;

    User.findUser(id, (err,user)=> {
        if(err){
            res.statusCode = 401;
            res.json({error: true, message:err});
        }
        else if(user.length === 0){
            res.statusCode = 400;
            res.json({error: true, message:`User Doesn't exixt`});
        }
        else{            
            if(user[0].password === oldPassword){
                User.changePassword(id, password, (err, user) => {
                    if (err) {
                        res.statusCode = 400;
                        res.json({ error: true, message: err  });
                    } 
                    else {
                        res.statusCode = 200;
                        res.json({error: true, message:'Password update', data: user});
                    }
                })
            }
            else{
                console.log('Old Password Are not match');
                res.statusCode = 400;
                res.json({ error: true, message: 'Old Password Are not match'  });
            }
        }
    })
}

exports.forgotPassword = (req,res) => {

    const id = req.params.id;
    const data = req.body;
    console.log(data)
    User.changePassword(id, data, (err, user) => {
        if (err) {
            res.statusCode = 400;
            res.json({ error: true, message: err  });
        } 
        else {
            res.statusCode = 200;
            res.json({error: true, message:'Password update', data: user});
        }
    });

}

exports.profile = (req,res) => {
    const id = req.user.id;
    console.log(id)
    User.profile(id, (err, user) => {
        if (err) {
            res.statusCode = 400;
            res.json({ error: true, message: err  });
        } 
        else {
            res.statusCode = 200;
            res.json({error: true, message:'Data Found', data: user});
        }
    })
}