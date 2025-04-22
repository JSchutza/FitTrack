import { useState } from 'react';
import api from '../../services/api';

const AddWorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');




  const onAddWorkout = async (workoutData) => {
    try {
      const response = await api.post('/workouts', workoutData);
      if (response.data) {
        // Reset form
        setTitle('');
        setType('');
        setDuration('');
        setCaloriesBurned(''); 
        setNotes('');
      }
    } catch (error) {
      console.error('Error adding workout:', error);
      // Could add error state and display to user here
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkout = {
      title,
      type,
      duration: parseInt(duration, 10),
      caloriesBurned: parseInt(caloriesBurned, 10),
      notes,
    };
    onAddWorkout(newWorkout);
    setTitle('');
    setType('');
    setDuration('');
    setCaloriesBurned('');
    setNotes('');
  };




  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Workout</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-700 mb-1">Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-700 mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="input"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-700 mb-1">Calories Burned</label>
        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
          className="input"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary-700 mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Workout
      </button>
    </form>
  );
};

export default AddWorkoutForm; 