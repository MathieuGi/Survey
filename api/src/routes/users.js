var express = require('express');
var router = express.Router();

var app = express();

router.all('/form/:token', function(req, res, next){
    console.log(req.params);
    next();
});

app.get('/form/:token', function(req, res, next){
    res.send('première requête get');
});