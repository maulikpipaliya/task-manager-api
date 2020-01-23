const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (request, response) => {
    console.log(request.body);
    const user = new User(request.body);
    user.save().then((result) => {
        console.log(result);
        response.status(201).send(user);
    }).catch((error) => {
        response.status(400).send(error);
    })
    // response.send('Testing');
})

app.post('/tasks', (request, response) => {
    const requestBody = request.body;
    console.log(requestBody);

    const task = new Task(requestBody);

    task.save().then((result) => {
        response.status(201).send(task);
        console.log(result);
    }).catch((error) => {
        response.status(400).send(error);
    })
})

app.listen(port, () => {
    console.log('Listening on ', port);
})

