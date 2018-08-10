/*jshint esversion: 6 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/TodoApp');

module.exports = {
    mongoose
};