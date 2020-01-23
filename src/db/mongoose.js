const mongoose = require('mongoose');
const validator = require('validator');

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
 */


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Value can\'t be password');
            }

        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }
})

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
 

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    } 
})

/**
 * add Task
 */
const task1 = new Task({
    description: ' task 2 '
})


task1.save().then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})
