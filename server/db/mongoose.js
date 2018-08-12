/*jshint esversion: 6 */
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TodoApp');

module.exports = {
    mongoose
};