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



// Check if the token is correct
app.all('/survey/:token', function (req, res, next) {
    var token = req.params.token;
    userModel.getUserStatus(token, function (userStatus) {
        console.log(userStatus.status);
        if (userStatus.status === 0) {
            userModel.setStatus(token, function () {
                next();
            });
        }
        else if (userStatus.status === 1) {
            next();
        } else {
            res.send("You haven't the rights to access this page");
        }
    });
});

// Get the survey with a special token the avoid CSRF attacks
app.get('/survey/:token', csrfProtection, function (req, res, next) {
    var token = req.params.token;
    surveyModel.getSurveyByToken(token, function (survey) {
        surveyModel.getQuestionsBySurveyId(survey.id, function (questions) {
            console.log(questions);
            res.status(200).json({ csrfToken: req.csrfToken(), survey: survey, questions: questions });
        });
    });
});

// Post form with token
var answers = [{ id: 1, answer: "yes" }, { id: 2, answer: "no" }];
app.post('/survey/:token', function (req, res, next) {
    var token = req.params.token;
    surveyModel.postAnswers(answers, function (message) {

        userModel.setStatus(token, function (mess) {
            res.status(200).json({message: message, mess: mess});
        });
    });
});

app.listen(3000, function () {
    console.log("Listening on port 3000 ...");
});
