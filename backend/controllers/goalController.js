const Goal = require('../models/goalModel');
const Workout = require('../models/workoutModel');

// @desc    Get user goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user._id });

    if (!goal) {
      return res.status(404).json({ message: 'No goals found, please create goals first' });
    }

    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create or update user goals
// @route   POST /api/goals
// @access  Private
const setGoals = async (req, res) => {
  try {
    const { weeklyMinutes, weeklyWorkouts, weightGoal } = req.body;

    // Validate required fields
    if (!weeklyMinutes || !weeklyWorkouts) {
      return res.status(400).json({ message: 'Please provide weekly minutes and workouts goals' });
    }

    // Validate input values
    if (weeklyMinutes <= 0) {
      return res.status(400).json({ message: 'Weekly minutes goal must be a positive number' });
    }

    if (weeklyWorkouts <= 0 || weeklyWorkouts > 7) {
      return res.status(400).json({
        message: 'Weekly workouts goal must be between 1 and 7 days',
      });
    }

    // Find existing goal or create new one
    const goal = await Goal.findOneAndUpdate(
      { user: req.user._id },
      { weeklyMinutes, weeklyWorkouts, weightGoal },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(goal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get goal progress
// @route   GET /api/goals/progress
// @access  Private
const getGoalProgress = async (req, res) => {
  try {
    // Get user's goals
    const goal = await Goal.findOne({ user: req.user._id });

    if (!goal) {
      return res.status(404).json({ message: 'No goals found, please create goals first' });
    }

    // Get current week's workouts (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    // Get weekly stats
    const weeklyStats = await Workout.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: sevenDaysAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          minutes: { $sum: '$duration' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate weekly minutes completed
    const weeklyMinutesCompleted = weeklyStats.reduce((total, day) => total + day.minutes, 0);

    // Calculate weekly workouts completed (count unique days)
    const weeklyWorkoutsCompleted = weeklyStats.length;

    // Calculate percentages
    const minutesPercentage = Math.floor((weeklyMinutesCompleted / goal.weeklyMinutes) * 100);
    const workoutsPercentage = Math.floor(
      (weeklyWorkoutsCompleted / goal.weeklyWorkouts) * 100
    );

    res.json({
      goal,
      progress: {
        weeklyMinutesGoal: goal.weeklyMinutes,
        weeklyMinutesCompleted,
        minutesPercentage: Math.min(minutesPercentage, 100),
        weeklyWorkoutsGoal: goal.weeklyWorkouts,
        weeklyWorkoutsCompleted,
        workoutsPercentage: Math.min(workoutsPercentage, 100),
        weightGoal: goal.weightGoal || null,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getGoals,
  setGoals,
  getGoalProgress,
}; 