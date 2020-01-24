require('../src/db/mongoose');

const User = require('../src/models/user');

// User.findByIdAndUpdate('5e2941a9d3c29706166bab31', { age: 1}).then((user) => {
//     console.log(user);
//     return User.countDocuments({age: 1});
// }).then((result) => {
//     console.log(result, 'total documents with specified condition')
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('5e2941a9d3c29706166bab31', 43).then( (count) => {
    console.log(count);
}).catch( (e) => {
    console.log(e);
})