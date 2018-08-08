/*jshint esversion: 6 */
const { MongoClient, ObjectID } = require('mongodb');
const dbname = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the server!!!' + err);
    }
    const col = client.db(dbname).collection('Todos');
    const col1 = client.db(dbname).collection('Users');
    // col.deleteMany({ text: 'Something to do' }).then((result) => {
    //     console.log(result);
    // });
    // col.deleteOne({ text: 'Something to do' }).then((result) => {
    //     console.log(result);
    // });
    // col.findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // });
});