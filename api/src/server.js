var express = require('express');
var cookieParser = require('cookie-parser')
var helmet = require('helmet');
var parser = require('body-parser');
var csrf = require('csurf');
var surveyModel = require('./models/survey');
var userModel = require('./models/user');

var csrfProtection = csrf({ cookie: true });
var parseForm = parser.urlencoded({ extended: false });
var app = express();

app.use(cookieParser());
app.use(helmet());
app.set('view engine', 'pug');



var checkUserStatus = function (req, res, next) {
    var token = req.params.token;
    userModel.getUserStatus(token, function (userStatus) {
        console.log(userStatus.status);
        if (userStatus.status === 0) {
            userModel.setStatus(token, 1, function () {
                next();
            });
        }
        else if (userStatus.status === 1) {
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
            res.status(404).send("No survey available for this token !")
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

var getQuestionBySurveyId = function (req, res, next) {
    var survey_id = req.params.survey_id;
    var token = req.params.token;
    surveyModel.getQuestionsBySurveyId(survey_id, function (questions) {
        userModel.getUserByToken(token, function (user) {
            if (questions === null) {
                res.status(404).send("No questions found !");
            } else {
                if (user.id_survey === questions.id_survey) {
                    res.status(200).json({ questions: questions });
                } else {
                    res.status(401).send('Question not available for this user');
                }
            }
        });

    });
}

var getQuestionByIdAndToken = function (req, res, next) {
    var id = req.params.id;
    surveyModel.getQuestionById(id, function (question) {
        if (question === null) {
            res.status(404).send("Question not found");
        } else {
            res.status(200).json({ question: question });
        }
    });
}

var postAnswers = function (req, res, next) {
    var token = req.params.token;
    surveyModel.postAnswers(answers, function (message) {

        userModel.setStatus(token, 2, function (mess) {
            res.status(200).json({ message: message, mess: mess });
        });
    });
}

var createSurvey = function (req, res, next) {
    surveyModel.postSurvey(survey, function (message) {
        res.send(message);
    });
}

var createQuestion = function (req, res, next) {
    surveyModel.postQuestion(question, function (message) {
        res.send(message);
    });
}


// Check if the token is correct and survey available
app.all('/user/:token/*', checkUserStatus, checkSurveyAvailability);

// Get the survey with a special token the avoid CSRF attacks
app.get('/user/:token/survey', csrfProtection, getSurveyByToken);

// Get an array of questionsId for one survey
app.get('/user/:token/questionsId/:survey_id', getQuestionBySurveyId);

// Get one question by Id
app.get('/user/:token/question/:id', getQuestionByIdAndToken);

// update answers with token
var answers = [{ id: 1, answer: "yes" }, { id: 2, answer: "no" }];
app.put('/user/:token/postAnswers', postAnswers);

// Post a new survey
var survey = ['2017-03-06', '2017-03-20', 'Fourth survey !'];
app.post('/admin/createSurvey', createSurvey);

// Post a new question
var question = ["Question 1", 3];
app.post('/admin/createQuestion', createQuestion);

app.listen(3000, function () {
    console.log("Listening on port 3000 ...");
});
