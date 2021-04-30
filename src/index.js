const express = require('express');
const bodyParser = require('body-parser');

let auth_routes = require('./routes/auth/auth.js');
let todosRoutes = require('./routes/todos/todos.js');
let notFound = require('./middleware/notFound.js');
let userRoutes = require('./routes/user/user.js');

let dbConnection = require('./config/db.js');

require('dotenv').config();

const port = 80;
let app = express()

let connection = dbConnection;

if (!connection) {
    console.log('Connection with database failed...');
} else {
    console.log('Database connection successfull...');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', auth_routes);

app.use('/', todosRoutes);
app.use('/', userRoutes);
app.use('/', notFound.notFoundMiddleware);

app.listen(port, () => {
    console.log("running...");
});