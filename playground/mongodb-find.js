/* jshint esversion: 6 */
const { MongoClient } = require('mongodb');

const dbname = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the db!!!' + err);
    }
    var col = client.db(dbname).collection('Todos');
    var col1 = client.db(dbname).collection('Users');
    col1.find({ name: 'acer' }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todo' + err);
    });
    // col.find().count().then((count) => {
    //     console.log('Todos count: ' + count);
    // }, (err) => {
    //     console.log('Unable to fetch todo' + err);
    // });
});