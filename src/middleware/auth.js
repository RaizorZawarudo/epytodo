const jwt = require('jsonwebtoken');
require('dotenv').config();

const key = process.env.SECRET;

const checkJwt = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({msg: 'No token, authorization denied'});
    }

    let payload;
    try {
        payload = jwt.verify(token, key);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({msg: 'Token is not valid'});
        } else {
            return res.status(500).send({msg: 'internal server error'});
        }
    }
    console.log('Token verified')
    next();
}

module.exports = checkJwt;