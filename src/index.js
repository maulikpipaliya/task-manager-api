const express = require('express');
require('./db/mongoose')
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (request, response) => {
    console.log(request.body);
    const user = new User(request.body);
    user.save().then( (result) => {
        console.log(result);
        response.send(user);
    }).catch( (error) => {
        response.status(400).send(error);
    })
    // response.send('Testing');


})

app.listen(port, () => {
    console.log('Listening on ', port);
})

