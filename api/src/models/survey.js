var exports = module.exports = {};
var mysql = require('mysql');
var mysqlCon = require('../database/connection');
var errors = require('../exceptions/error');

var pool = mysqlCon.pool;

// GET requests 
const GET_ALL_SURVEYS = `SELECT * FROM surveys`;
const GET_ALL_QUESTIONS = `SELECT * FROM questions`;
const GET_SURVEY_BY_ID = `SELECT * FROM surveys WHERE id = ?`;
const GET_QUESTION_BY_ID = `SELECT * FROM questions WHERE id = ?`;
const GET_SURVEY_BY_TOKEN = `
    SELECT S.* 
    FROM surveys S 
    INNER JOIN users U 
    ON S.id = U.survey_id
    WHERE U.token = ? AND S.start < now() AND S.end > now()
`;
const GET_QUESTION_BY_SURVEY_ID = `SELECT * FROM questions WHERE survey_id = ?`;

// update requests
const POST_ANSWER = `UPDATE questions SET ?? = ?? + 1 WHERE id = ?`;

// post requests
const CREATE_QUESTION = `INSERT INTO questions (question, survey_id) VALUES (?, ?)`;
const CREATE_SURVEY = `INSERT INTO surveys (start, end, name) VALUES (?, ?, ?)`;


exports.getAllSurveys = function (callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_ALL_SURVEYS, function (error, results, fields) {
                if (error === null) {
                    callback(results);
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        });
    });
}

exports.getAllQuestions = function (callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_ALL_QUESTIONS, function (error, results, fields) {
                if (error === null) {
                    callback(results);
                    connection.release();
                } else {
                    console.log(error)
                }

            });
        });
    });
}

exports.getSurveyById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_SURVEY_BY_ID, id, function (error, result, fields) {
                if (error === null) {

                    callback(result[0]);
                    connection.release();
                } else {
                    console.log(error);
                }
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
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        });
    });
}

exports.getSurveyByToken = function (token, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_SURVEY_BY_TOKEN, token, function (error, result, fields) {
                if (error === null) {
                    callback(result[0] || null);
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        });
    });
};

exports.getQuestionsBySurveyId = function (id, callback) {
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            connection.query(GET_QUESTION_BY_SURVEY_ID, id, function (error, results, fields) {
                if (error === null) {
                    callback(results);
                    connection.release();
                } else {
                    console.log(error);
                }

            });
        });

    });
}

exports.postAnswers = function (answers, callback) {
    pool.getConnection(function (err, connection) {
        pool.getConnection(function (err, connection) {
            errors.connectionError(err, function () {
                var answersPosted = 0;
                for (var i = 0; i < answers.length; i += 1) {
                    console.log(answers[i].answer + " " + answers[i].id);
                    connection.query(POST_ANSWER, [answers[i].answer, answers[i].answer, answers[i].id], function (error, result, fields) {
                        if (error === null) {
                            console.log('answers posted');
                            answersPosted += 1;
                            if (answersPosted === answers.length) {
                                callback("Number of answers posted: " + answersPosted);
                            }
                        } else {
                            console.log(error);
                        }

                    });
                }
            })
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
            });
        })
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
            });
        });
    });
}