import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';




const RecentWorkouts = ({ workouts }) => {
  const [workoutList, setWorkoutList] = useState(workouts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };



  // Handle workout deletion
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    try {
      setLoading(true);
      await api.delete(`/workouts/${id}`);
      setWorkoutList(workoutList.filter(workout => workout._id !== id));
    } catch (err) {
      setError('Failed to delete workout. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!workoutList.length) {
    return (
      <div className="text-center py-6">
        <p className="text-secondary-500">No recent workouts to display.</p>
      </div>
    );
  }





  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
              >
                Workout
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-200">

            {workoutList.map((workout) => (
              <tr key={workout._id}>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                  {formatDate(workout.date)}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/workout/${workout._id}`}>
                    <div className="text-sm font-medium text-secondary-900">{workout.title}</div>
                  </Link>

                  {workout.notes && (
                    <div className="text-sm text-secondary-500 truncate max-w-xs">
                      {workout.notes}
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                  {workout.duration} mins
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to={`/workouts/edit/${workout._id}`}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(workout._id)}
                    className="text-red-600 hover:text-red-900"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <Link to="/workouts" className="text-primary-600 hover:text-primary-900 font-medium">
          View All Workouts →
        </Link>
      </div>
    </div>
  );
};



RecentWorkouts.propTypes = {
  workouts: PropTypes.array,
};

RecentWorkouts.defaultProps = {
  workouts: [],
};


export default RecentWorkouts; 