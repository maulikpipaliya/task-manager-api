
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
 * Created model User
 * 
 
const User = mongoose.model('User',{
    name : {
        type: String
    },
    age : {
        type: Number
    }
})

const me = new User({
    name: 'Joyy',
    age: 23
});

me.save().then( () => {
    console.log(me);
}).catch((error) => {
    console.log(error);
})

*/

/**
 * Creating Task model
 */

const Task = mongoose.model('Task', {
    description: String,
    completed: Boolean
})

const task1 = new Task({
    description: 'Task 1 ',
    completed: true
})


task1.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})