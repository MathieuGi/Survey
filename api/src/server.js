var express = require('express');
var cookieParser = require('cookie-parser')
var helmet = require('helmet');
var parser = require('body-parser');
var csrf = require('csurf');
var cors = require('cors');

var surveyModel = require('./models/survey');
var userModel = require('./models/user');

var csrfProtection = csrf({ cookie: true });
var parseForm = parser.urlencoded({ extended: false });
var app = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.set('view engine', 'pug');



var checkUserStatus = function (req, res, next) {
    var token = req.params.token;
    userModel.getUserStatus(token, function (userStatus) {
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

    surveyModel.getQuestionsBySurveyId(survey_id, function (questions) {
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
    surveyModel.getQuestionById(id, function (question) {
        if (question === null) {
            res.status(404).send("Question not found");
        } else {
            res.status(200).json(question);
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
app.all('/api/survey/:token/*', checkUserStatus, checkSurveyAvailability);

// Get the survey with a special token the avoid CSRF attacks
app.get('/api/survey/:token', csrfProtection, getSurveyByToken);

// Get survey Id by token
app.get('/api/survey/:token/surveyId', getSurveyIdByToken);

// Get an array of questionsId for one survey
app.get('/api/questionsId/:survey_id', getQuestionsBySurveyId);

// Get one question by Id
app.get('/api/question/:id', getQuestionById);

// update answers with token
var answers = [{ id: 1, answer: "yes" }, { id: 2, answer: "no" }];
app.put('/api/survey/:token/postAnswers', postAnswers);

// Post a new survey
var survey = ['2017-03-06', '2017-03-20', 'Fourth survey !'];
app.post('/admin/createSurvey', createSurvey);

// Post a new question
var question = ["Question 1", 3];
app.post('/admin/createQuestion', createQuestion);

app.listen(3000, function () {
    console.log("Listening on port 3000 ...");
});
