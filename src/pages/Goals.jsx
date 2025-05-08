import { useState, useEffect } from 'react';
import api from '../services/api';
import GoalForm from '../components/Goals/GoalForm';
import GoalProgress from '../components/Goals/GoalProgress';

const Goals = () => {
  const [goals, setGoals] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch goals and progress when component mounts
    const fetchGoalsAndProgress = async () => {
      try {
        setLoading(true);
        const response = await api.get('/goals/progress');
        
        setGoals(response.data.goal);
        setProgress(response.data.progress);
        setError('');
      } catch (err) {
        if (err.response?.status === 404) {
          // No goals set yet, not an error
          setGoals(null);
          setProgress(null);
        } else {
          setError('Failed to load goals. Please try again.');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGoalsAndProgress();
  }, []);

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await api.post('/goals', formData);
      
      setGoals(response.data);
      
      // Refetch progress after setting new goals
      const progressResponse = await api.get('/goals/progress');
      setProgress(progressResponse.data.progress);
      
      setError('');
    } catch (err) {
      setError('Failed to save goals. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-secondary-900 mb-6">Fitness Goals</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {goals ? 'Update Your Goals' : 'Set Your Goals'}
          </h2>
          <div className="card">
            <GoalForm initialGoals={goals} onSubmit={handleSubmit} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          {goals ? (
            <GoalProgress progress={progress} />
          ) : (
            <div className="card flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">No Goals Set</h3>
              <p className="text-secondary-600 text-center max-w-xs">
                Set your fitness goals to start tracking your progress!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals; 