const Workout = require('../models/workoutModel');

// @desc    Get all workouts for the logged in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get a specific workout
// @route   GET /api/workouts/:id
// @access  Private
const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
  try {
    const { title, type, date, duration, caloriesBurned, notes } = req.body;

    // Validate required fields
    if (!title || !type || !duration) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate duration
    if (duration <= 0) {
      return res.status(400).json({ message: 'Duration must be a positive number' });
    }

    // Create workout
    const workout = await Workout.create({
      user: req.user._id,
      title,
      type,
      date: date || Date.now(),
      duration,
      caloriesBurned,
      notes,
    });

    res.status(201).json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a workout
// @route   PUT /api/workouts/:id
// @access  Private
const updateWorkout = async (req, res) => {
  try {
    const { title, type, date, duration, caloriesBurned, notes } = req.body;

    // Find workout
    let workout = await Workout.findById(req.params.id);

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Validate duration if provided
    if (duration && duration <= 0) {
      return res.status(400).json({ message: 'Duration must be a positive number' });
    }

    // Update workout
    workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, type, date, duration, caloriesBurned, notes },
      { new: true, runValidators: true }
    );

    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    // Check if workout exists
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // Check if user owns the workout
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Delete workout
    await workout.remove();

    res.json({ message: 'Workout removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get workout stats
// @route   GET /api/workouts/stats
// @access  Private
const getWorkoutStats = async (req, res) => {
  try {
    // Get total workouts
    const totalWorkouts = await Workout.countDocuments({ user: req.user._id });

    // Get total minutes
    const totalMinutesResult = await Workout.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: '$duration' } } },
    ]);
    const totalMinutes = totalMinutesResult.length > 0 ? totalMinutesResult[0].total : 0;

    // Get workouts by type
    const workoutsByType = await Workout.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$type', count: { $sum: 1 }, minutes: { $sum: '$duration' } } },
    ]);

    // Get recent workouts
    const recentWorkouts = await Workout.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(5);

    // Get weekly stats (last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

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
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalWorkouts,
      totalMinutes,
      workoutsByType,
      recentWorkouts,
      weeklyStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
}; 