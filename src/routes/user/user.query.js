// Same as todos
const bcrypt = require('bcryptjs');
const connection = require('../../config/db.js');

function registerNewUser(email, name, firstname, hashedPassword) {

    let dateStr = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    const query = "INSERT INTO epytodo.user (email, password, name, firstname, created_at) VALUES ('''" + email + "''', '''" + hashedPassword + "''', '''" + name + "''', '''" + firstname + "''', '" + dateStr + "');";

    return connection.promise().query(query);
}

function getAllUsers() {
    const query = "SELECT * FROM epytodo.user;";

    return connection.promise().query(query);
}

function getUserPassword(email) {
    const query = "SELECT password FROM epytodo.user WHERE email = '''" + email + "''';";

    return connection.promise().query(query);
}

function getUserWithId(id) {
    const query = "SELECT * FROM epytodo.user WHERE id = " + id + ";";

    return connection.promise().query(query);
}

function getUserWithEmail(email) {
    const query = "SELECT * FROM epytodo.user WHERE email = '''" + email + "''';";

    return connection.promise().query(query);
}

function deleteUser(id){
    const query = "DELETE FROM epytodo.user WHERE id = "+id+";";

    return connection.promise().query(query);
}

function updateUser(email, name, firstname, password, id) {
    const query = "UPDATE epytodo.user SET email = '''" + email + "''', password = '''" + password + "''', name = '''" + name + "''', firstname = '''" + firstname + "''' WHERE id = "+id+";";

    return connection.promise().query(query);
}

module.exports = {registerNewUser: registerNewUser,
    getAllUsers: getAllUsers,
    getUserPassword: getUserPassword,
    deleteUser: deleteUser,
    updateUser: updateUser,
    getUserWithId: getUserWithId,
    getUserWithEmail: getUserWithEmail
};