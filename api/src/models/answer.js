var exports = module.exports = {};
var mysqlCon = require('../database/connection');
var errors = require('../exceptions/error');

var userModel = require('./user');

var pool = mysqlCon.pool;

const GET_QUESTION_BY_ID = `SELECT id, question, survey_id FROM questions WHERE id = ?`;
// update requests
const POST_ANSWER = `UPDATE questions SET ?? = ?? + 1 WHERE id = ?`;

checkAnswer = function (token, answers) {
    for (let i = 0; i < answers.length; i++) {
        pool.getConnection(function (err, connection) {
            errors.connectionError(err, function () {
                userModel.getUserByToken(token, function (user) {
                    connection.query(GET_QUESTION_BY_ID, answers[i].id, function (error, result, fields) {
                        if (result[0].id_survey !== user.id_survey) {
                            answers[i] = null;
                        }
                    });
                });
            });
        });
    }
}

exports.postAnswers = function (token, answers, callback) {
    console.log(answers);
    pool.getConnection(function (err, connection) {
        errors.connectionError(err, function () {
            var answersPosted = 0;
            this.checkAnswer(token, answers);
            for (var i = 0; i < answers.length; i += 1) {
                if (answers[i]) {
                    connection.query(POST_ANSWER, [answers[i].answer, answers[i].answer, answers[i].id], function (error, result, fields) {
                        if (!error) {
                            console.log('answers posted');
                            answersPosted += 1;
                            if (answersPosted === answers.length) {
                                callback("Number of answers posted: " + answersPosted);
                            }
                        } else {
                            console.log(error);
                        }
                    });
                } else {
                    answersPosted += 1;
                }
            }
        })
    });
}

