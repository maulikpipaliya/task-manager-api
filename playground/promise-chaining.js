require('../src/db/mongoose');

const User = require('../src/models/user');

User.findByIdAndUpdate('5e2941a9d3c29706166bab31', { age: 1}).then((user) => {
    console.log(user);
    return User.countDocuments({age: 1});
}).then((result) => {
    console.log(result, 'total documents with specified condition')
})