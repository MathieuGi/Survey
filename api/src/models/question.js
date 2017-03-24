var exports = module.exports = {};
var mysqlCon = require('../database/connection');
var errors = require('../exceptions/error');

var userModel = require('./user');

var pool = mysqlCon.pool;


const GET_ALL_QUESTIONS = `SELECT * FROM questions`;
const GET_QUESTION_BY_ID = `SELECT id, question, survey_id FROM questions WHERE id = ?`;
const GET_QUESTION_INFOS_BY_ID = `SELECT * FROM questions WHERE id = ?`;
const GET_QUESTIONS_BY_SURVEY_ID = `SELECT id FROM questions WHERE survey_id = ?`;
const CREATE_QUESTION = `INSERT INTO questions (question, survey_id) VALUES (?, ?)`;

exports.getAllQuestions = function (callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_ALL_QUESTIONS, function (error, results, fields) {
                if (error === null) {
                    callback(results || null);
                } else {
                    console.log(error)
                }
                connection.release();

            });
        });
    });
}

exports.getQuestionById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_QUESTION_BY_ID, id, function (error, question, fields) {
                if (error === null) {
                    callback(question[0] || "");
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.getQuestionsBySurveyId = function (id, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_QUESTIONS_BY_SURVEY_ID, id, function (error, results, fields) {
                if (error === null) {
                    callback(results || null);
                } else {
                    console.log(error);
                }
                connection.release();

            });
        });

    });
}

exports.postQuestion = function (question, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(CREATE_QUESTION, question, function (error, result, fields) {
                if (error === null) {
                    callback("New question created");
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

exports.getQuestionInfosById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_QUESTION_INFOS_BY_ID, id, function (error, question, fields) {
                if (error === null) {
                    callback(question[0] || "");
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}
