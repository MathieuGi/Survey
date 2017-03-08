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
        if (survey === null) {
            res.send("No survey available for this token !");
        } else {
            surveyModel.getQuestionsBySurveyId(survey.id, function (questions) {
                console.log(questions);
                res.status(200).json({ csrfToken: req.csrfToken(), survey: survey, questions: questions });
            });
        }
    });
});

// update answers with token
var answers = [{ id: 1, answer: "yes" }, { id: 2, answer: "no" }];
app.put('/survey/:token', function (req, res, next) {
    var token = req.params.token;
    surveyModel.postAnswers(answers, function (message) {

        userModel.setStatus(token, function (mess) {
            res.status(200).json({ message: message, mess: mess });
        });
    });
});

var survey = ['2017-03-06', '2017-03-20', 'Fourth survey !'];
app.post('/admin/createSurvey', function(req, res, next){
    surveyModel.postSurvey(survey, function(message){
        res.send(message);
    });
});

var question = ["Question 1", 3];
app.post('/admin/createQuestion', function(req, res, next){
    surveyModel.postQuestion(question, function(message){
        res.send(message);
    });
});

app.listen(3000, function () {
    console.log("Listening on port 3000 ...");
});
