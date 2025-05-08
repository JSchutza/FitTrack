import PropTypes from 'prop-types';

const GoalProgress = ({ progress }) => {
  if (!progress) {
    return (
      <div className="card p-6">
        <p className="text-center text-secondary-500">
          No progress data available.
        </p>
      </div>
    );
  }

  // Progress bar component
  const ProgressBar = ({ value, label, color = 'primary' }) => {
    const percent = Math.min(value, 100); // Cap at 100%
    const isComplete = percent === 100;
    
    const colorClasses = {
      primary: {
        background: 'bg-primary-600',
        text: 'text-primary-800',
        light: 'bg-primary-100',
      },
      accent: {
        background: 'bg-accent-500',
        text: 'text-accent-800',
        light: 'bg-accent-100',
      },
    };
    
    const theme = colorClasses[color] || colorClasses.primary;
    
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium text-secondary-700">{label}</div>
          <div className={`text-sm font-medium ${theme.text}`}>{percent}%</div>
        </div>
        <div className={`w-full h-3 ${theme.light} rounded-full`}>
          <div
            className={`h-3 rounded-full ${theme.background} ${isComplete ? 'animate-pulse' : ''}`}
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  ProgressBar.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'accent']),
  };

  return (
    <div className="card">
      {/* Minutes progress */}
      <ProgressBar
        value={progress.minutesPercentage}
        label={`Weekly Minutes: ${progress.weeklyMinutesCompleted} / ${progress.weeklyMinutesGoal}`}
        color="primary"
      />

      {/* Workouts progress */}
      <ProgressBar
        value={progress.workoutsPercentage}
        label={`Weekly Workouts: ${progress.weeklyWorkoutsCompleted} / ${progress.weeklyWorkoutsGoal}`}
        color="accent"
      />

      {/* Weight goal (if set) */}
      {progress.weightGoal && (
        <div className="mt-6 pt-6 border-t border-secondary-200">
          <h3 className="text-md font-medium text-secondary-900 mb-2">Weight Goal</h3>
          <p className="text-secondary-600">
            Target: <span className="font-semibold">{progress.weightGoal}</span>
          </p>
        </div>
      )}

      {/* Motivational message */}
      <div className="mt-6 bg-secondary-50 p-4 rounded-md">
        <h3 className="text-md font-medium text-secondary-900 mb-1">Keep Going!</h3>
        <p className="text-secondary-600 text-sm">
          {progress.minutesPercentage >= 100 && progress.workoutsPercentage >= 100
            ? '🎉 You\'ve achieved all your goals for this week! Amazing job!'
            : progress.minutesPercentage >= 75 || progress.workoutsPercentage >= 75
            ? '💪 You\'re making great progress! Keep up the good work!'
            : progress.minutesPercentage >= 25 || progress.workoutsPercentage >= 25
            ? '👍 You\'re on your way to achieving your goals!'
            : '🚀 Every workout brings you closer to your goals!'}
        </p>
      </div>
    </div>
  );
};

GoalProgress.propTypes = {
  progress: PropTypes.shape({
    weeklyMinutesGoal: PropTypes.number.isRequired,
    weeklyMinutesCompleted: PropTypes.number.isRequired,
    minutesPercentage: PropTypes.number.isRequired,
    weeklyWorkoutsGoal: PropTypes.number.isRequired,
    weeklyWorkoutsCompleted: PropTypes.number.isRequired,
    workoutsPercentage: PropTypes.number.isRequired,
    weightGoal: PropTypes.number,
  }),
};

export default GoalProgress; 