// Connection avec la db
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'doer2',
    password: 'doer2',
});

module.exports = connection;