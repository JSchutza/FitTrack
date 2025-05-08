const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./models/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const goalRoutes = require('./routes/goalRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();



// Request logging middleware
app.use((req, res, next) => {
  // Store the original send function
  const originalSend = res.send;

  // Override the send function to capture the response
  res.send = function(body) {
    // Log the request details after response is sent
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    
    // Log additional error details for 500 responses
    if (res.statusCode === 500) {
      console.error(`[${new Date().toISOString()}] Server Error:`, {
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        error: body // Contains error details sent in response
      });
    }

    // Call the original send function
    return originalSend.call(this, body);
  };
  next();
});




// Routes
const BASE_URL = '/api';
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/workouts`, workoutRoutes);
app.use(`${BASE_URL}/goals`, goalRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FitTrack API' });
});




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
} else {
  module.exports = app;
} 

