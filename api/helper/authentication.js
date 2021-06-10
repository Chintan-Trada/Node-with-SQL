const jwt = require('jsonwebtoken');
const config = require('../service/config');

exports.getToken = (user) => {
    return jwt.sign(user, config.SECRET_KEY, {expiresIn: config.EXPIRY_TIME});
}

exports.verifyJWT = (req,res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['x-access-token'];
    // console.log(authHeader);

    if (authHeader) {
        var token = authHeader;
        if (token.startsWith('Bearer ')) {       
            token = token.slice(7, token.length); 
        }
        // console.log(token)
        jwt.verify(token, config.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    status: false,
                    message: 'Token is not valid'
                });
            }
            
            req.user = user;
            // console.log("req.user", req.user)

            next();
        });
    } else {
        res.sendStatus(401);
    }
}