import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';





const WorkoutDetails = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [workoutStats, setWorkoutStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await api.get(`/workouts/${id}`);
        setWorkout(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch workout details');
        setLoading(false);
      }
    };

    const fetchWorkoutStats = async () => {
      try {
        const response = await api.get(`/workouts/stats/${id}`);
        setWorkoutStats(response.data);
      } catch (err) {
        setError('Failed to fetch workout stats');
        setLoading(false);
      }
    };

    // fetch workout and stats
    fetchWorkout();
    fetchWorkoutStats();
  }, [id]);


  // loading state
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // error state
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // workout not found state
  if (!workout) {
    return <div className="text-center">Workout not found</div>;
  }




  // workout details
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">{workout.title}</h1>
        <Link
          to={`/workouts/edit/${workout._id}`}
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
        >
          Edit Workout
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-secondary-500">Type</p>
          <p className="font-medium">{workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}</p>
        </div>
        <div>
          <p className="text-sm text-secondary-500">Duration</p>
          <p className="font-medium">{workout.duration} minutes</p>
        </div>
        <div>
          <p className="text-sm text-secondary-500">Date</p>
          <p className="font-medium">
            {new Date(workout.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        {workout.caloriesBurned && (
          <div>
            <p className="text-sm text-secondary-500">Calories Burned</p>
            <p className="font-medium">{workout.caloriesBurned}</p>
          </div>
        )}
      </div>

      {workout.notes && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Notes</h2>
          <p className="text-secondary-600 whitespace-pre-wrap">{workout.notes}</p>
        </div>
      )}

      {workoutStats && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-lg font-semibold mb-2">Stats</h2>
          <p className="text-secondary-600">
            Days since last workout: {workoutStats.daysSinceWorkout}
          </p>
          {workoutStats.averageHeartRate && (
            <p className="text-secondary-600">
              Average heart rate: {workoutStats.averageHeartRate}
            </p>
          )}
          {workoutStats.perceivedExertion && (
            <p className="text-secondary-600">
              Perceived exertion: {workoutStats.perceivedExertion}
            </p>
          )}
        </div>
      )}
      
      <div className="mt-8 border-t pt-6">
        <Link to="/workouts" className="text-primary-600 hover:text-primary-900">
          ← Back to Workouts
        </Link>
      </div>
    </div>
  );
};

export default WorkoutDetails;
