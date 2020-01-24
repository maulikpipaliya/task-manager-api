const express = require('express');
const User = require('../models/user')
const router = new express.Router();

/**
 * -----------------------
 * USER APIs
 * -----------------------
 */


/**
 * Create user
 */
router.post('/users', async (request, response) => {
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
router.get('/users', async (request, response) => {
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
router.get('/users/:id', async (request, response) => {

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

router.patch('/users/:id', async (request, response) => {
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

router.delete('/users/:id', async (request, response) => {

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


module.exports = router;