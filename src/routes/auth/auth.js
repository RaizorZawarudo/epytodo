// Routes for the authentification
// Register / Login
const express = require('express');
const checkJwt = require('../../middleware/auth.js');
const jwt = require('jsonwebtoken');
const userQueries = require('../user/user.query.js');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const key = process.env.SECRET;
const jwtExpiryS = 24 * 3600; // Token expiration time in seconds (24h)

let router = express.Router();

function genJwt(email) {
    // Create the users token
    const token = jwt.sign({ email }, key, {
        algorithm: "HS256",
        expiresIn: jwtExpiryS,
    });

    return token;
}

router.post('/register', async function (req, res) {
    // Get info needed
    const { email, name, firstname, password } = req.body;

    if (!email || !password || !name || !firstname) {
        console.log('Registration Bad Request');
        return res.status(400).end();
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userQueries.registerNewUser(email, name, firstname, hashedPassword);

        return res.status(200).json({ token: genJwt(email) });
    } catch (err) {
        if (err.errno = 1062) {
            return res.status(400).json( { 'msg': 'account already exists'} );
        } else {
            console.log("Error catched => ", err);
            return res.status(500).json( {'msg': 'internal server error'});
        }
    }
})

router.post('/login', async function (req, res) {
    // Get email and password
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Login Bad Request');
        return res.status(400).json({ msg: 'Login Bad Request' });
    }

    try {
        let queryOutput = await userQueries.getUserPassword(email);

        if (queryOutput[0].length == []) {
            return res.status(400).json( {'msg': 'Invalid Credentials'} );
        }

        let hashedPassword = queryOutput[0][0].password;
        hashedPassword = hashedPassword.slice(1, -1);
        let hashCorrect = await bcrypt.compare(password, hashedPassword,);
        if (hashCorrect) {
            return res.status(200).json( {token: genJwt(email)});
        } else {
            return res.status(400).json({'msg': 'Invalid Credentials'});
        }

    } catch (err) {
        console.log("Error catched => ", err);
        return res.status(500).json( {'msg': 'internal server error'} );
    }

})

module.exports = router;