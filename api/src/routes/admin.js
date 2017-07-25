var exports = module.exports = {};
var surveyModel = require('../models/survey');
var userModel = require('../models/user');
var questionModel = require('../models/question');


var survey = ['2017-03-06', '2017-03-20', 'Fourth survey !'];
var question = ["Question 1", 3];
var getQuestionInfosById = function (req, res, next) {
    var id = req.params.id;
    questionModel.getQuestionInfosById(id, function (question) {
        if (question === null) {
            res.status(404).send("Question not found");
        } else {
            res.status(200).json(question);
        }
    });
}

createSurvey = function (req, res, next) {
    if (req.body.survey) {
        surveyModel.postSurvey(survey, function (message) {
            res.send(message);
        });
    }
}

createQuestion = function (req, res, next) {
    if (req.body.question) {
        questionModel.postQuestion(question, function (message) {
            res.send(message);
        });
    }
}

createUser = function (req, res, next) {
    if (req.body.email && req.body.token) {
        userModel.createUser(req.body.token, req.body.email, req.body.surveyId, function (mess) {
            res.status(200).send(mess);
        });
    }
}

exports.getRoutes = function (app) {
    app.get('/admin/results/:id', getQuestionInfosById);

    // Post a new survey
    app.post('/admin/create-survey', createSurvey);

    // Post a new question
    app.post('/admin/create-question', createQuestion);

    app.post('/admin/create-user', createUser);
}
