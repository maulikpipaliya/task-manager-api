// CRUD operations

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();

console.log(id);
console.log(id.getTimestamp());


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }

    // console.log('Connected successfully')
    // console.log(client);
    const db = client.db(databaseName);
    // console.log(db);

    /*

    db.collection('users').findOne({
        name: 'Dvs'
    }, (error, result) => {
        if (!error) {
            console.log(result);
        }
        else {
            return console.log('Cant find')
        }
    })

    db.collection('users').find({
        name: 'Joyy'
    }).toArray((error, users) => {
        if (!error) {
            console.log(users);
        }

    });

*/

    // db.collection('users').find({
    //     name: 'Joyy'
    // }).count((error, users) => {
    //     if (!error) {
    //         console.log('count' + users);
    //     }
    //     toArray
    // });

    db.collection('tasks').find({
        completed: false
    }).toArray((error, uncompletedTasks) => {
        console.log(uncompletedTasks);

    })

    db.collection('tasks').findOne({
        _id : new ObjectID("5e212d1d82545b6a781f32e1")
    }, (error, result) => {
        if(!error){
            console.log(result);
        }
    });


});







