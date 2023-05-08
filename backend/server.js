const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const workoutRoutes = require("./Routes/workouts-route.js");


//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});
//route
app.use('/api/workouts', workoutRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Server is running on port', process.env.PORT)
            });
        }).catch((error) => {
            console.log(error);
    });