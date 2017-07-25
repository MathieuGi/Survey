var exports = module.exports = {};
var surveyModel = require('../models/survey');
var userModel = require('../models/user');
var questionModel = require('../models/question');
var answerModel = require('../models/answer');
var cookieParser = require('cookie-parser')
var helmet = require('helmet');
var parser = require('body-parser');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });


var checkUserStatus = function (req, res, next) {
    
    var token = req.params.token;
    userModel.getUserStatus(token, function (userStatus) {
        if (userStatus.status === 0) {
            userModel.setStatus(token, 1, function () {
                next();
            });
        } else if (userStatus.status === 1) {
            next();
        } else {
            res.status(401).send("You haven't the rights to access this page");
        }
    });
}

var checkSurveyAvailability = function (req, res, next) {
    var token = req.params.token;
    surveyModel.checkSurveyAvailability(token, function (result) {
        if (result) {
            next();
        } else {
            res.status(404).send("No survey available for this token !");
        }
    });
}

var getSurveyByToken = function (req, res, next) {
    var token = req.params.token;
    surveyModel.getSurveyByToken(token, function (survey) {
        if (survey === null) {
            res.status(404).send("No survey available for this token !");
        } else {
            res.status(200).json({ csrfToken: req.csrfToken(), survey: survey });
        }
    });
}

var getSurveyIdByToken = function (req, res, next) {
    var token = req.params.token;
    surveyModel.getSurveyIdByToken(token, function (surveyId) {
        if (!surveyId) {
            res.status(404).send("No survey available for this token !");
        } else {
            res.status(200).json(surveyId)
        }
    })
}

var getQuestionsBySurveyId = function (req, res, next) {
    var survey_id = parseInt(req.params.survey_id);

    questionModel.getQuestionsBySurveyId(survey_id, function (questions) {
        if (questions !== null) {
            var questionsId = [];
            for (var i = 0; i < questions.length; i += 1) {
                questionsId[i] = { "id": questions[i].id };
            }
            res.status(200).json(questionsId);
        } else {
            res.status(404).send("No question found !")
        }
    });
}

var getQuestionById = function (req, res, next) {
    var id = req.params.id;
    questionModel.getQuestionById(id, function (question) {
        if (question === null) {
            res.status(404).send("Question not found");
        } else {
            res.status(200).json(question);
        }
    });
}

var postAnswers = function (req, res, next) {
    var token = req.params.token;
    if (req.body.answers) {
        console.log(req.body.answers);
        answerModel.postAnswers(token, req.body.answers, function (message) {

            userModel.setStatus(token, 2, function (mess) {
                res.status(200).json({ message: message, mess: mess });
            });
        });
    }
}

exports.getRoutes = function (app) {

    // Check if the token is correct and survey available
    app.all('/api/survey/:token/*', checkUserStatus, checkSurveyAvailability);

    // Get the survey with a special token the avoid CSRF attacks
    app.get('/api/survey/:token/survey', csrfProtection, getSurveyByToken);

    // Get survey Id by token
    app.get('/api/survey/:token/surveyId', getSurveyIdByToken);

    // Get an array of questionsId for one survey
    app.get('/api/questionsId/:survey_id', getQuestionsBySurveyId);

    // Get one question by Id
    app.get('/api/question/:id', getQuestionById);

    // update answers with token
    app.put('/api/survey/:token/put-answer', postAnswers);
}