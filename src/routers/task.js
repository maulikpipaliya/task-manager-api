const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

/**
 * --------------------
 * TASK APIs
 * --------------------
 */


/**
* Create task
*/
router.post('/tasks', async (request, response) => {
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
router.get('/tasks', async (request, response) => {

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
router.get('/tasks/:id', async (request, response) => {
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

router.patch('/tasks/:id', async (request, response) => {
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

router.delete('/tasks/:id', async (request, response) => {

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

module.exports = router;