var exports = module.exports = {};
var mysql = require('mysql');
var mysqlCon = require('../database/connection');
var errors = require('../exceptions/error');

var pool = mysqlCon.pool;

// GET requests 
const GET_ALL_SURVEYS = `SELECT * FROM surveys`;
const GET_ALL_QUESTIONS = `SELECT * FROM questions`;
const GET_SURVEY_BY_ID = `SELECT * FROM surveys WHERE id = ?`;
const GET_SURVEY_ID_BY_TOKEN = `SELECT survey_id FROM users WHERE token = ?`;
const GET_QUESTION_BY_ID = `SELECT * FROM questions WHERE id = ?`;
const GET_SURVEY_BY_TOKEN = `
    SELECT S.* 
    FROM surveys S 
    INNER JOIN users U 
    ON S.id = U.survey_id
    WHERE U.token = ?
`;
const GET_QUESTIONS_BY_SURVEY_ID = `SELECT id, survey_id FROM questions WHERE survey_id = ?`;
const CHECK_SURVEY_AVAILABILITY = `
    SELECT "true" 
    FROM surveys S 
    INNER JOIN users U 
    ON S.id = U.survey_id
    WHERE U.token = ? AND S.start < now() AND S.end > now()
`;

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
                    callback(results || null);
                } else {
                    console.log(error);
                }
                connection.release();
            });
        });
    });
}

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
                connection.release();
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
                connection.release();
            });
        });
    });
}