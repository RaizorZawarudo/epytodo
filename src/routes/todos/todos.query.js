const connection = require('../../config/db.js');

function getUserTodos(id) {
    const query = "SELECT * FROM epytodo.todo WHERE user_id = " + id + ";";

    return connection.promise().query(query);
}

function getUserId(email) {
    const query = "SELECT id FROM epytodo.user WHERE email='''" + email +"''';";

    return connection.promise().query(query);
}

function addTodo(title, description, due_time, user_id, status) {
    let created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    console.log("Created at : ", created_at);

    // This query has been fixed locally, please test on all machines
    const query = "INSERT INTO epytodo.todo (title, description, created_at, `due_time`, status, user_id) VALUES ('''" + title + "''', '''" + description + "''', '''" + created_at + "''', '''" + due_time + "'''," + status + ", '''" + user_id + "''');"

    // const query = "INSERT INTO epytodo.user (email, password, name, firstname, created_at) VALUES ('''" + email + "''', '''" + hashedPassword + "''', '''" + name + "''', '''" + firstname + "''', '" + dateStr + "');";
    return connection.promise().query(query);
}

function getAllTodos() {
    const query = "SELECT * FROM epytodo.todo;";

    return connection.promise().query(query);
}

function deleteTodo(id) {
    const query = "DELETE FROM epytodo.todo WHERE id = "+id+";";

    return connection.promise().query(query);
}

module.exports = { getUserTodos: getUserTodos,
    getUserId: getUserId,
    addTodo: addTodo,
    getAllTodos: getAllTodos,
    deleteTodo: deleteTodo
};