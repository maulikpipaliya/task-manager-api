// const mongoose = require('mongoose');
require('../src/db/mongoose');
const Task = require('../src/models/task');



Task.findByIdAndDelete('5e295eeaac9f1026198dff49').then((result) => {
    console.log(result);
    return Task.countDocuments({ completed: false })
}).then((count) => {
    console.log(count, 'tasks are incompleted.')
}).catch((e) => {
    console.log(e);
})