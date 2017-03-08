var exports = module.exports = {};


exports.connectionError = function (error, query) {
    if (error === null) {
        query();
    } else {
        console.log(error.code);
        console.log(error.fatal);
    }
}