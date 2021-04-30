const express = require('express');
const bcrypt = require('bcryptjs');

const checkJwt = require('../../middleware/auth.js');
const userQueries = require('./user.query.js');
const todosQueries = require('../todos/todos.query.js');
const userQuery = require('./user.query.js');

let router = express.Router();

router.get('/user', checkJwt, async function (req, res) {
    try {
        let output = await userQueries.getAllUsers();

        res.status(200).json(output[0]);
    } catch (err) {
        console.log("Error catched => ", err);
        res.status(500).json( {"msg": "internal server error"} );
    }
})

router.get('/user/todos', checkJwt, async function (req, res) {
    let token = req.headers.authorization;
    let email = jwt.verify(token, key).email;

    try {
        let id = await todosQueries.getUserId(email);
        id = id[0][0].id;

        let queryOutput = await todosQueries.getUserTodos(id);

        return res.status(200).json(queryOutput[0]);
    } catch (err) {
        console.log("Error caught => ", err);
        return res.status(500).json( {'msg': 'internal server error'} );
    }
})

router.get('/user/:id', checkJwt, async function (req, res) {
    let id = req.params.id;

    try {
        let queryOutput = await userQueries.getUserWithId(id);

        return res.status(200).json(queryOutput[0]);
    } catch (err) {
        console.log("Error catched => ", err);
        return res.status(500).json( {'msg': 'internal server error'} );
    }
})

// TO TEST AND FIX
router.get('/user/:email', checkJwt, async function (req, res) {
    let email = req.params.email;

    try {
        let queryOutput = await userQueries.getUserWithEmail(email);

        return res.status(200).json(queryOutput[0]);
    } catch (err) {
        console.log("Error catched => ", err);
        return res.status(500).json( {'msg': 'internal server error'} );
    }
})

router.put('/user/:id', checkJwt, async function (req, res) {
    const { email, name, firstname, password} = req.body;
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        let output = await userQueries.updateUser(email, name, firstname, hashedPassword, id);

        if (output[0].affectedRows) {
            let modifiedRow = await userQueries.getUserWithId(id);
            res.status(200).json(modifiedRow[0]);
        } else {
            res.status(200).end();
        }
    } catch (err) {
        console.log("Error caught => ", err);
        res.status(500).json( {"msg": "internal server error"} );
    }
})

router.delete('/user/:id', checkJwt, async function (req, res) {
    const id = parseInt(req.params.id, 10);

    try {
        await userQuery.deleteUser(id);
        return res.status(200).send( {"msg": "successfully deleted record number: ${"+id+"}"} );
    } catch (err) {
        console.log("Error catched => ", err);
        return res.status(500).json( {"msg": "internal server error"} );
    }
})

module.exports = router;