var express = require('express');
var cookieParser = require('cookie-parser')
var helmet = require('helmet');
var parser = require('body-parser');
var cors = require('cors');
var parseForm = parser.json();

var adminRoutes = require('./routes/admin');
var userRoutes = require('./routes/users');

var app = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(parseForm);


userRoutes.getRoutes(app);
adminRoutes.getRoutes(app);

app.listen(3000, function () {
    console.log("Listening on port 3000 ...");
});