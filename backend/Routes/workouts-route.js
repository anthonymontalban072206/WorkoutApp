const express = require('express');
const { newWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require("../Controllers/controllers.js");
const router = express.Router();

//get all workouts
router.get('/', getWorkouts);

//get a single workout

router.get('/:id', getSingleWorkout);

//post a new workout
router.post('/', newWorkout);

//delete
router.delete('/:id', deleteWorkout);

//patch / edit
router.patch('/:id', updateWorkout);

module.exports = router;