
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
 * Update user
 */

app.patch('/users/:id', async (request, response) => {
    try {
        // if(request.body.isEmpty()){
        //     response.status(400).send({
        //         errorText: "Body empty"
        //     })
        // }

        const isRequestEmpty = !Object.keys(request.body).length;

        if (isRequestEmpty) {
            return response.status(400).send({
                errorText: "Request body can't be null"
            })
        }

        const updates = Object.keys(request.body);
        const allowedUpdates = ['name', 'email', 'age', 'password'];

        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return response.status(400).send({
                errorText: "Not able to update one of the property"
            })
        }

        console.log(request.body);
        const user = await User.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        if (!user) {
            response.status(404).send({
                errorText: "User not found"
            })
        }

        response.status(200).send(user)
    } catch (error) {
        response.status(400).send({
            errorText: "Error caught",
            errorDetails: error
        })
    }
});

/**
 * Delete user
 */

app.delete('/users/:id', async (request, response) => {

    const requestBody = request.body;
    const _id = request.params.id;

    try {
        const user = await User.findByIdAndDelete(_id);

        if (!user) {
            return response.status(404).send({
                response: "Couldn't find ID"
            })
        }

        return response.status(200).send({
            response: "Record deleted"
        })


    } catch (error) {
        return response.status(400).send({
            errorText: "Couldn't perform delete operation",
            errorDetails: error
        })
    }


});

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


/**
 * Update task by ID
 */

app.patch('/tasks/:id', async (request, response) => {
    const requestBody = request.body;
    console.log(requestBody);

    const allowedUpdates = ['description', 'completed'];
    const isRequestEmpty = !Object.keys(requestBody).length;
    const isValidOperation = Object.keys(requestBody).every((req) => allowedUpdates.includes(req));

    if (isValidOperation && !isRequestEmpty) {

        try {
            const task = await Task.findByIdAndUpdate(request.params.id, requestBody, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            console.log('lolwa', task);

            if (!task) {
                return response.status(400).send({
                    errorText: "Task not found"
                })
            }
            else {
                response.status(400).send({
                    responseType: "Success",
                    responseData: task
                })
            }


        } catch (error) {
            return response.status(400).send({
                errorText: "Couldn't update",
                errorDetails: error
            })
        }
    }
    else {
        return response.status(400).send({
            errorText: "Request empty or invalid update"
        })
    }
});


/**
 * Delete task
 */

app.delete('/tasks/:id', async (request, response) => {

    const requestBody = request.body;
    const _id = request.params.id;

    try {
        const task = await Task.findByIdAndDelete(_id);

        if (!task) {
            return response.status(404).send({
                response: "Couldn't find ID"
            })
        }
        return response.status(200).send({
            response: "Record deleted"
        })
    } catch (error) {
        return response.status(400).send({
            errorText: "Couldn't perform delete operation",
            errorDetails: error
        })
    }
});

app.listen(port, () => {
    console.log('Listening on ', port);
})

