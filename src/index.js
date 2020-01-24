const express = require('express');
require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


/**
 * -----------------------
 * USER APIs
 * -----------------------
 */


/**
 * Create user
 */
app.post('/users', async (request, response) => {
    console.log(request.body);
    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).send(user);
    } catch (e) {
        response.status(400).send(e);
    }
    // response.send('Testing');
})


/**
 * Get all users
 */
app.get('/users', async (request, response) => {
    try {
        const users = await User.find({});
        response.status(200).send(users);
    } catch (error) {
        response.status(500).send();
    }
})


/**
 * Get user by ID
 */
app.get('/users/:id', async (request, response) => {

    const _id = request.params.id;

    try {
        const user = await User.findById(_id)
        if (!user) {
            response.status(404).send();
        }
        response.send(user);
    } catch (error) {
        response.status(500).send({
            errorText: "User doesn't exist",
            errorDetails: error
        });

    }

})


/**
 * --------------------
 * TASK APIs
 * --------------------
 */


/**
* Create task
*/
app.post('/tasks', async (request, response) => {
    const task = new Task(request.body);
    try {
        await task.save();
        response.status(201).send(task);
        console.log(result);
    } catch (error) {
        response.status(400).send(error);
    }
})

/**
 * Read tasks
 */
app.get('/tasks', async (request, response) => {

    try {
        const tasks = await Task.find({});
        if (tasks) {
            response.status(200).send(tasks);
        }
    } catch (error) {
        response.status(500).send(error);
    }

})


/**
 * Read task by ID
 */
app.get('/tasks/:id', async (request, response) => {
    const _id = request.params.id;


    // Task.findById(_id).then((task) => {
    //     if (task) {
    //         response.status(200).send(task);
    //     } else {
    //         response.status(404).send();
    //     }
    // }).catch((error) => {
    //     response.status(500).send(error);
    // })

    try {
        const task = await Task.findById(_id);
        if (task) {
            response.status(200).send(task);
        } else {
            response.status(404).send();
        }
    } catch (error) {
        response.status(500).send({
            errorText: "Task doesn't exist",
            errorDetails: error
        });
    }
    // response.status(200).send(request.body);
})

app.listen(port, () => {
    console.log('Listening on ', port);
})

