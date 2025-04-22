const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    weeklyMinutes: {
      type: Number,
      required: [true, 'Please add weekly minutes goal'],
      min: [1, 'Minutes goal must be at least 1'],
    },
    weeklyWorkouts: {
      type: Number,
      required: [true, 'Please add weekly workouts goal'],
      min: [1, 'Workouts goal must be at least 1'],
      max: [7, 'Workouts goal cannot exceed 7 days per week'],
    },
    weightGoal: {
      type: Number,
      min: [0, 'Weight goal must be a positive number'],
    },
  },
  {
    timestamps: true,
  }
);

// Ensure one goal set per user
goalSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Goal', goalSchema); 