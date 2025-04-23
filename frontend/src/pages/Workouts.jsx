import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';





const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await api.get('/workouts');
        setWorkouts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch workouts');
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Workouts</h1>
        <Link 
          to="/workouts/add"
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded"
        >
          Add New Workout
        </Link>
      </div>

      {workouts.length === 0 ? (
        <p className="text-center text-gray-500">No workouts found. Start by adding a new workout!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <div key={workout._id} className="bg-white rounded-lg shadow-md p-4">
            <Link to={`/workout/${workout._id}`}>
              <h3 className="text-xl font-semibold mb-2">{workout.title}</h3>
              <p className="text-gray-600 mb-2">Type: {workout.type}</p>
              <p className="text-gray-600 mb-2">Duration: {workout.duration} minutes</p>
              {workout.caloriesBurned && (
                <p className="text-gray-600 mb-2">Calories: {workout.caloriesBurned}</p>
              )}
              {workout.notes && (
                <p className="text-gray-600 mb-2">Notes: {workout.notes}</p>
              )}
            </Link>

              <div className="flex justify-end mt-4">
                <Link
                  to={`/workouts/edit/${workout._id}`}
                  className="text-primary-500 hover:text-primary-600 mr-4"
                >
                  Edit
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workouts;
