import { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';



const WorkoutForm = ({ isEdit = false, }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  // fetch the workout data if the workout is being edited
  useEffect(() => {
    // console.log('useEffect running with:', { isEdit, id }); 
    
    const fetchWorkout = async () => {
      // console.log('fetchWorkout called'); 
      
      if (isEdit && id) {
        // console.log('Conditions met, making API call'); 
        try {
          
          // console.log('Making API request to:', `/workouts/${id}`); 
          const response = await api.get(`/workouts/${id}`);
          // console.log('API response received:', response); 
          
          const workout = response.data;
          
          // Ensure we have data before setting state
          if (workout) {
            // console.log('Setting state with workout data:', workout); 
            
            setTitle(workout.title);
            setType(workout.type);
            setDuration(workout.duration?.toString());
            setCaloriesBurned(workout.caloriesBurned?.toString());
            setNotes(workout.notes);
          } else {
            console.error('No workout data received');
            toast.error('No workout data found');
          }
        } catch (error) {
          console.error('Error fetching workout:', error);
          toast.error('Failed to load previous workout details');
        }
      }
    };

    fetchWorkout();
  }, [isEdit, id]); 




  const onAddWorkout = async (workoutData) => {
    try {
      const response = await api.post('/workouts', workoutData);
      if (response.data) {
        return true;
      }
    } catch (error) {
      console.error('Error adding workout:', error);
      // Could add error state and display to user here
      return false;
    }
  };



  const onUpdateWorkout = async (workoutData) => {
    try {
      const response = await api.put(`/workouts/${id}`, workoutData);
      if (response.data) {
        return true;
      }
    } catch (error) {
      console.error('Error updating workout:', error);
      // Could add error state and display to user here
      return false;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkout = {
      title, type,
      duration: parseInt(duration, 10),
      caloriesBurned: parseInt(caloriesBurned, 10),
      notes,
    };


    if (isEdit) {
      console.log('Updating workout with ID:', id); 
      const success = await onUpdateWorkout(newWorkout);
      if (success) {
        // Reset form
        setTitle('');
        setType('');
        setDuration('');
        setCaloriesBurned('');
        setNotes('');
        // Navigate to dashboard after successful update
        navigate('/dashboard');
      }
      // if the workout is not updated, show an error message

    } else {
      const success = await onAddWorkout(newWorkout);
      if (success) {
        // Reset form
        setTitle('');
        setType('');
        setDuration('');
        setCaloriesBurned('');
        setNotes('');
        // show a success message
        toast.success('Workout added successfully');
      }
      // if the workout is not added, show an error message
    }
  };


  let formTitle = isEdit ? 'Edit Workout' : 'Add New Workout';
  let buttonText = isEdit ? 'Update Workout' : 'Add Workout';


  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{formTitle}</h2>
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
        {buttonText}
      </button>
    </form>
  );
};

export default WorkoutForm; 