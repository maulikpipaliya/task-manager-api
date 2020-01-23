const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/tasks', (request,response) => {

    Task.find({}).then( (tasks) => {
        if(tasks){
            response.status(200).send(tasks);
        }
    } ).catch( (error) => {
        response.status(500).send(error);
    })

    // response.status(200).send(request.body);
})

app.get('/tasks/:id', (request,response) => {
    const _id = request.params.id;

    Task.findById(_id).then( (task) => {
        if(task){
            response.status(200).send(task);
        }else{
            response.status(404).send();
        }
    } ).catch( (error) => {
        response.status(500).send(error);
    })

    // response.status(200).send(request.body);
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


app.get('/users', (request, response) => {
    User.find({}).then((users) => {
        response.status(200).send(users);
    }).catch((error) => {
        response.status(500).send();
    })
})


app.get('/users/:id', (request, response) => {

    const _id = request.params.id;

    User.findById(_id).then((result) => {
        if (!result) {
            response.status(404).send();
        }

        response.send(result);
    }).catch((error) => {
        response.status(500).send(error);
    })

})

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


app.listen(port, () => {
    console.log('Listening on ', port);
})

