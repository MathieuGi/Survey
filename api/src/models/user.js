var exports = module.exports = {};

var mysqlCon = require('../database/connection');

var pool = mysqlCon.pool;

//GET requests
const GET_USER_STATUS = "SELECT status FROM users WHERE token = ?";
const GET_ALL_USERS = `SELECT * FROM users`;
const GET_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;
const HAS_ANSWERED = `UPDATE FROM users SET status = 2 WHERE token = ?`;



exports.getAllUsers = function (callback) {
    pool.getConnection(function (err, connection) {
        connection.query(GET_ALL_USERS, function (error, users, fields) {
            if (error === null) {
                callback(users);
                connection.release();
            } else {
                console.log(error);
            }

        });
    });
}

exports.getUserById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(GET_USER_BY_ID, id, function (error, user, fields) {
            if (error === null) {
                callback(user);
                connection.release();
            } else {
                console.log(error);
            }

        });
    });
}

exports.getUserStatus = function (token, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(GET_USER_STATUS, token, function (error, userStatus, fields) {
            if (error === null) {
                // If the user has not the right to answer or doesn't exit, value = -1
                callback(userStatus[0] || -1);
                connection.release();
            } else {
                console.log(error);
            }

        });
    });
}

exports.hasAnswered = function (token, callback) {
    pool.getConnection(function (err, connection) {
        if (err === null) {
            connection.query(HAS_ANSWERED, token, function (error, result, fields) {
                if (error === null) {
                    callback("This user has now answered !");
                } else {
                    console.log(error);
                }
            });
        } else {
            console.log(err.code);
            console.log(err.fatal);
        }
    });
}
