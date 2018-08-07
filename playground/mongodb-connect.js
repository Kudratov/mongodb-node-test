/*jshint esversion: 6 */
//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');


var obj = new ObjectID();
console.log(obj);

// var user = {
//     name: 'acer',
//     age: 20
// };
//Object destructring
// var { name } = user;
// console.log(name);


const db1Name = 'TodoApp';

// MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
//     if (err) {
//         console.log('Error');
//         console.log(err);
//         return err;
//     }
//     console.log('Cennected to the server!!!');
//     const col = client.db(db1Name).collection('Todos');
//     col.insertOne({
//         text: 'Something to do',
//         completed: false
//     }, (err, result) => {
//         if (err) {
//             return console.log('Unable to insert the todo');
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });
//     client.close();
// });

// MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
//     if (err) {
//         return console.log('Unable to connect to the server!!!' + err);
//     }
//     console.log('Connected to the server!!!');
//     const col = client.db(db1Name).collection('Users');
//     col.insertOne({
//         name: 'acer',
//         age: 22,
//         location: 'Tashkent'
//     }, (err, result) => {
//         if (err) {
//             return console.log('Unable to insert the user!!!');
//         }
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });
//     client.close();
// });