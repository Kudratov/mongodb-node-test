/*jshint esversion: 6 */
const { MongoClient, ObjectID } = require('mongodb');
const dbname = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to the server!!!' + err);
    }
    const col = client.db(dbname).collection('Todos');
    const col1 = client.db(dbname).collection('Users');
    // col.findOneAndUpdate({
    //     _id: new ObjectID('5b6ad069d88c07cc6bc9cb8e')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    col1.findOneAndUpdate({
        _id: new ObjectID('5b69b5cbf15f950d8851708c')
    }, {
        $set: {
            name: 'acer1'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
});