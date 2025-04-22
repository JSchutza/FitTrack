const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Please add a workout type'],
      default: 'strength',
    },
    date: {
      type: Date,
      required: [true, 'Please select a date'],
      default: Date.now,
    },
    duration: {
      type: Number,
      required: [true, 'Please add duration in minutes'],
      min: [1, 'Duration must be at least 1 minute'],
    },
    caloriesBurned: {
      type: Number,
      min: [0, 'Calories must be a positive number'],
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Workout', workoutSchema); 