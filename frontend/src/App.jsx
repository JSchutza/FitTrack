import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from './services/auth';

// Page components
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import NotFound from './pages/NotFound';

// Auth components
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

// Shared components
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/Shared/ProtectedRoute';

// dashboard components
import RecentWorkouts from './components/Dashboard/RecentWorkouts';
import WorkoutForm from './components/Dashboard/WorkoutForm';

// workouts components
import Workouts from './pages/Workouts';




function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated on mount and when auth state changes
    setIsAuth(isAuthenticated());
  }, []);

  // Callback to update auth state after login/logout
  const handleAuthChange = (newAuthState) => {
    setIsAuth(newAuthState);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar isAuth={isAuth} onAuthChange={handleAuthChange} />
        
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>

            <Route 
              path="/workouts" 
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Workouts />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/workouts/add" 
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <WorkoutForm />
                  <RecentWorkouts />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/workouts/edit/:id"
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <WorkoutForm isEdit={true} />
                </ProtectedRoute>
              } 
            />

            <Route path="/" element={<Home />} />

            <Route 
              path="/login" 
              element={
                isAuth ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LoginForm onAuthChange={handleAuthChange} />
                )
              } 
            />

            <Route 
              path="/register" 
              element={
                isAuth ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <RegisterForm onAuthChange={handleAuthChange} />
                )
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/goals" 
              element={
                <ProtectedRoute isAuth={isAuth}>
                  <Goals />
                </ProtectedRoute>
              } 
            />

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="bg-secondary-800 text-white py-6">
          <div className="container mx-auto px-4">
            <p className="text-center">&copy; {new Date().getFullYear()} FitTrack. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
