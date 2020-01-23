
const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'task-manager-api';
const dbURL = connectionURL+ databaseName;


mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



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