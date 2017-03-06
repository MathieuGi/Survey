var express = require('express');
var cookieParser = require('cookie-parser')
var helmet = require('helmet');
var parser = require('body-parser');
var csrf = require('csurf');

var csrfProtection = csrf({cookie: true});
var parseForm = parser.urlencoded({extended: false});
var app = express();

app.use(cookieParser());
app.use(helmet());
app.set('view engine', 'pug');

// Check if the token is correct
app.all('/form/:token', function(req, res, next){
    if(req.params.token === "Admin"){
        next();
    } else {
        res.send("You haven't the rights to access this page");
    }
});

// Get the form with a special token the avoid CSRF attacks
app.get('/form/:token',csrfProtection, function(req, res, next){
    res.render('viewTest', { csrfToken: req.csrfToken() })
});

// Post form with token
app.post('/form/:token',parseForm, csrfProtection, function(req, res, next){
    res.send("form posted");
});

app.listen(3000, function(){
    console.log("Listening on port 3000 ...");
});
