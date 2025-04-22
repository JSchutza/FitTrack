import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GoalForm = ({ initialGoals, onSubmit }) => {
  const [formData, setFormData] = useState({
    weeklyMinutes: '',
    weeklyWorkouts: '',
    weightGoal: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Update form data when initialGoals prop changes
  useEffect(() => {
    if (initialGoals) {
      setFormData({
        weeklyMinutes: initialGoals.weeklyMinutes || '',
        weeklyWorkouts: initialGoals.weeklyWorkouts || '',
        weightGoal: initialGoals.weightGoal || '',
      });
    }
  }, [initialGoals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate weekly minutes
    if (!formData.weeklyMinutes) {
      newErrors.weeklyMinutes = 'Weekly minutes goal is required';
    } else if (isNaN(formData.weeklyMinutes) || Number(formData.weeklyMinutes) <= 0) {
      newErrors.weeklyMinutes = 'Please enter a positive number';
    }
    
    // Validate weekly workouts
    if (!formData.weeklyWorkouts) {
      newErrors.weeklyWorkouts = 'Weekly workouts goal is required';
    } else if (
      isNaN(formData.weeklyWorkouts) || 
      Number(formData.weeklyWorkouts) <= 0 || 
      Number(formData.weeklyWorkouts) > 7
    ) {
      newErrors.weeklyWorkouts = 'Please enter a number between 1 and 7';
    }
    
    // Validate weight goal (optional)
    if (formData.weightGoal && (isNaN(formData.weightGoal) || Number(formData.weightGoal) <= 0)) {
      newErrors.weightGoal = 'Please enter a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Convert string values to numbers
      const goalData = {
        weeklyMinutes: Number(formData.weeklyMinutes),
        weeklyWorkouts: Number(formData.weeklyWorkouts),
        weightGoal: formData.weightGoal ? Number(formData.weightGoal) : undefined,
      };
      
      await onSubmit(goalData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="weeklyMinutes" className="label">
          Weekly Exercise Minutes Goal
        </label>
        <input
          type="number"
          id="weeklyMinutes"
          name="weeklyMinutes"
          value={formData.weeklyMinutes}
          onChange={handleChange}
          className={`input ${errors.weeklyMinutes ? 'border-red-500' : ''}`}
          placeholder="e.g., 150"
          min="1"
        />
        {errors.weeklyMinutes && (
          <p className="text-red-500 text-sm mt-1">{errors.weeklyMinutes}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="weeklyWorkouts" className="label">
          Weekly Workout Days Goal
        </label>
        <input
          type="number"
          id="weeklyWorkouts"
          name="weeklyWorkouts"
          value={formData.weeklyWorkouts}
          onChange={handleChange}
          className={`input ${errors.weeklyWorkouts ? 'border-red-500' : ''}`}
          placeholder="e.g., 3"
          min="1"
          max="7"
        />
        {errors.weeklyWorkouts && (
          <p className="text-red-500 text-sm mt-1">{errors.weeklyWorkouts}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="weightGoal" className="label">
          Weight Goal (optional)
        </label>
        <input
          type="number"
          id="weightGoal"
          name="weightGoal"
          value={formData.weightGoal}
          onChange={handleChange}
          className={`input ${errors.weightGoal ? 'border-red-500' : ''}`}
          placeholder="e.g., 70"
          min="0"
          step="0.1"
        />
        {errors.weightGoal && (
          <p className="text-red-500 text-sm mt-1">{errors.weightGoal}</p>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : (initialGoals ? 'Update Goals' : 'Set Goals')}
      </button>
    </form>
  );
};

GoalForm.propTypes = {
  initialGoals: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default GoalForm; 