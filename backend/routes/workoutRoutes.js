const express = require('express');
const { 
  getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout, getWorkoutStats, getWorkoutStatsById,
} = require('../controllers/workoutController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Get workout stats
router.get('/stats', getWorkoutStats);
router.get('/stats/:id', getWorkoutStatsById);

// CRUD operations
router.route('/')
  .get(getWorkouts)
  .post(createWorkout);

router.route('/:id')
  .get(getWorkout)
  .put(updateWorkout)
  .delete(deleteWorkout);

module.exports = router; 