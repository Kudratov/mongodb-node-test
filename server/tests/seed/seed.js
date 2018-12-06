/*jshint esversion:6 */
const { ObjectID } = require('mongodb');

const { Todo } = require('./../../models/todo.js');


const todos = [{
    _id: new ObjectID(),
    text: 'First todo'
}, {
    _id: new ObjectID(),
    text: 'Second todo',
    completed: true,
    completedAt: 222
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
}

module.exports = {
    todos,
    populateTodos
}