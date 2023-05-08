const mongoose = require('mongoose');
const Workout = require('../Models/workout-model.js');

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
};

//get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."})
    }
    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({error: "No such workout."});
    };
    res.status(200).json(workout);
};

//create new workout
const newWorkout = async (req, res) => {
    const {title, load, reps} = req.body;
const missingFields = [];

if(!title) {
    missingFields.push('Title')
}
if(!load) {
    missingFields.push('Load')
}
if(!load) {
    missingFields.push('Reps')
}
if(missingFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all required fields', missingFields})
}
    try {
        const workout = await Workout.create({title, load, reps})
        
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message});
    };
};

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."});
    };
    try{
        const workout = await Workout.findOneAndDelete({_id: id});
        if (!workout) {
            return res.status(404).json({error: "No such workout."});
        } 
        res.status(200).json({message: "Workout successfully deleted."});
        } catch (error) {
        res.status(500).json({error: "An error occurred while deleting the workout."});
    }
};

//update a workout
const updateWorkout = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No such workout."});
   };
   const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
   });

   if (!workout) {
    return res.status(404).json({error: "No such workout."});
   }
   res.status(200).json(workout)
};

//export this file
module.exports = {newWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout};