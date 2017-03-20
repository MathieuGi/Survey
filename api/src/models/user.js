var exports = module.exports = {};

var mysqlCon = require('../database/connection');
var errors = require('../exceptions/error');

var pool = mysqlCon.pool;

//GET requests
const GET_USER_STATUS = "SELECT status FROM users WHERE token = ?";
const GET_ALL_USERS = `SELECT * FROM users`;
const GET_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;
const GET_USER_BY_TOKEN = `SELECT * FROM users WHERE token = ?`;
const SET_STATUS = `UPDATE users SET status = ? WHERE token = ?`;
const POST_USER = `INSERT INTO users (token, email, survey_id) VALUES (?, ?, ?)`;



exports.getAllUsers = function(callback) {
    pool.getConnection(function(err, connection) {
        errors.connectionError(err, function() {
            connection.query(GET_ALL_USERS, function(error, users, fields) {
                if (error === null) {
                    callback(users || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.getUserById = function(id, callback) {
    pool.getConnection(function(err, connection) {
        errors.connectionError(err, function() {
            connection.query(GET_USER_BY_ID, id, function(error, user, fields) {
                if (error === null) {
                    callback(user || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.getUserStatus = function(token, callback) {
    pool.getConnection(function(err, connection) {
        errors.connectionError(err, function() {
            connection.query(GET_USER_STATUS, token, function(error, userStatus, fields) {
                if (error === null) {
                    // If the user has not the right to answer or doesn't exit, value = -1
                    callback(userStatus[0] || -1);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.setStatus = function(token, newStatus, callback) {
    pool.getConnection(function(err, connection) {
        errors.connectionError(err, function() {
            connection.query(SET_STATUS, [newStatus, token], function(error, result, fields) {
                if (error === null) {
                    callback(result || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.getUserByToken = function(token, callback) {
    pool.getConnection(function(err, connection) {
        errors.connectionError(err, function() {
            connection.query(GET_USER_BY_TOKEN, token, function(error, result, fields) {
                if (error === null) {
                    callback(result[0] || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.createUser = function(token, email, surveyId, callback) {
    pool.getConnection(function(err, connection) {
        errors.connectionError(err, function() {
            connection.query(POST_USER, [token, email, surveyId], function(error, result, fields) {
                if (error === null) {
                    callback(result[0] || null);
                } else {
                    console.log(error);
                }
            });
        });
    });
}