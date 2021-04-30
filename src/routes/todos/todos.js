const express = require('express');
const checkJwt = require('../../middleware/auth.js');
const jwt = require('jsonwebtoken');
const todosQueries = require('./todos.query.js');

require('dotenv').config();
let key = process.env.SECRET;

let router = express.Router();


router.post('/todo', checkJwt, async function(req, res) {
    
    const { title, description, due_time, user_id, status } = req.body;
    
    if (!title || !description || !due_time || !user_id || !status) {
        console.log('Registration Bad Request');
        return res.status(400).end();
    }
    
    try {
        let queryOutput = await todosQueries.addTodo(title, description, due_time, user_id, status);
        
        console.log(queryOutput);
        res.status(200).end();
    } catch (err) {
        console.log('Error caught => ', err);
        return res.status(500).json( {'msg': 'internal server error'} );
    }
});

router.get('/todo', checkJwt, async function (req, res) {
    try {
        let output = await todosQueries.getAllTodos();
        
        res.status(200).json(output[0]);
    } catch (err) {
        console.log("Error catched => ", err);
        res.status(500).json( {"msg": "internal server error"} );
    }
})

router.delete('/todo/:id', checkJwt, async function (req, res) {
    const id = parseInt(req.params.id, 10);

    try {
        await todosQueries.deleteTodo(id);
        return res.status(200).send( {"msg": "successfully deleted record number: ${"+id+"}"} );
    } catch (err) {
        console.log("Error catched => ", err);
        return res.status(500).json( {"msg": "internal server error"} );
    }
})

module.exports = router;