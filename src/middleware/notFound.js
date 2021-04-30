// This is in case the route the user tried to access doesn't exist
// This is where that middleware lives
const express = require('express');

function notFoundMiddleware(req, res, next) {
    res.status(404).send( {msg: 'Not found'} ); // Incorrect message here
}

exports.notFoundMiddleware = notFoundMiddleware;