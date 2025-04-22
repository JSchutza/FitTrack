import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import SummaryCard from '../components/Dashboard/SummaryCard';
import ChartPanel from '../components/Dashboard/ChartPanel';
import RecentWorkouts from '../components/Dashboard/RecentWorkouts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch workout stats when component mounts
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/workouts/stats');
        setStats(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-secondary-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-red-700 font-medium underline mt-2"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <Link to="/workouts/add" className="btn btn-primary">
          Add Workout
        </Link>
      </div>

      {stats && stats.totalWorkouts === 0 ? (
        // Empty state
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No workouts logged yet!</h2>
          <p className="text-secondary-600 mb-6">
            Start tracking your fitness journey by adding your first workout.
          </p>
          <Link to="/workouts/add" className="btn btn-primary">
            Add Your First Workout
          </Link>
        </div>
      ) : (
        // Dashboard with data
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard 
            title="Total Workouts" 
            value={stats?.totalWorkouts || 0} 
            icon="workout"
          />
          <SummaryCard 
            title="Total Minutes" 
            value={stats?.totalMinutes || 0} 
            icon="clock"
          />
          <SummaryCard 
            title="This Week" 
            value={stats?.weeklyStats?.length || 0} 
            outOf={7}
            icon="calendar"
          />
        </div>
      )}

      {stats && stats.totalWorkouts > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ChartPanel 
              title="Weekly Activity"
              type="bar"
              data={stats.weeklyStats}
            />
            <ChartPanel 
              title="Workout Types"
              type="pie"
              data={stats.workoutsByType}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Workouts</h2>
            <RecentWorkouts workouts={stats.recentWorkouts} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;