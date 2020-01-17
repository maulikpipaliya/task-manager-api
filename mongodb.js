// CRUD operations


const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser : true, useUnifiedTopology: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect to database')
    }
    
    // console.log('Connected successfully')
    // console.log(client);
    const db = client.db(databaseName);
    // console.log(db);

    // db.collection('users').insertOne({
    //     name: "Joyy",
    //     age : 22
    // })

    db.collection('tasks').insertMany([
        {
            description : 'Task 1',
            completed: true
        },
        {
            description : 'Task 2',
            completed: false
        },
        {
            description : 'Task 3',
            completed: false   
        }
    ], (error, result) => {
        if(error){
            console.log("Unable to add")
        }

        console.log(result.ops);
    })
});







