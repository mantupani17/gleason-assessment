const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    let bearerToken = req.headers && req.headers.authorization ? req.headers.authorization.split(' '): [];
    jwt.verify(bearerToken[1], process.env.APP_SECRET , function(err, isValid){
        if (err || !isValid) {
            res.status(401).send({
                message:"Use not authorized.",
                status: true
            })
        }
        next();
    })
} 

module.exports = verifyToken;