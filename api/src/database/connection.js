var mysql = require('mysql');
var exports = module.exports = {};

exports.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'surveydb'
});
