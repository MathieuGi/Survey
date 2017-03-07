var exports = module.exports = {};
var mysql = require('mysql');
var mysqlCon = require('../database/connection');

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
    WHERE U.token = ? 
`;
const GET_QUESTION_BY_SURVEY_ID = `SELECT * FROM questions WHERE survey_id = ?`;

// post requests
const POST_ANSWER = `UPDATE questions SET ?? = ?? + 1 WHERE id = ?`;



exports.getAllSurveys = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err != null) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            connection.query(GET_ALL_SURVEYS, function (error, results, fields) {
                if (error === null) {
                    callback(results);
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        }
    });
}

exports.getAllQuestions = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err != null) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            connection.query(GET_ALL_QUESTIONS, function (error, results, fields) {
                if (error === null) {
                    callback(results);
                    connection.release();
                } else {
                    console.log(error)
                }

            });
        }
    });
}

exports.getSurveyById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        if (err != null) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            connection.query(GET_SURVEY_BY_ID, id, function (error, result, fields) {
                if (error === null) {

                    callback(result[0]);
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        }
    })
}

exports.getQuestionById = function (id, callback) {
    pool.getConnection(function (err, connection) {
        if (err != null) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            connection.query(GET_QUESTION_BY_ID, id, function (error, question, fields) {
                if (error === null) {
                    callback(question[0] || "");
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        }
    });
}

exports.getSurveyByToken = function (token, callback) {
    pool.getConnection(function (err, connection) {
        if (err != null) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            connection.query(GET_SURVEY_BY_TOKEN, token, function (error, result, fields) {
                if (error === null) {
                    callback(result[0]);
                    connection.release();
                } else {
                    console.log(error);
                }
            });
        }
    });
};

exports.getQuestionsBySurveyId = function (id, callback) {
    pool.getConnection(function (err, connection) {
        if (err != null) {
            console.log(err.code);
            console.log(err.fatal);
        } else {
            connection.query(GET_QUESTION_BY_SURVEY_ID, id, function (error, results, fields) {
                if (error === null) {
                    callback(results);
                    connection.release();
                } else {
                    console.log(error);
                }

            });
        }

    });
}

exports.postAnswers = function (answers, callback) {
    pool.getConnection(function (err, connection) {
        pool.getConnection(function (err, connection) {
            if (err != null) {
                console.log(err.code);
                console.log(err.fatal);
            } else {
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
            }

        });
    });
}