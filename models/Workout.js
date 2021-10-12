const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExcerciseSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
      },
      exercises:[
          {   
     type: {
        type: String,
        trim: true,
        required: "Please select a type"
      },
      name: {
        type: String,
        trim: true,
        required: "Please enter a name"
      },
      duration:Number,
      weight: {
        type: Number,
       Default: 0
      },
       reps: {
        type: Number,
        Default: 0
       
      },
      sets: {
        type: Number,
        Default: 0
      }
    }],
    totalDuration: {
        type: Number,
        default: 0,
      }
})

      
const Workout = mongoose.model("Workout", ExcerciseSchema);

module.exports = Workout;
