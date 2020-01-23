const mongoose = require('mongoose');


const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'task-manager-api';
const dbURL = connectionURL + databaseName;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/**
 * add User
 * 
 * 
 

const me = new User({
    name: '  Maulik',
    email: ' maUlik.pipaliyA@gmail.com',
    password: '12345',
    age: 23
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log(error);
})

*/

/**
 * Creating Task model
 */



/**
 * add Task
 const task1 = new Task({
     description: ' task 2 '
    })
    
    
    task1.save().then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    
*/