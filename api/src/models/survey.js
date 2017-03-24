var exports = module.exports = {};
var mysqlCon = require('../database/connection');
var errors = require('../exceptions/error');

var userModel = require('./user');

var pool = mysqlCon.pool;

// GET requests 
const GET_ALL_SURVEYS = `SELECT * FROM surveys`;
const GET_SURVEY_BY_ID = `SELECT * FROM surveys WHERE id = ?`;
const GET_SURVEY_ID_BY_TOKEN = `SELECT survey_id FROM users WHERE token = ?`;
const GET_SURVEY_BY_TOKEN = `
    SELECT S.* 
    FROM surveys S 
    INNER JOIN users U 
    ON S.id = U.survey_id
    WHERE U.token = ?
`;
const CHECK_SURVEY_AVAILABILITY = `
    SELECT "true" 
    FROM surveys S 
    INNER JOIN users U 
    ON S.id = U.survey_id
    WHERE U.token = ? AND S.start < now() AND S.end > now()
`;


// post requests
const CREATE_SURVEY = `INSERT INTO surveys (start, end, name) VALUES (?, ?, ?)`;


exports.getAllSurveys = function (callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_ALL_SURVEYS, function (error, results, fields) {
                if (!error) {
                    callback(results || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.getSurveyById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_SURVEY_BY_ID, id, function (error, result, fields) {
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

exports.getSurveyIdByToken = function (token, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_SURVEY_ID_BY_TOKEN, token, function (error, result, fields) {
                if (error === null) {
                    callback(result[0] || null);
                } else {
                    console.log(error);
                }
                connection.release();
            })
        })
    })
}

exports.getSurveyByToken = function (token, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_SURVEY_BY_TOKEN, token, function (error, result, fields) {
                if (error === null) {
                    callback(result[0] || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
};

exports.checkSurveyAvailability = function (token, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(CHECK_SURVEY_AVAILABILITY, token, function (error, result, fields) {
                if (error === null) {
                    callback(result[0] || false);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.postSurvey = function (survey, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(CREATE_SURVEY, survey, function (error, result, fields) {
                if (error === null) {
                    callback("New survey created");
                } else {
                    console.log(error);
                }
                connection.release();
            });
        })
    });
}
