const { GeneralError, NotFound, BadRequest, UnAuthorized } = require('../Service/error');
const { GeneralResponse } = require('../Service/response');

const User = require('../models/user.modal');

const Authentication = require('../helper/authentication');
const config = require('../Service/config')

exports.find = async (req, res, next) => {
    try {
        await User.findAll((err, user) => {
            if (err) {
                next(new NotFound('Not found user'))
            }
            else if (user.length === 0) {
                next(new NotFound('Not found user'))
            }
            else {
                next(new GeneralResponse('User', user))
            }
        })
    }
    catch (err) {
        next(new GeneralError('error while getting user list'))
    }
}

exports.signUp = async (req, res, next) => {

    const new_user =await new User(req.body);

    try {
        await User.create(new_user, (err, user) => {
            if (err) {
                next(new BadRequest(err));
            }
            else {
                rnext(new GeneralResponse('User', user));
            }
        });
    }
    catch (err) {
        next(new GeneralError(`error while creating user`))
    }
};

exports.logIn = async (req, res, next) => {
    console.log(req.body);

    let username = req.body.username;
    let password = req.body.password;
    try {
        await User.find(username, password, (err, user) => {

            if (err) {
                next(new BadRequest(err));
            }
            else if (user.length === 0) {
                next(new UnAuthorized('Your credantial doesn\'t match'))
            }
            else {
                console.log('hi')
                const token = Authentication.getToken({ id: user[0].id })
                next(new GeneralResponse('user successfully login', {
                    token: token
                }, config.HTTP_SUCCESS));
                console.log('hi')

            }
        });
    }
    catch (err) {
        next(new GeneralError(`User login failure`))
    }
}

exports.editUser = async (req, res) => {
    const id = req.params.id;
    const data = await req.body;
    await User.update(id, data, (err, user) => {
        if (err) {
            res.statusCode = 400;
            res.json({ error: true, message: err });
        }
        else {
            res.statusCode = 200;
            console.log('user', user);
            res.json(user);
        }
    });

}


exports.changePassword = async (req, res, next) => {
    const id = req.params.id;
    const oldPassword = req.body.oldPassword;
    const password = req.body;
    try {
        await User.findUser(id, (err, user) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (user.length === 0) {
                next(new NotFound(`User Doesn't exixt`))
            }
            else {
                if (user[0].password === oldPassword) {
                    User.changePassword(id, password, (err, user) => {
                        if (err) {
                            next(new NotFound(err))
                        }
                        else {
                            next(new GeneralResponse('Password update successfully!'))
                        }
                    })
                }
                else {
                    console.log('Old Password Are not match');
                    next(new BadRequest('Old password are not match'))
                }
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while changing password`))
    }
}

exports.forgotPassword = async (req, res, next) => {

    const id = req.params.id;
    const data = await req.body;
    // console.log(data)
    try {
        await User.findUser(id, (err, user) => {
            if (err) {
                next(new NotFound(err))
            }
            else if (user.length === 0) {
                next(new NotFound(`User Doesn't exixt`))
            }
            else {
                User.changePassword(id, data, (err, user) => {
                    if (err) {
                        next(new BadRequest(err))
                    }
                    else {
                        next(new GeneralResponse('Password update successfully!'))
                    }
                })
            }
        })
    }
    catch (err) {
        next(new GeneralError(`error while changing password`))
    }

}

exports.profile = async (req, res, next) => {
    const id = req.user.id;
    console.log(id)
    try {
        await User.profile(id, (err, user) => {
            if (err) {
                next(new NotFound(err))
            }
            else {
                next(new GeneralResponse('User', user))
            }
        })
    } catch (err) {
        next(new GeneralError(`error while getting data`))
    }
}