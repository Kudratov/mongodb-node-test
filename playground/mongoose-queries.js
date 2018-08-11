/*jshint esversion: 6 */
const { mongoose } = require('./../server/db/mongoose.js');
const { Todo } = require('./../server/models/todo.js');
const { User } = require('./../server/models/user.js');

// id = '5b6f072f41a46b59689f528f';

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos /n' + JSON.stringify(todos, undefined, 2));
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos /n' + JSON.stringify(todo, undefined, 2));
// });

id = '5b6b510a34dcbc134c659666';

User.findById(id).then((user) => {
    console.log('User: ' + user.email);
}, (e) => {
    console.log('ERROR!!!');
});