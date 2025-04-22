# FitTrack - Fitness Tracking Web App

FitTrack is a full-stack fitness tracking application that allows users to log workouts, monitor progress, view statistics, and set personal fitness goals.

## Features

- **User Authentication**: Secure registration and login system
- **Workout Logging**: Track different types of workouts with details like duration and calories burned
- **Dashboard**: Visualize your workout data with charts and statistics
- **Goal Setting**: Set weekly fitness goals and track your progress
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React (Vite)
- React Router for navigation
- Tailwind CSS for styling
- Recharts for data visualization
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/fittrack.git
   cd fittrack
   ```

2. Set up the backend
   ```
   cd backend
   npm install
   ```

3. Configure environment variables
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     NODE_ENV=development
     ```

4. Set up the frontend
   ```
   cd ../frontend
   npm install
   ```

5. Configure frontend environment variables
   - Create a `.env` file in the frontend directory
   - Add the following:
     ```
     VITE_API_URL=http://localhost:5000/api
     ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/profile` - Get user profile (protected)

### Workouts
- `GET /api/workouts` - Get all user workouts (protected)
- `GET /api/workouts/:id` - Get a specific workout (protected)
- `POST /api/workouts` - Create a new workout (protected)
- `PUT /api/workouts/:id` - Update a workout (protected)
- `DELETE /api/workouts/:id` - Delete a workout (protected)
- `GET /api/workouts/stats` - Get workout statistics (protected)

### Goals
- `GET /api/goals` - Get user goals (protected)
- `POST /api/goals` - Create or update goals (protected)
- `GET /api/goals/progress` - Get goal progress (protected)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 