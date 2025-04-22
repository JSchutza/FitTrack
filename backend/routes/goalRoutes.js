const express = require('express');
const { getGoals, setGoals, getGoalProgress } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.use(protect);

// Get or set user goals
router.route('/')
  .get(getGoals)
  .post(setGoals);

// Get goal progress
router.get('/progress', getGoalProgress);

module.exports = router; 